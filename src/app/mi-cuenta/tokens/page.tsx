import type { Metadata } from "next";
import { TokensContainer } from "@/features/account/components/Tokens.container";

export const metadata: Metadata = {
  title: "Mis tokens · Demo | FranToken",
  robots: { index: false, follow: false },
};
export default function TokensPage() {
  return <TokensContainer />;
}
