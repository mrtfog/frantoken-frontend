"use client";
import { MotionConfig, motion } from "motion/react";
import type { UseFormReturn } from "react-hook-form";
import { Button, ButtonLink, Input, Textarea } from "@/components/ui";
import type {
  FranchiseApplication,
  FranchiseFormValues,
} from "../types/account.type";

export function FranchiseForm({
  form,
  step,
  application,
  notice,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
}: {
  form: UseFormReturn<FranchiseFormValues>;
  step: number;
  application: FranchiseApplication | null;
  notice: string;
  onBack(): void;
  onNext(): Promise<void>;
  onSaveDraft(): Promise<void>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <MotionConfig reducedMotion="user">
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold">Solicitar una franquicia</h1>
        <p className="mt-4 text-sm leading-7">
          Cualquier usuario puede presentar un proyecto completando DNI, CUIL,
          nacimiento y domicilio en su perfil. Usá datos ficticios para esta
          demostración. No hace falta historial de ventas de una unidad que
          todavía no abrió.
        </p>
        <ButtonLink className="mt-4" href="/mi-cuenta/configuracion">
          Completar mis datos
        </ButtonLink>
        {notice && (
          <p role="alert" className="mt-4 rounded-md bg-[#e7ecd9] p-4">
            {notice}
          </p>
        )}
        {application ? (
          <div className="mt-8 rounded-xl border p-6">
            <h2 className="text-xl font-bold">
              Solicitud {application.status}
            </h2>
            <p className="mt-3 break-all">
              Referencia del servidor: {application.id}
            </p>
            <ButtonLink href="/mi-cuenta/solicitudes" className="mt-5">
              Ver mis solicitudes
            </ButtonLink>
          </div>
        ) : (
          <form
            className="mt-8 space-y-5 rounded-xl border border-[#173d34]/20 bg-[#fffef8] p-6"
            onSubmit={onSubmit}
          >
            <p className="text-sm font-bold">Paso {step + 1} de 2</p>
            {step === 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {(
                  [
                    ["franchiseName", "Nombre de la franquicia"],
                    ["sector", "Sector"],
                    ["city", "Ciudad del proyecto"],
                    ["country", "País"],
                  ] as const
                ).map(([field, label]) => (
                  <label key={field} htmlFor={field} className="text-sm">
                    {label}
                    <Input
                      className="mt-2 w-full"
                      id={field}
                      {...register(field, {
                        required: "Completá este dato.",
                        minLength: 2,
                      })}
                      aria-invalid={Boolean(errors[field])}
                    />
                  </label>
                ))}
              </div>
            ) : (
              <>
                <label className="block text-sm" htmlFor="totalCost">
                  Inversión estimada (dato indicativo)
                  <Input
                    id="totalCost"
                    className="mt-2 w-full"
                    type="number"
                    min="0.01"
                    step="0.01"
                    {...register("totalCost", {
                      valueAsNumber: true,
                      required: true,
                      min: 0.01,
                    })}
                  />
                </label>
                <label className="block text-sm" htmlFor="currency">
                  Moneda
                  <Input
                    id="currency"
                    className="mt-2 w-full"
                    {...register("currency", {
                      required: true,
                      pattern: /^(USD|ARS)$/,
                    })}
                  />
                </label>
                <label className="block text-sm" htmlFor="operatorName">
                  Responsable propuesto
                  <Input
                    id="operatorName"
                    className="mt-2 w-full"
                    {...register("operatorName", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </label>
                <label className="block text-sm" htmlFor="estimatedOpening">
                  Apertura estimada
                  <Input
                    id="estimatedOpening"
                    className="mt-2 w-full"
                    type="month"
                    {...register("estimatedOpening", { required: true })}
                  />
                </label>
                <label className="block text-sm" htmlFor="description">
                  Descripción del proyecto
                  <Textarea
                    id="description"
                    className="mt-2"
                    {...register("description", {
                      required: true,
                      minLength: 20,
                    })}
                  />
                </label>
              </>
            )}
            {Object.keys(errors).length > 0 && (
              <p role="alert" className="text-sm text-red-800">
                Revisá los campos obligatorios y la descripción (mínimo 20
                caracteres).
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="chip"
                onClick={() => void onSaveDraft()}
                disabled={isSubmitting}
              >
                Guardar borrador
              </Button>
              {step > 0 && (
                <Button variant="chip" onClick={onBack}>
                  Atrás
                </Button>
              )}
              {step === 0 ? (
                <Button onClick={() => void onNext()}>Continuar</Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  Enviar solicitud
                </Button>
              )}
            </div>
          </form>
        )}
      </motion.section>
    </MotionConfig>
  );
}
