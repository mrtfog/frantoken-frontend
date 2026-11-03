import type { ReactNode } from "react";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AdminAccessContainer } from "@/features/franchises/components/AdminAccess.container";

export default function AdministrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div id="inicio" className="min-h-screen bg-[#f3f2e9] text-[#11382e]">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-5 py-12">
        <AdminAccessContainer>{children}</AdminAccessContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
