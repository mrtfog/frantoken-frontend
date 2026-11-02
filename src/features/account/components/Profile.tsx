"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import type { UserProfile } from "../types/account.type";

export function Profile({
  email,
  profile,
  saved,
  onSave,
  onEdit,
}: {
  email: string;
  profile: UserProfile;
  saved: boolean;
  onSave(value: UserProfile): Promise<void>;
  onEdit(): void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    defaultValues: profile,
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const [error, setError] = useState("");
  return (
    <section>
      <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
        Datos personales
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
        Configuración
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#527164]">
        Completá datos ficticios de demostración. Se guardan en tu cuenta para
        invertir o solicitar una franquicia; no se publican en blockchain.
        Cambiar los datos requiere nueva revisión manual.
      </p>
      <form
        onSubmit={handleSubmit(async (value) => {
          setError("");
          try {
            await onSave(value);
          } catch {
            setError("No se pudieron guardar los datos.");
          }
        })}
        onChange={onEdit}
        noValidate
        className="mt-9 max-w-2xl rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6 md:p-9"
      >
        <h2 className="text-xl font-bold">Perfil</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {(
            [
              ["dni", "DNI"],
              ["cuil", "CUIL"],
              ["birthDate", "Fecha de nacimiento"],
              ["province", "Provincia"],
              ["city", "Localidad"],
              ["address", "Dirección"],
              ["postalCode", "Código postal"],
            ] as const
          ).map(([field, label]) => (
            <label
              key={field}
              className="block text-xs font-bold"
              htmlFor={field}
            >
              {label}
              <Input
                id={field}
                className="mt-2 w-full"
                type={field === "birthDate" ? "date" : "text"}
                {...register(field, { required: "Completá este dato." })}
                aria-invalid={Boolean(errors[field])}
              />
              {errors[field] && (
                <span className="text-red-800">{errors[field]?.message}</span>
              )}
            </label>
          ))}
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="mb-2 block text-xs font-bold">
              Nombre completo
            </label>
            <Input
              id="fullName"
              className="w-full"
              aria-invalid={!!errors.fullName}
              {...register("fullName", {
                required: "Ingresá tu nombre.",
                minLength: { value: 2, message: "Mínimo dos caracteres." },
              })}
            />
            <p role="alert" className="mt-1 text-xs text-[#b43a31]">
              {errors.fullName?.message}
            </p>
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
              value={email}
              readOnly
              className="w-full bg-[#edf0e6]"
            />
            <p className="mt-1 text-xs text-[#627d70]">
              El email pertenece a la sesión demo y no se edita desde este
              perfil.
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
              className="w-full"
              {...register("phone", { maxLength: 30 })}
            />
          </div>
          <div>
            <label htmlFor="country" className="mb-2 block text-xs font-bold">
              País
            </label>
            <Input
              id="country"
              autoComplete="country-name"
              className="w-full"
              aria-invalid={!!errors.country}
              {...register("country", {
                required: "Ingresá un país.",
                minLength: { value: 2, message: "Mínimo dos caracteres." },
              })}
            />
            <p role="alert" className="mt-1 text-xs text-[#b43a31]">
              {errors.country?.message}
            </p>
          </div>
        </div>
        <label className="mt-7 flex items-start gap-3 rounded-lg bg-[#e9eee3] p-4 text-xs leading-5">
          <input
            type="checkbox"
            className="mt-0.5 accent-[#11382e]"
            {...register("investorUpdates")}
          />
          <span>
            Recibir novedades de proyectos (preferencia demo; no se envían
            emails).
          </span>
        </label>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? "Guardando…" : "Guardar cambios"}
          </Button>
          {saved && (
            <output className="text-xs font-bold text-[#276046]">
              Cambios guardados en este navegador.
            </output>
          )}
          {error && (
            <p role="alert" className="text-xs text-[#b43a31]">
              {error}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
