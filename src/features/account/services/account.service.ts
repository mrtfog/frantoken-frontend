import { z } from "zod";
import type { AccountRepository } from "../repositories/account.repository";
import type {
  FranchiseApplication,
  FranchiseFormValues,
  UserProfile,
} from "../types/account.type";

const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(30),
  country: z.string().trim().min(2).max(60),
  investorUpdates: z.boolean(),
});

const applicationSchema = z.object({
  franchiseName: z.string().trim().min(2).max(100),
  sector: z.string().trim().min(2),
  city: z.string().trim().min(2),
  country: z.string().trim().min(2),
  totalCost: z.number().positive(),
  currency: z.enum(["USD", "ARS"]),
  description: z.string().trim().min(40),
  operatorName: z.string().trim().min(2),
  estimatedOpening: z.string().min(7),
  performanceSource: z.string().trim().min(5),
  year1: z.number().int().min(2000),
  revenue1: z.number().nonnegative(),
  margin1: z.number().min(-100).max(100),
  year2: z.number().int().min(2000),
  revenue2: z.number().nonnegative(),
  margin2: z.number().min(-100).max(100),
  year3: z.number().int().min(2000),
  revenue3: z.number().nonnegative(),
  margin3: z.number().min(-100).max(100),
});

export async function saveProfile(
  userId: string,
  value: UserProfile,
  repository: AccountRepository,
) {
  const parsed = profileSchema.safeParse(value);
  if (!parsed.success) throw new Error("Revisá los datos del perfil.");
  await repository.saveProfile(userId, parsed.data);
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
  if (!(data.year1 < data.year2 && data.year2 < data.year3)) {
    throw new Error("Los años de rendimiento deben estar en orden ascendente.");
  }
  const application: FranchiseApplication = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "Borrador demo enviado",
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
    performance: [
      { year: data.year1, revenue: data.revenue1, marginPercent: data.margin1 },
      { year: data.year2, revenue: data.revenue2, marginPercent: data.margin2 },
      { year: data.year3, revenue: data.revenue3, marginPercent: data.margin3 },
    ],
  };
  await repository.saveApplication(userId, application);
  await repository.clearDraft(userId);
  return application;
}
