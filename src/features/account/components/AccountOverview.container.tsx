"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";
import { apiEnabled } from "@/core/config/api.config";
import { useSession } from "@/core/hooks/SessionProvider";
import { accountRepository } from "../repositories/activeAccount.repository";
import { getAccountOverview } from "../services/getAccountOverview.service";
import type { AccountOverviewData } from "../types/accountOverview.type";
import { AccountOverview } from "./AccountOverview";

export function AccountOverviewContainer() {
  const { session } = useSession();
  const userId = session?.userId;
  const [data, setData] = useState<AccountOverviewData | null>(null);
  const [retry, setRetry] = useState(0);
  // biome-ignore lint/correctness/useExhaustiveDependencies: retry permite reconsultar los servicios sin cambiar de usuario.
  useEffect(() => {
    setData(null);
    if (!userId) return;
    let active = true;
    getAccountOverview(userId, accountRepository).then((value) => {
      if (active) setData(value);
    });
    return () => {
      active = false;
    };
  }, [userId, retry]);
  if (!session) return null;
  if (!data)
    return (
      <div aria-busy="true" className="space-y-5">
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-52 w-full" />
        <output className="sr-only">Cargando resumen de cuenta</output>
      </div>
    );
  return (
    <AccountOverview
      name={session.displayName}
      {...data}
      localOnly={!apiEnabled}
      onRetry={() => setRetry((value) => value + 1)}
    />
  );
}
