import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthSkeleton() {
  return (
    <div id="inicio" className="min-h-screen bg-[#f3f2e9]">
      <AnnouncementBanner />
      <SiteHeader />
      <main
        aria-busy="true"
        aria-label="Cargando acceso"
        className="grid min-h-[calc(100vh-280px)] lg:grid-cols-2"
      >
        <output className="sr-only">Cargando acceso</output>
        <div className="bg-[#092f2a] px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-12 h-24 w-3/4" />
            <Skeleton className="mt-6 h-16 w-2/3" />
            <Skeleton className="mt-10 h-5 w-36" />
          </div>
        </div>
        <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="mt-7 h-10 w-2/3" />
            <Skeleton className="mt-2 h-10" />
            <Skeleton className="mt-9 h-16" />
            <Skeleton className="mt-5 h-16" />
            <Skeleton className="mt-5 h-14" />
            <Skeleton className="mt-7 h-5 w-3/4" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
