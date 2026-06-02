"use client";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

// useLayoutEffect fires before paint on client → no flash
// falls back to useEffect on server to avoid SSR warnings
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function seeded(n: number) {
  return Math.abs(Math.sin(n * 9301 + 49297)) % 1;
}

const NUM_ROWS = 9;
const LOGOS_EACH = 20;

const ROWS = Array.from({ length: NUM_ROWS }, (_, i) => ({
  dur: 10 + seeded(i * 3.7) * 10,
  reverse: i % 2 === 1,
  delay: -(seeded(i * 7.3) * 15),
  opacity: 0.12 + seeded(i * 2.1) * 0.35,
}));

const CHARS = "!#@€/?¿|()[]{}$%^&*~<>+=_";
const TARGET = "LOADING";
const SCRAMBLE_MS = 1800;

function useScramble(active: boolean) {
  const [text, setText] = useState(() =>
    Array.from({ length: TARGET.length }, (_, i) =>
      CHARS[Math.floor(seeded(i) * CHARS.length)]
    ).join("")
  );
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    function tick(ts: number) {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / SCRAMBLE_MS, 1);
      // how many characters have "settled" to final value
      const settled = Math.floor(progress * TARGET.length);

      setText(
        TARGET.split("").map((ch, i) => {
          if (i < settled) return ch;
          // still scrambling — pick a pseudo-random char that changes each frame
          return CHARS[Math.floor((ts / 50 + i * 7) % CHARS.length)];
        }).join("")
      );

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    }

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active]);

  return text;
}

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const scrambled = useScramble(show);

  useIsomorphicLayoutEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const MIN_MS = 2500;
    const start = Date.now();

    function dismiss() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setFading(true), remaining);
      setTimeout(() => setShow(false), remaining + 800);
    }

    // Dismiss when page fully loaded, but never before MIN_MS
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Safety net: never show more than 10s
      const safety = setTimeout(dismiss, 10000);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(safety);
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 0.8s ease" }}
      aria-hidden="true"
    >
      {/* ── Horizontal logo rows ── */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none">
        {ROWS.map((row, ri) => (
          <div key={ri} className="overflow-hidden w-full">
            <div
              className="flex items-center gap-8 w-max"
              style={{
                opacity: row.opacity,
                animation: `${row.reverse ? "nata-slide-r" : "nata-slide-l"} ${row.dur}s linear ${row.delay}s infinite`,
                willChange: "transform",
              }}
            >
              {Array.from({ length: LOGOS_EACH * 2 }, (_, ii) => (
                <img
                  key={ii}
                  src="/svg/logo.svg"
                  alt=""
                  className="h-4 sm:h-5 md:h-6 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Centre logo + scramble text ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 50%, rgba(0,0,0,0.92) 0%, transparent 100%)",
        }}
      >
        <img
          src="/svg/logo.svg"
          alt="Nata Television"
          className="w-40 sm:w-52 md:w-64"
        />
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-rose-500 uppercase">
          {scrambled}
        </span>
      </div>
    </div>
  );
}
