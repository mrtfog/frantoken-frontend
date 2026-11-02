"use client";

import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { sectors } from "../constants/marketplace.constants";
import { cardTones } from "../constants/projectDetail.constants";
import type {
  DemoProject,
  MarketplaceCatalogProps,
  SortOrder,
} from "../types/marketplace.type";
import { BrandMark } from "./BrandMark";

function ProjectCard({
  project,
  index,
}: {
  project: DemoProject;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.42, delay: reduceMotion ? 0 : index * 0.06 }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#173d34]/10 bg-[#faf9f3] shadow-[0_8px_25px_#163d3010] transition-shadow hover:shadow-[0_24px_50px_#163d3020]"
    >
      <div
        className={`relative flex min-h-52 flex-col justify-between overflow-hidden p-6 ${cardTones[project.palette]}`}
      >
        <div
          className="absolute -right-14 -bottom-24 h-64 w-64 rounded-full border-[35px] border-[#11382e]/10 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between gap-3">
          <BrandMark project={project} />
          <span className="rounded-full border border-[#11382e]/30 px-3 py-1 text-[9px] font-black tracking-widest text-[#11382e] uppercase">
            Demo
          </span>
        </div>
        <div className="relative">
          <p className="mb-2 text-[10px] font-black tracking-[0.15em] text-[#31594b] uppercase">
            Franquicia de referencia / {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-[40px] leading-none tracking-[-0.055em] text-[#11382e] sm:text-[46px]">
            {project.name}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 text-[10px] font-extrabold tracking-wider text-[#41665a] uppercase">
          <span>{project.sector}</span>
          <span aria-hidden="true">✳</span>
          <span>{project.format}</span>
        </div>
        <p className="mt-4 mb-6 font-serif text-[22px] leading-tight tracking-tight text-[#11382e]">
          {project.descriptor}
        </p>
        <dl className="mt-auto grid grid-cols-2 border-t border-[#173d34]/15 pt-4 text-[12px]">
          <div className="border-r border-[#173d34]/15 pr-3">
            <dt className="text-[10px] font-bold text-[#668276] uppercase">
              Zona
            </dt>
            <dd className="mt-1 font-bold">Por definir</dd>
          </div>
          <div className="pl-4">
            <dt className="text-[10px] font-bold text-[#668276] uppercase">
              Precio académico
            </dt>
            <dd className="mt-1 font-bold">
              USD {project.price?.display ?? "10"} · {project.status ?? "demo"}
            </dd>
          </div>
        </dl>
        <Link
          href={`/marketplace/${project.id}`}
          className="mt-6 inline-flex min-h-11 items-center justify-between border-t border-[#173d34]/15 pt-3 text-[12px] font-black text-[#11382e] hover:text-[#457333] focus-visible:rounded-sm"
        >
          Ver franquicia y disponibilidad{" "}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export function MarketplaceCatalog({
  visibleProjects,
  query,
  sector,
  sort,
  onQueryChange,
  onSectorChange,
  onSortChange,
  onClearFilters,
}: MarketplaceCatalogProps) {
  return (
    <section
      id="explorar"
      className="bg-[#f3f2e9] px-5 pt-16 pb-24 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24"
      aria-labelledby="catalog-title"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-5 border-b border-[#173d34]/20 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-black tracking-[0.17em] text-[#567569] uppercase">
              / Explorar marcas
            </p>
            <h2
              id="catalog-title"
              className="text-[39px] leading-[1.04] tracking-[-0.065em] text-[#11382e] sm:text-[56px]"
            >
              Marcas reales.{" "}
              <em className="font-serif font-normal">Proyectos simulados.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13px] leading-[1.55] text-[#527064]">
            Estas empresas tienen programas de franquicia públicos. Las fichas
            no representan acuerdos con FranToken, unidades disponibles ni
            emisiones.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[575px]">
            <label
              htmlFor="marketplace-search"
              className="flex min-h-[52px] flex-1 items-center gap-3 rounded-[7px] border border-[#173d34]/25 bg-[#faf9f3] px-4 text-[#497064] focus-within:ring-2 focus-within:ring-[#8cac78]"
            >
              <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">
                Buscar franquicias por marca, sector o formato
              </span>
              <Input
                id="marketplace-search"
                variant="bare"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Buscar marca o formato"
                className="min-w-0 flex-1"
              />
            </label>
            <label
              htmlFor="marketplace-sort"
              className="relative flex min-h-[52px] items-center rounded-[7px] border border-[#173d34]/25 bg-[#faf9f3] px-4 text-[13px] font-semibold text-[#21483b] sm:min-w-[170px]"
            >
              <span className="sr-only">Ordenar proyectos</span>
              <Select
                id="marketplace-sort"
                variant="bare"
                value={sort}
                onChange={(event) =>
                  onSortChange(event.target.value as SortOrder)
                }
                className="pr-5"
              >
                <option value="featured">Destacados</option>
                <option value="name">Nombre A–Z</option>
              </Select>
              <ChevronDown
                className="pointer-events-none absolute right-4 h-4 w-4"
                aria-hidden="true"
              />
            </label>
          </div>
          <p
            className="text-[12px] font-bold text-[#47695b]"
            aria-live="polite"
          >
            {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "ficha" : "fichas"} de muestra
          </p>
        </div>
        <fieldset className="-mx-5 mt-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
          <legend className="sr-only">Filtrar por sector</legend>
          <div className="flex w-max min-w-full gap-2">
            {sectors.map((item) => (
              <Button
                key={item}
                type="button"
                aria-pressed={sector === item}
                onClick={() => onSectorChange(item)}
                variant={sector === item ? "chipActive" : "chip"}
              >
                {item}
              </Button>
            ))}
          </div>
        </fieldset>
        {visibleProjects.length ? (
          <motion.div
            layout
            className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            <AnimatePresence initial={false}>
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-7 rounded-2xl border border-[#173d34]/15 bg-[#faf9f3] px-6 py-16 text-center">
            <p className="font-serif text-[29px]">No encontramos esa marca.</p>
            <p className="mt-2 text-[13px] text-[#557366]">
              Probá otro nombre o sector.
            </p>
            <Button
              type="button"
              onClick={onClearFilters}
              variant="pill"
              className="mt-5"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
