"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";
import { Lang } from "@/data/translations";

export default function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <>
      {/* ANELL PERIMETRAL */}
      <div className="fixed inset-0 m-0 pointer-events-none z-[40]" aria-hidden="true">
        <div className="absolute inset-0 ring-2 ring-rose-500/50" />
      </div>

      {/* LOGO */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-[50] hover:opacity-90 transition"
        aria-label="Home"
      >
        <Image src="/svg/logo.svg" alt="Nata TV" width={140} height={40} />
      </Link>

      {/* ICONA MADUIXA -> Studio */}
      <Link
        href="/#studio"
        className="fixed right-6 top-6 z-[50] hover:opacity-90 transition"
        aria-label="Studio"
      >
        <Image src="/svg/strawberry.svg" alt="mark" width={40} height={40} />
      </Link>

      {/* TABS */}
      <nav className="fixed left-6 bottom-6 z-[50] flex gap-6">
        {([
          { href: "/#works", label: t.nav.works },
          { href: "/#studio", label: t.nav.studio },
        ] as const).map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="tracking-wide text-neutral-300 hover:text-rose-400 transition"
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* COPYRIGHT */}
      <div className="fixed bottom-5 right-6 z-[50] flex items-center gap-3 text-xs uppercase tracking-wide">
        <Link
          href="/"
          className="opacity-80 text-rose-600 font-bold hover:opacity-100 transition md:text-sm"
        >
          NATA TELEVISION ©
        </Link>
      </div>
    </>
  );
}
