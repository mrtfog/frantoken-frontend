import type { Metadata } from "next";
import { AuthFormContainer } from "@/features/auth/components/AuthForm.container";

export const metadata: Metadata = {
  title: "Iniciar sesión | FranToken",
  description:
    "Ingresá a tu cuenta de FranToken para gestionar tu perfil, tus tokens y tus solicitudes.",
  robots: { index: false, follow: false },
};
export default function SignInPage() {
  return <AuthFormContainer mode="login" />;
}
