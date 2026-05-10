"use client";
import { useEffect, useState } from "react";
import { Work } from "@/data/works";
import { useLang } from "@/contexts/LanguageContext";

export default function WorkCard({ work, large }: { work: Work; large?: boolean }) {
  const { t } = useLang();
  const [thumb, setThumb] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/vimeo/thumbnail?id=${work.vimeoId}`)
      .then((r) => r.json())
      .then((d) => setThumb(d.thumbnail ?? null))
      .catch(() => null);
  }, [work.vimeoId]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Thumbnail card */}
      <button
        onClick={() => setOpen(true)}
        className={`relative w-full overflow-hidden bg-black group cursor-pointer ${
          large ? "aspect-[16/7]" : "aspect-[16/10]"
        }`}
      >
        {thumb && (
          <img
            src={thumb}
            alt={work.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 md:p-7">
          {work.category && (
            <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest mb-1.5 font-medium">
              {work.category}
            </p>
          )}
          <h2 className="text-white font-bold text-base md:text-2xl leading-tight mb-3 tracking-wide">
            {work.title}
          </h2>
          {work.tag && (
            <span className="inline-block text-[10px] md:text-xs px-3 py-1 border border-white/30 text-white/70 uppercase tracking-widest">
              {work.tag}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 text-xs text-neutral-400 font-medium tracking-wide">
          {work.year}
        </div>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-white text-xs uppercase tracking-widest transition"
            >
              {t.studio.close}
            </button>

            {/* Video — no controls, muted, autoplay */}
            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${work.vimeoId}?autoplay=1&muted=1&controls=0&background=0&dnt=1&title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={work.title}
              />
            </div>

            {/* Info */}
            <div className="px-8 py-8 border-t border-neutral-800">
              <div className="flex flex-wrap gap-x-8 gap-y-1 mb-4 text-[10px] uppercase tracking-widest text-neutral-500">
                {work.category && <span>{work.category}</span>}
                <span>{work.year}</span>
                {work.tag && <span className="text-rose-400">{work.tag}</span>}
              </div>
              <h3 className="text-lg font-bold mb-5 uppercase tracking-wide">{work.title}</h3>
              {work.description && (
                <p className="text-sm text-neutral-400 whitespace-pre-line leading-relaxed">
                  {work.description.trim()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

