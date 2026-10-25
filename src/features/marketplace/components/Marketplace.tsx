import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ButtonLink } from "@/components/ui";
import { demoProjects } from "../constants/marketplace.constants";
import { BrandMark } from "./BrandMark";
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
                Franquicias / Marketplace demo
              </p>
              <h1
                id="marketplace-title"
                className="mb-6 max-w-[870px] text-[clamp(52px,10.8vw,118px)] leading-[0.98] tracking-[-0.075em] text-[#f3f2e9]"
              >
                Una marca.
                <br />
                <em className="font-serif font-normal text-[#d5f36a]">
                  Muchas
                </em>{" "}
                formas
                <br />
                de imaginarlo.
              </h1>
              <p className="mb-8 max-w-[530px] text-[15px] leading-[1.65] text-[#c2d9c9] sm:text-[17px]">
                Explorá fichas de marcas que ofrecen franquicias. Los proyectos,
                sus indicadores y la experiencia de compra son simulados.
              </p>
              <ButtonLink href="#explorar">
                Explorar franquicias{" "}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <p className="mt-6 mb-0 text-[11px] leading-[1.5] text-[#a7beaf]">
                Sin acuerdos de marca ni ofertas de tokens confirmados.
              </p>
            </div>
            <MarketplaceHeroArt />
          </div>
          <div className="relative mx-auto mt-14 flex max-w-[1380px] flex-wrap justify-between gap-3 border-t border-[#e5efdf]/20 pt-5 text-[10px] font-bold tracking-[0.12em] text-[#9bb9a8] uppercase sm:mt-20">
            <span>01 — Marcas de referencia</span>
            <span>Deslizá para explorar ↓</span>
            <span className="hidden sm:inline">FranToken / 2026</span>
          </div>
        </section>

        <MarketplaceCatalogContainer />

        <section
          className="bg-[#092f2a] px-5 py-16 text-[#f3f2e9] sm:px-8 lg:px-12"
          aria-labelledby="brands-title"
        >
          <div className="mx-auto max-w-[1380px]">
            <p className="mb-3 text-[11px] font-black tracking-[0.17em] text-[#d5f36a] uppercase">
              / Marcas de referencia
            </p>
            <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
              <h2
                id="brands-title"
                className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.05em]"
              >
                Franquicias que inspiran el catálogo.
              </h2>
              <p className="max-w-[520px] text-[13px] leading-relaxed text-[#c2d9c9]">
                Las marcas existen y publican información sobre franquicias. Su
                presencia aquí no implica que confíen en FranToken, que sean
                socias o que autoricen una emisión.
              </p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
              {demoProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 p-5 text-center transition-colors hover:bg-white/10"
                >
                  <BrandMark project={project} />
                  <span className="text-[14px] font-bold">{project.name}</span>
                  <span className="text-[10px] text-[#b6cdbd]">
                    Sitio oficial ↗
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-[#a9c3af]">
              Identidades visuales usadas solo para identificar marcas de
              referencia. No hay compañías colaboradoras confirmadas para
              mostrar.
            </p>
          </div>
        </section>

        <section
          className="bg-[#d5f36a] px-5 py-10 sm:px-8 lg:px-12"
          aria-label="Aviso sobre los datos"
        >
          <div className="mx-auto flex max-w-[1380px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="mb-0 max-w-[800px] font-serif text-[21px] leading-[1.3] tracking-[-0.04em] text-[#11382e] sm:text-[25px]">
              Cada ficha es un ejemplo de interfaz. Los derechos, costos,
              riesgos y documentos deben definirse para cada proyecto real.
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
