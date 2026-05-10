"use client";
import VimeoBackground from "@/components/VimeoBackground";
import WorkCard from "@/components/WorkCard";
import ServicesTicker from "@/components/ServicesTicker";
import ClientsTicker from "@/components/ClientsTicker";
import ContactForm from "@/components/ContactForm";
import { WORKS } from "@/data/works";
import { TEAM } from "@/data/team";
import { useLang } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, lang, setLang } = useLang();

  return (
    <>
      <main>
        {/* HERO */}
        <h1 className="fixed top-8 left-1/2 -translate-x-1/2 z-[50] hidden md:block text-xs md:text-sm lg:text-base text-white text-center whitespace-nowrap">
          {t.tagline}
        </h1>
        <section className="relative h-screen">
          <VimeoBackground id="1117688278" poster="/img/posters/main.jpg" />
          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[30] flex flex-col items-center gap-1 text-rose-500 pointer-events-none select-none">
            <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="26" height="38" rx="13" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="12.5" y="8" width="3" height="7" rx="1.5" fill="currentColor">
                <animate attributeName="y" values="8;14;8" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
              </rect>
            </svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity: 0.8}}>
              <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity: 0.4}}>
              <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>

        {/* SERVICES TICKER */}
        <ServicesTicker />

        {/* WORKS */}
        <section id="works" className="grid grid-cols-1 md:grid-cols-2">
          {WORKS.map((w, i) => (
            <div key={w.id} className={i % 3 === 0 ? "md:col-span-2" : ""}>
              <WorkCard work={w} large={i % 3 === 0} />
            </div>
          ))}
        </section>

        {/* STUDIO */}
        <section id="studio" className="text-white">

          {/* Top: headline full width */}
          <div className="flex flex-col justify-center px-8 md:px-14 py-16">
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-8">
              <span className="w-6 h-px bg-rose-500 inline-block" />
              {t.studio.label}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-2">
                  {t.studio.h1}
                </h2>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-2 text-rose-500">
                  {t.studio.h1accent}
                </h2>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-8">
                  {t.studio.h1end}
                </h2>
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
                  {t.studio.description}
                </p>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/img/team.jpg"
                    alt="Nata Television team"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team members grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-neutral-800">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="px-6 py-8 border-b md:border-b-0 border-neutral-800 border-r last:border-r-0 even:border-r-0 md:even:border-r"
              >
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{member.name}</h3>
                <div className="mb-3">
                  {member.roles.map((r) => (
                    <p key={r} className="text-[11px] text-rose-400 uppercase tracking-widest font-semibold leading-tight">
                      {r}
                    </p>
                  ))}
                </div>
                {member.refs && (
                  <p className="text-[11px] text-neutral-500 mb-5 leading-snug">{member.refs}</p>
                )}
                <div className="flex flex-col gap-2">
                  {member.instagram && (
                    <a
                      href={`https://www.instagram.com/${member.instagram.replace("@", "")}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                      {member.instagram}
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin.startsWith("http") ? member.linkedin : `https://${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                      LinkedIn
                    </a>
                  )}
                  {member.reel && (
                    <a
                      href={member.reel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                    >
                      ▶ Reel
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Clients ticker */}
          <ClientsTicker />

          {/* Contact form */}
          <ContactForm />

          {/* Footer */}
          <footer className="border-t border-b border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-0 text-sm">
            <div className="px-8 py-10 border-b sm:border-b-0 sm:border-r border-neutral-800">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">{t.studio.location}</h2>
              <p className="opacity-60">{t.studio.locationText}</p>
            </div>
            <div className="px-8 py-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">{t.studio.follow}</h2>
              <ul className="space-y-1">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/natatelevision/" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/company/nata-television/" },
                ].map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline underline-offset-4">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </footer>

        </section>
      </main>
    </>
  );
}
