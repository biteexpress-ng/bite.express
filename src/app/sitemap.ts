import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { cities } from "@/lib/cities";
import { cuisines } from "@/lib/cuisines";
import { fetchJobs } from "@/lib/jobs-api";
import { fetchBlogPosts } from "@/lib/blog-api";
import { fetchNewsItems } from "@/lib/news-api";

/**
 * Dynamic sitemap. Static surfaces (home, vendors, riders, etc.) plus
 * curated registries (cities, cuisines) plus live CMS feeds for jobs,
 * blog and news. Backend feeds tolerate failure — if the API is down
 * the sitemap still renders the static + curated portion rather than
 * 500-ing.
 *
 * Revalidated hourly. The /api/revalidate webhook bumps /sitemap.xml
 * on every CMS publish so search engines get fresh URLs faster.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/vendors", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/riders", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/agents", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/cities", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/cuisines", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/press", priority: 0.7, changeFrequency: "weekly" as const },
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

  const cuisineRoutes: MetadataRoute.Sitemap = cuisines.map((c) => ({
    url: absoluteUrl(`/cuisines/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Fetch CMS content in parallel; each falls back to [] on infra issues.
  const [{ jobs }, { posts }, { items: newsItems }] = await Promise.all([
    fetchJobs({ perPage: 100 }),
    fetchBlogPosts({ perPage: 100 }),
    fetchNewsItems({ perPage: 100 }),
  ]);

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: absoluteUrl(`/careers/${j.slug}`),
    lastModified: j.date_posted ? new Date(j.date_posted) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.published_at ? new Date(p.published_at) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Skip "coverage" items that redirect externally — Google should crawl
  // the source, not our redirect.
  const pressRoutes: MetadataRoute.Sitemap = newsItems
    .filter((i) => !(i.type === "coverage" && i.source?.url))
    .map((i) => ({
      url: absoluteUrl(`/press/${i.slug}`),
      lastModified: i.published_at ? new Date(i.published_at) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...cuisineRoutes,
    ...jobRoutes,
    ...blogRoutes,
    ...pressRoutes,
  ];
}
