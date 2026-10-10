"use client";

import { ChevronDown, Search } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { sectors } from "../constants/marketplace.constants";
import { artPalette } from "../constants/marketplacePalette.constants";
import type {
  DemoProject,
  MarketplaceCatalogProps,
  SortOrder,
} from "../types/marketplace.type";
import { formatExampleAmount } from "../utils/marketplace.util";

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: DemoProject;
  index: number;
  reduceMotion: boolean | null;
}) {
  const palette = artPalette[project.palette];

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.97 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : Math.min(index * 0.065, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[15px] border border-[#173d34]/10 bg-[#faf9f3] shadow-[0_8px_25px_#163d3010] transition-shadow duration-300 hover:shadow-[0_24px_50px_#163d3020]"
    >
      <div
        className={`relative isolate h-[232px] overflow-hidden p-5 sm:h-[248px] ${palette.surface} ${palette.ink}`}
      >
        <div className="relative z-10 flex items-start justify-between gap-2 text-[10px] font-black tracking-[0.14em]">
          <span>FRANTOKEN / {String(index + 1).padStart(2, "0")}</span>
          <span className="rounded-full border border-current/35 px-2 py-1 text-[9px] tracking-[0.1em]">
            CONCEPTO
          </span>
        </div>
        <div
          className={`absolute -right-[8%] top-[19%] h-[89%] w-[80%] rotate-[-24deg] rounded-[48%] ${palette.shape} transition-transform duration-700 ease-out group-hover:translate-x-[-12px] group-hover:rotate-[-16deg] motion-reduce:transition-none`}
        />
        <div
          className={`absolute -right-[23%] top-[2%] h-[95%] w-[95%] rotate-[28deg] rounded-[50%] border-[1.5px] ${palette.outline} transition-transform duration-700 ease-out group-hover:rotate-[40deg] motion-reduce:transition-none`}
        />
        <div
          className={`absolute left-[36%] top-[29%] h-[55%] w-[55%] rotate-[-24deg] rounded-[50%] border-[1.5px] ${palette.outline}`}
        />
        <span
          className="absolute right-[6%] bottom-[-21%] z-10 font-serif text-[184px] leading-none italic tracking-[-0.16em] opacity-25 select-none sm:text-[205px]"
          aria-hidden="true"
        >
          {project.mark}
        </span>
        <div className="absolute right-5 bottom-5 left-5 z-20 flex items-end justify-between gap-2">
          <h3 className="mb-0 font-serif text-[46px] leading-[0.9] font-normal tracking-[-0.075em] sm:text-[52px]">
            {project.name}
          </h3>
          <span className="mb-1 shrink-0 text-[10px] font-bold tracking-[0.12em]">
            {project.city.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 sm:px-6 sm:pt-6">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold tracking-[0.09em] text-[#41665a] uppercase">
          <span>{project.sector}</span>
          <span aria-hidden="true">✳</span>
          <span>{project.format}</span>
        </div>
        <p className="mt-3 mb-5 min-h-[56px] font-serif text-[22px] leading-[1.22] tracking-[-0.035em] text-[#11382e]">
          {project.descriptor}
        </p>
        <div className="mt-auto grid grid-cols-2 border-t border-[#173d34]/15 pt-4">
          <div className="border-r border-[#173d34]/15 pr-3">
            <span className="block text-[10px] font-bold tracking-[0.08em] text-[#668276] uppercase">
              Etapa simulada
            </span>
            <span className="mt-1 block text-[12px] font-bold text-[#163c32]">
              {project.stage}
            </span>
          </div>
          <div className="pl-4">
            <span className="block text-[10px] font-bold tracking-[0.08em] text-[#668276] uppercase">
              Token de ejemplo
            </span>
            <span className="mt-1 block text-[15px] font-bold text-[#163c32]">
              USD {formatExampleAmount(project.exampleAmount)}
            </span>
          </div>
        </div>
        <p className="mt-4 mb-0 text-[10px] leading-[1.45] text-[#73877b]">
          Datos inventados · Sin emisión ni disponibilidad real
        </p>
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
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="explorar"
        className="bg-[#f3f2e9] px-5 pt-16 pb-24 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24"
        aria-labelledby="catalog-title"
      >
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col gap-5 border-b border-[#173d34]/20 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-black tracking-[0.17em] text-[#567569] uppercase">
                / Explorar ideas
              </p>
              <h2
                id="catalog-title"
                className="mb-0 text-[39px] leading-[1.04] tracking-[-0.065em] text-[#11382e] sm:text-[56px]"
              >
                Proyectos para{" "}
                <em className="font-serif font-normal">imaginar.</em>
              </h2>
            </div>
            <p className="mb-0 max-w-[350px] text-[13px] leading-[1.55] text-[#527064]">
              Seis escenarios ficticios para explorar cómo podría verse un
              catálogo de franquicias tokenizadas.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[575px]">
              <label
                htmlFor="marketplace-search"
                className="flex min-h-[52px] flex-1 items-center gap-3 rounded-[7px] border border-[#173d34]/25 bg-[#faf9f3] px-4 text-[#497064] transition-colors focus-within:border-[#173d34] focus-within:ring-2 focus-within:ring-[#8cac78]"
              >
                <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">
                  Buscar proyectos por nombre, sector o ciudad
                </span>
                <Input
                  id="marketplace-search"
                  variant="bare"
                  type="search"
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder="Buscar por nombre, sector o ciudad"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-[#11382e] outline-none placeholder:text-[#799186]"
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
                  className="w-full cursor-pointer appearance-none bg-transparent pr-5 outline-none"
                >
                  <option value="featured">Destacados</option>
                  <option value="name">Nombre A–Z</option>
                  <option value="amount">Menor valor ilustrativo</option>
                </Select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 h-4 w-4"
                  aria-hidden="true"
                />
              </label>
            </div>
            <p
              className="mb-0 text-[12px] font-bold text-[#47695b]"
              aria-live="polite"
            >
              {visibleProjects.length}{" "}
              {visibleProjects.length === 1 ? "proyecto" : "proyectos"} de
              muestra
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

          {visibleProjects.length > 0 ? (
            <motion.div
              layout={!reduceMotion}
              className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mt-7 rounded-[15px] border border-[#173d34]/15 bg-[#faf9f3] px-6 py-16 text-center">
              <p className="mb-2 font-serif text-[29px] text-[#11382e]">
                No encontramos ese proyecto.
              </p>
              <p className="mb-5 text-[13px] text-[#557366]">
                Probá otro nombre, ciudad o sector.
              </p>
              <Button type="button" onClick={onClearFilters} variant="pill">
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
