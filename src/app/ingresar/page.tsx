import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { SignIn } from "@/features/account/components/SignIn";

export const metadata: Metadata = {
  title: "Ingresar · Demo | FranToken",
  robots: { index: false, follow: false },
};
export default function SignInPage() {
  return (
    <>
      <AnnouncementBanner demo />
      <SiteHeader />
      <SignIn />
      <SiteFooter />
    </>
  );
}
