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

const POST_SPLASH_DELAY_MS = 1800;

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [autoPromptReady, setAutoPromptReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CookieConsentValue | null;
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Show the first-visit banner only after the intro splash finishes + a short beat.
  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | undefined;

    function onSplashDone() {
      delayTimer = setTimeout(() => setAutoPromptReady(true), POST_SPLASH_DELAY_MS);
    }

    window.addEventListener("nata:splash-done", onSplashDone);
    return () => {
      window.removeEventListener("nata:splash-done", onSplashDone);
      clearTimeout(delayTimer);
    };
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
  const autoShow = hydrated && effective === "pending" && autoPromptReady;

  return (
    <CookieConsentContext.Provider
      value={{
        consent: effective,
        mediaAllowed: effective === "accepted",
        accept: () => persist("accepted"),
        reject: () => persist("rejected"),
        openSettings: () => setSettingsOpen(true),
        settingsOpen: settingsOpen || autoShow,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
