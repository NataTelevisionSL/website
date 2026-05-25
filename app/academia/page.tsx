"use client";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { COURSES } from "@/data/courses";

export default function AcademiaPage() {
  const { lang, t } = useLang();
  const ta = t.academia;

  return (
    <main className="min-h-screen bg-black text-neutral-200">
      {/* HEADER */}
      <div className="px-6 md:px-14 pt-28 pb-16 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6">
          {ta.title}
        </h1>
        <p className="text-neutral-500 text-xs uppercase tracking-[0.3em]">
          {ta.subtitle}
        </p>
      </div>

      {/* COURSES GRID */}
      <div className="border-t border-neutral-800">
        {COURSES.map((course) => (
          <Link
            key={course.slug}
            href={`/academia/${course.slug}`}
            className="flex flex-col md:flex-row items-start gap-6 px-6 md:px-14 py-12 border-b border-neutral-800 hover:bg-neutral-900/50 transition group"
          >
            {/* Tag */}
            <div className="md:w-48 shrink-0">
              <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold">
                {course.tag[lang]}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl md:text-4xl font-black uppercase group-hover:text-rose-500 transition">
                  {course.title}
                </h2>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${
                  course.status === "open" ? "bg-emerald-500/15 text-emerald-400" :
                  course.status === "full" ? "bg-red-500/15 text-red-400" :
                  "bg-neutral-700 text-neutral-400"
                }`}>
                  {course.status === "open" ? ta.statusOpen : course.status === "full" ? ta.statusFull : ta.statusComingSoon}
                </span>
              </div>
              <p className="text-sm text-neutral-400 uppercase tracking-widest mb-4">
                {course.subtitle}
              </p>
              <p className="text-neutral-300 text-base leading-relaxed max-w-2xl">
                {course.shortDescription[lang]}
              </p>
            </div>

            {/* Arrow */}
            <div className="shrink-0 text-neutral-600 group-hover:text-rose-500 transition text-sm uppercase tracking-widest hidden md:flex items-center gap-1 self-center">
              {ta.viewCourse} →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
