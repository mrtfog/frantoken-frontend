import type { UserProfile } from "../types/account.type";

export const emptyProfile: UserProfile = {
  fullName: "",
  dni: "",
  cuil: "",
  birthDate: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  phone: "",
  country: "Argentina",
  investorUpdates: false,
};

export const profileIdentityFields = [
  {
    name: "dni",
    label: "DNI",
    type: "text",
    maxLength: 9,
    autoComplete: "off",
  },
  {
    name: "cuil",
    label: "CUIL",
    type: "text",
    maxLength: 15,
    autoComplete: "off",
  },
  {
    name: "birthDate",
    label: "Fecha de nacimiento",
    type: "date",
    autoComplete: "bday",
  },
  {
    name: "province",
    label: "Provincia",
    type: "text",
    maxLength: 100,
    autoComplete: "address-level1",
  },
  {
    name: "city",
    label: "Localidad",
    type: "text",
    maxLength: 100,
    autoComplete: "address-level2",
  },
  {
    name: "address",
    label: "Dirección",
    type: "text",
    maxLength: 200,
    autoComplete: "street-address",
  },
  {
    name: "postalCode",
    label: "Código postal",
    type: "text",
    maxLength: 20,
    autoComplete: "postal-code",
  },
] as const;
