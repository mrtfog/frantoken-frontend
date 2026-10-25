import { z } from "zod";
import type { SessionRepository } from "../repositories/session.repository";
import type { DemoSession, SignInInput } from "../types/session.type";

const signInSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8),
});

export async function signIn(
  input: SignInInput,
  repository: SessionRepository,
): Promise<DemoSession> {
  const result = signInSchema.safeParse(input);
  if (!result.success)
    throw new Error("Revisá el email y la contraseña (mínimo 8 caracteres).");
  return repository.signIn(result.data);
}
