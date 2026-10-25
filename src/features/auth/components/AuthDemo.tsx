"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthDemo({ mode }: { mode: "login" | "register" }) {
  const [submitted, setSubmitted] = useState(false);
  const isRegister = mode === "register";

  return (
    <div id="inicio" className="min-h-screen bg-[#f3f2e9] text-[#11382e]">
      <AnnouncementBanner demo />
      <SiteHeader />
      <main className="grid min-h-[calc(100vh-280px)] lg:grid-cols-2">
        <section className="relative overflow-hidden bg-[#092f2a] px-5 py-16 text-[#f3f2e9] sm:px-10 lg:px-16 lg:py-24">
          <div
            className="absolute -right-32 -bottom-40 h-[500px] w-[500px] rounded-full border-[70px] border-[#d5f36a]/10"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-xl">
            <p className="text-[11px] font-black tracking-[0.18em] text-[#d5f36a] uppercase">
              FranToken / Acceso demo
            </p>
            <h1 className="mt-12 font-serif text-[clamp(50px,6vw,82px)] leading-[1.02] tracking-[-0.06em]">
              {isRegister ? "Empezá a explorar." : "Bienvenido de nuevo."}
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#c2d9c9]">
              Este acceso muestra cómo se vería el recorrido de cuenta. No crea
              usuarios, verifica identidad, guarda datos ni habilita compras.
            </p>
            <Link
              href="/marketplace"
              className="mt-10 inline-flex items-center gap-2 text-[13px] font-bold text-[#d5f36a] hover:underline"
            >
              Volver al marketplace{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="flex items-center px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5eccf]">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-7 font-serif text-[36px] leading-tight tracking-tight">
              {isRegister ? "Registrarse" : "Iniciar sesión"}
            </h2>
            <p className="mt-2 text-[13px] text-[#5f7969]">
              Formulario de prueba. No ingreses credenciales reales.
            </p>
            <form
              className="mt-9 space-y-5"
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              {isRegister && (
                <label
                  htmlFor="demo-name"
                  className="block text-[12px] font-bold"
                >
                  Nombre de ejemplo
                  <Input
                    id="demo-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className="mt-2 w-full"
                  />
                </label>
              )}
              <label
                htmlFor="demo-email"
                className="block text-[12px] font-bold"
              >
                Correo de ejemplo
                <Input
                  id="demo-email"
                  type="email"
                  name="email"
                  required
                  placeholder="nombre@ejemplo.com"
                  className="mt-2 w-full"
                />
              </label>
              <label
                htmlFor="demo-password"
                className="block text-[12px] font-bold"
              >
                Contraseña de ejemplo
                <Input
                  id="demo-password"
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                  className="mt-2 w-full"
                />
              </label>
              <Button type="submit" variant="dark" className="w-full">
                {isRegister ? "Crear cuenta demo" : "Entrar a la demo"}{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
            {submitted && (
              <output className="mt-5 rounded-lg border border-[#7daa68] bg-[#ecf4d9] p-4 text-[12px] leading-relaxed">
                Esta acción es solo una demostración. No se creó ninguna cuenta
                ni se enviaron datos.
              </output>
            )}
            <p className="mt-7 border-t border-[#173d34]/15 pt-6 text-[13px]">
              {isRegister ? "¿Ya tenés una cuenta?" : "¿Aún no tenés cuenta?"}{" "}
              <Link
                href={isRegister ? "/ingresar" : "/registro"}
                className="font-bold underline underline-offset-4"
              >
                {isRegister ? "Iniciar sesión" : "Registrarse"}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
