import {
  completePurchase,
  pendingPurchase,
  signAcademicOperation,
} from "../repositories/academicWallet.repository";
import type {
  AcademicOperation,
  AcademicSnapshot,
} from "../types/investment.type";
import { operationSchema } from "../types/investment.type";

export async function buyAcademicTokens(
  snapshot: AcademicSnapshot,
  projectId: string,
  units: string,
) {
  operationSchema.parse({
    action: "buy",
    projectId,
    units,
    reference: crypto.randomUUID(),
  });
  const pending = pendingPurchase(snapshot, projectId, units);
  const result = await signAcademicOperation(snapshot, {
    action: "buy",
    projectId,
    ...pending.purchase,
  });
  completePurchase(pending.key);
  return result;
}
export function submitAcademicOperation(
  snapshot: AcademicSnapshot,
  operation: AcademicOperation,
) {
  return signAcademicOperation(snapshot, operationSchema.parse(operation));
}
