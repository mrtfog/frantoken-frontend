import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthSkeleton() {
  return (
    <div className="bg-[#f3f2e9]">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main
        aria-busy="true"
        aria-label="Cargando acceso"
        className="grid min-h-[650px] lg:grid-cols-2"
      >
        <output className="sr-only">Cargando acceso</output>
        <div className="bg-[#092f2a] p-16">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-16 h-20 w-3/4" />
          <Skeleton className="mt-8 h-16 w-2/3" />
        </div>
        <div className="p-16">
          <Skeleton className="h-12 w-12" />
          <Skeleton className="mt-8 h-12 w-2/3" />
          <Skeleton className="mt-12 h-12" />
          <Skeleton className="mt-6 h-12" />
          <Skeleton className="mt-6 h-12" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
