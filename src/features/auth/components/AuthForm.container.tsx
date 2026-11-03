"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/core/hooks/SessionProvider";
import type { RegisterInput } from "@/core/types/session.type";
import type { AuthMode } from "../types/auth.type";
import { AuthForm } from "./AuthForm";

export function AuthFormContainer({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { signIn, register: registerAccount } = useSession();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    defaultValues: { displayName: "", email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const isRegister = mode === "register";
  const onSubmit = handleSubmit(async (values) => {
    setMessage("");
    try {
      if (isRegister) await registerAccount(values);
      else await signIn({ email: values.email, password: values.password });
      router.replace(isRegister ? "/mi-cuenta/configuracion" : "/mi-cuenta");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : isRegister
            ? "No pudimos crear tu cuenta. Intentá de nuevo."
            : "No pudimos iniciar sesión. Intentá de nuevo.",
      );
    }
  });

  return (
    <AuthForm
      mode={mode}
      nameField={register("displayName", {
        setValueAs: (value: string) => value.trim(),
        ...(isRegister && {
          required: "Ingresá tu nombre.",
          minLength: { value: 2, message: "Usá al menos dos caracteres." },
          maxLength: { value: 120, message: "Usá hasta 120 caracteres." },
        }),
      })}
      emailField={register("email", {
        setValueAs: (value: string) => value.trim(),
        required: "Ingresá tu correo electrónico.",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Ingresá un correo electrónico válido.",
        },
      })}
      passwordField={register("password", {
        required: "Ingresá tu contraseña.",
        minLength: { value: 8, message: "Usá al menos ocho caracteres." },
        ...(isRegister && {
          maxLength: { value: 200, message: "Usá hasta 200 caracteres." },
        }),
      })}
      errors={errors}
      isSubmitting={isSubmitting}
      message={message}
      onSubmit={onSubmit}
    />
  );
}
