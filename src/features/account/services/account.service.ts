import { z } from "zod";
import type { AccountRepository } from "../repositories/account.repository";
import { profileSchema } from "../schemas/profile.schema";
import type {
  FranchiseApplication,
  FranchiseFormValues,
  UserProfile,
} from "../types/account.type";

const applicationSchema = z.object({
  franchiseName: z.string().trim().min(2).max(100),
  sector: z.string().trim().min(2),
  city: z.string().trim().min(2),
  country: z.string().trim().min(2),
  totalCost: z.number().positive(),
  currency: z.enum(["USD", "ARS"]),
  description: z.string().trim().min(20),
  operatorName: z.string().trim().min(2),
  estimatedOpening: z.string().min(7),
  performanceSource: z.string().default("No aplica: proyecto nuevo"),
});

export async function saveProfile(
  userId: string,
  value: UserProfile,
  repository: AccountRepository,
): Promise<UserProfile> {
  const parsed = profileSchema.safeParse(value);
  if (!parsed.success)
    throw new Error(
      parsed.error.issues[0]?.message ?? "Revisá los datos del perfil.",
    );
  return repository.saveProfile(userId, parsed.data);
}

export async function submitFranchise(
  userId: string,
  value: FranchiseFormValues,
  repository: AccountRepository,
): Promise<FranchiseApplication> {
  const parsed = applicationSchema.safeParse(value);
  if (!parsed.success)
    throw new Error("Revisá los campos de la solicitud antes de continuar.");
  const data = parsed.data;
  const application: FranchiseApplication = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "Enviada",
    franchiseName: data.franchiseName,
    sector: data.sector,
    city: data.city,
    country: data.country,
    totalCost: data.totalCost,
    currency: data.currency,
    description: data.description,
    operatorName: data.operatorName,
    estimatedOpening: data.estimatedOpening,
    performanceSource: data.performanceSource,
    performance: [],
  };
  return repository.saveApplication(userId, application);
}
