import { Skeleton } from "@/components/ui";

export function AcademicSkeleton() {
  return (
    <div
      aria-busy="true"
      className="space-y-4 rounded-xl border border-[#173d34]/20 bg-[#f3f2e9] p-6 text-[#11382e]"
    >
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-32 w-full" />
      <output className="sr-only">
        Consultando franquicias y saldos de la red local
      </output>
    </div>
  );
}
