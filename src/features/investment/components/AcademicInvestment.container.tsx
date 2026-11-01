"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/core/hooks/SessionProvider";
import {
  acceptAcademicTerms,
  claimAcademicRevenue,
  connectAcademicWallet,
  fetchAcademicSnapshot,
} from "../repositories/academicWallet.repository";
import {
  buyAcademicTokens,
  submitAcademicOperation,
} from "../services/academicInvestment.service";
import type {
  AcademicMode,
  AcademicSnapshot,
  OperationResult,
} from "../types/investment.type";
import { AcademicInvestment } from "./AcademicInvestment";

export function AcademicInvestmentContainer({
  mode = "buy",
  projectId,
}: {
  mode?: AcademicMode;
  projectId?: string;
}) {
  const { session } = useSession();
  const [snapshot, setSnapshot] = useState<AcademicSnapshot | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [units, setUnits] = useState("1");
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setSnapshot(await fetchAcademicSnapshot(wallet));
      setError("");
    } catch (e) {
      setSnapshot(null);
      setError(e instanceof Error ? e.message : "No se pudo consultar la red.");
    } finally {
      setLoading(false);
    }
  }, [wallet]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAcademicSnapshot(wallet)
      .then((data) => {
        if (active) {
          setSnapshot(data);
          setError("");
        }
      })
      .catch((e) => {
        if (active) {
          setSnapshot(null);
          setError(e instanceof Error ? e.message : "Red no disponible.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [wallet]);
  useEffect(() => {
    const injected = (
      window as Window & {
        ethereum?: {
          on?: (event: string, listener: () => void) => void;
          removeListener?: (event: string, listener: () => void) => void;
        };
      }
    ).ethereum;
    const reset = () => {
      setWallet(null);
      setNotice("Cambió la wallet o la red. Volvé a conectar.");
    };
    injected?.on?.("accountsChanged", reset);
    injected?.on?.("chainChanged", reset);
    return () => {
      injected?.removeListener?.("accountsChanged", reset);
      injected?.removeListener?.("chainChanged", reset);
    };
  }, []);
  async function run(action: () => Promise<OperationResult>) {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("Esperando firma o confirmación de la transacción…");
    try {
      const result = await action();
      setNotice(
        `${result.recovered ? "Compra recuperada" : "Operación confirmada"}. Gas: ${result.gasFeeEth} ETH de prueba. Tx: ${result.txHash}`,
      );
      await refresh();
    } catch (e) {
      setNotice("");
      setError(
        e instanceof Error
          ? e.message
          : "La operación no se confirmó. Consultá el historial antes de reintentar.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <AcademicInvestment
      mode={mode}
      projectId={projectId}
      snapshot={snapshot}
      wallet={wallet}
      error={error}
      notice={notice}
      busy={busy}
      loading={loading}
      units={units}
      signedIn={Boolean(session)}
      onUnits={setUnits}
      onRefresh={() => void refresh()}
      onConnect={() => {
        setError("");
        connectAcademicWallet()
          .then(setWallet)
          .catch((e) =>
            setError(e instanceof Error ? e.message : "No se pudo conectar."),
          );
      }}
      onAccept={(project) => {
        if (wallet) void run(() => acceptAcademicTerms(project, wallet));
      }}
      onBuy={(project) => {
        if (snapshot && session)
          void run(() => buyAcademicTokens(snapshot, project.id, units));
      }}
      onClaim={(project) => {
        if (wallet) void run(() => claimAcademicRevenue(project, wallet));
      }}
      onOperation={(operation) => {
        if (snapshot)
          void run(() => submitAcademicOperation(snapshot, operation));
      }}
    />
  );
}
