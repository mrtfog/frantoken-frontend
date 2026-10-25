import type { Metadata } from "next";
import { AuthDemo } from "@/features/auth/components/AuthDemo";

export const metadata: Metadata = {
  title: "Registrarse · Demo | FranToken",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <AuthDemo mode="register" />;
}
