import {
  BrowserProvider,
  Contract,
  type Eip1193Provider,
  formatEther,
  getAddress,
} from "ethers";
import { apiEnabled, apiFetch } from "@/core/config/api.config";
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

async function browserSigner() {
  const injected = (window as Window & { ethereum?: Eip1193Provider }).ethereum;
  if (!injected)
    throw new Error(
      "Instalá una wallet EVM y conectala a Hardhat local (31337).",
    );
  const provider = new BrowserProvider(injected);
  if ((await provider.getNetwork()).chainId !== BigInt(31337))
    throw new Error("Seleccioná Hardhat local (31337).");
  return provider.getSigner();
}
function assertBackend() {
  if (!apiEnabled)
    throw new Error(
      "Configurá NEXT_PUBLIC_API_URL para usar el MVP integrado con Express.",
    );
}
export async function connectAcademicWallet() {
  assertBackend();
  const signer = await browserSigner();
  const walletAddress = getAddress(await signer.getAddress());
  const { message } = await apiFetch<{ message: string }>(
    "/api/account/wallet/challenge",
    { method: "POST", body: { walletAddress } },
  );
  const signature = await signer.signMessage(message);
  await apiFetch("/api/account/wallet", {
    method: "PUT",
    body: { walletAddress, signature },
  });
  return walletAddress;
}
export async function fetchAcademicSnapshot(_wallet: string | null) {
  assertBackend();
  return snapshotSchema.parse(await apiFetch("/api/account/investment"));
}
export async function signAcademicOperation(
  _snapshot: AcademicSnapshot,
  operation: AcademicOperation,
) {
  assertBackend();
  if (operation.action === "buy")
    return operationResultSchema.parse(
      await apiFetch("/api/account/purchases", {
        method: "POST",
        body: {
          projectId: operation.projectId,
          units: operation.units,
          requestId: operation.reference,
        },
      }),
    );
  if (operation.action === "state")
    return operationResultSchema.parse(
      await apiFetch(
        `/api/admin/projects/${encodeURIComponent(operation.projectId)}`,
        {
          method: "PATCH",
          body: {
            status: (
              { 1: "publicada", 2: "en_operacion", 3: "cerrada" } as const
            )[operation.status],
          },
        },
      ),
    );
  if (operation.action === "distribute")
    return operationResultSchema.parse(
      await apiFetch("/api/admin/distributions", {
        method: "POST",
        body: {
          projectId: operation.projectId,
          periodId: operation.period,
          amount: operation.amount,
        },
      }),
    );
  throw new Error(
    "La habilitación se realiza sobre el usuario y su documentación desde administración.",
  );
}
export async function acceptAcademicTerms(
  project: AcademicProject,
  wallet: string,
) {
  const signer = await browserSigner();
  if (getAddress(await signer.getAddress()) !== wallet)
    throw new Error("Reconectá la wallet vinculada a tu cuenta.");
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
    throw new Error("Reconectá la wallet vinculada a tu cuenta.");
  const tx = await new Contract(
    project.token,
    academicTokenAbi,
    signer,
  ).claimRevenue();
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
    const parsed = pendingPurchaseSchema.parse(JSON.parse(previous));
    if (parsed.units !== units)
      throw new Error(
        `Hay una compra pendiente de ${parsed.units} tokens. Reintentá esa cantidad.`,
      );
    return { key, purchase: parsed };
  }
  const purchase = { reference: crypto.randomUUID(), units };
  window.localStorage.setItem(key, JSON.stringify(purchase));
  return { key, purchase };
}
export function completePurchase(key: string) {
  window.localStorage.removeItem(key);
}

export function readPendingPurchase(
  snapshot: AcademicSnapshot,
  projectId: string,
) {
  const value = window.localStorage.getItem(
    `frantoken:purchase:${snapshot.deploymentId}:${projectId}:${snapshot.wallet}`,
  );
  return value ? pendingPurchaseSchema.parse(JSON.parse(value)) : null;
}
