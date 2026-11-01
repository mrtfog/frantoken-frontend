import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  Contract,
  EventLog,
  formatEther,
  formatUnits,
  getAddress,
  id,
  JsonRpcProvider,
  parseUnits,
  verifyMessage,
} from "ethers";
import {
  academicTokenAbi,
  investmentAbi,
  paymentAbi,
  registryAbi,
} from "../constants/investment.constants";
import type {
  AcademicSnapshot,
  ChainActivity,
  OperationResult,
  SignedOperation,
} from "../types/investment.type";
import { manifestSchema } from "../types/investment.type";
import { requestMessage } from "../utils/requestMessage.util";

export async function localChain() {
  if (process.env.MVP_ENABLED !== "true")
    throw new Error(
      "MVP deshabilitado. Configurá MVP_ENABLED=true y desplegá la demo local.",
    );
  const rpc = new URL(process.env.MVP_RPC_URL || "http://127.0.0.1:8545");
  if (
    rpc.protocol !== "http:" ||
    !["127.0.0.1", "localhost", "[::1]"].includes(rpc.hostname)
  )
    throw new Error("El MVP solo admite RPC local.");
  const manifestPath =
    process.env.MVP_MANIFEST_PATH ||
    path.resolve(
      process.cwd(),
      "../FranToken_Blockchain/deployments/academic-local.json",
    );
  const manifest = manifestSchema.parse(
    JSON.parse(await readFile(manifestPath, "utf8")),
  );
  const provider = new JsonRpcProvider(rpc.toString(), undefined, {
    cacheTimeout: -1,
  });
  if ((await provider.getNetwork()).chainId !== BigInt(manifest.chainId))
    throw new Error("Red incorrecta: se requiere Hardhat 31337.");
  if ((await provider.getCode(manifest.projects[0].token)) === "0x")
    throw new Error(
      "El despliegue no existe. Volvé a desplegar tras reiniciar Hardhat.",
    );
  return { manifest, provider };
}

export async function readSnapshot(
  wallet: string | null,
): Promise<AcademicSnapshot> {
  const { manifest, provider } = await localChain();
  const address = wallet ? getAddress(wallet) : null;
  const registry = new Contract(manifest.registry, registryAbi, provider);
  const projects = await Promise.all(
    manifest.projects.map(async (project) => {
      const token = new Contract(project.token, academicTokenAbi, provider);
      const investment = new Contract(
        project.investment,
        investmentAbi,
        provider,
      );
      const [
        symbol,
        status,
        supply,
        maximum,
        paused,
        balance,
        withdrawable,
        withdrawn,
        accepted,
        frozen,
      ] = await Promise.all([
        token.symbol(),
        token.projectStatus(),
        token.totalSupply(),
        token.maxSupply(),
        token.paused(),
        address ? token.balanceOf(address) : BigInt(0),
        address ? token.withdrawableRevenueOf(address) : BigInt(0),
        address ? token.withdrawnRevenueOf(address) : BigInt(0),
        address ? investment.acceptedTerms(address) : false,
        address ? token.isFrozen(address) : false,
      ]);
      const [purchaseLogs, distributionLogs, claimLogs] = await Promise.all([
        address
          ? investment.queryFilter(
              investment.filters.PurchaseIssued(null, address),
              manifest.fromBlock,
            )
          : [],
        token.queryFilter(
          token.filters.MonthlyRevenueDistributed(),
          manifest.fromBlock,
        ),
        address
          ? token.queryFilter(
              token.filters.RevenueClaimed(address),
              manifest.fromBlock,
            )
          : [],
      ]);
      const purchases: ChainActivity[] = purchaseLogs.flatMap((e) =>
        e instanceof EventLog
          ? [
              {
                kind: "Compra simulada",
                reference: e.args.purchaseId,
                amount: e.args.units.toString(),
                txHash: e.transactionHash,
              },
            ]
          : [],
      );
      const distributions: ChainActivity[] = distributionLogs
        .filter((e): e is EventLog => e instanceof EventLog)
        .map((e) => ({
          kind: "Distribución",
          reference: e.args.period.toString(),
          period: e.args.period.toString(),
          amount: formatUnits(e.args.amount, 6),
          txHash: e.transactionHash,
        }));
      const claims: ChainActivity[] = claimLogs.flatMap((e) =>
        e instanceof EventLog
          ? [
              {
                kind: "Cobro",
                reference: e.transactionHash,
                amount: formatUnits(e.args.amount, 6),
                txHash: e.transactionHash,
              },
            ]
          : [],
      );
      return {
        ...project,
        symbol,
        status: Number(status),
        supply: supply.toString(),
        available: (maximum - supply).toString(),
        paused,
        balance: balance.toString(),
        withdrawable: formatUnits(withdrawable, 6),
        withdrawn: formatUnits(withdrawn, 6),
        accepted,
        frozen,
        purchases,
        distributions,
        claims,
      };
    }),
  );
  return {
    deploymentId: manifest.deploymentId,
    chainId: manifest.chainId,
    admin: manifest.admin,
    wallet: address,
    verified: address ? await registry.isVerified(address) : false,
    projects,
  };
}

export async function executeOperation(
  input: SignedOperation,
  origin: string,
): Promise<OperationResult> {
  const { manifest, provider } = await localChain();
  if (input.deploymentId !== manifest.deploymentId)
    throw new Error("Despliegue cambiado; actualizá la pantalla.");
  const now = Math.floor(Date.now() / 1000);
  if (input.deadline < now || input.deadline > now + 600)
    throw new Error("Firma vencida o plazo inválido.");
  const actor = getAddress(
    verifyMessage(
      requestMessage(
        origin,
        input.deploymentId,
        input.deadline,
        input.operation,
      ),
      input.signature,
    ),
  );
  const op = input.operation;
  const isAdmin = actor === getAddress(manifest.admin);
  if (op.action !== "buy" && !isAdmin)
    throw new Error("Se requiere la wallet administradora.");
  const signer = await provider.getSigner(
    op.action === "buy" ? manifest.verifier : manifest.admin,
  );
  if (op.action === "enroll") {
    const registry = new Contract(manifest.registry, registryAbi, signer);
    if (await registry.contains(op.address))
      throw new Error(
        "Wallet ya registrada; la habilitación no renueva un KYC vencido.",
      );
    const tx = await registry.registerIdentity(
      getAddress(op.address),
      getAddress(op.address),
      32,
    );
    const receipt = await tx.wait();
    return { txHash: tx.hash, gasFeeEth: formatEther(receipt.fee) };
  }
  const project = manifest.projects.find((p) => p.id === op.projectId);
  if (!project) throw new Error("Franquicia no encontrada.");
  const token = new Contract(project.token, academicTokenAbi, signer);
  if (op.action === "buy") {
    const investment = new Contract(project.investment, investmentAbi, signer);
    const purchaseId = id(
      `${manifest.deploymentId}:${project.id}:${op.reference}`,
    );
    const recover = async (): Promise<OperationResult | null> => {
      const logs = await investment.queryFilter(
        investment.filters.PurchaseIssued(purchaseId),
        manifest.fromBlock,
      );
      const event = logs.find(
        (log): log is EventLog => log instanceof EventLog,
      );
      if (!event) return null;
      if (
        getAddress(event.args.investor) !== actor ||
        event.args.units !== BigInt(op.units)
      )
        throw new Error("La referencia ya existe con otra compra.");
      const receipt = await event.getTransactionReceipt();
      return {
        txHash: event.transactionHash,
        gasFeeEth: formatEther(receipt.fee),
        recovered: true,
      };
    };
    const previous = await recover();
    if (previous) return previous;
    try {
      const tx = await investment.issueAfterPayment(
        purchaseId,
        id(`payment:${purchaseId}`),
        actor,
        BigInt(op.units),
        BigInt(op.units) * BigInt(1000),
        id(`SIMULATED:${purchaseId}`),
      );
      const receipt = await tx.wait();
      return { txHash: tx.hash, gasFeeEth: formatEther(receipt.fee) };
    } catch (error) {
      const recovered = await recover();
      if (recovered) return recovered;
      throw error;
    }
  }
  if (op.action === "state") {
    const tx = await token.setProjectStatus(op.status);
    const receipt = await tx.wait();
    return { txHash: tx.hash, gasFeeEth: formatEther(receipt.fee) };
  }
  const period = Number(op.period.replace("-", ""));
  const value = parseUnits(op.amount, 6);
  if (value <= BigInt(0)) throw new Error("El importe debe ser positivo.");
  if (await token.distributedPeriod(period))
    throw new Error("Este período ya fue distribuido; consultá el historial.");
  const payment = new Contract(manifest.paymentToken, paymentAbi, signer);
  let approvalFee = BigInt(0);
  if ((await payment.allowance(manifest.admin, project.token)) < value) {
    const approval = await (await payment.approve(project.token, value)).wait();
    approvalFee = approval.fee;
  }
  const tx = await token.distributeMonthly(period, value);
  const receipt = await tx.wait();
  return { txHash: tx.hash, gasFeeEth: formatEther(receipt.fee + approvalFee) };
}
