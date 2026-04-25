import "./../styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://natatelevision.com";
const titleDefault = "Nata Television";
const description =
  "Nata Television is a Barcelona-based creative studio specialising in film production, VFX, 3D animation, post-production, color grading, motion design and virtual production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: "%s — Nata Television",
  },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Nata Television",
    title: titleDefault,
    description,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Nata Television" }],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/img/og.jpg"],
  },
  icons: {
    icon: "/img/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-900 text-neutral-200">
      <head>
        {/* Millora temps de connexió amb Vimeo */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
      </head>
      <body className="antialiased">
        {children}
        <Nav />
      </body>
    </html>
  );
}
