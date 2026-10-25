import type { Metadata } from "next";
import { AuthDemo } from "@/features/auth/components/AuthDemo";

export const metadata: Metadata = {
  title: "Iniciar sesión · Demo | FranToken",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthDemo mode="login" />;
}
