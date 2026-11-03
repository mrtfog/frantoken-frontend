"use client";

import { Save } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { Button, Input } from "@/components/ui";
import { profileIdentityFields } from "../constants/profile.constants";
import type { ProfileProps } from "../types/account.type";

export function Profile({
  email,
  register,
  errors,
  isSubmitting,
  saved,
  error,
  localOnly,
  onSubmit,
  onEdit,
}: ProfileProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
          Datos personales
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
          Configuración
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#527164]">
          Mantené tu perfil actualizado para invertir o solicitar una
          franquicia. Tus datos personales no se publican en blockchain. Los
          cambios de identidad o domicilio requieren una nueva revisión manual.
        </p>
        {localOnly && (
          <output className="mt-4 block text-sm text-[#527164]">
            Vista previa: la API no está configurada. Los cambios se guardan
            solo en este navegador.
          </output>
        )}
        <form
          onSubmit={onSubmit}
          onChange={onEdit}
          noValidate
          aria-busy={isSubmitting}
          className="mt-9 max-w-2xl rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6 md:p-9"
        >
          <fieldset disabled={isSubmitting} className="min-w-0">
            <legend className="text-xl font-bold">Perfil</legend>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {profileIdentityFields.map((field) => (
                <div key={field.name}>
                  <label
                    className="block text-xs font-bold"
                    htmlFor={field.name}
                  >
                    {field.label}
                  </label>
                  <Input
                    id={field.name}
                    className="mt-2 w-full"
                    type={field.type}
                    autoComplete={field.autoComplete}
                    maxLength={
                      "maxLength" in field ? field.maxLength : undefined
                    }
                    inputMode={field.name === "dni" ? "numeric" : undefined}
                    required
                    {...register(field.name)}
                    aria-invalid={!!errors[field.name]}
                    aria-describedby={
                      errors[field.name] ? `${field.name}-error` : undefined
                    }
                  />
                  {errors[field.name] && (
                    <p
                      id={`${field.name}-error`}
                      className="mt-1 text-xs text-[#b43a31]"
                      role="alert"
                    >
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xs font-bold"
                >
                  Nombre completo
                </label>
                <Input
                  id="fullName"
                  className="w-full"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="mt-1 text-xs text-[#b43a31]"
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="profileEmail"
                  className="mb-2 block text-xs font-bold"
                >
                  Email de acceso
                </label>
                <Input
                  id="profileEmail"
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-[#edf0e6]"
                  aria-describedby="profileEmail-hint"
                />
                <p
                  id="profileEmail-hint"
                  className="mt-1 text-xs text-[#627d70]"
                >
                  El email de acceso no se edita desde este perfil.
                </p>
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-bold">
                  Teléfono (opcional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  className="w-full"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="mt-1 text-xs text-[#b43a31]"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-xs font-bold"
                >
                  País
                </label>
                <Input
                  id="country"
                  autoComplete="country-name"
                  minLength={2}
                  maxLength={60}
                  required
                  className="w-full"
                  aria-invalid={!!errors.country}
                  aria-describedby={
                    errors.country ? "country-error" : undefined
                  }
                  {...register("country")}
                />
                {errors.country && (
                  <p
                    id="country-error"
                    role="alert"
                    className="mt-1 text-xs text-[#b43a31]"
                  >
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <label className="mt-7 flex items-start gap-3 rounded-lg bg-[#e9eee3] p-4 text-xs leading-5">
              <input
                type="checkbox"
                className="mt-0.5 accent-[#11382e]"
                {...register("investorUpdates")}
              />
              <span>
                Guardar mi preferencia de recibir novedades de proyectos. El
                envío de correos todavía no está disponible.
              </span>
            </label>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="disabled:cursor-wait disabled:opacity-60"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Guardando…" : "Guardar cambios"}
              </Button>
              {saved && (
                <output className="text-xs font-bold text-[#276046]">
                  {localOnly
                    ? "Cambios guardados solo en este navegador."
                    : "Cambios guardados en tu cuenta."}
                </output>
              )}
              {error && (
                <p role="alert" className="text-xs text-[#b43a31]">
                  {error}
                </p>
              )}
            </div>
          </fieldset>
        </form>
      </motion.section>
    </MotionConfig>
  );
}
