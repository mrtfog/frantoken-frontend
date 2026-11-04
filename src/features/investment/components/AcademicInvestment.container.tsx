"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/core/hooks/SessionProvider";
import {
  acceptAcademicTerms,
  claimAcademicRevenue,
  connectAcademicWallet,
  fetchAcademicSnapshot,
  readPendingPurchase,
} from "../repositories/academicWallet.repository";
import { buyAcademicTokens } from "../services/academicInvestment.service";
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
  const userId = session?.userId;
  const kycApproved = session?.kycApproved;
  const [snapshot, setSnapshot] = useState<AcademicSnapshot | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingByProject, setPendingByProject] = useState<
    Record<string, string>
  >({});
  useEffect(() => {
    setPendingByProject(
      snapshot
        ? Object.fromEntries(
            snapshot.projects.flatMap((project) => {
              const pending = readPendingPurchase(snapshot, project.id);
              return pending ? [[project.id, pending.units]] : [];
            }),
          )
        : {},
    );
  }, [snapshot]);
  const [units, setUnits] = useState("1");
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAcademicSnapshot(null);
      setSnapshot(data);
      setError("");
    } catch (e) {
      setSnapshot(null);
      setError(e instanceof Error ? e.message : "No se pudo consultar la red.");
    } finally {
      setLoading(false);
    }
  }, []);
  // biome-ignore lint/correctness/useExhaustiveDependencies: actualizar la revisión debe refrescar los permisos del snapshot.
  useEffect(() => {
    let active = true;
    if (!userId) {
      setSnapshot(null);
      setWallet(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchAcademicSnapshot(null)
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
  }, [userId, kycApproved]);
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
        `${result.recovered ? "Compra recuperada" : "Operación confirmada"}. Gas: ${result.gasFeeEth} ETH de prueba. Tx: ${result.txHash ?? "Sin nueva transacción (estado existente)"}`,
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
      setSnapshot((current) => (current ? { ...current } : null));
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
      pendingByProject={pendingByProject}
      onUnits={setUnits}
      onRefresh={() => void refresh()}
      onConnect={() => {
        if (busy || loading || !snapshot) return;
        setBusy(true);
        setError("");
        setNotice(
          "Aceptá el cambio a Hardhat local y la conexión en tu wallet.",
        );
        connectAcademicWallet()
          .then(async (address) => {
            setWallet(address);
            setNotice(
              "Wallet vinculada. La habilitación para comprar requiere revisión del administrador.",
            );
            await refresh();
          })
          .catch((e) => {
            setNotice("");
            setError(e instanceof Error ? e.message : "No se pudo conectar.");
          })
          .finally(() => setBusy(false));
      }}
      onAccept={(project) => {
        if (wallet) void run(() => acceptAcademicTerms(project, wallet));
      }}
      onBuy={(project, pendingUnits) => {
        if (snapshot && session)
          void run(() =>
            buyAcademicTokens(snapshot, project.id, pendingUnits ?? units),
          );
      }}
      onClaim={(project) => {
        if (wallet) void run(() => claimAcademicRevenue(project, wallet));
      }}
    />
  );
}
