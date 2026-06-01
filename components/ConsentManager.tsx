"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ConsentState = "granted" | "denied" | "unknown";
const KEY = "instagram-consent";

interface ConsentCtx {
  consent: ConsentState;
  grant: () => void;
  deny: () => void;
  reset: () => void;
}

const Ctx = createContext<ConsentCtx | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("unknown");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "granted" || stored === "denied") setConsent(stored);
    } catch {
      /* localStorage unavailable — stay 'unknown' */
    }
  }, []);

  const grant = () => {
    try {
      localStorage.setItem(KEY, "granted");
    } catch {}
    setConsent("granted");
  };
  const deny = () => {
    try {
      localStorage.setItem(KEY, "denied");
    } catch {}
    setConsent("denied");
  };
  const reset = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setConsent("unknown");
  };

  return <Ctx.Provider value={{ consent, grant, deny, reset }}>{children}</Ctx.Provider>;
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
