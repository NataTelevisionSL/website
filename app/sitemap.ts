import { COURSES } from "@/data/courses";
import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/works", priority: 0.9 },
    { path: "/studio", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
    { path: "/academia", priority: 0.8 },
  ];

  const courseRoutes = COURSES.map((c) => ({
    path: `/academia/${c.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
  }));
}
