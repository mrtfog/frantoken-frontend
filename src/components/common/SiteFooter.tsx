import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { siteNavigation } from "@/core/constants";
import { SiteBrand } from "./SiteBrand";

export function SiteFooter() {
  return (
    <footer className="bg-[#062024] px-5 pt-14 pb-6 text-[#f3f2e9]">
      <div className="mx-auto grid max-w-[1400px] gap-10 border-b border-[#f3f2e9]/20 pb-12 md:grid-cols-2">
        <div>
          <SiteBrand />
          <p className="mt-5 max-w-[280px] text-[13px] leading-relaxed text-[#b5cabe]">
            Una forma de pensar, estructurar y seguir proyectos de franquicia.
          </p>
        </div>
        <nav
          className="grid content-start gap-4 text-[13px] md:justify-self-end"
          aria-label="Enlaces del pie"
        >
          <Link href="/" className="hover:text-[#d5f36a]">
            Inicio
          </Link>
          {siteNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#d5f36a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-4 pt-5 text-[10px] leading-relaxed text-[#92aca0]">
        <span>© FranToken</span>
        <span>
          Modelo conceptual. Sin ofertas activas publicadas en este sitio.
        </span>
        <a
          href="#inicio"
          className="inline-flex items-center gap-1 hover:text-[#d5f36a]"
        >
          Volver arriba <ArrowUp className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
