// app/sitemap.ts
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://natatelevision.com";
  const routes = ["", "/works"];
  const now = new Date();

  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.8,
  }));
}
