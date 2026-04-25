"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang, translations } from "@/data/translations";

type T = (typeof translations)[Lang];

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem("nata-lang") as Lang | null;
    if (stored && (["en", "es", "ca"] as Lang[]).includes(stored)) return stored;
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("ca")) return "ca";
    if (browser.startsWith("es")) return "es";
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  const setLang = (l: Lang) => {
    localStorage.setItem("nata-lang", l);
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
