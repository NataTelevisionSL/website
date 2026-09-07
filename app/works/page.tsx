import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { buildMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(PAGE_SEO.works);

export default function WorksPage() {
  return <HomePage initialSection="works" />;
}
