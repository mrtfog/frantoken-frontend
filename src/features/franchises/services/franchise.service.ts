import { z } from "zod";
import { franchiseRepository } from "../repositories/franchise.repository";
import type {
  ApplicationEditValues,
  DistributionInput,
} from "../types/franchise.type";
import {
  applicationEditSchema,
  distributionInputSchema,
} from "../types/franchise.type";

function parseInput<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success)
    throw new Error(
      result.error.issues[0]?.message ?? "Revisá los datos antes de continuar.",
    );
  return result.data;
}
export function saveFranchiseApplication(
  id: string,
  version: number,
  input: ApplicationEditValues,
) {
  return franchiseRepository.saveApplication(
    id,
    version,
    parseInput(applicationEditSchema, input),
  );
}
export function proposeFranchiseDistribution(
  id: string,
  input: DistributionInput,
) {
  return franchiseRepository.propose(
    id,
    parseInput(distributionInputSchema, input),
  );
}
export function correctFranchiseDistribution(
  projectId: string,
  id: string,
  version: number,
  input: { amount: string; memo: string },
) {
  const parsed = parseInput(
    distributionInputSchema.omit({ periodId: true }),
    input,
  );
  return franchiseRepository.editRequest(projectId, id, version, parsed);
}
export function observeFranchiseDistribution(
  id: string,
  version: number,
  note: string,
) {
  const parsed = parseInput(
    z
      .string()
      .trim()
      .min(1, "Ingresá una observación para el creador.")
      .max(500),
    note,
  );
  return franchiseRepository.observeRequest(id, version, parsed);
}
