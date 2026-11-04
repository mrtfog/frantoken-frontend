"use client";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { FranchiseSkeleton } from "./FranchiseSkeleton";

export function AdminAccessContainer({ children }: { children: ReactNode }) {
  const { session, ready } = useSession();
  if (!ready) return <FranchiseSkeleton />;
  if (!session)
    return (
      <section className="space-y-5">
        <h1 className="text-3xl font-bold">Administración interna</h1>
        <p>Ingresá con tu cuenta de superadmin para continuar.</p>
        <ButtonLink href="/ingresar">Iniciar sesión</ButtonLink>
      </section>
    );
  if (session.role !== "superadmin")
    return (
      <section className="space-y-5">
        <h1 className="text-3xl font-bold">Acceso de superadmin requerido</h1>
        <p>
          Podés gestionar tus propias franquicias desde tu cuenta. La admisión y
          los repartos requieren acceso interno.
        </p>
        <ButtonLink href="/mi-cuenta/solicitudes">Mis solicitudes</ButtonLink>
      </section>
    );
  return children;
}
