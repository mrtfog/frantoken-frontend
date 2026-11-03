import type { FieldErrors, Resolver } from "react-hook-form";
import { profileSchema } from "../schemas/profile.schema";
import type { UserProfile } from "../types/account.type";

export const profileFormResolver: Resolver<UserProfile> = (values) => {
  const result = profileSchema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors: FieldErrors<UserProfile> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof UserProfile;
    if (field && !errors[field])
      errors[field] = { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
};
