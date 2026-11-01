import type { Metadata } from "next";
import { AcademicInvestmentContainer } from "@/features/investment/components/AcademicInvestment.container";

export const metadata: Metadata = {
  title: "Mi cuenta · Demo | FranToken",
  robots: { index: false, follow: false },
};
export default function AccountPage() {
  return <AcademicInvestmentContainer mode="portfolio" />;
}
