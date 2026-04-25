"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/#works", label: "WORKS" },
  { href: "/#studio", label: "STUDIO" },
];

export default function Nav() {
  const path = usePathname() || "/";

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

      {/* ICONA MADUIXA -> Studio */}
      <Link
        href="/#studio"
        className="fixed right-6 top-6 z-[50] hover:opacity-90 transition"
        aria-label="Studio"
      >
        <Image src="/svg/strawberry.svg" alt="mark" width={40} height={40} />
      </Link>

      {/* TABS */}
      <nav className="fixed left-6 bottom-6 z-[50] flex gap-6 ">
        {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`tracking-wide ${
                path === t.href ? "text-rose-500" : "text-neutral-300"
              } hover:text-rose-400 transition`}
            >
              {t.label}
            </Link>
        ))}
      </nav>
    </>
  );
}
