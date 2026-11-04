import type { FieldErrors, Resolver } from "react-hook-form";
import {
  type ApplicationEditValues,
  applicationEditSchema,
} from "../types/franchise.type";

export const applicationResolver: Resolver<ApplicationEditValues> = (
  values,
) => {
  const result = applicationEditSchema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors: FieldErrors<ApplicationEditValues> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ApplicationEditValues;
    if (field && !errors[field])
      errors[field] = { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
};
