"use client";
import { useEffect, useState } from "react";

export default function VimeoBackground({ id }: { id: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fallback: si en ~4s no arriba onLoad, traiem igual el placeholder
    const t = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Handler amb retard per deixar que es pinti el primer frame
  const handleLoad = () => {
    setTimeout(() => setLoaded(true), 300); // 300ms després d'onLoad
  };

  return (
    <div className="vimeo-work relative bg-black">
      <iframe
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Background video"
        onLoad={handleLoad}
      />

      {/* Placeholder: logo amb batec */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-500 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <img src="/svg/logo.svg" alt="loading" className="w-20 h-20 animate-pulse" />
      </div>
    </div>
  );
}
