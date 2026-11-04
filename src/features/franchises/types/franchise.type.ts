import type { FormEventHandler } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const applicationEditSchema = z.object({
  franchiseName: z
    .string()
    .trim()
    .min(2, "Ingresá el nombre de la franquicia.")
    .max(100),
  sector: z.string().trim().min(2, "Ingresá el sector.").max(80),
  city: z.string().trim().min(2, "Ingresá la localidad.").max(80),
  country: z.string().trim().min(2, "Ingresá el país.").max(80),
  totalCost: z.coerce
    .number()
    .finite()
    .positive("Ingresá una inversión estimada positiva."),
  currency: z.enum(["USD", "ARS"]),
  operatorName: z.string().trim().min(2, "Ingresá la operadora.").max(120),
  estimatedOpening: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Seleccioná un mes válido."),
  description: z
    .string()
    .trim()
    .min(20, "Describí el proyecto con al menos 20 caracteres.")
    .max(4000),
});
export type ApplicationEditValues = z.infer<typeof applicationEditSchema>;
export const managedApplicationSchema = applicationEditSchema.extend({
  id: z.string(),
  version: z.number().int().positive(),
  createdAt: z.string(),
  status: z.enum(["Enviada", "Observada", "Aprobada", "Publicada"]),
  projectId: z.string().nullable(),
  reviewNote: z.string().nullable(),
  performanceSource: z.string(),
});
const auditSchema = z.object({
  id: z.string(),
  action: z.string(),
  actorRole: z.string(),
  details: z.record(z.string(), z.unknown()),
  createdAt: z.string(),
});
export type FranchiseEvent = z.infer<typeof auditSchema>;
export const applicationDetailSchema = z.object({
  application: managedApplicationSchema,
  capabilities: z.object({ canEdit: z.boolean() }),
  history: z.array(auditSchema),
});
export type ApplicationDetail = z.infer<typeof applicationDetailSchema>;

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  sector: z.string(),
  descriptor: z.string(),
  status: z.enum(["publicada", "en_operacion", "cerrada"]),
  price: z.object({
    minor: z.string(),
    currency: z.string(),
    decimals: z.number(),
    display: z.string(),
  }),
  token: z.object({
    symbol: z.string().nullable(),
    address: z.string().nullable(),
    investmentAgreement: z.string().nullable(),
    onChain: z.boolean(),
  }),
});
export const distributionRequestSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  periodId: z.string(),
  amountMinor: z.string().regex(/^\d+$/),
  amount: z.string(),
  currency: z.literal("mUSDC"),
  currencyDecimals: z.literal(6),
  memo: z.string(),
  status: z.enum(["pending", "observed", "executing", "confirmed"]),
  version: z.number().int().positive(),
  reviewNote: z.string(),
  distributionId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  franchiseName: z.string().optional(),
});
export type DistributionRequest = z.infer<typeof distributionRequestSchema>;
const distributionSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  periodId: z.string(),
  amountMinor: z.string(),
  currency: z.string(),
  currencyDecimals: z.literal(6),
  status: z.enum(["pending", "confirmed", "failed"]),
  txHash: z.string().nullable(),
  createdAt: z.string().nullable(),
});
export const franchiseDetailSchema = z.object({
  project: projectSchema,
  application: managedApplicationSchema.nullable(),
  chain: z
    .object({
      status: z.number().int().min(0).max(3),
      supply: z.string().regex(/^\d+$/),
      available: z.string().regex(/^\d+$/),
    })
    .nullable(),
  networkError: z.string(),
  capabilities: z.object({
    canStart: z.boolean(),
    canClose: z.boolean(),
    canProposeDistribution: z.boolean(),
    canExecuteDistribution: z.boolean(),
  }),
  requests: z.array(distributionRequestSchema),
  distributions: z.array(distributionSchema),
  history: z.array(auditSchema),
});
export type FranchiseDetail = z.infer<typeof franchiseDetailSchema>;
export const franchiseDirectorySchema = z.object({
  franchises: z.array(
    z.object({ project: projectSchema, applicationId: z.string().nullable() }),
  ),
});
export type FranchiseDirectory = z.infer<
  typeof franchiseDirectorySchema
>["franchises"];
export const distributionInputSchema = z.object({
  periodId: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Seleccioná un mes válido.")
    .refine(
      (value) => value >= "2000-01",
      "Seleccioná enero de 2000 o un mes posterior.",
    ),
  amount: z
    .string()
    .trim()
    .regex(
      /^(0|[1-9]\d{0,11})(\.\d{1,6})?$/,
      "Ingresá un importe con hasta seis decimales.",
    )
    .refine(
      (value) => !/^0(?:\.0+)?$/.test(value),
      "El importe debe ser positivo.",
    ),
  memo: z.string().trim().max(160),
});
export type DistributionInput = z.infer<typeof distributionInputSchema>;

export type ApplicationDetailProps = {
  detail: ApplicationDetail;
  register: UseFormRegister<ApplicationEditValues>;
  errors: FieldErrors<ApplicationEditValues>;
  busy: boolean;
  message: string;
  error: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onRefresh(): void;
};
export type RequestListProps = {
  requests: DistributionRequest[];
  busy: boolean;
  canEdit: boolean;
  canReview: boolean;
  canExecute: boolean;
  onEdit(
    id: string,
    version: number,
    input: { amount: string; memo: string },
  ): void;
  onObserve(id: string, version: number, note: string): void;
  onExecute(id: string, version: number): void;
};
export type FranchiseManagementProps = {
  detail: FranchiseDetail;
  busy: boolean;
  notice: string;
  error: string;
  onRefresh(): void;
  onOperation(status: "en_operacion" | "cerrada"): void;
  onPropose(input: DistributionInput): void;
  requestsActions: Omit<
    RequestListProps,
    "requests" | "busy" | "canEdit" | "canReview" | "canExecute"
  >;
};
