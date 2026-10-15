"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const STORAGE_KEY = "nata-cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";
type ConsentState = CookieConsentValue | "pending";

type CookieConsentContextType = {
  consent: ConsentState;
  mediaAllowed: boolean;
  accept: () => void;
  reject: () => void;
  openSettings: () => void;
  settingsOpen: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: "pending",
  mediaAllowed: false,
  accept: () => {},
  reject: () => {},
  openSettings: () => {},
  settingsOpen: false,
});

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CookieConsentValue | null;
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
      }
    } catch {}
    setHydrated(true);
  }, []);

  const persist = (value: CookieConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setConsent(value);
    setSettingsOpen(false);
  };

  // Avoid flash: treat as pending until we read storage
  const effective: ConsentState = hydrated ? consent : "pending";

  return (
    <CookieConsentContext.Provider
      value={{
        consent: effective,
        mediaAllowed: effective === "accepted",
        accept: () => persist("accepted"),
        reject: () => persist("rejected"),
        openSettings: () => setSettingsOpen(true),
        settingsOpen: settingsOpen || (hydrated && effective === "pending"),
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
