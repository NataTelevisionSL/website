"use client";
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

type Props = {
  id: string;
  poster?: string;
};

export default function VimeoBackground({ id, poster }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);

    let grace: ReturnType<typeof setTimeout>;
    let signaled = false;

    const markReady = () => {
      setReady(true);
      if (signaled) return;
      signaled = true;
      // Unblock splash only once the hero is actually playing.
      window.dispatchEvent(new Event("nata:hero-ready"));
    };

    player.on("play", () => {
      grace = setTimeout(markReady, 150);
    });

    // Also treat buffered/playing as ready on slow devices
    player.on("bufferend", () => {
      player.getPaused().then((paused) => {
        if (!paused) markReady();
      }).catch(() => {});
    });

    return () => {
      clearTimeout(grace);
      player.destroy();
    };
  }, [id]);

  return (
    <div className="vimeo-cover relative bg-black">
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&dnt=1&autopause=0&quality=auto`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="Background video"
      />

      {!!poster && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={ready}
        >
          <img
            src={poster}
            alt="Video placeholder"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
      )}
    </div>
  );
}
