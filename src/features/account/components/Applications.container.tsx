"use client";
import { useCallback, useEffect, useState } from "react";
import { apiEnabled } from "@/core/config/api.config";
import { useSession } from "@/core/hooks/SessionProvider";
import { accountRepository } from "../repositories/activeAccount.repository";
import type { FranchiseApplication } from "../types/account.type";
import { Applications } from "./Applications";

export function ApplicationsContainer() {
  const { session } = useSession();
  const [rows, setRows] = useState<FranchiseApplication[] | null>(null);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    if (!session) return;
    setRows(null);
    try {
      setRows(await accountRepository.getApplications(session.userId));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar.");
    }
  }, [session]);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Applications
      rows={rows}
      error={error}
      canManage={apiEnabled}
      onRefresh={() => void load()}
    />
  );
}
