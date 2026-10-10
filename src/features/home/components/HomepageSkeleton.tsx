import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Skeleton } from "@/components/ui";

export function HomepageSkeleton() {
  return (
    <div id="inicio" aria-busy="true" className="min-w-[320px]">
      <AnnouncementBanner />
      <SiteHeader />
      <main>
        <section className="min-h-[620px] bg-[#09262a] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Skeleton className="h-4 w-48 bg-[#f3f2e9]/20" />
              <Skeleton className="h-24 w-full bg-[#f3f2e9]/20" />
              <Skeleton className="h-24 w-4/5 bg-[#f3f2e9]/20" />
              <Skeleton className="h-20 w-2/3 bg-[#f3f2e9]/20" />
              <Skeleton className="h-12 w-52 bg-[#d5f36a]/40" />
            </div>
            <Skeleton className="h-[340px] w-full bg-[#f3f2e9]/15 lg:h-[500px]" />
          </div>
        </section>
        <section className="bg-[#f3f2e9] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px] space-y-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-20 w-full max-w-[950px]" />
            <Skeleton className="h-16 w-full max-w-[700px]" />
            <div className="grid gap-4 pt-10 sm:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <Skeleton key={item} className="h-40 w-full" />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#dfe9dc] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[1400px] gap-7 sm:grid-cols-2">
            <div className="space-y-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-20 w-4/5" />
              <Skeleton className="h-72 w-full" />
            </div>
            <Skeleton className="h-[350px] w-full" />
          </div>
        </section>
        <output className="sr-only">Cargando página de inicio</output>
      </main>
      <SiteFooter />
    </div>
  );
}
