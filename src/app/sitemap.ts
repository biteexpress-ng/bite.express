import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { cities } from "@/lib/cities";
import { jobs } from "@/lib/jobs";

/**
 * Dynamic sitemap. Sources today: static routes + curated cities + jobs.
 * Phase 4 will append the dynamic zones API; Phase 5 the blog/press.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/vendors", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/riders", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/agents", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/help", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/refund", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: absoluteUrl(`/cities/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: absoluteUrl(`/careers/${j.slug}`),
    lastModified: new Date(j.datePosted),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes, ...jobRoutes];
}
