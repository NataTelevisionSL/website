"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, MouseEvent } from "react";
import type { HomeSection } from "@/components/HomePage";

const HOME_SHELL = new Set(["/", "/works", "/studio", "/contact"]);

type Props = {
  href: string;
  section?: HomeSection | "top";
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** Links to real SEO URLs, but soft-scrolls when already on the one-page shell. */
export default function SectionLink({ href, section, children, className, "aria-label": ariaLabel }: Props) {
  const pathname = usePathname();
  const onHomeShell = HOME_SHELL.has(pathname);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!onHomeShell || !section) return;
    e.preventDefault();
    if (section === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${section}`);
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
