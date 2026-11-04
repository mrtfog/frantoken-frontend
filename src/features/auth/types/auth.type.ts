import type { FormEventHandler } from "react";
import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import type { RegisterInput } from "@/core/types/session.type";

export type AuthMode = "login" | "register";

export type AuthFormProps = {
  mode: AuthMode;
  nameField: UseFormRegisterReturn<"displayName">;
  emailField: UseFormRegisterReturn<"email">;
  passwordField: UseFormRegisterReturn<"password">;
  errors: FieldErrors<RegisterInput>;
  isSubmitting: boolean;
  message: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
};
