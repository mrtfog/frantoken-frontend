import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ButtonLink } from "@/components/ui";
import { MarketplaceCatalogContainer } from "./MarketplaceCatalog.container";
import { MarketplaceHeroArt } from "./MarketplaceHeroArt";

export function Marketplace() {
  return (
    <div
      id="inicio"
      className="min-w-[320px] overflow-clip bg-[#f3f2e9] text-[#11382e]"
    >
      <AnnouncementBanner demo />
      <SiteHeader />

      <main>
        <section
          className="relative overflow-hidden bg-[#092f2a] px-5 pt-16 pb-16 text-[#f3f2e9] sm:px-8 sm:pt-20 lg:px-12 lg:pt-24 lg:pb-24"
          aria-labelledby="marketplace-title"
        >
          <div
            className="pointer-events-none absolute top-0 right-0 h-full w-[65%] bg-[radial-gradient(circle_at_75%_50%,#215446_0%,transparent_63%)] opacity-70"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-[1380px] items-center gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:gap-4">
            <div className="relative z-10">
              <p className="mb-6 flex items-center gap-3 text-[10px] font-black tracking-[0.19em] text-[#d5f36a] uppercase sm:text-[11px]">
                <span className="h-px w-7 bg-[#d5f36a]" />
                Franquicias / Ideas en movimiento
              </p>
              <h1
                id="marketplace-title"
                className="mb-6 max-w-[870px] text-[clamp(52px,10.8vw,118px)] leading-[0.98] tracking-[-0.075em] text-[#f3f2e9]"
              >
                Un proyecto.
                <br />
                <em className="font-serif font-normal text-[#d5f36a]">
                  Muchas
                </em>{" "}
                formas
                <br />
                de imaginarlo.
              </h1>
              <p className="mb-8 max-w-[530px] text-[15px] leading-[1.65] text-[#c2d9c9] sm:text-[17px]">
                Explorá cómo podrían presentarse proyectos de franquicia y sus
                tokens en FranToken. Cada tarjeta es una simulación para probar
                la experiencia.
              </p>
              <ButtonLink href="#explorar">
                Explorar tarjetas{" "}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <p className="mt-6 mb-0 text-[11px] leading-[1.5] text-[#a7beaf]">
                Sin ofertas activas, reservas ni compra de tokens.
              </p>
            </div>
            <MarketplaceHeroArt />
          </div>
          <div className="relative mx-auto mt-14 flex max-w-[1380px] flex-wrap justify-between gap-3 border-t border-[#e5efdf]/20 pt-5 text-[10px] font-bold tracking-[0.12em] text-[#9bb9a8] uppercase sm:mt-20">
            <span>01 — Catálogo ilustrativo</span>
            <span>Deslizá para explorar ↓</span>
            <span className="hidden sm:inline">FranToken / 2026</span>
          </div>
        </section>

        <MarketplaceCatalogContainer />

        <section
          className="bg-[#d5f36a] px-5 py-10 sm:px-8 lg:px-12"
          aria-label="Aviso sobre los datos"
        >
          <div className="mx-auto flex max-w-[1380px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="mb-0 max-w-[800px] font-serif text-[21px] leading-[1.3] tracking-[-0.04em] text-[#11382e] sm:text-[25px]">
              Una tarjeta ayuda a explorar una idea. Los derechos, costos,
              riesgos y documentos deberán definirse para cada proyecto real.
            </p>
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-3 self-start border-b border-[#11382e] pb-1 text-[12px] font-black text-[#11382e]"
            >
              Conocer el modelo{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
