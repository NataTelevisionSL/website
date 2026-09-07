import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://natatelevision.com";

export const SITE_NAME = "Nata Television";

export const DEFAULT_TITLE =
  "Nata.tv | Creative Production, Post-Production and Animation Studio";

export const DEFAULT_DESCRIPTION =
  "Nata Television (nata.tv) is a Barcelona-based creative studio specialising in film production, VFX, 3D animation, post-production, color grading, motion design and virtual production.";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = path;
  const ogTitle = path === "/" ? title : `${title} — Nata.tv`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/img/og.jpg"],
    },
  };
}

export const PAGE_SEO = {
  home: {
    title: { absolute: DEFAULT_TITLE },
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  works: {
    title: "Works",
    description:
      "Selected film, commercial, music video and animation work from Nata Television — a Barcelona creative production and post-production studio.",
    path: "/works",
  },
  studio: {
    title: "Studio",
    description:
      "About Nata Television: a Barcelona-based creative studio for production, post-production, VFX, 3D animation and virtual production. Meet the team.",
    path: "/studio",
  },
  contact: {
    title: "Contact",
    description:
      "Contact Nata Television in Barcelona. Reach us for film production, VFX, animation projects, careers and collaborations at Carrer Canalejas 3.",
    path: "/contact",
  },
  academia: {
    title: "Academy",
    description:
      "Nata Television Academy in Barcelona — 3D animation, VFX, digital drawing and mentorship courses and workshops.",
    path: "/academia",
  },
} as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: ["Nata.tv", "Nata Television"],
    url: SITE_URL,
    logo: `${SITE_URL}/img/og.jpg`,
    email: "admin@natatelevision.com",
    telephone: "+34619926311",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer Canalejas 3",
      addressLocality: "Barcelona",
      postalCode: "08015",
      addressCountry: "ES",
    },
    sameAs: [
      "https://www.instagram.com/natatelevision/",
      "https://www.linkedin.com/company/nata-television/",
    ],
  };
}
