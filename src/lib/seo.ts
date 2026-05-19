import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/**
 * Resolve the canonical site URL. Falls back to the build-time
 * env var, then to the hard-coded value in site-config.
 */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? siteConfig.url
  );
}

export function absoluteUrl(path = "/"): string {
  const base = siteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataInput = {
  /** Page-specific title; the site name template is applied via metadata.title.template. */
  title: string;
  description: string;
  /** Path of the page WITHOUT the origin, e.g. "/vendors". Used for canonical + OG URL. */
  path: string;
  /** Optional path to an OG image; defaults to the dynamic /opengraph-image route. */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  /** Set to true on pages we never want indexed (drafts, internal tools). */
  noIndex?: boolean;
  /** Optional explicit OG type (defaults to "website"; use "article" on blog posts). */
  ogType?: "website" | "article" | "profile";
  /** Article-specific fields used only when ogType === "article". */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
};

/**
 * Build a Next.js Metadata object for a page.
 * Centralizing this guarantees every page gets canonical, OG, Twitter,
 * and verification fields without per-page boilerplate.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image ?? "/opengraph-image";
  const absoluteImage = image.startsWith("http") ? image : absoluteUrl(image);

  const metadata: Metadata = {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
      // hreflang map — extend when additional locales come online.
      languages: {
        "en-NG": url,
        "x-default": url,
      },
    },
    openGraph: {
      type: input.ogType ?? "website",
      url,
      siteName: siteConfig.name,
      title: input.title,
      description: input.description,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: input.imageAlt ?? input.title,
        },
      ],
      ...(input.ogType === "article" && input.article
        ? {
            publishedTime: input.article.publishedTime,
            modifiedTime: input.article.modifiedTime,
            authors: input.article.authors,
            section: input.article.section,
            tags: input.article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: input.title,
      description: input.description,
      images: [absoluteImage],
    },
    robots: input.noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };

  // Search-engine verification meta tags — populated only when env is set,
  // so we never emit an empty <meta name="google-site-verification" content="">.
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (google || bing) {
    metadata.verification = {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    };
  }

  return metadata;
}
