import { z } from "zod";

export const manifestSchema = z.object({
  version: z.literal(1),
  deploymentId: z.uuid(),
  chainId: z.literal(31337),
  fromBlock: z.number().int().nonnegative(),
  admin: z.string().regex(/^0x[\da-fA-F]{40}$/),
  verifier: z.string().regex(/^0x[\da-fA-F]{40}$/),
  registry: z.string().regex(/^0x[\da-fA-F]{40}$/),
  paymentToken: z.string().regex(/^0x[\da-fA-F]{40}$/),
  projects: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        token: z.string().regex(/^0x[\da-fA-F]{40}$/),
        investment: z.string().regex(/^0x[\da-fA-F]{40}$/),
      }),
    )
    .min(1),
});
export type AcademicManifest = z.infer<typeof manifestSchema>;
export const operationSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("buy"),
      projectId: z.string(),
      reference: z.uuid(),
      units: z.string().regex(/^[1-9]\d{0,5}$/),
    })
    .strict(),
  z
    .object({
      action: z.literal("state"),
      projectId: z.string(),
      status: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    })
    .strict(),
  z
    .object({
      action: z.literal("distribute"),
      projectId: z.string(),
      period: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
      amount: z.string().regex(/^(0|[1-9]\d{0,11})(\.\d{1,6})?$/),
    })
    .strict(),
  z
    .object({
      action: z.literal("enroll"),
      address: z.string().regex(/^0x[\da-fA-F]{40}$/),
    })
    .strict(),
]);
export type AcademicOperation = z.infer<typeof operationSchema>;
export const signedOperationSchema = z
  .object({
    operation: operationSchema,
    deploymentId: z.uuid(),
    deadline: z.number().int().positive(),
    signature: z.string().regex(/^0x[\da-fA-F]{130}$/),
  })
  .strict();
export type SignedOperation = z.infer<typeof signedOperationSchema>;
export const activitySchema = z.object({
  kind: z.string(),
  reference: z.string(),
  amount: z.string(),
  txHash: z.string().regex(/^0x[\da-fA-F]{64}$/),
  period: z.string().optional(),
});
export type ChainActivity = z.infer<typeof activitySchema>;
const projectSchema = manifestSchema.shape.projects.element.extend({
  symbol: z.string(),
  status: z.number().int().min(0).max(3),
  supply: z.string().regex(/^\d+$/),
  available: z.string().regex(/^\d+$/),
  paused: z.boolean(),
  balance: z.string().regex(/^\d+$/),
  withdrawable: z.string().regex(/^\d+(\.\d+)?$/),
  withdrawn: z.string().regex(/^\d+(\.\d+)?$/),
  accepted: z.boolean(),
  frozen: z.boolean(),
  purchases: z.array(activitySchema),
  distributions: z.array(activitySchema),
  claims: z.array(activitySchema),
});
export type AcademicProject = z.infer<typeof projectSchema>;
export const snapshotSchema = z.object({
  deploymentId: z.uuid(),
  chainId: z.literal(31337),
  admin: manifestSchema.shape.admin,
  wallet: manifestSchema.shape.admin.nullable(),
  verified: z.boolean(),
  projects: z.array(projectSchema),
});
export type AcademicSnapshot = z.infer<typeof snapshotSchema>;
export const operationResultSchema = z.object({
  txHash: z.string().regex(/^0x[\da-fA-F]{64}$/),
  gasFeeEth: z.string().regex(/^\d+(\.\d+)?$/),
  recovered: z.boolean().optional(),
});
export type OperationResult = z.infer<typeof operationResultSchema>;
export const pendingPurchaseSchema = z.object({
  reference: z.uuid(),
  units: z.string().regex(/^[1-9]\d{0,5}$/),
});
export type PendingPurchase = z.infer<typeof pendingPurchaseSchema>;
export type AcademicMode = "buy" | "portfolio" | "admin";
export type AcademicPanelProps = {
  mode: AcademicMode;
  snapshot: AcademicSnapshot | null;
  projectId?: string;
  wallet: string | null;
  error: string;
  notice: string;
  busy: boolean;
  loading: boolean;
  units: string;
  signedIn: boolean;
  onUnits(value: string): void;
  onConnect(): void;
  onRefresh(): void;
  onAccept(project: AcademicProject): void;
  onBuy(project: AcademicProject): void;
  onClaim(project: AcademicProject): void;
  onOperation(operation: AcademicOperation): void;
};
