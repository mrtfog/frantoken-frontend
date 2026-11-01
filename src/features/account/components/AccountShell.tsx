"use client";

import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ButtonLink, Skeleton } from "@/components/ui";
import { accountNavigation } from "@/core/constants/accountNavigation.constants";
import { useSession } from "@/core/hooks/SessionProvider";

export function AccountShell({ children }: { children: ReactNode }) {
  const { session, ready } = useSession();
  const pathname = usePathname();

  if (!ready)
    return (
      <div aria-busy="true" className="mx-auto max-w-[1380px] px-5 py-16">
        <Skeleton className="h-72 w-full" />
        <output className="sr-only">Cargando cuenta demo</output>
      </div>
    );
  if (!session)
    return (
      <section className="mx-auto max-w-[1380px] px-5 py-24">
        <div className="max-w-2xl rounded-[20px] border border-[#173d34]/20 bg-[#fffef8] p-8 md:p-12">
          <LockKeyhole
            className="mb-7 h-9 w-9 text-[#3d6152]"
            aria-hidden="true"
          />
          <p className="mb-3 text-xs font-bold tracking-[.18em] uppercase text-[#3d6152]">
            Espacio personal · demostración
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ingresá para ver tu panel
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#4c685d]">
            Usá cualquier email válido y una contraseña de al menos ocho
            caracteres. Este acceso solo guarda una sesión local de prueba.
          </p>
          <ButtonLink href="/ingresar" className="mt-8">
            Ingresar <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    );

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto grid max-w-[1380px] gap-9 px-5 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:py-16">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <p className="mb-4 text-[11px] font-extrabold tracking-[.2em] uppercase text-[#557468]">
            Mi espacio / demo
          </p>
          <nav
            aria-label="Opciones de cuenta"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col"
          >
            {accountNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="shrink-0 rounded-md border border-[#173d34]/15 px-4 py-3 text-[13px] font-bold text-[#21483b] transition-colors hover:bg-[#e0ead7] aria-[current=page]:border-[#11382e] aria-[current=page]:bg-[#11382e] aria-[current=page]:text-[#f3f2e9] lg:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-6 hidden text-xs leading-5 text-[#597367] lg:block">
            Compras con pago simulado y tokens en Hardhat local. Los ingresos se
            cobran con un activo de prueba.
          </p>
        </aside>
        <motion.div
          key={session.userId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="min-w-0"
        >
          {children}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
