"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

type Props = {
  id: string;           // ID de Vimeo (p. ex. "1117685610")
  poster?: string;      // Ruta local (p. ex. "/img/posters/main.jpg")
};

export default function VimeoBackground({ id, poster }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);
  const { mediaAllowed } = useCookieConsent();

  // If media is blocked, poster is the above-the-fold content — unblock splash.
  useEffect(() => {
    if (mediaAllowed) return;
    setReady(false);
    window.dispatchEvent(new Event("nata:hero-ready"));
  }, [mediaAllowed]);

  useEffect(() => {
    if (!mediaAllowed || !iframeRef.current) return;
    const player = new Player(iframeRef.current);

    let grace: ReturnType<typeof setTimeout>;
    let fallback: ReturnType<typeof setTimeout>;
    let signaled = false;

    const markReady = () => {
      setReady(true);
      if (signaled) return;
      signaled = true;
      window.dispatchEvent(new Event("nata:hero-ready"));
    };

    player.on("play", () => {
      grace = setTimeout(markReady, 200);
    });

    fallback = setTimeout(markReady, 5000);

    return () => {
      clearTimeout(grace);
      clearTimeout(fallback);
      player.destroy();
    };
  }, [mediaAllowed, id]);

  return (
    <div className="vimeo-cover relative bg-black">
      {mediaAllowed && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1&autopause=0&quality=auto`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="eager"
          title="Background video"
        />
      )}

      {!!poster && (
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            mediaAllowed && ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={mediaAllowed && ready}
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
