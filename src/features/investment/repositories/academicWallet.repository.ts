import {
  BrowserProvider,
  Contract,
  type Eip1193Provider,
  formatEther,
  getAddress,
} from "ethers";
import type { ZodType } from "zod";
import {
  academicTokenAbi,
  investmentAbi,
} from "../constants/investment.constants";
import type {
  AcademicOperation,
  AcademicProject,
  AcademicSnapshot,
} from "../types/investment.type";
import {
  operationResultSchema,
  pendingPurchaseSchema,
  snapshotSchema,
} from "../types/investment.type";
import { requestMessage } from "../utils/requestMessage.util";

async function browserSigner() {
  const injected = (window as Window & { ethereum?: Eip1193Provider }).ethereum;
  if (!injected)
    throw new Error(
      "Instalá una wallet compatible con Ethereum y conectala a Hardhat local (31337).",
    );
  const provider = new BrowserProvider(injected);
  if ((await provider.getNetwork()).chainId !== BigInt(31337))
    throw new Error(
      "Seleccioná Hardhat local: red 31337, RPC http://127.0.0.1:8545.",
    );
  return provider.getSigner();
}
async function responseJson<T>(
  response: Response,
  schema: ZodType<T>,
): Promise<T> {
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      typeof data.error === "string"
        ? data.error
        : "No se pudo completar la operación.",
    );
  return schema.parse(data);
}
export async function connectAcademicWallet() {
  return getAddress(await (await browserSigner()).getAddress());
}
export async function fetchAcademicSnapshot(wallet: string | null) {
  return responseJson(
    await fetch(
      `/api/mvp${wallet ? `?wallet=${encodeURIComponent(wallet)}` : ""}`,
      { cache: "no-store" },
    ),
    snapshotSchema,
  );
}
export async function signAcademicOperation(
  snapshot: AcademicSnapshot,
  operation: AcademicOperation,
) {
  const signer = await browserSigner();
  if (getAddress(await signer.getAddress()) !== snapshot.wallet)
    throw new Error("Cambió la cuenta de la wallet; volvé a conectar.");
  const deadline = Math.floor(Date.now() / 1000) + 300;
  const signature = await signer.signMessage(
    requestMessage(
      window.location.origin,
      snapshot.deploymentId,
      deadline,
      operation,
    ),
  );
  return responseJson(
    await fetch("/api/mvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operation,
        deploymentId: snapshot.deploymentId,
        deadline,
        signature,
      }),
    }),
    operationResultSchema,
  );
}
export async function acceptAcademicTerms(
  project: AcademicProject,
  wallet: string,
) {
  const signer = await browserSigner();
  if (getAddress(await signer.getAddress()) !== wallet)
    throw new Error("Cambió la cuenta; volvé a conectar.");
  const tx = await new Contract(
    project.investment,
    investmentAbi,
    signer,
  ).acceptTerms();
  const receipt = await tx.wait();
  return { txHash: tx.hash, gasFeeEth: formatEther(receipt.fee) };
}
export async function claimAcademicRevenue(
  project: AcademicProject,
  wallet: string,
) {
  const signer = await browserSigner();
  if (getAddress(await signer.getAddress()) !== wallet)
    throw new Error("Cambió la cuenta; volvé a conectar.");
  const tx = await new Contract(
    project.token,
    academicTokenAbi,
    signer,
  ).claimRevenue();
  // Conservar hash antes de esperar: ante timeout se consulta, no se afirma cobrado.
  window.localStorage.setItem(
    `frantoken:claim:${project.token}:${wallet}`,
    tx.hash,
  );
  const receipt = await tx.wait();
  return { txHash: tx.hash, gasFeeEth: formatEther(receipt.fee) };
}
export function pendingPurchase(
  snapshot: AcademicSnapshot,
  projectId: string,
  units: string,
) {
  const key = `frantoken:purchase:${snapshot.deploymentId}:${projectId}:${snapshot.wallet}`;
  const previous = window.localStorage.getItem(key);
  if (previous) {
    const parsed = pendingPurchaseSchema.safeParse(JSON.parse(previous));
    if (parsed.success) {
      if (parsed.data.units !== units)
        throw new Error(
          `Hay una compra pendiente de ${parsed.data.units} tokens. Reintentá esa cantidad para recuperar su resultado.`,
        );
      return { key, purchase: parsed.data };
    }
    throw new Error("La referencia de compra guardada es inválida.");
  }
  const purchase = { reference: crypto.randomUUID(), units };
  window.localStorage.setItem(key, JSON.stringify(purchase));
  return { key, purchase };
}
export function completePurchase(key: string) {
  window.localStorage.removeItem(key);
}
