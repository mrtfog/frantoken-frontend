import type {
  DemoSession,
  RegisterInput,
  SignInInput,
} from "../types/session.type";

const KEY = "frantoken:demo-session:v1";
const sessionListeners = new Set<(session: DemoSession | null) => void>();

export interface SessionRepository {
  getSession(): Promise<DemoSession | null>;
  register(input: RegisterInput): Promise<DemoSession>;
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
  async register(input) {
    return this.signIn(input);
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
    for (const listener of sessionListeners) listener(next);
    return next;
  },
  subscribe(listener) {
    sessionListeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY) listener(readSession());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      sessionListeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
};
