import type { Metadata } from "next";
import { AuthFormContainer } from "@/features/auth/components/AuthForm.container";

export const metadata: Metadata = {
  title: "Crear cuenta | FranToken",
  description:
    "Creá tu cuenta de FranToken para explorar proyectos de franquicia y gestionar tus solicitudes.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <AuthFormContainer mode="register" />;
}
