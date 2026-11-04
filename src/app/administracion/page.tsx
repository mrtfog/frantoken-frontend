import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { AdminReviewContainer } from "@/features/franchises/components/AdminReview.container";

export const metadata: Metadata = {
  title: "Administración interna | FranToken",
  robots: { index: false, follow: false },
};
export default function AdministrationPage() {
  return (
    <>
      <h1 className="text-4xl font-bold">Administración interna</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-[#527164]">
        Gestioná perfiles, admisión de franquicias y propuestas de reparto desde
        tu cuenta de superadmin.
      </p>
      <ButtonLink
        className="mt-6"
        variant="dark"
        href="/administracion/franquicias"
      >
        Admisión y gestión de franquicias
      </ButtonLink>
      <AdminReviewContainer section="users" />
    </>
  );
}
