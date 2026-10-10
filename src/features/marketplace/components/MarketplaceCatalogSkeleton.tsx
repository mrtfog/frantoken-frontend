import { Skeleton } from "@/components/ui";

const cardSlots = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
] as const;

export function MarketplaceCatalogSkeleton() {
  return (
    <section
      id="explorar"
      aria-labelledby="catalog-loading-title"
      aria-busy="true"
      className="bg-[#f3f2e9] px-5 pt-16 pb-24 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24"
    >
      <div className="mx-auto max-w-[1380px]">
        <h2 id="catalog-loading-title" className="sr-only">
          Cargando catálogo de demostración
        </h2>
        <Skeleton className="mb-5 h-5 w-28" />
        <Skeleton className="mb-8 h-14 w-full max-w-[480px]" />
        <div className="mb-8 flex flex-wrap gap-3">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-12 w-44" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cardSlots.map((slot) => (
            <div
              key={slot}
              className="overflow-hidden rounded-2xl border border-[#173d34]/10 bg-[#faf9f3]"
            >
              <Skeleton className="h-[232px] rounded-none" />
              <div className="space-y-4 p-6">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
        <output className="sr-only">Cargando proyectos ficticios</output>
      </div>
    </section>
  );
}
