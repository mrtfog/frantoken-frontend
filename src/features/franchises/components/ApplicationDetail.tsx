"use client";
import { MotionConfig, motion } from "motion/react";
import { Button, ButtonLink, Input, Select, Textarea } from "@/components/ui";
import { applicationFields } from "../constants/franchise.constants";
import type { ApplicationDetailProps } from "../types/franchise.type";
import { FranchiseHistory } from "./FranchiseHistory";

export function ApplicationDetail({
  detail,
  register,
  errors,
  busy,
  message,
  error,
  onSubmit,
  onRefresh,
}: ApplicationDetailProps) {
  const { application, capabilities } = detail;
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ButtonLink variant="chip" href="/mi-cuenta/solicitudes">
          Mis solicitudes
        </ButtonLink>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
          {application.franchiseName}
        </h1>
        <p className="mt-4 text-sm text-[#527164]">
          Estado: <strong>{application.status}</strong> · Versión{" "}
          {application.version}
        </p>
        {application.reviewNote && (
          <p className="mt-5 rounded-lg border border-[#173d34]/20 bg-[#e5ecd8] p-4 text-sm">
            Observación: {application.reviewNote}
          </p>
        )}
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#527164]">
          {capabilities.canEdit
            ? "Podés corregir los datos y reenviar la solicitud. Los cambios dejan sin efecto una aprobación previa y requieren nueva revisión."
            : "La publicación ya está iniciada o confirmada. Los datos admitidos quedan protegidos."}
        </p>
        {application.projectId && application.status === "Publicada" && (
          <ButtonLink
            className="mt-5"
            href={`/mi-cuenta/franquicias/${application.projectId}`}
          >
            Gestionar franquicia
          </ButtonLink>
        )}
        <form
          onSubmit={onSubmit}
          noValidate
          aria-busy={busy}
          className="mt-7 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6 md:p-8"
        >
          <fieldset
            disabled={busy || !capabilities.canEdit}
            className="min-w-0"
          >
            <legend className="text-xl font-bold">Datos de la solicitud</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {applicationFields.map((field) => (
                <div key={field.name}>
                  <label
                    className="mb-2 block text-xs font-bold"
                    htmlFor={`application-${field.name}`}
                  >
                    {field.label}
                  </label>
                  <Input
                    id={`application-${field.name}`}
                    type={field.type}
                    maxLength={field.maxLength}
                    step={field.type === "number" ? "0.01" : undefined}
                    className="w-full disabled:opacity-80"
                    {...register(field.name)}
                    aria-invalid={!!errors[field.name]}
                    aria-describedby={
                      errors[field.name] ? `${field.name}-error` : undefined
                    }
                  />
                  {errors[field.name] && (
                    <p
                      role="alert"
                      id={`${field.name}-error`}
                      className="mt-1 text-xs text-[#b43a31]"
                    >
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <label
                  htmlFor="application-currency"
                  className="mb-2 block text-xs font-bold"
                >
                  Moneda de la estimación
                </label>
                <Select id="application-currency" {...register("currency")}>
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="application-description"
                  className="mb-2 block text-xs font-bold"
                >
                  Descripción del proyecto
                </label>
                <Textarea
                  id="application-description"
                  className="w-full"
                  maxLength={4000}
                  {...register("description")}
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                />
                {errors.description && (
                  <p
                    id="description-error"
                    role="alert"
                    className="mt-1 text-xs text-[#b43a31]"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            {capabilities.canEdit && (
              <Button
                type="submit"
                disabled={busy}
                className="mt-7 disabled:opacity-50"
              >
                {busy ? "Guardando…" : "Guardar y reenviar a revisión"}
              </Button>
            )}
          </fieldset>
          <div className="mt-5 space-y-3">
            {error && (
              <p role="alert" className="text-sm text-[#b43a31]">
                {error}
              </p>
            )}
            {message && (
              <output className="block text-sm text-[#276046]">
                {message}
              </output>
            )}
            <Button variant="chip" onClick={onRefresh} disabled={busy}>
              Actualizar datos
            </Button>
          </div>
        </form>
        <FranchiseHistory events={detail.history} />
      </motion.section>
    </MotionConfig>
  );
}
