"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Skeleton } from "@/components/ui";
import { apiEnabled } from "@/core/config/api.config";
import { useSession } from "@/core/hooks/SessionProvider";
import { emptyProfile } from "../constants/profile.constants";
import { accountRepository } from "../repositories/activeAccount.repository";
import { saveProfile } from "../services/account.service";
import type { UserProfile } from "../types/account.type";
import { profileFormResolver } from "../utils/profileFormResolver.util";
import { Profile } from "./Profile";

export function ProfileContainer() {
  const { session } = useSession();
  const userId = session?.userId;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [reload, setReload] = useState(0);
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    defaultValues: emptyProfile,
    resolver: profileFormResolver,
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  // biome-ignore lint/correctness/useExhaustiveDependencies: reload permite reintentar una carga fallida sin cambiar de usuario.
  useEffect(() => {
    setProfile(null);
    setError("");
    setSaveError("");
    setSaved(false);
    if (!userId) return;
    let active = true;
    accountRepository
      .getProfile(userId)
      .then((value) => {
        if (active) {
          const loadedProfile = value ?? emptyProfile;
          setProfile(loadedProfile);
          reset(loadedProfile);
        }
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
  }, [userId, reset, reload]);
  const onSubmit = handleSubmit(async (value) => {
    if (!userId) return;
    setSaved(false);
    setSaveError("");
    try {
      const updated = await saveProfile(userId, value, accountRepository);
      setProfile(updated);
      reset(updated);
      setSaved(true);
    } catch (cause) {
      setSaveError(
        cause instanceof Error
          ? cause.message
          : "No se pudieron guardar los datos. Intentá de nuevo.",
      );
    }
  });
  if (!session) return null;
  if (error)
    return (
      <div className="space-y-4">
        <p role="alert">{error}</p>
        <Button onClick={() => setReload((value) => value + 1)}>
          Reintentar
        </Button>
      </div>
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
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      saved={saved}
      error={saveError}
      localOnly={!apiEnabled}
      onSubmit={onSubmit}
      onEdit={() => {
        setSaved(false);
        setSaveError("");
      }}
    />
  );
}
