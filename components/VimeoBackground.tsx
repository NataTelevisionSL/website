"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

type Props = {
  id: string;           // ID de Vimeo (p. ex. "1117685610")
  poster?: string;      // Ruta local (p. ex. "/img/posters/main.jpg")
};

export default function VimeoBackground({ id, poster }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);

    let grace: any;
    let fallback: any;

    // Quan el vídeo realment comença
    player.on("play", () => {
      grace = setTimeout(() => setReady(true), 200); // petit marge pel primer frame
    });

    // Fallback per si "play" no arriba (bloquejos, etc.)
    fallback = setTimeout(() => setReady(true), 5000);

    return () => {
      clearTimeout(grace);
      clearTimeout(fallback);
      player.unload().catch(() => {});
    };
  }, []);

  return (
    <div className="vimeo-cover relative bg-black">
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Background video"
      />

      {/* Poster local fins que comença el vídeo */}
      {!!poster && (
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={ready}
        >
          <img
            src={poster}
            alt="Video placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
