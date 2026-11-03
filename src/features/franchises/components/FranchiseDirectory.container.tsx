"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { franchiseRepository } from "../repositories/franchise.repository";
import type { FranchiseDirectory as Directory } from "../types/franchise.type";
import { FranchiseDirectory } from "./FranchiseDirectory";
import { FranchiseSkeleton } from "./FranchiseSkeleton";

export function FranchiseDirectoryContainer() {
  const { session } = useSession();
  const [rows, setRows] = useState<Directory | null>(null);
  const [error, setError] = useState("");
  const userId = session?.userId;
  const load = useCallback(async () => {
    if (!userId) return;
    setRows(null);
    setError("");
    try {
      setRows(await franchiseRepository.directory());
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo cargar el listado.",
      );
    }
  }, [userId]);
  useEffect(() => {
    void load();
  }, [load]);
  if (!userId) return null;
  if (error)
    return (
      <div className="space-y-4">
        <p role="alert">{error}</p>
        <Button onClick={() => void load()}>Reintentar</Button>
      </div>
    );
  return rows ? <FranchiseDirectory rows={rows} /> : <FranchiseSkeleton />;
}
