"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const LEGACY_STORAGE_KEY = "nata-cookie-consent";

type ConsentState = "pending" | "dismissed";

type CookieConsentContextType = {
  consent: ConsentState;
  accept: () => void;
  reject: () => void;
  openSettings: () => void;
  settingsOpen: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: "pending",
  accept: () => {},
  reject: () => {},
  openSettings: () => {},
  settingsOpen: false,
});

const POST_SPLASH_DELAY_MS = 1800;

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [autoPromptReady, setAutoPromptReady] = useState(false);

  // Clear any previously saved choice so the notice can appear on each visit.
  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {}
  }, []);

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

  const dismiss = () => {
    setConsent("dismissed");
    setSettingsOpen(false);
  };

  const autoShow = consent === "pending" && autoPromptReady;

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        accept: dismiss,
        reject: dismiss,
        openSettings: () => setSettingsOpen(true),
        settingsOpen: settingsOpen || autoShow,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
