export type DemoSession = {
  userId: string;
  email: string;
  displayName: string;
  role?: "investor" | "admin";
  walletAddress?: string | null;
  kycApproved?: boolean;
};

export type SignInInput = { email: string; password: string };

export type RegisterInput = SignInInput & { displayName: string };
