import type {
  FranchiseApplication,
  UserProfile,
} from "@/features/account/types/account.type";
export type ReviewUser = {
  userId: string;
  email: string;
  displayName: string;
  walletAddress: string | null;
  kycApproved: boolean;
  profile: UserProfile | null;
};
export type ReviewApplication = FranchiseApplication & {
  publication: { symbol: string | null; totalUnits: string | null } | null;
  applicant: string;
  profile: UserProfile | null;
};
export type AdminReviewProps = {
  section: "users" | "applications";
  users: ReviewUser[];
  applications: ReviewApplication[];
  error: string;
  notice: string;
  busy: boolean;
  loading: boolean;
  onRefresh(): void;
  onKyc(userId: string, approved: boolean): void;
  onReview(
    id: string,
    status: "Aprobada" | "Observada",
    note: string,
    version: number,
  ): void;
  onPublish(id: string, symbol: string, units: string): void;
};
