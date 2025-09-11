"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

export default function VimeoBackground({ id }: { id: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [thumb, setThumb] = useState<string | null>(null);
  const [ready, setReady] = useState(false); // quan realment comença a reproduir

  // 1) Demana el thumbnail al nostre endpoint
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/vimeo/thumbnail?id=${id}`, { cache: "no-store" });
        const json = await res.json();
        if (alive && json.thumbnail) setThumb(json.thumbnail);
      } catch {}
    })();
    return () => { alive = false; };
  }, [id]);

  // 2) Espera l'event "play" del player per amagar el thumbnail
  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);

    let grace: any;
    let fallback: any;

    player.on("play", () => {
      grace = setTimeout(() => setReady(true), 200); // marge perquè pinti 1r frame
    });

    // Fallback: si per algun motiu no arriba "play"
    fallback = setTimeout(() => setReady(true), 5000);

    return () => {
      clearTimeout(grace);
      clearTimeout(fallback);
      player.unload().catch(() => {});
    };
  }, []);

  return (
    <div className="vimeo-work relative bg-black">
      {/* IFRAME Vimeo */}
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Background video"
        // L'ajust "cover" el fa la teva classe .vimeo-cover al CSS
      />

      {/* THUMBNAIL com a placeholder fins que el vídeo realment està en marxa */}
      {thumb && (
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={ready}
        >
          {/* Pots usar <Image> si vols optimització */}
          <img
            src={thumb}
            alt="Video placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
