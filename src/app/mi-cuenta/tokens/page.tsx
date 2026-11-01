import type { Metadata } from "next";
import { AcademicInvestmentContainer } from "@/features/investment/components/AcademicInvestment.container";

export const metadata: Metadata = {
  title: "Mis tokens · Demo | FranToken",
  robots: { index: false, follow: false },
};
export default function TokensPage() {
  return <AcademicInvestmentContainer mode="portfolio" />;
}
