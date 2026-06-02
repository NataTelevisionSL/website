"use client";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function seeded(n: number) {
  return Math.abs(Math.sin(n * 9301 + 49297)) % 1;
}

// Each row fills its height fully — logos are tall, rows tightly packed
const NUM_ROWS = 5;
const LOGOS_EACH = 30; // 30 per half → 60 total; seam is far off-screen

const ROWS = Array.from({ length: NUM_ROWS }, (_, i) => {
  const dur = 12 + seeded(i * 3.7) * 8;
  // delay is an exact fraction of dur so the loop reset always lands on the seam
  const delay = -(seeded(i * 7.3) * dur);
  return { dur, delay, reverse: i % 2 === 1 };
});

const COUNTER_MS = 2500; // how long the 0→100% count takes

function useCounter(active: boolean, durationMs: number) {
  const [pct, setPct] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    function tick(ts: number) {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / durationMs, 1);
      // ease-out so it slows near 100
      setPct(Math.floor(Math.pow(p, 0.6) * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, durationMs]);

  return pct;
}

export default function IntroSplash() {
  const [show, setShow] = useState(true); // true from SSR → no flash of underlying page
  const [fading, setFading] = useState(false);
  const pct = useCounter(show, COUNTER_MS);

  // no need to set show=true in an effect — it's already true from initial render

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

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
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
      {/* ── Full-screen tiling logo rows ── */}
      <div className="absolute inset-0 flex flex-col pointer-events-none pb-14">
        {ROWS.map((row, ri) => (
          <div key={ri} className="overflow-hidden flex-1 flex items-center">
            <div
              className="flex items-center w-max"
              style={{
                animation: `${row.reverse ? "nata-slide-r" : "nata-slide-l"} ${row.dur}s linear ${row.delay}s infinite`,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {Array.from({ length: LOGOS_EACH * 2 }, (_, ii) => (
                <img
                  key={ii}
                  src="/svg/logo.svg"
                  alt=""
                  /* logos fill ~90% of each row height, gap between = 4vw */
                  className="flex-shrink-0 mx-[2vw]"
                  style={{ height: `calc(100vh / ${NUM_ROWS} * 0.82)` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Loading counter bottom-center ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-white uppercase">
          LOADING_{pct}%
        </span>
      </div>
    </div>
  );
}

