import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AcademicInvestmentContainer } from "@/features/investment/components/AcademicInvestment.container";

export const metadata: Metadata = {
  title: "Administración académica | FranToken",
  robots: { index: false, follow: false },
};
export default function AdministrationPage() {
  return (
    <div className="min-h-screen bg-[#f3f2e9] text-[#11382e]">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-5 py-12">
        <h1 className="mb-7 text-4xl font-bold">Administración del MVP</h1>
        <AcademicInvestmentContainer mode="admin" />
      </main>
      <SiteFooter />
    </div>
  );
}
