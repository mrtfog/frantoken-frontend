"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { franchiseRepository } from "../repositories/franchise.repository";
import { observeFranchiseDistribution } from "../services/franchise.service";
import type { DistributionRequest } from "../types/franchise.type";
import { DistributionRequestList } from "./DistributionRequestList";
import { FranchiseSkeleton } from "./FranchiseSkeleton";

export function DistributionRequestsContainer() {
  const { session } = useSession();
  const [requests, setRequests] = useState<DistributionRequest[] | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setError("");
    try {
      setRequests(await franchiseRepository.requests());
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "No se pudieron consultar las propuestas.",
      );
    }
  }, []);
  useEffect(() => {
    if (session?.role === "superadmin") void load();
  }, [session?.role, load]);
  if (session?.role !== "superadmin") return null;
  return (
    <section className="mt-10 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
      <h2 className="text-2xl font-bold">Revisión de repartos</h2>
      <p className="mt-3 text-sm text-[#527164]">
        Revisá las propuestas del creador. Abrí la gestión de la franquicia para
        comprobar la red y ejecutar un reparto.
      </p>
      <Button
        className="mt-4"
        variant="chip"
        onClick={() => void load()}
        disabled={busy}
      >
        Actualizar propuestas
      </Button>
      {error && (
        <p role="alert" className="mt-4 text-sm text-[#b43a31]">
          {error}
        </p>
      )}
      {notice && <output className="mt-4 block text-sm">{notice}</output>}
      {!requests ? (
        error ? null : (
          <FranchiseSkeleton />
        )
      ) : (
        <DistributionRequestList
          requests={requests}
          busy={busy}
          canEdit={false}
          canReview
          canExecute={false}
          onEdit={() => {}}
          onExecute={() => {}}
          onObserve={(id, version, note) => {
            if (busy) return;
            setBusy(true);
            setError("");
            setNotice("");
            observeFranchiseDistribution(id, version, note)
              .then(async () => {
                await load();
                setNotice("Observación registrada.");
              })
              .catch((e) =>
                setError(
                  e instanceof Error
                    ? e.message
                    : "No se pudo registrar la observación.",
                ),
              )
              .finally(() => setBusy(false));
          }}
        />
      )}
    </section>
  );
}
