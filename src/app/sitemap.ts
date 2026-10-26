import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { posts, projects, services } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const statics = ["", "/about", "/works", "/services", "/lab", "/blog", "/contact", "/privacy-policy"];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${base}/works/${p.slug}`, priority: 0.6 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
