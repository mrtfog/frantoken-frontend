"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { demoAccountRepository } from "../repositories/account.repository";
import type { TokenHolding } from "../types/account.type";
import { Tokens } from "./Tokens";

export function TokensContainer() {
  const { session } = useSession();
  const [holdings, setHoldings] = useState<TokenHolding[] | null>(null);
  useEffect(() => {
    if (!session) return;
    let active = true;
    demoAccountRepository.getHoldings(session.userId).then((data) => {
      if (active) setHoldings(data);
    });
    return () => {
      active = false;
    };
  }, [session]);
  if (!session) return null;
  if (!holdings)
    return (
      <div aria-busy="true" className="space-y-5">
        <Skeleton className="h-14 w-2/3" />
        <Skeleton className="h-64 w-full" />
        <output className="sr-only">Cargando tokens de demostración</output>
      </div>
    );
  return <Tokens holdings={holdings} />;
}
