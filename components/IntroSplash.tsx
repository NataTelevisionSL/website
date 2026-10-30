"use client";
import { useEffect, useState, useRef } from "react";

function seeded(n: number) {
  return Math.abs(Math.sin(n * 9301 + 49297)) % 1;
}

const NUM_ROWS = 5;

function buildRows() {
  return Array.from({ length: NUM_ROWS }, (_, i) => {
    const dur = 12 + seeded(i * 3.7) * 8;
    const delay = -(seeded(i * 7.3) * dur);
    return { dur, delay, reverse: i % 2 === 1 };
  });
}

const ROWS = buildRows();
const COUNTER_MS = 2500;

function useCounter(active: boolean, durationMs: number) {
  const [pct, setPct] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    function tick(ts: number) {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / durationMs, 1);
      setPct(Math.floor(Math.pow(p, 0.6) * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active, durationMs]);

  return pct;
}

export default function IntroSplash() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  // Far fewer DOM nodes on phones — 300 animated logos was crashing iOS.
  const [logosEach, setLogosEach] = useState(12);
  const pct = useCounter(show, COUNTER_MS);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    setLogosEach(narrow ? 6 : 24);
  }, []);

  useEffect(() => {
    if (!show) return;

    // Hold at least for the counter; wait longer for the hero video when needed.
    const MIN_MS = 2500;
    const MAX_MS = 7000;
    const start = Date.now();
    let dismissed = false;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      const remaining = Math.max(0, MIN_MS - (Date.now() - start));
      fadeTimer = setTimeout(() => setFading(true), remaining);
      hideTimer = setTimeout(() => {
        setShow(false);
        window.dispatchEvent(new Event("nata:splash-done"));
      }, remaining + 800);
    }

    window.addEventListener("nata:hero-ready", dismiss);
    const safety = setTimeout(dismiss, MAX_MS);

    return () => {
      window.removeEventListener("nata:hero-ready", dismiss);
      clearTimeout(safety);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 0.8s ease" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col pointer-events-none pb-14">
        {ROWS.map((row, ri) => (
          <div key={ri} className="overflow-hidden flex-1 flex items-center">
            <div
              className="flex items-center w-max"
              style={{
                animation: `${row.reverse ? "nata-slide-r" : "nata-slide-l"} ${row.dur}s linear ${row.delay}s infinite`,
                backfaceVisibility: "hidden",
              }}
            >
              {Array.from({ length: logosEach * 2 }, (_, ii) => (
                <img
                  key={ii}
                  src="/svg/logo.svg"
                  alt=""
                  className="flex-shrink-0 mx-[2vw]"
                  style={{ height: `calc(100vh / ${NUM_ROWS} * 0.82)` }}
                  draggable={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-white uppercase">
          LOADING_{pct}%
        </span>
      </div>
    </div>
  );
}
