"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/ui";
import { useSession } from "@/core/hooks/SessionProvider";
import type { SignInInput } from "@/core/types/session.type";

export function SignIn({ mode = "login" }: { mode?: "login" | "register" }) {
  const router = useRouter();
  const { signIn, register: registerAccount } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const onSubmit = handleSubmit(async (values) => {
    setMessage("");
    try {
      if (mode === "register")
        await registerAccount({ ...values, displayName });
      else await signIn(values);
      router.push(
        mode === "register" ? "/mi-cuenta/configuracion" : "/mi-cuenta",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo iniciar la sesión demo.",
      );
    }
  });

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-[calc(100vh-300px)] bg-[#e9ecdf] px-5 py-14 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto grid max-w-[1050px] overflow-hidden rounded-[20px] bg-[#fffef8] shadow-[0_24px_80px_#09262a14] md:grid-cols-2"
        >
          <div className="bg-[#092f2a] p-9 text-[#f3f2e9] md:p-14">
            <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#d5f36a]">
              Tu espacio FranToken
            </p>
            <h1 className="mt-10 text-5xl leading-[1.03] font-bold tracking-tight md:text-6xl">
              Una vista clara de cada paso.
            </h1>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[#c2d6ca]">
              Comprá tokens con pago simulado y consultá tus ingresos en la red
              local. Vinculá tu wallet para comprar y cobrar.
            </p>
            <div className="mt-14 flex items-start gap-3 border-t border-white/20 pt-6 text-xs leading-5 text-[#c2d6ca]">
              <ShieldCheck
                className="h-5 w-5 shrink-0 text-[#d5f36a]"
                aria-hidden="true"
              />{" "}
              Sin dinero real. La API valida tu acceso y la wallet firma la
              aceptación de términos y el cobro.
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col justify-center p-9 md:p-14"
          >
            {mode === "register" && (
              <label className="mb-5 block text-sm" htmlFor="register-name">
                Nombre visible
                <Input
                  id="register-name"
                  className="mt-2 w-full"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  minLength={2}
                  maxLength={120}
                  required
                />
              </label>
            )}
            <span className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
              Acceso demo
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {mode === "register" ? "Creá tu cuenta" : "Ingresá a tu cuenta"}
            </h2>
            <p className="mt-3 mb-9 text-sm leading-6 text-[#587166]">
              Usá una cuenta registrada. Para la demostración, completá datos
              ficticios y una contraseña de al menos ocho caracteres.
            </p>
            <label htmlFor="email" className="mb-2 text-xs font-bold">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className="mb-2 w-full"
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Ingresá tu email.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresá un email válido.",
                },
              })}
            />
            <p className="min-h-6 text-xs text-[#b43a31]" role="alert">
              {errors.email?.message}
            </p>
            <label htmlFor="password" className="mb-2 mt-3 text-xs font-bold">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              className="mb-2 w-full"
              aria-invalid={!!errors.password}
              {...register("password", {
                required: "Ingresá una contraseña.",
                minLength: {
                  value: 8,
                  message: "Usá al menos ocho caracteres.",
                },
              })}
            />
            <p className="min-h-6 text-xs text-[#b43a31]" role="alert">
              {errors.password?.message}
            </p>
            {message && (
              <p className="mt-3 text-xs text-[#b43a31]" role="alert">
                {message}
              </p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 w-full justify-between"
            >
              {isSubmitting
                ? "Procesando…"
                : mode === "register"
                  ? "Crear cuenta"
                  : "Entrar al panel"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </motion.div>
      </main>
    </MotionConfig>
  );
}
