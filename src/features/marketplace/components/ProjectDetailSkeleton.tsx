import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailSkeleton() {
  return (
    <div className="bg-[#f3f2e9]">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main aria-busy="true" aria-label="Cargando ficha de franquicia">
        <output className="sr-only">Cargando ficha de franquicia</output>
        <div className="bg-[#092f2a] px-5 py-16">
          <div className="mx-auto max-w-[1380px]">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-12 h-20 w-20" />
            <Skeleton className="mt-8 h-20 w-2/3" />
            <Skeleton className="mt-8 h-6 w-1/2" />
          </div>
        </div>
        <div className="mx-auto grid max-w-[1380px] gap-4 px-5 py-12 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-40" />
          ))}
        </div>
        <div className="mx-auto max-w-[1380px] px-5 pb-16">
          <Skeleton className="h-80" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
