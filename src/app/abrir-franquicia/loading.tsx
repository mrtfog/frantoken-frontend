import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AccountSkeleton } from "@/features/account/components/AccountSkeleton";

export default function Loading() {
  return (
    <>
      <AnnouncementBanner demo />
      <SiteHeader />
      <AccountSkeleton />
      <SiteFooter />
    </>
  );
}
