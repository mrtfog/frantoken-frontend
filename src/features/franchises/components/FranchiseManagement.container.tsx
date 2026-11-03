"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { franchiseRepository } from "../repositories/franchise.repository";
import {
  correctFranchiseDistribution,
  observeFranchiseDistribution,
  proposeFranchiseDistribution,
} from "../services/franchise.service";
import type { FranchiseDetail } from "../types/franchise.type";
import { FranchiseManagement } from "./FranchiseManagement";
import { FranchiseSkeleton } from "./FranchiseSkeleton";

export function FranchiseManagementContainer({ id }: { id: string }) {
  const { session } = useSession();
  const userId = session?.userId;
  const [detail, setDetail] = useState<FranchiseDetail | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    if (!userId) return;
    setError("");
    try {
      setDetail(await franchiseRepository.detail(id));
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo consultar la franquicia.",
      );
    }
  }, [userId, id]);
  useEffect(() => {
    setDetail(null);
    void load();
  }, [load]);
  async function run(action: () => Promise<unknown>, success: string) {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
      setDetail(await franchiseRepository.detail(id));
      setNotice(success);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo completar la operación.",
      );
      try {
        setDetail(await franchiseRepository.detail(id));
      } catch {
        /* Conservar el error de la operación y los últimos datos conocidos. */
      }
    } finally {
      setBusy(false);
    }
  }
  if (!userId) return null;
  if (!detail)
    return error ? (
      <div className="space-y-4">
        <p role="alert">{error}</p>
        <Button onClick={() => void load()}>Reintentar</Button>
      </div>
    ) : (
      <FranchiseSkeleton />
    );
  return (
    <FranchiseManagement
      detail={detail}
      busy={busy}
      error={error}
      notice={notice}
      onRefresh={() => void load()}
      onOperation={(status) =>
        void run(
          () => franchiseRepository.operation(id, status),
          "Estado operativo confirmado.",
        )
      }
      onPropose={(input) =>
        void run(
          () => proposeFranchiseDistribution(id, input),
          "Propuesta registrada. Falta la aprobación y ejecución del superadmin.",
        )
      }
      requestsActions={{
        onEdit: (requestId, version, input) =>
          void run(
            () => correctFranchiseDistribution(id, requestId, version, input),
            "Propuesta reenviada a revisión.",
          ),
        onObserve: (requestId, version, note) =>
          void run(
            () => observeFranchiseDistribution(requestId, version, note),
            "Observación registrada.",
          ),
        onExecute: (requestId, version) =>
          void run(
            () => franchiseRepository.executeRequest(requestId, version),
            "Reparto confirmado en cadena.",
          ),
      }}
    />
  );
}
