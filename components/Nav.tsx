"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import StudioOverlay from "@/components/StudioOverlay";

const tabs = [
  { href: "/#works", label: "WORKS" },
  { href: "studio-overlay", label: "STUDIO" }, // marquem Studio diferent
];

export default function Nav() {
  const path = usePathname() || "/";
  const [studioOpen, setStudioOpen] = useState(false);

  return (
    <>
      {/* ANELL PERIMETRAL */}
      <div className="fixed inset-0 m-0 pointer-events-none z-[40]" aria-hidden="true">
        <div className="absolute inset-0 ring-2 ring-rose-500/50" />
      </div>

      {/* LOGO */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-[50] hover:opacity-90 transition"
        aria-label="Home"
      >
        <Image src="/svg/logo.svg" alt="Nata TV" width={140} height={40} />
      </Link>

      {/* ICONA MADUIXA -> overlay Studio */}
      <button
        onClick={() => setStudioOpen(true)}
        className="fixed right-6 top-6 z-[50] hover:opacity-90 transition"
        aria-label="Studio"
      >
        <Image src="/svg/strawberry.svg" alt="mark" width={40} height={40} />
      </button>

      {/* TABS */}
      <nav className="fixed left-6 bottom-6 z-[50] flex gap-6 ">
        {tabs.map((t) =>
          t.label === "STUDIO" ? (
            <button
              key={t.label}
              onClick={() => setStudioOpen(true)}
              className={`tracking-wide ${
                studioOpen ? "text-rose-500" : "text-neutral-300"
              } hover:text-rose-400 transition`}
            >
              {t.label}
            </button>
          ) : (
            <Link
              key={t.href}
              href={t.href}
              className={`tracking-wide ${
                path === t.href ? "text-rose-500" : "text-neutral-300"
              } hover:text-rose-400 transition`}
            >
              {t.label}
            </Link>
          )
        )}
      </nav>

      {/* Overlay Studio */}
      {studioOpen && <StudioOverlay onClose={() => setStudioOpen(false)} />}
    </>
  );
}
