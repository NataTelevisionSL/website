"use client";
import { useLang } from "@/contexts/LanguageContext";

const CLIENTS = [
  "Mama Dousha",
  "Pijama Studio",
  "Rumbo Media",
  "Universal Pixel Studio",
  "Trex®",
];

export default function ClientsTicker() {
  const { t } = useLang();
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <div className="overflow-hidden bg-black border-b border-neutral-800 select-none">
      <p className="px-8 pt-6 pb-3 text-xs uppercase tracking-widest text-neutral-500 flex items-center gap-2">
        <span className="w-6 h-px bg-rose-500 inline-block" />
        {t.studio.clientsLabel}
      </p>
      <div className="flex whitespace-nowrap animate-ticker pb-6">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 text-sm font-semibold tracking-widest uppercase text-neutral-400">
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-rose-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
