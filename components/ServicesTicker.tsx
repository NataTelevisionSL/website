"use client";
import { useLang } from "@/contexts/LanguageContext";

export default function ServicesTicker() {
  const { t } = useLang();
  const ITEMS = t.studio.servicesList.split(", ").map((s) => s.replace(/\.$/, ""));
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden bg-black border-y border-neutral-800 py-2.5 select-none">
      <div className="flex whitespace-nowrap animate-ticker">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4 text-[11px] font-bold tracking-widest uppercase text-white">
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-rose-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
