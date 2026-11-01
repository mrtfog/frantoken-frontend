import { apiEnabled } from "@/core/config/api";
import { demoAccountRepository } from "./account.repository";
import { apiAccountRepository } from "./apiAccount.repository";

// Backend real si NEXT_PUBLIC_API_URL está configurada; datos demo si no.
export const accountRepository = apiEnabled
  ? apiAccountRepository
  : demoAccountRepository;
