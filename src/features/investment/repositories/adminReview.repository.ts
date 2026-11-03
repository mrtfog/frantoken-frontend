import { apiFetch } from "@/core/config/api.config";
import type { ReviewApplication, ReviewUser } from "../types/admin.type";
export async function readAdminReviews() {
  const [users, applications] = await Promise.all([
    apiFetch<{ users: ReviewUser[] }>("/api/admin/users"),
    apiFetch<{ applications: ReviewApplication[] }>("/api/admin/applications"),
  ]);
  return { users: users.users, applications: applications.applications };
}
export function approveReviewUser(userId: string, approved: boolean) {
  return apiFetch(`/api/admin/users/${encodeURIComponent(userId)}/kyc`, {
    method: "POST",
    body: { approved },
  });
}
export function reviewFranchise(
  id: string,
  status: "Aprobada" | "Observada",
  note: string,
) {
  return apiFetch(`/api/admin/applications/${encodeURIComponent(id)}/review`, {
    method: "PATCH",
    body: { status, note },
  });
}
export function publishFranchise(
  id: string,
  symbol: string,
  totalUnits: string,
) {
  return apiFetch(`/api/admin/applications/${encodeURIComponent(id)}/publish`, {
    method: "POST",
    body: { symbol, totalUnits },
  });
}
