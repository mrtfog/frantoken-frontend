import type { Metadata } from "next";
import { Marketplace } from "@/features/marketplace/components/Marketplace";

export const metadata: Metadata = {
  title: "Marketplace demo | FranToken",
  description:
    "Explorá fichas de demostración de marcas con franquicias públicas. Proyectos y datos financieros simulados; no hay ofertas activas ni alianzas confirmadas.",
  robots: { index: false, follow: false },
};

export default function MarketplacePage() {
  return <Marketplace />;
}
