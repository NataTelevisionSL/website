import type { Metadata } from "next";
import AcademiaClient from "./AcademiaClient";
import { buildMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(PAGE_SEO.academia);

export default function AcademiaPage() {
  return <AcademiaClient />;
}
