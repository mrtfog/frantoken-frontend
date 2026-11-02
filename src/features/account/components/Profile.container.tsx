"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { accountRepository } from "../repositories/activeAccount.repository";
import { saveProfile } from "../services/account.service";
import type { UserProfile } from "../types/account.type";
import { Profile } from "./Profile";

export function ProfileContainer() {
  const { session, updateDisplayName } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (!session) return;
    let active = true;
    accountRepository
      .getProfile(session.userId)
      .then((value) => {
        if (active)
          setProfile(
            value ?? {
              dni: "",
              cuil: "",
              birthDate: "",
              province: "",
              city: "",
              address: "",
              postalCode: "",
              fullName: session.displayName,
              phone: "",
              country: "Argentina",
              investorUpdates: false,
            },
          );
      })
      .catch((e) => {
        if (active)
          setError(
            e instanceof Error ? e.message : "No se pudo cargar el perfil.",
          );
      });
    return () => {
      active = false;
    };
  }, [session]);
  if (!session) return null;
  if (error)
    return (
      <p role="alert">{error} Volvé a ingresar o recargá para reintentar.</p>
    );
  if (!profile)
    return (
      <div aria-busy="true" className="space-y-5">
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-80 w-full" />
        <output className="sr-only">Cargando perfil</output>
      </div>
    );
  return (
    <Profile
      email={session.email}
      profile={profile}
      saved={saved}
      onSave={async (value) => {
        await saveProfile(session.userId, value, accountRepository);
        await updateDisplayName(value.fullName);
        setProfile(value);
        setSaved(true);
      }}
      onEdit={() => setSaved(false)}
    />
  );
}
