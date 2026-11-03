import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre completo (mínimo dos caracteres).")
    .max(100, "El nombre admite hasta 100 caracteres."),
  dni: z
    .string()
    .trim()
    .regex(/^\d{7,9}$/, "Ingresá un DNI de 7 a 9 dígitos, sin puntos."),
  cuil: z
    .string()
    .transform((value) => value.replace(/[- ]/g, ""))
    .pipe(z.string().regex(/^\d{11}$/, "Ingresá un CUIL de 11 dígitos.")),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ingresá tu fecha de nacimiento.")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00Z`);
      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value &&
        value <= new Date().toISOString().slice(0, 10)
      );
    }, "Ingresá una fecha de nacimiento válida que no sea futura."),
  province: z
    .string()
    .trim()
    .min(2, "Ingresá tu provincia.")
    .max(100, "La provincia admite hasta 100 caracteres."),
  city: z
    .string()
    .trim()
    .min(2, "Ingresá tu localidad.")
    .max(100, "La localidad admite hasta 100 caracteres."),
  address: z
    .string()
    .trim()
    .min(5, "Ingresá una dirección de al menos cinco caracteres.")
    .max(200, "La dirección admite hasta 200 caracteres."),
  postalCode: z
    .string()
    .trim()
    .min(3, "Ingresá un código postal de al menos tres caracteres.")
    .max(20, "El código postal admite hasta 20 caracteres."),
  phone: z.string().trim().max(30, "El teléfono admite hasta 30 caracteres."),
  country: z
    .string()
    .trim()
    .min(2, "Ingresá tu país.")
    .max(60, "El país admite hasta 60 caracteres."),
  investorUpdates: z.boolean(),
});
