import {
  ArrowLeft,
  ArrowUpRight,
  Info,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AcademicInvestmentContainer } from "@/features/investment/components/AcademicInvestment.container";
import { franchiseRiskFactors } from "../constants/projectDetail.constants";
import type { DemoProject } from "../types/marketplace.type";
import { AnnualizedRoiChart } from "./AnnualizedRoiChart";
import { BrandMark } from "./BrandMark";

export function ProjectDetail({ project }: { project: DemoProject }) {
  return (
    <div id="inicio" className="min-w-[320px] bg-[#f3f2e9] text-[#11382e]">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main>
        <section className="bg-[#092f2a] px-5 pt-9 pb-16 text-[#f3f2e9] sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1380px]">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-[12px] font-bold text-[#c2d9c9] hover:text-[#d5f36a]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al
              marketplace
            </Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_0.75fr] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <BrandMark project={project} size="large" />
                  <span className="rounded-full border border-[#d5f36a]/50 px-4 py-2 text-[10px] font-black tracking-widest text-[#d5f36a] uppercase">
                    Ficha de demostración
                  </span>
                </div>
                <p className="mt-9 text-[11px] font-black tracking-[0.2em] text-[#d5f36a] uppercase">
                  Franquicia / {project.sector}
                </p>
                <h1 className="mt-3 font-serif text-[clamp(55px,8vw,105px)] leading-[0.96] tracking-[-0.065em]">
                  {project.name}
                </h1>
                <p className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-[#c2d9c9]">
                  {project.descriptor} La empresa y su programa de franquicias
                  son referencias editoriales. Esta ficha permite operar tokens
                  de prueba del MVP local, sin oferta comercial ni vínculo con
                  la marca.
                </p>
              </div>
              <AcademicInvestmentContainer projectId={project.id} />
            </div>
          </div>
        </section>

        <section
          className="px-5 py-12 sm:px-8 lg:px-12"
          aria-label="Resumen del proyecto"
        >
          <div className="mx-auto grid max-w-[1380px] gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-[#173d34]/15 bg-white p-5">
              <MapPin className="h-5 w-5 text-[#5e8069]" aria-hidden="true" />
              <p className="mt-5 text-[10px] font-black tracking-wider text-[#62816f] uppercase">
                Ubicación
              </p>
              <p className="mt-2 font-serif text-[24px]">Por definir</p>
              <p className="mt-2 text-[11px] text-[#597469]">
                Ciudad, barrio y área de exclusividad sujetos a análisis.
              </p>
            </div>
            <div className="rounded-xl border border-[#173d34]/15 bg-white p-5">
              <TrendingUp
                className="h-5 w-5 text-[#5e8069]"
                aria-hidden="true"
              />
              <p className="mt-5 text-[10px] font-black tracking-wider text-[#62816f] uppercase">
                ROI neto anualizado real
              </p>
              <p className="mt-2 font-serif text-[24px]">Sin datos</p>
              <p className="mt-2 text-[11px] text-[#597469]">
                {project.annualizedRoiScenario.length
                  ? "El gráfico de abajo muestra solo una serie didáctica."
                  : "Este proyecto no tiene historial ni proyección de retorno."}
              </p>
            </div>
            <div className="rounded-xl border border-[#173d34]/15 bg-white p-5">
              <Info className="h-5 w-5 text-[#5e8069]" aria-hidden="true" />
              <p className="mt-5 text-[10px] font-black tracking-wider text-[#62816f] uppercase">
                Token académico
              </p>
              <p className="mt-2 font-serif text-[24px]">USD 10 por token</p>
              <p className="mt-2 text-[11px] text-[#597469]">
                Una franquicia no implica propiedad de la marca.
              </p>
            </div>
          </div>
        </section>

        {project.annualizedRoiScenario.length > 0 && (
          <section
            className="px-5 pb-16 sm:px-8 lg:px-12"
            aria-label="Rendimiento ilustrativo"
          >
            <div className="mx-auto max-w-[1380px]">
              <AnnualizedRoiChart project={project} />
            </div>
          </section>
        )}

        <section
          className="bg-[#e7ebe0] px-5 py-16 sm:px-8 lg:px-12"
          aria-labelledby="company-title"
        >
          <div className="mx-auto grid max-w-[1380px] gap-7 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-[11px] font-black tracking-[0.16em] text-[#557565] uppercase">
                / La marca
              </p>
              <h2
                id="company-title"
                className="mt-3 font-serif text-[44px] leading-tight tracking-tight"
              >
                Empresa y franquicia.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl bg-white p-6">
                <h3 className="text-[17px] font-bold">La empresa</h3>
                <p className="mt-4 text-[13px] leading-relaxed text-[#4c6a5d]">
                  {project.company}
                </p>
              </article>
              <article className="rounded-xl bg-white p-6">
                <h3 className="text-[17px] font-bold">
                  El formato de franquicia
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-[#4c6a5d]">
                  {project.franchise}
                </p>
              </article>
              {project.officialUrl && (
                <a
                  className="md:col-span-2 inline-flex items-center gap-2 text-[12px] font-bold underline underline-offset-4"
                  href={project.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar fuente oficial de {project.name}{" "}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </section>

        <section
          className="px-5 py-16 sm:px-8 lg:px-12"
          aria-labelledby="due-diligence-title"
        >
          <div className="mx-auto max-w-[1380px]">
            <p className="text-[11px] font-black tracking-[0.16em] text-[#557565] uppercase">
              / Antes de invertir
            </p>
            <h2
              id="due-diligence-title"
              className="mt-3 max-w-[850px] font-serif text-[clamp(36px,5vw,62px)] leading-tight tracking-tight"
            >
              Lo que cambia de una unidad a otra.
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {franchiseRiskFactors.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-[#173d34]/15 bg-[#faf9f3] p-6"
                >
                  <ShieldAlert
                    className="h-5 w-5 text-[#5b7557]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-[16px] font-bold">{item.title}</h3>
                  <p className="mt-3 text-[12px] leading-relaxed text-[#597469]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-7 max-w-[850px] text-[12px] leading-relaxed text-[#597469]">
              Para una ficha real se necesitarían acuerdos con el franquiciante,
              análisis de la zona, presupuesto, identidad de la operadora y del
              vehículo, derechos documentados, riesgos, métricas verificables y
              autorización correspondiente.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
