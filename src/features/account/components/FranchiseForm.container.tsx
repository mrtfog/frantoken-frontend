"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import { franchiseDefaults } from "../constants/franchiseForm.constants";
import { accountRepository } from "../repositories/activeAccount.repository";
import { submitFranchise } from "../services/account.service";
import type {
  FranchiseApplication,
  FranchiseFormValues,
} from "../types/account.type";
import { FranchiseForm } from "./FranchiseForm";

const stepFields: (keyof FranchiseFormValues)[][] = [
  ["franchiseName", "sector", "city", "country"],
  [
    "totalCost",
    "currency",
    "year1",
    "revenue1",
    "margin1",
    "year2",
    "revenue2",
    "margin2",
    "year3",
    "revenue3",
    "margin3",
    "performanceSource",
  ],
  ["operatorName", "estimatedOpening", "description"],
];

export function FranchiseFormContainer() {
  const { session } = useSession();
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState("");
  const [application, setApplication] = useState<FranchiseApplication | null>(
    null,
  );
  const form = useForm<FranchiseFormValues>({
    defaultValues: franchiseDefaults,
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const { reset, getValues, trigger, handleSubmit } = form;

  useEffect(() => {
    if (!session) return;
    let active = true;
    accountRepository.getDraft(session.userId).then((draft) => {
      if (active) {
        if (draft && typeof draft === "object" && !Array.isArray(draft))
          reset({ ...franchiseDefaults, ...draft });
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, [session, reset]);

  if (!session) return null;
  if (!loaded)
    return (
      <div aria-busy="true" className="space-y-5">
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-80 w-full" />
        <output className="sr-only">Cargando formulario demo</output>
      </div>
    );
  return (
    <FranchiseForm
      form={form}
      step={step}
      application={application}
      notice={notice}
      onBack={() => {
        setNotice("");
        setStep((current) => Math.max(0, current - 1));
      }}
      onNext={async () => {
        setNotice("");
        if (!(await trigger(stepFields[step]))) return;
        if (step === 1) {
          const { year1, year2, year3 } = getValues();
          if (!(year1 < year2 && year2 < year3)) {
            setNotice("Los años deben estar en orden ascendente.");
            return;
          }
        }
        await accountRepository.saveDraft(session.userId, getValues());
        setStep((current) => Math.min(2, current + 1));
      }}
      onSaveDraft={async () => {
        await accountRepository.saveDraft(session.userId, getValues());
        setNotice("Borrador guardado en este navegador.");
      }}
      onSubmit={handleSubmit(async (value) => {
        setNotice("");
        try {
          setApplication(
            await submitFranchise(session.userId, value, accountRepository),
          );
        } catch (error) {
          setNotice(
            error instanceof Error
              ? error.message
              : "No se pudo guardar la solicitud demo.",
          );
        }
      })}
    />
  );
}
