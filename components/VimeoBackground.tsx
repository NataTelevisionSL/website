"use client";
import { useEffect, useState } from "react";

export default function VimeoBackground({ id }: { id: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fallback: si en ~2s no tenim onLoad, traiem igual el placeholder
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="vimeo-cover relative bg-black">
      <iframe
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Background video"
        onLoad={() => setLoaded(true)}
        // No posis styles aquí si ja tens la classe .vimeo-cover que controla mida/cover
      />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <img src="/svg/logo.svg" alt="loading" className="w-20 h-20 animate-pulse" />
        </div>
      )}
    </div>
  );
}
