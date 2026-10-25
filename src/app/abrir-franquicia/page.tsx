import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AccountShell } from "@/features/account/components/AccountShell";
import { FranchiseFormContainer } from "@/features/account/components/FranchiseForm.container";

export const metadata: Metadata = {
  title: "Abrir franquicia · Demo | FranToken",
  robots: { index: false, follow: false },
};
export default function OpenFranchisePage() {
  return (
    <>
      <AnnouncementBanner demo />
      <SiteHeader />
      <main className="min-h-[65vh]">
        <AccountShell>
          <FranchiseFormContainer />
        </AccountShell>
      </main>
      <SiteFooter />
    </>
  );
}
