"use client";

import { ArrowUpRight, ChevronDown, Menu, UserRound, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui";
import { siteNavigation } from "@/core/constants";
import { accountNavigation } from "@/core/constants/accountNavigation.constants";
import { useSession } from "@/core/hooks/SessionProvider";
import { SiteBrand } from "./SiteBrand";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const accountMenuRef = useRef<HTMLDetailsElement>(null);
  const reduceMotion = useReducedMotion();
  const { session, ready, signOut } = useSession();

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
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <ButtonLink
            href="/#modelo"
            variant="primary"
            className="hidden xl:inline-flex"
          >
            Explorar el modelo{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          {ready && session ? (
            <details
              ref={accountMenuRef}
              className="group relative"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  accountMenuRef.current?.removeAttribute("open");
                  accountMenuRef.current?.querySelector("summary")?.focus();
                }
              }}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-[#f3f2e9]/25 px-4 text-[13px] font-bold hover:border-[#d5f36a] focus-visible:outline-2 focus-visible:outline-[#d5f36a] [&::-webkit-details-marker]:hidden">
                <UserRound className="h-4 w-4" aria-hidden="true" />
                <span className="max-w-32 truncate">{session.displayName}</span>
                <ChevronDown
                  className="h-4 w-4 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="absolute right-0 z-30 mt-3 w-60 rounded-xl border border-[#163b36] bg-[#f3f2e9] p-2 text-[#09262a] shadow-2xl">
                <p className="truncate px-3 py-2 text-[11px] text-[#567166]">
                  Demo · {session.email}
                </p>
                {accountNavigation.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() =>
                      accountMenuRef.current?.removeAttribute("open")
                    }
                    className="block rounded-md px-3 py-2.5 text-[13px] font-bold hover:bg-[#dfe9d8]"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    accountMenuRef.current?.removeAttribute("open");
                    void signOut();
                  }}
                  className="w-full border-t border-[#173d34]/15 px-3 py-2.5 text-left text-[13px] font-bold hover:bg-[#dfe9d8]"
                >
                  Cerrar sesión
                </button>
              </div>
            </details>
          ) : ready ? (
            <ButtonLink href="/ingresar" variant="primary">
              Ingresar <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          ) : null}
        </div>
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
            {ready && session ? (
              <div className="border-t border-[#f3f2e9]/20 py-3">
                <p className="py-2 text-xs text-[#b5cabe]">
                  Cuenta demo · {session.email}
                </p>
                {accountNavigation.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-[16px] font-bold"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    void signOut();
                    setMenuOpen(false);
                  }}
                  className="py-3 text-[16px] font-bold"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : ready ? (
              <Link
                href="/ingresar"
                onClick={() => setMenuOpen(false)}
                className="block border-t border-[#f3f2e9]/20 py-4 text-[18px] font-bold"
              >
                Ingresar
              </Link>
            ) : null}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
