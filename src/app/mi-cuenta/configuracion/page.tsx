import type { Metadata } from "next";
import { ProfileContainer } from "@/features/account/components/Profile.container";

export const metadata: Metadata = {
  title: "Configuración | FranToken",
  robots: { index: false, follow: false },
};
export default function SettingsPage() {
  return <ProfileContainer />;
}
