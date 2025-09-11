"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

export default function VimeoBackground({ id }: { id: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);

    let graceTimer: any;
    let fallbackTimer: any;

    // Quan realment el vídeo comença a reproduir-se
    player.on("play", () => {
      graceTimer = setTimeout(() => setReady(true), 200); // petit marge
    });

    // Fallback: si no arriba 'play', traiem el placeholder igual després de 5 s
    fallbackTimer = setTimeout(() => setReady(true), 5000);

    return () => {
      clearTimeout(graceTimer);
      clearTimeout(fallbackTimer);
      player.destroy();
    };
  }, []);

  return (
    <div className="vimeo-cover relative bg-black">
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Background video"
      />

      {/* Placeholder amb fade out suau */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-500 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img
          src="/svg/logo.svg"
          alt="loading"
          className="w-20 h-20 animate-pulse"
        />
      </div>
    </div>
  );
}
