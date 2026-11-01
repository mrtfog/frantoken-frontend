import { apiEnabled } from "../config/api";
import { apiSessionRepository } from "./apiSession.repository";
import { demoSessionRepository } from "./session.repository";

// Backend real si NEXT_PUBLIC_API_URL está configurada; datos demo si no.
export const sessionRepository = apiEnabled
  ? apiSessionRepository
  : demoSessionRepository;
