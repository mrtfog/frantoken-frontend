import { z } from "zod";
import type { SessionRepository } from "../repositories/session.repository";
import type {
  DemoSession,
  RegisterInput,
  SignInInput,
} from "../types/session.type";

const signInSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8),
});

const registerSchema = signInSchema.extend({
  displayName: z.string().trim().min(2).max(120),
  password: z.string().min(8).max(200),
});

export async function registerAccount(
  input: RegisterInput,
  repository: SessionRepository,
): Promise<DemoSession> {
  const result = registerSchema.safeParse(input);
  if (!result.success)
    throw new Error(
      "Revisá tu nombre (2 a 120 caracteres), email y contraseña (8 a 200 caracteres).",
    );
  return repository.register(result.data);
}

export async function signIn(
  input: SignInInput,
  repository: SessionRepository,
): Promise<DemoSession> {
  const result = signInSchema.safeParse(input);
  if (!result.success)
    throw new Error("Revisá el email y la contraseña (mínimo 8 caracteres).");
  return repository.signIn(result.data);
}
