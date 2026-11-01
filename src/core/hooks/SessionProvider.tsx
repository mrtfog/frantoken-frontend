"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { sessionRepository } from "../repositories/activeSession.repository";
import { signIn } from "../services/session.service";
import type { DemoSession, SignInInput } from "../types/session.type";

type SessionContextValue = {
  session: DemoSession | null;
  ready: boolean;
  signIn(input: SignInInput): Promise<void>;
  signOut(): Promise<void>;
  updateDisplayName(name: string): Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    sessionRepository.getSession().then((value) => {
      if (active) {
        setSession(value);
        setReady(true);
      }
    });
    const unsubscribe = sessionRepository.subscribe((value) => {
      if (active) setSession(value);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        ready,
        async signIn(input) {
          setSession(await signIn(input, sessionRepository));
        },
        async signOut() {
          await sessionRepository.signOut();
          setSession(null);
        },
        async updateDisplayName(name) {
          if (!session) return;
          setSession(
            await sessionRepository.updateDisplayName(session, name),
          );
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("SessionProvider faltante");
  return value;
}
