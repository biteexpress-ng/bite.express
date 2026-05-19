import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * Environment-aware robots:
 *   - Production deploys: allow all, point crawlers at the sitemap.
 *   - Preview/branch deploys on Vercel: disallow everything so test
 *     deployments don't compete with the production URL in search.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block low-value paths that exist purely as API/internal.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
    host: siteUrl(),
  };
}
