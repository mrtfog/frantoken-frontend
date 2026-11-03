"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { franchiseRepository } from "../repositories/franchise.repository";
import { saveFranchiseApplication } from "../services/franchise.service";
import type {
  ApplicationEditValues,
  ApplicationDetail as Detail,
} from "../types/franchise.type";
import { applicationEditSchema } from "../types/franchise.type";
import { applicationResolver } from "../utils/applicationFormResolver.util";
import { ApplicationDetail } from "./ApplicationDetail";
import { FranchiseSkeleton } from "./FranchiseSkeleton";

export function ApplicationDetailContainer({ id }: { id: string }) {
  const { session } = useSession();
  const userId = session?.userId;
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationEditValues>({ resolver: applicationResolver });
  const load = useCallback(async () => {
    if (!userId) return;
    setError("");
    setMessage("");
    try {
      const value = await franchiseRepository.application(id);
      reset(applicationEditSchema.parse(value.application));
      setDetail(value);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo consultar la solicitud.",
      );
    }
  }, [id, userId, reset]);
  useEffect(() => {
    setDetail(null);
    void load();
  }, [load]);
  const submit = handleSubmit(async (values) => {
    if (!detail?.capabilities.canEdit) return;
    setError("");
    setMessage("");
    try {
      const value = await saveFranchiseApplication(
        id,
        detail.application.version,
        values,
      );
      setDetail(value);
      reset(applicationEditSchema.parse(value.application));
      setMessage(
        "Solicitud reenviada. La nueva versión está pendiente de revisión.",
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo guardar la solicitud.",
      );
    }
  });
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
    <ApplicationDetail
      detail={detail}
      register={register}
      errors={errors}
      busy={isSubmitting}
      message={message}
      error={error}
      onSubmit={submit}
      onRefresh={() => void load()}
    />
  );
}
