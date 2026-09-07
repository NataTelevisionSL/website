import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { buildMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(PAGE_SEO.contact);

export default function ContactPage() {
  return <HomePage initialSection="contact" />;
}