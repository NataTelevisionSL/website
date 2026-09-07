import "./../styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import IntroSplash from "@/components/IntroSplash";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Nata.tv",
  },
  description: DEFAULT_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/img/og.jpg"],
  },
  icons: {
    icon: "/img/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = organizationJsonLd();

  return (
    <html lang="en" className="bg-black text-neutral-200">
      <head>
        {/* Millora temps de connexió amb Vimeo */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <link rel="preconnect" href="https://fresnel.vimeocdn.com" />
        <link rel="preconnect" href="https://skyfire.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://vimeo.com" />
        <link rel="dns-prefetch" href="https://vimeocdn.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <IntroSplash />
          {children}
          <Nav />
        </LanguageProvider>
      </body>
    </html>
  );
}
