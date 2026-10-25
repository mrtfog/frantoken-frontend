import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Skeleton } from "@/components/ui";
import { MarketplaceCatalogSkeleton } from "./MarketplaceCatalogSkeleton";

export function MarketplaceSkeleton() {
  return (
    <div id="inicio" aria-busy="true">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main>
        <section className="bg-[#092f2a] px-5 py-20">
          <div className="mx-auto grid max-w-[1380px] items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <Skeleton className="h-4 w-56 bg-[#f3f2e9]/20" />
              <Skeleton className="h-28 w-full bg-[#f3f2e9]/20" />
              <Skeleton className="h-20 w-3/4 bg-[#f3f2e9]/20" />
              <Skeleton className="h-12 w-52 bg-[#d5f36a]/40" />
            </div>
            <Skeleton className="h-[350px] w-full bg-[#f3f2e9]/15" />
          </div>
        </section>
        <MarketplaceCatalogSkeleton />
        <div className="bg-[#092f2a] px-5 py-16">
          <div className="mx-auto grid max-w-[1380px] gap-3 md:grid-cols-4">
            {["one", "two", "three", "four"].map((slot) => (
              <Skeleton key={slot} className="h-32 bg-[#f3f2e9]/15" />
            ))}
          </div>
        </div>
        <output className="sr-only">
          Cargando marketplace de demostración
        </output>
      </main>
      <SiteFooter />
    </div>
  );
}
