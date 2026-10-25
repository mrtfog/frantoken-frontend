import type { ReactNode } from "react";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AccountShell } from "@/features/account/components/AccountShell";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBanner demo />
      <SiteHeader />
      <main className="min-h-[65vh] bg-[#f3f2e9]">
        <AccountShell>{children}</AccountShell>
      </main>
      <SiteFooter />
    </>
  );
}
