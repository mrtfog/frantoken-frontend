import type { AccountRepository } from "../repositories/account.repository";
import type { AccountOverviewData } from "../types/accountOverview.type";

export async function getAccountOverview(
  userId: string,
  repository: AccountRepository,
): Promise<AccountOverviewData> {
  const [holdings, applications] = await Promise.allSettled([
    repository.getHoldings(userId),
    repository.getApplications(userId),
  ]);
  return {
    quantity:
      holdings.status === "fulfilled"
        ? holdings.value.reduce((total, item) => total + item.quantity, 0)
        : null,
    invested:
      holdings.status === "fulfilled"
        ? holdings.value.reduce((total, item) => total + item.investedAmount, 0)
        : null,
    applications:
      applications.status === "fulfilled" ? applications.value : null,
    holdingsError:
      holdings.status === "rejected"
        ? "No pudimos consultar tus tokens. Tus saldos se mostrarán cuando la red esté disponible."
        : "",
    applicationsError:
      applications.status === "rejected"
        ? "No pudimos consultar tus solicitudes. Intentá de nuevo."
        : "",
  };
}
