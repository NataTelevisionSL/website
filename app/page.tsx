"use client";
import VimeoBackground from "@/components/VimeoBackground";
import VimeoWork from "@/components/VimeoWork";
import { WORKS } from "@/data/works";
import { useLang } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, lang, setLang } = useLang();

  return (
    <>
      <main>
        {/* HERO */}
        <h1 className="fixed top-8 left-1/2 -translate-x-1/2 z-[50] block text-[9px] sm:text-xs md:text-sm lg:text-base text-white text-center whitespace-nowrap">
          {t.tagline}
        </h1>
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-2 text-[9px] md:text-xs uppercase tracking-widest">
          {(["en", "es", "ca"] as const).map((l, i) => (
            <>
              {i > 0 && <span key={`sep-${l}`} className="text-neutral-600">/</span>}
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`transition ${
                  lang === l ? "text-rose-500" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            </>
          ))}
        </div>

        <section className="relative h-screen">
          <VimeoBackground id="1117688278" poster="/img/posters/main.jpg" />
        </section>

        {/* WORKS */}
        <section id="works" className="mx-auto max-w-3xl px-6 py-20 grid grid-cols-1 md:grid-cols-1 gap-9">
          {WORKS.map((w) => (
            <article key={w.id}>
              <div className="flex justify-between text-sm opacity-80 font-bold">
                <span>{String(w.id).padStart(3, "0")}</span>
                <span>{String(w.title)}</span>
                <span>{w.year}</span>
              </div>
              {w.description && (
                <p className="text-sm opacity-40 mt-1 mb-2 md:text-justify">{w.description}</p>
              )}
              <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                <VimeoWork id={w.vimeoId} />
              </div>
            </article>
          ))}
        </section>

        {/* STUDIO */}
        <section id="studio" className="mx-auto px-6 pt-4 pb-20 text-white">
          <h1 className="text-4xl md:text-5xl mb-6 mt-5">
            {t.studio.h1}
          </h1>
          <p className="text-4xl text-rose-400 mb-6">
            {t.studio.description}
          </p>
          <div className="gap-6 text-sm px-0">
            <div>
              <h2 className="font-semibold mb-0">{t.studio.services}</h2>
              <ul className="space-y-0 opacity-80">
                {t.studio.servicesList}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mt-8">{t.studio.clients}</h2>
              <ul className="opacity-80 space-y-0">
                {["Mama Dousha", "Pijama Studio", "Rumbo Media", "Universal Pixel Studio", "Trez®"].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mt-8">{t.studio.follow}</h2>
              <ul className="opacity-80 space-y-0 text-rose-400">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/natatelevision/" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/company/nata-television/" },
                ].map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mt-8">{t.studio.location}</h2>
              <p className="opacity-80">{t.studio.locationText}</p>
            </div>
            <div>
              <h2 className="font-semibold mt-8">{t.studio.careers}</h2>
              <p className="opacity-80">{t.studio.careersText}</p>
            </div>
            <div>
              <h2 className="font-semibold mt-8">{t.studio.contact}</h2>
              <p className="opacity-80">{t.studio.contactText}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
