import type { FranchiseApplication } from "./account.type";

export type AccountOverviewData = {
  quantity: number | null;
  invested: number | null;
  applications: FranchiseApplication[] | null;
  holdingsError: string;
  applicationsError: string;
};

export type AccountOverviewProps = AccountOverviewData & {
  name: string;
  localOnly: boolean;
  onRetry(): void;
};
