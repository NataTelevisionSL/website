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
  // Defer Vimeo until after intro splash — avoids iOS memory crash with splash + many players.
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Poster is enough for first paint; unblock splash immediately.
    window.dispatchEvent(new Event("nata:hero-ready"));

    function enable() {
      setLoadVideo(true);
    }

    window.addEventListener("nata:splash-done", enable);
    // Safety if splash event was missed
    const safety = setTimeout(enable, 7000);

    return () => {
      window.removeEventListener("nata:splash-done", enable);
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (!loadVideo || !iframeRef.current) return;
    const player = new Player(iframeRef.current);

    let grace: ReturnType<typeof setTimeout>;
    let fallback: ReturnType<typeof setTimeout>;

    const markReady = () => setReady(true);

    player.on("play", () => {
      grace = setTimeout(markReady, 200);
    });
    fallback = setTimeout(markReady, 5000);

    return () => {
      clearTimeout(grace);
      clearTimeout(fallback);
      player.destroy();
    };
  }, [loadVideo, id]);

  return (
    <div className="vimeo-cover relative bg-black">
      {loadVideo && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&dnt=1&autopause=0&quality=auto`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          title="Background video"
        />
      )}

      {!!poster && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            loadVideo && ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={loadVideo && ready}
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
