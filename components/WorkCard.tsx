"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Work } from "@/data/works";
import { useLang } from "@/contexts/LanguageContext";

/** Desktop with fine pointer — load all previews (mobile stays thumbs-only to avoid iOS crash). */
function useDesktopPreview() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return enabled;
}

export default function WorkCard({ work, large }: { work: Work; large?: boolean }) {
  const { t } = useLang();
  const desktopPreview = useDesktopPreview();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [thumb, setThumb] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  // Wait for splash, then mount all desktop previews and keep them (no unload on scroll).
  const [allowPreviews, setAllowPreviews] = useState(false);

  const showPreview = desktopPreview && allowPreviews;

  useEffect(() => {
    fetch(`/api/vimeo/thumbnail?id=${work.vimeoId}`)
      .then((r) => r.json())
      .then((d) => setThumb(d.thumbnail ?? null))
      .catch(() => null);
  }, [work.vimeoId]);

  useEffect(() => {
    if (!desktopPreview) return;

    function enable() {
      setAllowPreviews(true);
    }

    window.addEventListener("nata:splash-done", enable);
    const safety = setTimeout(enable, 7000);
    return () => {
      window.removeEventListener("nata:splash-done", enable);
      clearTimeout(safety);
    };
  }, [desktopPreview]);

  useEffect(() => {
    if (!showPreview || !iframeRef.current) return;

    const player = new Player(iframeRef.current);
    let grace: ReturnType<typeof setTimeout>;
    let fallback: ReturnType<typeof setTimeout>;

    player.on("play", () => {
      grace = setTimeout(() => setReady(true), 200);
    });
    fallback = setTimeout(() => setReady(true), 5000);

    return () => {
      clearTimeout(grace);
      clearTimeout(fallback);
      player.destroy();
    };
  }, [showPreview, work.vimeoId]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`relative w-full overflow-hidden bg-black group cursor-pointer ${
          large ? "aspect-[16/10] md:aspect-[16/7]" : "aspect-[16/10]"
        }`}
      >
        {showPreview && (
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${work.vimeoId}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[112%] aspect-video pointer-events-none"
            title={work.title}
          />
        )}

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            showPreview && ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {thumb ? (
            <img
              src={thumb}
              alt={work.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900" />
          )}
        </div>
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

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-white text-xs uppercase tracking-widest transition"
            >
              {t.studio.close}
            </button>

            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${work.vimeoId}?autoplay=1&loop=1&muted=1&playsinline=1&controls=0&background=0&dnt=1&title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={work.title}
              />
            </div>

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
