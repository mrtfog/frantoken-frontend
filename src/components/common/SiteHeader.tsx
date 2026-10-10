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
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-6 px-5">
        <SiteBrand />
        <nav
          className="hidden items-center gap-7 text-[13px] font-bold lg:flex"
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
        <ButtonLink
          href="/#modelo"
          className="hidden lg:inline-flex"
          variant="primary"
        >
          Explorar el modelo{" "}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
