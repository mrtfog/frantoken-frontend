import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type AnnouncementBannerProps = { demo?: boolean };

export function AnnouncementBanner({ demo = false }: AnnouncementBannerProps) {
  return (
    <div className="flex min-h-[34px] items-center justify-center gap-2 bg-[#d5f36a] px-5 py-2 text-center text-[10px] leading-[1.4] font-extrabold tracking-[0.02em] text-[#09262a] sm:text-[11px]">
      <span aria-hidden="true" className="text-[15px]">
        ✳
      </span>
      <span>
        {demo
          ? "Demo · Marcas reales, proyectos y datos financieros simulados · Sin ofertas activas"
          : "Un nuevo modo de pensar proyectos de franquicia"}
      </span>
      {!demo && (
        <Link
          href="/#modelo"
          className="ml-2 hidden items-center gap-1 underline underline-offset-4 sm:inline-flex"
        >
          Conocé el modelo{" "}
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
