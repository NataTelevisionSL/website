import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocument from "@/components/LegalDocument";
import { LEGAL_DOCS, LEGAL_SLUGS, isLegalSlug } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  if (!isLegalSlug(params.slug)) return {};
  const doc = LEGAL_DOCS[params.slug];
  return buildMetadata({
    title: doc.title.en,
    description: doc.sections[0]?.body.en[0] ?? doc.title.en,
    path: `/legal/${params.slug}`,
  });
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  if (!isLegalSlug(params.slug)) notFound();
  return <LegalDocument slug={params.slug} />;
}
