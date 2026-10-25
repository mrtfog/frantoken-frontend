"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { demoAccountRepository } from "../repositories/account.repository";
import type { FranchiseApplication, TokenHolding } from "../types/account.type";
import { AccountOverview } from "./AccountOverview";

export function AccountOverviewContainer() {
  const { session } = useSession();
  const [data, setData] = useState<{
    holdings: TokenHolding[];
    applications: FranchiseApplication[];
  } | null>(null);
  useEffect(() => {
    if (!session) return;
    let active = true;
    Promise.all([
      demoAccountRepository.getHoldings(session.userId),
      demoAccountRepository.getApplications(session.userId),
    ]).then(([holdings, applications]) => {
      if (active) setData({ holdings, applications });
    });
    return () => {
      active = false;
    };
  }, [session]);
  if (!session) return null;
  if (!data)
    return (
      <div aria-busy="true" className="space-y-5">
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-52 w-full" />
        <output className="sr-only">Cargando resumen demo</output>
      </div>
    );
  return (
    <AccountOverview
      name={session.displayName}
      holdings={data.holdings}
      applications={data.applications}
    />
  );
}
