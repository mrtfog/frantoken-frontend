import { z } from "zod";
import { apiEnabled, apiFetch } from "@/core/config/api.config";
import type {
  ApplicationEditValues,
  DistributionInput,
} from "../types/franchise.type";
import {
  applicationDetailSchema,
  distributionRequestSchema,
  franchiseDetailSchema,
  franchiseDirectorySchema,
} from "../types/franchise.type";

function requireApi() {
  if (!apiEnabled)
    throw new Error(
      "La gestión de franquicias no está disponible en esta vista previa.",
    );
}
const projectPath = (id: string) => `/api/franchises/${encodeURIComponent(id)}`;
const applicationPath = (id: string) =>
  `/api/account/applications/${encodeURIComponent(id)}`;
const requestsSchema = z.object({
  requests: z.array(distributionRequestSchema),
});
export const franchiseRepository = {
  async application(id: string) {
    requireApi();
    return applicationDetailSchema.parse(await apiFetch(applicationPath(id)));
  },
  async saveApplication(
    id: string,
    version: number,
    values: ApplicationEditValues,
  ) {
    requireApi();
    return applicationDetailSchema.parse(
      await apiFetch(applicationPath(id), {
        method: "PATCH",
        body: { ...values, version },
      }),
    );
  },
  async directory() {
    requireApi();
    return franchiseDirectorySchema.parse(await apiFetch("/api/franchises"))
      .franchises;
  },
  async detail(id: string) {
    requireApi();
    return franchiseDetailSchema.parse(await apiFetch(projectPath(id)));
  },
  operation(id: string, status: "en_operacion" | "cerrada") {
    requireApi();
    return apiFetch(`${projectPath(id)}/operation`, {
      method: "PATCH",
      body: { status },
    });
  },
  propose(id: string, input: DistributionInput) {
    requireApi();
    return apiFetch(`${projectPath(id)}/distribution-requests`, {
      method: "POST",
      body: input,
    });
  },
  editRequest(
    projectId: string,
    id: string,
    version: number,
    input: { amount: string; memo: string },
  ) {
    requireApi();
    return apiFetch(
      `${projectPath(projectId)}/distribution-requests/${encodeURIComponent(id)}`,
      { method: "PATCH", body: { ...input, version } },
    );
  },
  async requests() {
    requireApi();
    return requestsSchema.parse(
      await apiFetch("/api/admin/distribution-requests"),
    ).requests;
  },
  observeRequest(id: string, version: number, note: string) {
    requireApi();
    return apiFetch(
      `/api/admin/distribution-requests/${encodeURIComponent(id)}/review`,
      { method: "PATCH", body: { version, note } },
    );
  },
  executeRequest(id: string, version: number) {
    requireApi();
    return apiFetch(
      `/api/admin/distribution-requests/${encodeURIComponent(id)}/execute`,
      { method: "POST", body: { version } },
    );
  },
};
