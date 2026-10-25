import type { Metadata } from "next";
import { AccountOverviewContainer } from "@/features/account/components/AccountOverview.container";

export const metadata: Metadata = {
  title: "Mi cuenta · Demo | FranToken",
  robots: { index: false, follow: false },
};
export default function AccountPage() {
  return <AccountOverviewContainer />;
}
