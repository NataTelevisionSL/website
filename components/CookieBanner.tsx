"use client";
import Link from "next/link";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { useLang } from "@/contexts/LanguageContext";

export default function CookieBanner() {
  const { t } = useLang();
  const { settingsOpen, accept, reject } = useCookieConsent();
  const c = t.cookies;

  if (!settingsOpen) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[10000] p-4 md:p-6 pointer-events-none"
      role="dialog"
      aria-label={c.title}
    >
      <div className="mx-auto max-w-3xl pointer-events-auto border border-neutral-700 bg-black/95 backdrop-blur-sm px-5 py-5 md:px-7 md:py-6 shadow-2xl">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{c.title}</p>
        <p className="text-sm text-neutral-300 leading-relaxed mb-5">
          {c.body}{" "}
          <Link href="/legal/cookies" className="text-rose-400 hover:underline underline-offset-4">
            {c.policyLink}
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={accept}
            className="border border-white text-white text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-white hover:text-black transition"
          >
            {c.accept}
          </button>
          <button
            type="button"
            onClick={reject}
            className="border border-neutral-600 text-neutral-300 text-xs uppercase tracking-widest px-5 py-2.5 hover:border-neutral-400 transition"
          >
            {c.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
