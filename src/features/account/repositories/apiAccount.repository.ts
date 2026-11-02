import { apiFetch } from "@/core/config/api.config";
import type {
  FranchiseApplication,
  TokenHolding,
  UserProfile,
} from "../types/account.type";
import type { AccountRepository } from "./account.repository";

type ProfileResponse = { profile: UserProfile | null };
type HoldingsResponse = { holdings: TokenHolding[] };
type ApplicationsResponse = { applications: FranchiseApplication[] };
type ApplicationResponse = { application: FranchiseApplication };
type DraftResponse = { draft: unknown };

// El backend espera los campos planos del formulario (year1, revenue1, …); el
// service del front ya ensambla la FranchiseApplication antes de guardar, así
// que acá la des-ensamblamos para respetar el contrato de la API.
function toApplicationInput(application: FranchiseApplication) {
  const [p1, p2, p3] = application.performance;
  return {
    franchiseName: application.franchiseName,
    sector: application.sector,
    city: application.city,
    country: application.country,
    totalCost: application.totalCost,
    currency: application.currency,
    description: application.description,
    operatorName: application.operatorName,
    estimatedOpening: application.estimatedOpening,
    performanceSource: application.performanceSource,
    ...(p1 && p2 && p3
      ? {
          year1: p1.year,
          revenue1: p1.revenue,
          margin1: p1.marginPercent,
          year2: p2.year,
          revenue2: p2.revenue,
          margin2: p2.marginPercent,
          year3: p3.year,
          revenue3: p3.revenue,
          margin3: p3.marginPercent,
        }
      : {}),
  };
}

/** Implementación de AccountRepository contra la API real (/api/account). */
export const apiAccountRepository: AccountRepository = {
  async getProfile(_userId) {
    const { profile } = await apiFetch<ProfileResponse>("/api/account/profile");
    return profile;
  },

  async saveProfile(_userId, profile) {
    await apiFetch("/api/account/profile", { method: "PUT", body: profile });
  },

  async getHoldings(_userId) {
    const { holdings } = await apiFetch<HoldingsResponse>(
      "/api/account/holdings",
    );
    return holdings;
  },

  async getApplications(_userId) {
    const { applications } = await apiFetch<ApplicationsResponse>(
      "/api/account/applications",
    );
    return applications;
  },

  async saveApplication(_userId, application) {
    const { application: saved } = await apiFetch<ApplicationResponse>(
      "/api/account/applications",
      {
        method: "POST",
        body: toApplicationInput(application),
      },
    );
    return saved;
  },

  async getDraft(_userId) {
    const { draft } = await apiFetch<DraftResponse>("/api/account/draft");
    return draft;
  },

  async saveDraft(_userId, draft) {
    await apiFetch("/api/account/draft", {
      method: "PUT",
      body: { payload: draft },
    });
  },

  async clearDraft(_userId) {
    await apiFetch("/api/account/draft", { method: "DELETE" });
  },
};
