"use client";

import { ArrowRight, Coins, FilePenLine, MoveUpRight } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui";
import type { AccountOverviewProps } from "../types/accountOverview.type";

export function AccountOverview({
  name,
  quantity,
  invested,
  applications,
  holdingsError,
  applicationsError,
  localOnly,
  onRetry,
}: AccountOverviewProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
          Tu cuenta FranToken
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
          Hola, {name}.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#527164]">
          Consultá el resumen de tus tokens y seguí el estado de tus solicitudes
          desde un mismo lugar.
        </p>
        {localOnly && (
          <p className="mt-3 text-xs text-[#527164]">
            Vista previa con datos ilustrativos guardados en este navegador.
          </p>
        )}
        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#11382e] p-6 text-[#f3f2e9]">
            <Coins className="h-6 w-6 text-[#d5f36a]" aria-hidden="true" />
            <p className="mt-8 text-4xl font-bold">{quantity ?? "—"}</p>
            <p className="mt-2 text-xs text-[#bcd0c3]">Tokens en tu cuenta</p>
          </div>
          <div className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
            <MoveUpRight
              className="h-6 w-6 text-[#3c6d58]"
              aria-hidden="true"
            />
            <p className="mt-8 text-4xl font-bold">
              {invested === null
                ? "—"
                : `USD ${invested.toLocaleString("es-AR")}`}
            </p>
            <p className="mt-2 text-xs text-[#527164]">
              Compras simuladas · costo histórico
            </p>
          </div>
          <div className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
            <FilePenLine
              className="h-6 w-6 text-[#3c6d58]"
              aria-hidden="true"
            />
            <p className="mt-8 text-4xl font-bold">
              {applications?.length ?? "—"}
            </p>
            <p className="mt-2 text-xs text-[#527164]">
              Solicitudes presentadas
            </p>
          </div>
        </div>
        {(holdingsError || applicationsError) && (
          <div className="mt-5 space-y-3 rounded-lg border border-[#173d34]/20 bg-[#fffef8] p-5">
            {holdingsError && (
              <p role="alert" className="text-sm text-[#527164]">
                {holdingsError}
              </p>
            )}
            {applicationsError && (
              <p role="alert" className="text-sm text-[#527164]">
                {applicationsError}
              </p>
            )}
            <Button variant="chip" onClick={onRetry}>
              Reintentar consultas
            </Button>
          </div>
        )}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href="/mi-cuenta/tokens"
            className="group rounded-xl border border-[#173d34]/20 p-7 transition-colors hover:bg-[#e4eadb]"
          >
            <span className="text-[11px] font-extrabold tracking-[.18em] uppercase text-[#517160]">
              Actividad
            </span>
            <h2 className="mt-4 text-2xl font-bold">Revisá tus tokens</h2>
            <p className="mt-3 text-sm leading-6 text-[#527164]">
              Consultá tus tenencias, compras e ingresos y conectá tu wallet
              para cobrar.
            </p>
            <ArrowRight
              className="mt-8 h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/abrir-franquicia"
            className="group rounded-xl border border-[#173d34]/20 p-7 transition-colors hover:bg-[#e4eadb]"
          >
            <span className="text-[11px] font-extrabold tracking-[.18em] uppercase text-[#517160]">
              Nueva propuesta
            </span>
            <h2 className="mt-4 text-2xl font-bold">Abrir franquicia</h2>
            <p className="mt-3 text-sm leading-6 text-[#527164]">
              Presentá tu propuesta de franquicia y seguí su revisión desde tu
              cuenta.
            </p>
            <ArrowRight
              className="mt-8 h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
        {applications && applications.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Tus solicitudes</h2>
            <ul className="mt-4 space-y-3">
              {applications.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#173d34]/15 bg-[#fffef8] px-5 py-4"
                >
                  <span className="font-bold">{item.franchiseName}</span>
                  <span className="text-xs text-[#527164]">
                    {item.status} ·{" "}
                    {new Date(item.createdAt).toLocaleDateString("es-AR")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.section>
    </MotionConfig>
  );
}
