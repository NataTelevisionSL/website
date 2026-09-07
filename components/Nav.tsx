"use client";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";
import SectionLink from "@/components/SectionLink";

export default function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <>
      {/* ANELL PERIMETRAL */}
      <div className="fixed inset-0 m-0 pointer-events-none z-[40]" aria-hidden="true">
        <div className="absolute inset-0 ring-2 ring-rose-500/50" />
      </div>

      {/* TOP BAR GRADIENT */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-[45]" aria-hidden="true" />

      {/* LOGO */}
      <SectionLink
        href="/"
        section="top"
        className="fixed left-6 top-6 z-[50] hover:opacity-90 transition"
        aria-label="Home"
      >
        <Image src="/svg/logo.svg" alt="Nata TV" width={140} height={40} />
      </SectionLink>

      {/* ACADEMIA NAV — hidden, uncomment to restore
      <Link
        href="/academia"
        className="fixed left-6 top-[70px] z-[50] w-[140px] text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-500 hover:text-rose-500 transition"
      >
        | {t.academia.label} |
      </Link>
      */}

      {/* LANG + MADUIXA (top right) */}
      <div className="fixed right-6 top-6 z-[50] flex items-center gap-3">
        <div className="flex overflow-hidden text-[11px] font-semibold tracking-widest uppercase">
          {(["en", "es", "ca"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 transition ${
                lang === l
                  ? "bg-neutral-200 text-neutral-900"
                  : "bg-black/80 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <SectionLink
          href="/studio"
          section="studio"
          className="hover:opacity-90 transition"
          aria-label="Studio"
        >
          <Image src="/svg/strawberry.svg" alt="mark" width={40} height={40} />
        </SectionLink>
      </div>

      {/* COPYRIGHT */}
      <div className="fixed bottom-5 right-6 z-[50] flex items-center gap-3 text-xs uppercase tracking-wide">
        <SectionLink
          href="/"
          section="top"
          className="opacity-80 text-rose-600 font-bold hover:opacity-100 transition md:text-sm"
        >
          NATA TELEVISION ©
        </SectionLink>
      </div>
    </>
  );
}
