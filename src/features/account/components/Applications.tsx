"use client";
import { MotionConfig, motion } from "motion/react";
import { Button, ButtonLink, Skeleton } from "@/components/ui";
import type { FranchiseApplication } from "../types/account.type";
export function Applications({
  rows,
  error,
  onRefresh,
}: {
  rows: FranchiseApplication[] | null;
  error: string;
  onRefresh(): void;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold">Mis solicitudes</h1>
        <div className="mt-5 flex gap-3">
          <Button onClick={onRefresh}>Actualizar</Button>
          <ButtonLink href="/abrir-franquicia">Nueva solicitud</ButtonLink>
        </div>
        {error ? (
          <p role="alert" className="mt-5">
            {error}
          </p>
        ) : !rows ? (
          <div aria-busy="true" className="mt-5">
            <Skeleton className="h-64 w-full" />
            <output className="sr-only">Cargando solicitudes</output>
          </div>
        ) : rows.length === 0 ? (
          <p className="mt-6">Todavía no presentaste una solicitud.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {rows.map((row) => (
              <li key={row.id} className="rounded-xl border bg-[#fffef8] p-6">
                <h2 className="text-xl font-bold">{row.franchiseName}</h2>
                <p className="mt-3">
                  {row.status} ·{" "}
                  {new Date(row.createdAt).toLocaleDateString("es-AR")}
                </p>
                <p className="mt-2 break-all text-xs">Referencia: {row.id}</p>
                {row.reviewNote && (
                  <p className="mt-3">Observación: {row.reviewNote}</p>
                )}
                {row.status === "Publicada" && row.projectId && (
                  <ButtonLink
                    className="mt-4"
                    href={`/marketplace/${row.projectId}`}
                  >
                    Ver franquicia publicada
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        )}
      </motion.section>
    </MotionConfig>
  );
}
