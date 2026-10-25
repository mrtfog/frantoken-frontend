"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui";
import { siteNavigation } from "@/core/constants";
import { SiteBrand } from "./SiteBrand";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative z-20 border-b border-[#f3f2e9]/20 bg-[#09262a] text-[#f3f2e9]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-4 px-5 xl:gap-6">
        <SiteBrand />
        <nav
          className="hidden items-center gap-4 text-[13px] font-bold lg:flex xl:gap-7"
          aria-label="Navegación principal"
        >
          {siteNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="transition-colors hover:text-[#d5f36a] aria-[current=page]:text-[#d5f36a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav
          className="hidden shrink-0 items-center gap-4 lg:flex"
          aria-label="Acceso"
        >
          <Link
            href="/ingresar"
            aria-current={pathname === "/ingresar" ? "page" : undefined}
            className="text-[12px] font-bold transition-colors hover:text-[#d5f36a] aria-[current=page]:text-[#d5f36a]"
          >
            Iniciar sesión
          </Link>
          <ButtonLink
            href="/registro"
            variant="primary"
            className="min-h-11 px-4"
          >
            Registrarse <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </nav>
        <Button
          ref={menuButtonRef}
          type="button"
          variant="icon"
          className="lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-controls="site-mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="site-mobile-menu"
            aria-label="Navegación móvil"
            className="overflow-hidden bg-[#09262a] px-5 lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }
            }}
          >
            {siteNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-t border-[#f3f2e9]/20 py-4 text-[18px]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
            <div className="flex items-center gap-3 border-t border-[#f3f2e9]/20 py-4">
              <Link
                href="/ingresar"
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === "/ingresar" ? "page" : undefined}
                className="flex min-h-11 flex-1 items-center justify-center rounded-sm border border-[#f3f2e9]/30 px-3 text-[13px] font-bold aria-[current=page]:border-[#d5f36a]"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === "/registro" ? "page" : undefined}
                className="flex min-h-11 flex-1 items-center justify-center rounded-sm bg-[#d5f36a] px-3 text-[13px] font-bold text-[#09262a]"
              >
                Registrarse
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
