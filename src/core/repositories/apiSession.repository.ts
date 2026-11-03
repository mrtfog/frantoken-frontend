import { apiFetch, clearToken, getToken, setToken } from "../config/api.config";
import type {
  DemoSession,
  RegisterInput,
  SignInInput,
} from "../types/session.type";
import type { SessionRepository } from "./session.repository";

// Persistimos la sesión (sin el token) para rehidratar al recargar. El token
// vive aparte (config/api) y se adjunta como Bearer en cada pedido.
const SESSION_KEY = "frantoken:session:v1";

type AuthResponse = { token: string; session: DemoSession };
type SessionResponse = { session: DemoSession };

function writeSession(session: DemoSession): void {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Se ignora.
  }
}

function removeSession(): void {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // Se ignora.
  }
}

/** Implementación de SessionRepository contra la API real (/api/auth). */
export const apiSessionRepository: SessionRepository = {
  async getSession() {
    if (!getToken()) return null;
    try {
      const { session } = await apiFetch<SessionResponse>("/api/auth/session");
      writeSession(session);
      return session;
    } catch {
      removeSession();
      return null;
    }
  },

  async register(input: RegisterInput) {
    const { token, session } = await apiFetch<AuthResponse>(
      "/api/auth/register",
      { method: "POST", body: input },
    );
    setToken(token);
    writeSession(session);
    return session;
  },
  async signIn(input: SignInInput) {
    const { token, session } = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: input,
    });
    setToken(token);
    writeSession(session);
    return session;
  },

  async signOut() {
    // Con JWT stateless el logout es del cliente; avisamos por simetría.
    await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    clearToken();
    removeSession();
  },

  async updateDisplayName(_session, name) {
    const { session } = await apiFetch<SessionResponse>(
      "/api/auth/display-name",
      { method: "PATCH", body: { displayName: name } },
    );
    writeSession(session);
    return session;
  },

  subscribe(listener) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === SESSION_KEY) void this.getSession().then(listener);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  },
};
