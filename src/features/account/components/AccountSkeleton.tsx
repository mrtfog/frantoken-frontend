import { Skeleton } from "@/components/ui";

export function AccountSkeleton() {
  return (
    <div
      className="mx-auto grid max-w-[1380px] gap-9 px-5 py-16 lg:grid-cols-[230px_minmax(0,1fr)]"
      aria-busy="true"
    >
      <Skeleton className="h-64 w-full" />
      <div className="space-y-6">
        <Skeleton className="h-14 w-2/3" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
      <output className="sr-only">Cargando panel de demostración</output>
    </div>
  );
}
