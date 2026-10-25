import type { DemoSession, SignInInput } from "../types/session.type";

const KEY = "frantoken:demo-session:v1";

export interface SessionRepository {
  getSession(): Promise<DemoSession | null>;
  signIn(input: SignInInput): Promise<DemoSession>;
  signOut(): Promise<void>;
  updateDisplayName(session: DemoSession, name: string): Promise<DemoSession>;
  subscribe(listener: (session: DemoSession | null) => void): () => void;
}

function readSession(): DemoSession | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === "object" &&
      value !== null &&
      "userId" in value &&
      "email" in value &&
      "displayName" in value &&
      typeof value.userId === "string" &&
      typeof value.email === "string" &&
      typeof value.displayName === "string"
    )
      return value as DemoSession;
  } catch {
    return null;
  }
  return null;
}

export const demoSessionRepository: SessionRepository = {
  async getSession() {
    return readSession();
  },
  async signIn(input) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const email = input.email.toLowerCase();
    const session = {
      userId: email,
      email,
      displayName: email.split("@")[0].replace(/[._-]/g, " "),
    };
    window.localStorage.setItem(KEY, JSON.stringify(session));
    return session;
  },
  async signOut() {
    window.localStorage.removeItem(KEY);
  },
  async updateDisplayName(session, name) {
    const next = { ...session, displayName: name };
    window.localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  },
  subscribe(listener) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY) listener(readSession());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  },
};
