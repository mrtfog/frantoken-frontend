"use client";

import { ArrowRight, LockKeyhole, UserRoundPlus } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AuthFormProps } from "../types/auth.type";

export function AuthForm({
  mode,
  nameField,
  emailField,
  passwordField,
  errors,
  isSubmitting,
  message,
  onSubmit,
}: AuthFormProps) {
  const isRegister = mode === "register";

  return (
    <MotionConfig reducedMotion="user">
      <div id="inicio" className="min-h-screen bg-[#f3f2e9] text-[#11382e]">
        <AnnouncementBanner />
        <SiteHeader />
        <main className="grid min-h-[calc(100vh-280px)] lg:grid-cols-2">
          <section className="relative overflow-hidden bg-[#092f2a] px-5 py-16 text-[#f3f2e9] sm:px-10 lg:px-16 lg:py-24">
            <div
              className="absolute -right-32 -bottom-40 h-[500px] w-[500px] rounded-full border-[70px] border-[#d5f36a]/10"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-xl">
              <p className="text-[11px] font-black tracking-[0.18em] text-[#d5f36a] uppercase">
                FranToken / {isRegister ? "Creá tu cuenta" : "Tu cuenta"}
              </p>
              <h1 className="mt-12 font-serif text-[clamp(50px,6vw,82px)] leading-[1.02] tracking-[-0.06em]">
                {isRegister
                  ? "Tu próximo paso empieza acá."
                  : "Bienvenido de nuevo."}
              </h1>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#c2d9c9]">
                {isRegister
                  ? "Creá tu cuenta para explorar proyectos de franquicia, completar tu perfil y gestionar tus solicitudes desde un mismo lugar."
                  : "Ingresá para consultar tus tokens, seguir tus solicitudes y mantener tu perfil al día."}
              </p>
              <Link
                href="/marketplace"
                className="mt-10 inline-flex items-center gap-2 text-[13px] font-bold text-[#d5f36a] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5f36a]"
              >
                Explorar proyectos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
          <section className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mx-auto w-full max-w-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5eccf]">
                {isRegister ? (
                  <UserRoundPlus className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <LockKeyhole className="h-5 w-5" aria-hidden="true" />
                )}
              </div>
              <h2 className="mt-7 font-serif text-[36px] leading-tight tracking-tight">
                {isRegister ? "Creá tu cuenta" : "Iniciá sesión"}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5f7969]">
                {isRegister
                  ? "Completá tus datos para empezar. Después podrás configurar tu perfil."
                  : "Ingresá con tu correo electrónico y contraseña para continuar."}
              </p>
              <form
                className="mt-9"
                onSubmit={onSubmit}
                noValidate
                aria-busy={isSubmitting}
              >
                <fieldset disabled={isSubmitting} className="min-w-0 space-y-5">
                  <legend className="sr-only">
                    {isRegister ? "Datos de registro" : "Datos de acceso"}
                  </legend>
                  {isRegister && (
                    <div>
                      <label
                        htmlFor="auth-name"
                        className="block text-[12px] font-bold"
                      >
                        Nombre
                      </label>
                      <Input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={120}
                        placeholder="Tu nombre"
                        className="mt-2 w-full"
                        aria-invalid={!!errors.displayName}
                        aria-describedby={
                          errors.displayName ? "auth-name-error" : undefined
                        }
                        {...nameField}
                      />
                      {errors.displayName && (
                        <p
                          id="auth-name-error"
                          className="mt-2 text-xs text-[#b43a31]"
                          role="alert"
                        >
                          {errors.displayName.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="auth-email"
                      className="block text-[12px] font-bold"
                    >
                      Correo electrónico
                    </label>
                    <Input
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      required
                      placeholder="nombre@ejemplo.com"
                      className="mt-2 w-full"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "auth-email-error" : undefined
                      }
                      {...emailField}
                    />
                    {errors.email && (
                      <p
                        id="auth-email-error"
                        className="mt-2 text-xs text-[#b43a31]"
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="auth-password"
                      className="block text-[12px] font-bold"
                    >
                      Contraseña
                    </label>
                    <Input
                      id="auth-password"
                      type="password"
                      autoComplete={
                        isRegister ? "new-password" : "current-password"
                      }
                      required
                      minLength={8}
                      maxLength={isRegister ? 200 : undefined}
                      placeholder={
                        isRegister ? "Mínimo 8 caracteres" : "Tu contraseña"
                      }
                      className="mt-2 w-full"
                      aria-invalid={!!errors.password}
                      aria-describedby={
                        errors.password
                          ? "auth-password-error"
                          : isRegister
                            ? "auth-password-hint"
                            : undefined
                      }
                      {...passwordField}
                    />
                    {errors.password ? (
                      <p
                        id="auth-password-error"
                        className="mt-2 text-xs text-[#b43a31]"
                        role="alert"
                      >
                        {errors.password.message}
                      </p>
                    ) : isRegister ? (
                      <p
                        id="auth-password-hint"
                        className="mt-2 text-xs text-[#5f7969]"
                      >
                        Usá al menos ocho caracteres.
                      </p>
                    ) : null}
                  </div>
                  {message && (
                    <p
                      className="rounded-lg border border-[#b43a31]/30 bg-[#b43a31]/5 p-3 text-[13px] text-[#b43a31]"
                      role="alert"
                    >
                      {message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    variant="dark"
                    disabled={isSubmitting}
                    className="w-full disabled:cursor-wait disabled:opacity-60"
                  >
                    <span aria-live="polite">
                      {isSubmitting
                        ? isRegister
                          ? "Creando cuenta…"
                          : "Ingresando…"
                        : isRegister
                          ? "Crear cuenta"
                          : "Iniciar sesión"}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </fieldset>
              </form>
              <p className="mt-7 border-t border-[#173d34]/15 pt-6 text-[13px]">
                {isRegister
                  ? "¿Ya tenés una cuenta?"
                  : "¿Todavía no tenés cuenta?"}{" "}
                <Link
                  href={isRegister ? "/ingresar" : "/registro"}
                  className="font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173d34]"
                >
                  {isRegister ? "Iniciá sesión" : "Creá tu cuenta"}
                </Link>
              </p>
            </motion.div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
