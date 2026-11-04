import { Skeleton } from "@/components/ui";

export function FranchiseSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-80 w-full" />
      <output className="sr-only">Cargando gestión de franquicias</output>
    </div>
  );
}
