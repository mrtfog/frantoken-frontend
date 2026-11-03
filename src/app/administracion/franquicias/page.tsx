import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { AdminReviewContainer } from "@/features/franchises/components/AdminReview.container";
import { DistributionRequestsContainer } from "@/features/franchises/components/DistributionRequests.container";
import { FranchiseDirectoryContainer } from "@/features/franchises/components/FranchiseDirectory.container";

export const metadata: Metadata = {
  title: "Admisión de franquicias | FranToken",
  robots: { index: false, follow: false },
};
export default function FranchiseAdministrationPage() {
  return (
    <>
      <ButtonLink href="/administracion" variant="chip">
        Administración interna
      </ButtonLink>
      <h1 className="mt-6 text-4xl font-bold">
        Admisión y gestión de franquicias
      </h1>
      <p className="mt-4 text-sm leading-6 text-[#527164]">
        Revisá cada solicitud antes de publicar su emisión inicial. La
        publicación y la ejecución de repartos son exclusivas del superadmin.
      </p>
      <AdminReviewContainer section="applications" />
      <section className="mt-10">
        <FranchiseDirectoryContainer />
      </section>
      <DistributionRequestsContainer />
    </>
  );
}
