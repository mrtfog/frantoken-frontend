import type { FranchiseFormValues } from "../types/account.type";

export const franchiseSteps = [
  "Franquicia",
  "Costos e historial",
  "Operación y revisión",
] as const;

const lastCompletedYear = new Date().getFullYear() - 1;

export const franchiseDefaults: FranchiseFormValues = {
  franchiseName: "",
  sector: "",
  city: "",
  country: "Argentina",
  totalCost: undefined,
  currency: "USD",
  description: "",
  operatorName: "",
  estimatedOpening: "",
  performanceSource: "",
  year1: lastCompletedYear - 2,
  revenue1: undefined,
  margin1: undefined,
  year2: lastCompletedYear - 1,
  revenue2: undefined,
  margin2: undefined,
  year3: lastCompletedYear,
  revenue3: undefined,
  margin3: undefined,
};
