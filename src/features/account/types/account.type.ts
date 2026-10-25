export type UserProfile = {
  fullName: string;
  phone: string;
  country: string;
  investorUpdates: boolean;
};

export type TokenActivity = {
  id: string;
  occurredAt: string;
  kind: "Compra de ejemplo" | "Nota de proyecto";
  quantity: number | null;
  unitPrice: number | null;
  amount: number | null;
  currency: "USD";
  reference: string;
};

export type TokenHolding = {
  id: string;
  projectName: string;
  symbol: string;
  quantity: number;
  currency: "USD";
  investedAmount: number;
  activities: TokenActivity[];
};

export type FranchiseApplication = {
  id: string;
  createdAt: string;
  status: "Borrador demo enviado";
  franchiseName: string;
  sector: string;
  city: string;
  country: string;
  totalCost: number;
  currency: "USD" | "ARS";
  description: string;
  operatorName: string;
  estimatedOpening: string;
  performanceSource: string;
  performance: { year: number; revenue: number; marginPercent: number }[];
};

export type FranchiseFormValues = Omit<
  FranchiseApplication,
  "id" | "createdAt" | "status" | "performance" | "totalCost"
> & {
  totalCost: number | undefined;
  year1: number;
  revenue1: number | undefined;
  margin1: number | undefined;
  year2: number;
  revenue2: number | undefined;
  margin2: number | undefined;
  year3: number;
  revenue3: number | undefined;
  margin3: number | undefined;
};
