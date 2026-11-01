/* Integra navegador/API/contratos reales en Hardhat en memoria, sin abrir puertos.
   Requiere los dos repositorios hermanos y sus dependencias instaladas. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");
const front = path.resolve(__dirname, "..");
const chain = path.resolve(
  process.env.FRANTOKEN_BLOCKCHAIN_DIR ||
    path.join(front, "../FranToken_Blockchain"),
);
process.chdir(chain);
const hardhat = require(path.join(chain, "node_modules/hardhat"));
const { ethers } = hardhat;
require(path.join(chain, "node_modules/ts-node")).register({
  project: path.join(front, "tsconfig.json"),
  transpileOnly: true,
  compilerOptions: { module: "CommonJS", moduleResolution: "node" },
});
// Alias de marcador igual que el bundler de Next para ejecutar módulos de servidor en el test.
const load = Module._load;
Module._load = function (name, ...rest) {
  return name === "server-only" ? {} : load.call(this, name, ...rest);
};
const { handleAcademicRequest } = require(
  path.join(front, "src/features/investment/services/academicApi.service.ts"),
);
const client = require(
  path.join(
    front,
    "src/features/investment/repositories/academicWallet.repository.ts",
  ),
);
const service = require(
  path.join(
    front,
    "src/features/investment/services/academicInvestment.service.ts",
  ),
);
const { requestMessage } = require(
  path.join(front, "src/features/investment/utils/requestMessage.util.ts"),
);
const { deployAcademic } = require(
  path.join(chain, "scripts/deploy-academic.js"),
);

async function main() {
  await hardhat.run("compile");
  const manifest = await deployAcademic({ writeManifest: false });
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "frantoken-mvp-test-"));
  await fs.writeFile(path.join(dir, "manifest.json"), JSON.stringify(manifest));
  process.env.MVP_ENABLED = "true";
  process.env.MVP_MANIFEST_PATH = path.join(dir, "manifest.json");
  // Mantiene el protocolo JSON-RPC real y ejecuta la EVM; solo reemplaza el transporte TCP.
  ethers.JsonRpcProvider.prototype._send = async (payload) =>
    Promise.all(
      (Array.isArray(payload) ? payload : [payload]).map(async (p) => {
        try {
          return {
            id: p.id,
            jsonrpc: "2.0",
            result: await hardhat.network.provider.send(p.method, p.params),
          };
        } catch (e) {
          return {
            id: p.id,
            jsonrpc: "2.0",
            error: { code: e.code || -32000, message: e.message, data: e.data },
          };
        }
      }),
    );
  const signers = await ethers.getSigners();
  let account = signers[4].address;
  const storage = new Map();
  global.window = {
    location: { origin: "http://localhost:3000" },
    localStorage: {
      getItem: (k) => storage.get(k) || null,
      setItem: (k, v) => storage.set(k, v),
      removeItem: (k) => storage.delete(k),
    },
    ethereum: {
      request: async ({ method, params = [] }) => {
        if (method === "eth_accounts" || method === "eth_requestAccounts")
          return [account];
        if (method === "personal_sign")
          return hardhat.network.provider.send("eth_sign", [
            params[1],
            params[0],
          ]);
        return hardhat.network.provider.send(method, params);
      },
    },
  };
  let loseResponse = false;
  global.fetch = async (url, options = {}) => {
    const request = new Request(new URL(url, window.location.origin), {
      ...options,
      headers: { ...options.headers, Origin: window.location.origin },
    });
    const response = await handleAcademicRequest(request);
    if (loseResponse && options.method === "POST" && response.ok) {
      loseResponse = false;
      throw new Error("Respuesta perdida después de emitir");
    }
    return response;
  };
  const check = async (name, fn) => {
    await fn();
    console.log("OK:", name);
  };
  let snapshot;
  await check("wallet local, catálogo vivo y habilitación demo", async () => {
    assert.equal(await client.connectAcademicWallet(), account);
    snapshot = await client.fetchAcademicSnapshot(account);
    assert.equal(snapshot.projects.length, 4);
    assert.equal(snapshot.verified, true);
    assert.equal(snapshot.projects[0].available, "1000");
  });
  const project = () => snapshot.projects[0];
  await check(
    "compra sin términos rechazada, términos firmados y emisión por C4",
    async () => {
      await assert.rejects(
        service.buyAcademicTokens(snapshot, project().id, "1"),
      );
      assert.equal(storage.size, 1);
      await client.acceptAcademicTerms(project(), account);
      snapshot = await client.fetchAcademicSnapshot(account);
      assert.equal(snapshot.projects[0].accepted, true);
      await service.buyAcademicTokens(snapshot, project().id, "1");
      assert.equal(storage.size, 0);
      snapshot = await client.fetchAcademicSnapshot(account);
      assert.equal(project().balance, "1");
      assert.equal(project().purchases.length, 1);
    },
  );
  await check(
    "respuesta perdida y reintento recuperan una única compra",
    async () => {
      loseResponse = true;
      await assert.rejects(
        service.buyAcademicTokens(snapshot, project().id, "2"),
        /Respuesta perdida/,
      );
      await assert.rejects(
        service.buyAcademicTokens(snapshot, project().id, "3"),
        /pendiente/,
      );
      const result = await service.buyAcademicTokens(
        snapshot,
        project().id,
        "2",
      );
      assert.equal(result.recovered, true);
      snapshot = await client.fetchAcademicSnapshot(account);
      assert.equal(project().balance, "3");
      assert.equal(project().purchases.length, 2);
    },
  );
  await check(
    "usuario no puede iniciar operación ni habilitar otras wallets",
    async () => {
      await assert.rejects(
        service.submitAcademicOperation(snapshot, {
          action: "state",
          projectId: project().id,
          status: 2,
        }),
        /administradora/,
      );
      await assert.rejects(
        service.submitAcademicOperation(snapshot, {
          action: "enroll",
          address: signers[8].address,
        }),
        /administradora/,
      );
    },
  );
  await check(
    "administrador inicia operación; se fondea un mes y se rechaza duplicación",
    async () => {
      account = manifest.admin;
      snapshot = await client.fetchAcademicSnapshot(account);
      await assert.rejects(
        service.submitAcademicOperation(snapshot, {
          action: "distribute",
          projectId: project().id,
          period: "2026-11",
          amount: "30",
        }),
      );
      await service.submitAcademicOperation(snapshot, {
        action: "state",
        projectId: project().id,
        status: 2,
      });
      await service.submitAcademicOperation(snapshot, {
        action: "distribute",
        projectId: project().id,
        period: "2026-11",
        amount: "30",
      });
      await assert.rejects(
        service.submitAcademicOperation(snapshot, {
          action: "distribute",
          projectId: project().id,
          period: "2026-11",
          amount: "30",
        }),
        /distribuido/,
      );
      snapshot = await client.fetchAcademicSnapshot(account);
      assert.equal(project().distributions.length, 1);
    },
  );
  await check(
    "cobro firmado por inversor e historial confirmado; segundo reclamo rechazado",
    async () => {
      account = signers[4].address;
      snapshot = await client.fetchAcademicSnapshot(account);
      assert.equal(project().withdrawable, "30.0");
      await client.claimAcademicRevenue(project(), account);
      snapshot = await client.fetchAcademicSnapshot(account);
      assert.equal(project().withdrawable, "0.0");
      assert.equal(project().withdrawn, "30.0");
      assert.equal(project().claims.length, 1);
      await assert.rejects(client.claimAcademicRevenue(project(), account));
    },
  );
  await check(
    "firma vencida, despliegue incorrecto y origen externo rechazados",
    async () => {
      const op = { action: "state", projectId: project().id, status: 3 };
      const deadline = Math.floor(Date.now() / 1000) - 10;
      const signature = await signers[0].signMessage(
        requestMessage(
          window.location.origin,
          manifest.deploymentId,
          deadline,
          op,
        ),
      );
      let response = await handleAcademicRequest(
        new Request("http://localhost:3000/api/mvp", {
          method: "POST",
          headers: { origin: window.location.origin },
          body: JSON.stringify({
            operation: op,
            deploymentId: manifest.deploymentId,
            deadline,
            signature,
          }),
        }),
      );
      assert.equal(response.status, 400);
      const wrongDeployment = crypto.randomUUID();
      const freshDeadline = Math.floor(Date.now() / 1000) + 300;
      const wrongSignature = await signers[0].signMessage(
        requestMessage(
          window.location.origin,
          wrongDeployment,
          freshDeadline,
          op,
        ),
      );
      response = await handleAcademicRequest(
        new Request("http://localhost:3000/api/mvp", {
          method: "POST",
          headers: { origin: window.location.origin },
          body: JSON.stringify({
            operation: op,
            deploymentId: wrongDeployment,
            deadline: freshDeadline,
            signature: wrongSignature,
          }),
        }),
      );
      assert.equal(response.status, 400);
      response = await handleAcademicRequest(
        new Request("http://example.com/api/mvp"),
      );
      assert.equal(response.status, 400);
      response = await handleAcademicRequest(
        new Request("http://localhost:3000/api/mvp", {
          method: "POST",
          headers: { origin: "http://example.com" },
          body: "{}",
        }),
      );
      assert.equal(response.status, 400);
    },
  );
  await check(
    "cierre conserva historial y saldos, bloquea compras posteriores",
    async () => {
      account = manifest.admin;
      snapshot = await client.fetchAcademicSnapshot(account);
      await service.submitAcademicOperation(snapshot, {
        action: "state",
        projectId: project().id,
        status: 3,
      });
      account = signers[4].address;
      snapshot = await client.fetchAcademicSnapshot(account);
      await assert.rejects(
        service.buyAcademicTokens(snapshot, project().id, "1"),
      );
      assert.equal(project().withdrawn, "30.0");
      assert.equal(project().status, 3);
    },
  );
  await fs.rm(dir, { recursive: true, force: true });
  console.log(
    "Integración MVP completada: cliente wallet + handler Next + contratos reales en Hardhat.",
  );
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
