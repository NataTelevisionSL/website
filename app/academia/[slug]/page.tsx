"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";
import { getCourseBySlug } from "@/data/courses";
import { TEAM } from "@/data/team";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang();
  const ta = t.academia;
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const instructorMember = TEAM.find((m) => m.name === course.instructor.name);

  return (
    <main className="min-h-screen bg-black text-neutral-200">
      <div className="max-w-4xl mx-auto px-6">

        {/* BACK LINK */}
        <div className="pt-28 pb-0">
          <Link
            href="/academia"
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-rose-500 transition"
          >
            {ta.back}
          </Link>
        </div>

        {/* HERO */}
        <div className="pt-4 pb-8 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-rose-500 font-semibold mb-6">
            <span className="w-4 h-px bg-rose-500 inline-block" />
            {course.tag[lang]}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none mb-1">
            {course.title[lang]}
          </h1>
          <div className="flex items-center gap-3 mt-2 mb-1">
            <p className="text-xl md:text-2xl text-neutral-400 uppercase tracking-widest font-light">
              {course.subtitle[lang]}
            </p>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${
              course.status === "open" ? "bg-emerald-500/15 text-emerald-400" :
              course.status === "full" ? "bg-red-500/15 text-red-400" :
              "bg-neutral-700 text-neutral-400"
            }`}>
              {course.status === "open" ? ta.statusOpen : course.status === "full" ? ta.statusFull : ta.statusComingSoon}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="py-10 border-b border-neutral-800">
          {course.description.map((para, i) => (
            <p key={i} className="text-base md:text-lg text-neutral-300 leading-relaxed mb-6 last:mb-0">
              {para[lang]}
            </p>
          ))}
          <div className="mt-8 p-6 border border-neutral-700 bg-neutral-900/50">
            <p className="text-[10px] uppercase tracking-widest text-rose-500 font-semibold mb-2">
              Mentoría continua
            </p>
            <p className="text-base text-neutral-300 leading-relaxed">
              {course.mentoring[lang]}
            </p>
          </div>
        </div>

        {/* SCHEDULE + DETAILS */}
        <div className="py-10 border-b border-neutral-800">
          <h2 className="text-xl font-black uppercase mb-6">
            | {ta.courseDetails} |
          </h2>
          {/* Schedule blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 mb-8">
            {course.groups.map((group) => (
              <div key={group.name.en} className="bg-black p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-widest text-rose-500 font-semibold mb-3">
                  {group.name[lang]}
                </p>
                <p className="text-base font-bold mb-1">{group.period[lang]}</p>
                <p className="text-sm text-neutral-400">{group.schedule[lang]}</p>
              </div>
            ))}
          </div>
          {/* Details list */}
          <div className="divide-y divide-neutral-800">
            {[
              { label: ta.groups, value: course.details.groups[lang] },
              { label: ta.duration, value: course.details.duration[lang] },
              { label: ta.frequency, value: course.details.frequency[lang] },
              { label: ta.sessionDuration, value: course.details.sessionDuration[lang] },
              { label: ta.price, value: course.details.price },
              { label: ta.language, value: course.details.language[lang] },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-baseline py-3">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</p>
                <p className="text-sm text-neutral-200">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SYLLABUS */}
        <div className="py-10 border-b border-neutral-800">
          <h2 className="text-xl font-black uppercase mb-6">
            | {ta.syllabus} — 8 {lang === "en" ? "SESSIONS" : lang === "es" ? "SESIONES" : "SESSIONS"} |
          </h2>
          <div className="divide-y divide-neutral-800">
            {course.syllabus.map((session) => (
              <div key={session.number} className="flex items-start gap-6 py-4">
                <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest shrink-0 w-20">
                  {lang === "en" ? "SESSION" : "SESIÓN"} {session.number}
                </span>
                <p className="text-sm text-neutral-300">{session.title[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EQUIPMENT */}
        <div className="py-10 border-b border-neutral-800">
          <h2 className="text-xl font-black uppercase mb-4">
            | {ta.equipment} |
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed">{course.equipment[lang]}</p>
        </div>

        {/* INSTRUCTOR */}
        <div className="py-10 border-b border-neutral-800">
          <h2 className="text-xl font-black uppercase mb-6">
            | {ta.instructor} |
          </h2>
          {instructorMember ? (
            <div className="border border-neutral-800 px-6 py-8 w-fit">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{instructorMember.name}</h3>
              <div className="mb-3">
                {instructorMember.roles.map((r) => (
                  <p key={r} className="text-[11px] text-rose-400 uppercase tracking-widest font-semibold leading-tight">{r}</p>
                ))}
              </div>
              {instructorMember.refs && (
                <p className="text-[11px] text-neutral-500 mb-5 leading-snug max-w-sm">{instructorMember.refs}</p>
              )}
              <div className="flex flex-col gap-2">
                {instructorMember.instagram && (
                  <a
                    href={`https://www.instagram.com/${instructorMember.instagram.replace("@", "")}/`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                    {instructorMember.instagram}
                  </a>
                )}
                {instructorMember.linkedin && (
                  <a
                    href={instructorMember.linkedin.startsWith("http") ? instructorMember.linkedin : `https://${instructorMember.linkedin}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                )}
                {instructorMember.reel && (
                  <a
                    href={instructorMember.reel}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                  >
                    ▶ Reel
                  </a>
                )}
                {instructorMember.imdb && (
                  <a
                    href={instructorMember.imdb}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs border border-neutral-700 px-3 py-1.5 hover:border-rose-500 hover:text-rose-400 transition w-fit"
                  >
                    IMDb
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-black uppercase mb-2">{course.instructor.name}</p>
              <p className="text-sm text-neutral-400">{course.instructor.bio[lang]}</p>
            </div>
          )}
        </div>

        {/* CONTACT / CTA */}
        <div className="py-10">
          <h2 className="text-xl font-black uppercase mb-6">
            | {ta.contact} |
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed mb-8">
            {ta.contactIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">{ta.location}</p>
              <p className="text-sm text-neutral-300">{course.location}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Email</p>
              <a
                href={`mailto:${course.contact}`}
                className="text-sm text-rose-500 hover:text-rose-400 transition"
              >
                {course.contact}
              </a>
            </div>
          </div>

          {/* Spots info */}
          <div className="border border-neutral-800 p-6 mb-8">
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              {ta.limitedSpots}
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {ta.summerBonus}
            </p>
          </div>

          {/* CTA */}
          <a
            href={`mailto:${course.contact}?subject=${encodeURIComponent(course.title[lang] + " — " + course.tag[lang])}`}
            className="inline-flex items-center gap-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 transition"
          >
            {ta.contactCta} →
          </a>
        </div>

      </div>
    </main>
  );
}
