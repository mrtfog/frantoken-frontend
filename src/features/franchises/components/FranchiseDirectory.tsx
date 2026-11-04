"use client";
import { ArrowUpRight, Building2 } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { ButtonLink } from "@/components/ui";
import type { FranchiseDirectory as Directory } from "../types/franchise.type";

export function FranchiseDirectory({ rows }: { rows: Directory }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold">Franquicias publicadas</h2>
        <p className="mt-3 text-sm text-[#527164]">
          Gestioná la operación y el seguimiento de cada franquicia habilitada.
        </p>
        {rows.length === 0 ? (
          <p className="mt-5 text-sm">
            Todavía no hay franquicias para gestionar. Podés seguir tus
            propuestas en Mis solicitudes.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {rows.map((row) => (
              <li
                key={row.project.id}
                className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6"
              >
                <Building2
                  className="h-6 w-6 text-[#527164]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-xl font-bold">{row.project.name}</h3>
                <p className="mt-2 text-sm text-[#527164]">
                  {row.project.sector} ·{" "}
                  {row.project.token.symbol ?? "Publicación en preparación"}
                </p>
                <ButtonLink
                  className="mt-5"
                  variant="dark"
                  href={`/mi-cuenta/franquicias/${row.project.id}`}
                >
                  Gestionar franquicia{" "}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </li>
            ))}
          </ul>
        )}
      </motion.section>
    </MotionConfig>
  );
}
