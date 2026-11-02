import type { Metadata } from "next";
import { SignIn } from "@/features/account/components/SignIn";

export const metadata: Metadata = {
  title: "Registrarse · Demo | FranToken",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <SignIn mode="register" />;
}
