"use client";
import Link from "next/link";
import { LEGAL_DOCS, type LegalSlug } from "@/data/legal";
import { useLang } from "@/contexts/LanguageContext";

export default function LegalDocument({ slug }: { slug: LegalSlug }) {
  const { lang, t } = useLang();
  const doc = LEGAL_DOCS[slug];

  return (
    <main className="min-h-screen bg-black text-neutral-200 pt-28 pb-24 px-8 md:px-14 max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-xs uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition mb-10 inline-block"
      >
        {t.legal.back}
      </Link>

      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">{t.legal.label}</p>
      <h1 className="text-3xl md:text-5xl font-black uppercase leading-none mb-3">
        {doc.title[lang]}
      </h1>
      <p className="text-xs text-neutral-500 mb-12">{doc.updated[lang]}</p>

      <div className="space-y-10">
        {doc.sections.map((section) => (
          <section key={section.heading.en}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-rose-400 mb-4">
              {section.heading[lang]}
            </h2>
            <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
              {section.body[lang].map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <nav className="mt-16 pt-8 border-t border-neutral-800 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest">
        <Link href="/legal/aviso-legal" className="text-neutral-500 hover:text-rose-400 transition">
          {t.legal.notice}
        </Link>
        <Link href="/legal/privacidad" className="text-neutral-500 hover:text-rose-400 transition">
          {t.legal.privacy}
        </Link>
        <Link href="/legal/cookies" className="text-neutral-500 hover:text-rose-400 transition">
          {t.legal.cookies}
        </Link>
      </nav>
    </main>
  );
}
