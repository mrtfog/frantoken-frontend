"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FilePenLine,
  Save,
} from "lucide-react";
import Link from "next/link";
import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { franchiseSteps } from "../constants/franchiseForm.constants";
import type {
  FranchiseApplication,
  FranchiseFormValues,
} from "../types/account.type";

type Props = {
  form: UseFormReturn<FranchiseFormValues>;
  step: number;
  application: FranchiseApplication | null;
  notice: string;
  onBack(): void;
  onNext(): Promise<void>;
  onSaveDraft(): Promise<void>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function FranchiseForm({
  form,
  step,
  application,
  notice,
  onBack,
  onNext,
  onSaveDraft,
  onSubmit,
}: Props) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;
  if (application)
    return (
      <section className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-8 md:p-12">
        <CheckCircle2 className="h-12 w-12 text-[#32734c]" aria-hidden="true" />
        <p className="mt-7 text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
          Recorrido completado
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Solicitud demo guardada
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#527164]">
          {application.franchiseName} se guardó solo en este navegador con el
          estado “Borrador demo enviado”. Nadie la recibió ni inició un proceso
          de apertura.
        </p>
        <Link
          href="/mi-cuenta"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
        >
          Ver mi panel <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    );

  return (
    <section>
      <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
        Propuesta de franquicia / demo
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
        Abrir franquicia
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#527164]">
        Armá una solicitud de prueba con los datos básicos del proyecto. Esta
        pantalla no abre una franquicia ni envía una propuesta a FranToken.
      </p>
      <ol
        className="mt-9 grid gap-2 sm:grid-cols-3"
        aria-label="Progreso del formulario"
      >
        {franchiseSteps.map((name, index) => (
          <li
            key={name}
            aria-current={step === index ? "step" : undefined}
            className={`rounded-lg border px-4 py-4 text-xs font-bold ${index === step ? "border-[#11382e] bg-[#11382e] text-[#f3f2e9]" : "border-[#173d34]/15 bg-[#fffef8] text-[#5b7568]"}`}
          >
            <span className="mr-2 opacity-70">0{index + 1}</span>
            {name}
          </li>
        ))}
      </ol>
      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-5 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6 md:p-10"
      >
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-bold">Contanos qué querés abrir</h2>
            <p className="mt-2 text-sm text-[#5b7568]">
              Identificá la marca, el sector y la ubicación prevista.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                label="Nombre de la franquicia"
                id="franchiseName"
                error={errors.franchiseName?.message}
              >
                <Input
                  id="franchiseName"
                  className="w-full"
                  aria-invalid={!!errors.franchiseName}
                  {...register("franchiseName", {
                    required: "Ingresá el nombre.",
                    minLength: { value: 2, message: "Mínimo dos caracteres." },
                  })}
                />
              </Field>
              <Field label="Sector" id="sector" error={errors.sector?.message}>
                <Select
                  id="sector"
                  aria-invalid={!!errors.sector}
                  {...register("sector", { required: "Elegí un sector." })}
                >
                  <option value="">Seleccionar</option>
                  <option>Gastronomía</option>
                  <option>Servicios</option>
                  <option>Bienestar</option>
                  <option>Educación</option>
                  <option>Otro</option>
                </Select>
              </Field>
              <Field
                label="Ciudad prevista"
                id="city"
                error={errors.city?.message}
              >
                <Input
                  id="city"
                  className="w-full"
                  aria-invalid={!!errors.city}
                  {...register("city", { required: "Ingresá la ciudad." })}
                />
              </Field>
              <Field label="País" id="country" error={errors.country?.message}>
                <Input
                  id="country"
                  className="w-full"
                  aria-invalid={!!errors.country}
                  {...register("country", { required: "Ingresá el país." })}
                />
              </Field>
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold">Costos e historial</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5b7568]">
              Incluí el costo total estimado y datos históricos de la franquicia
              o unidades comparables. Indicá la fuente. Los márgenes son
              porcentajes declarados y no proyecciones garantizadas.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                label="Costo total estimado de apertura"
                id="totalCost"
                error={errors.totalCost?.message}
              >
                <Input
                  id="totalCost"
                  type="number"
                  min="1"
                  step="0.01"
                  className="w-full"
                  aria-invalid={!!errors.totalCost}
                  {...register("totalCost", {
                    valueAsNumber: true,
                    required: "Ingresá un costo.",
                    min: { value: 1, message: "Debe ser mayor a cero." },
                  })}
                />
              </Field>
              <Field
                label="Moneda"
                id="currency"
                error={errors.currency?.message}
              >
                <Select id="currency" {...register("currency")}>
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </Select>
              </Field>
            </div>
            <div className="mt-8 space-y-4">
              {([1, 2, 3] as const).map((number) => {
                const yearKey = `year${number}` as const;
                const revenueKey = `revenue${number}` as const;
                const marginKey = `margin${number}` as const;
                return (
                  <div
                    key={number}
                    className="grid gap-4 rounded-lg bg-[#e9eee3] p-4 sm:grid-cols-3"
                  >
                    <Field
                      label={`Año ${number}`}
                      id={yearKey}
                      error={errors[yearKey]?.message}
                    >
                      <Input
                        id={yearKey}
                        type="number"
                        min="2000"
                        max="2100"
                        className="w-full"
                        aria-invalid={!!errors[yearKey]}
                        {...register(yearKey, {
                          valueAsNumber: true,
                          required: "Ingresá el año.",
                          min: 2000,
                          max: 2100,
                        })}
                      />
                    </Field>
                    <Field
                      label="Ingresos anuales (moneda elegida)"
                      id={revenueKey}
                      error={errors[revenueKey]?.message}
                    >
                      <Input
                        id={revenueKey}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full"
                        aria-invalid={!!errors[revenueKey]}
                        {...register(revenueKey, {
                          valueAsNumber: true,
                          required: "Ingresá ingresos.",
                          min: 0,
                        })}
                      />
                    </Field>
                    <Field
                      label="Margen neto (%)"
                      id={marginKey}
                      error={errors[marginKey]?.message}
                    >
                      <Input
                        id={marginKey}
                        type="number"
                        min="-100"
                        max="100"
                        step="0.01"
                        className="w-full"
                        aria-invalid={!!errors[marginKey]}
                        {...register(marginKey, {
                          valueAsNumber: true,
                          required: "Ingresá un margen.",
                          min: -100,
                          max: 100,
                        })}
                      />
                    </Field>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <Field
                label="Fuente de los datos históricos"
                id="performanceSource"
                error={errors.performanceSource?.message}
              >
                <Input
                  id="performanceSource"
                  className="w-full"
                  placeholder="Ej.: reportes del franquiciante, período y fecha"
                  aria-invalid={!!errors.performanceSource}
                  {...register("performanceSource", {
                    required: "Indicá una fuente.",
                    minLength: {
                      value: 5,
                      message: "Describí mejor la fuente.",
                    },
                  })}
                />
              </Field>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold">Operación y contexto</h2>
            <p className="mt-2 text-sm leading-6 text-[#5b7568]">
              Sumá el responsable propuesto y una descripción útil para una
              evaluación futura.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                label="Operadora o responsable previsto"
                id="operatorName"
                error={errors.operatorName?.message}
              >
                <Input
                  id="operatorName"
                  className="w-full"
                  aria-invalid={!!errors.operatorName}
                  {...register("operatorName", {
                    required: "Ingresá un responsable.",
                    minLength: { value: 2, message: "Mínimo dos caracteres." },
                  })}
                />
              </Field>
              <Field
                label="Mes estimado de apertura"
                id="estimatedOpening"
                error={errors.estimatedOpening?.message}
              >
                <Input
                  id="estimatedOpening"
                  type="month"
                  className="w-full"
                  aria-invalid={!!errors.estimatedOpening}
                  {...register("estimatedOpening", {
                    required: "Elegí un mes.",
                  })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field
                  label="Descripción de la franquicia y oportunidad"
                  id="description"
                  error={errors.description?.message}
                >
                  <Textarea
                    id="description"
                    className="min-h-44"
                    placeholder="Concepto, público, ubicación, experiencia previa y principales costos o riesgos conocidos…"
                    aria-invalid={!!errors.description}
                    {...register("description", {
                      required: "Describí la propuesta.",
                      minLength: {
                        value: 40,
                        message: "Escribí al menos 40 caracteres.",
                      },
                    })}
                  />
                </Field>
              </div>
            </div>
            <div className="mt-7 rounded-lg bg-[#e9eee3] p-5 text-xs leading-6 text-[#3e6352]">
              <strong>Antes de una apertura real</strong> se requerirían
              verificación de cifras, documentación, autorizaciones, condiciones
              contractuales y evaluación del proyecto. Este envío solo guarda
              una copia local para probar el flujo.
            </div>
          </div>
        )}
        {notice && (
          <output
            className={`mt-6 block text-xs font-bold ${notice.startsWith("Borrador") ? "text-[#276046]" : "text-[#b43a31]"}`}
          >
            {notice}
          </output>
        )}
        <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-[#173d34]/15 pt-7">
          {step > 0 && (
            <Button type="button" variant="chip" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Atrás
            </Button>
          )}
          <Button type="button" variant="chip" onClick={onSaveDraft}>
            <Save className="h-4 w-4" aria-hidden="true" /> Guardar borrador
          </Button>
          {step < 2 ? (
            <Button type="button" onClick={onNext} className="ml-auto">
              Continuar <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="ml-auto">
              <FilePenLine className="h-4 w-4" aria-hidden="true" />{" "}
              {isSubmitting ? "Guardando…" : "Guardar solicitud demo"}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold">
        {label}
      </label>
      {children}
      <p role="alert" className="mt-1 min-h-4 text-xs text-[#b43a31]">
        {error}
      </p>
    </div>
  );
}
