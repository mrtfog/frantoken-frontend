import type { Metadata } from "next";
import { Marketplace } from "@/features/marketplace/components/Marketplace";

export const metadata: Metadata = {
  title: "Marketplace demo | FranToken",
  description:
    "Explorá un catálogo de demostración con proyectos ficticios de franquicias y tokens ilustrativos. No hay ofertas activas.",
  robots: { index: false, follow: false },
};

export default function MarketplacePage() {
  return <Marketplace />;
}
