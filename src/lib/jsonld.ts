import type {
  Article,
  BreadcrumbList,
  FAQPage,
  JobPosting,
  LocalBusiness,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig } from "./site-config";
import { absoluteUrl, siteUrl } from "./seo";
import { cities } from "./cities";

/**
 * Serialize a JSON-LD object as a string safe to embed inside a <script>
 * tag. The `<` → `<` replacement is the Next.js-recommended XSS guard
 * (see docs/01-app/02-guides/json-ld.md).
 */
export function jsonLdScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const socialUrls = [
  siteConfig.social.twitter,
  siteConfig.social.instagram,
  siteConfig.social.facebook,
  siteConfig.social.linkedin,
  siteConfig.social.tiktok,
] as string[];

/** Brand-level Organization schema; lives on every page via the root layout. */
export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl(),
    logo: absoluteUrl("/brand/logo.svg"),
    description: siteConfig.longDescription,
    sameAs: socialUrls,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.supportEmail,
        availableLanguage: ["English"],
        areaServed: "NG",
      },
    ],
  };
}

/** Sitelinks search-box on Google SERPs. */
export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.appUrl}/search?q={search_term_string}`,
      },
      // schema.org requires this token on the action, even though TypeScript
      // doesn't model it; we cast through unknown to keep types honest.
      "query-input": "required name=search_term_string",
    } as unknown as WebSite["potentialAction"],
  };
}

/**
 * Per-city LocalBusiness — used on `/cities/[slug]` in Phase 4 and aggregated
 * on the homepage to communicate operational coverage.
 */
export function localBusinessSchema(city: {
  name: string;
  state: string;
  slug: string;
  country: string;
}): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} — ${city.name}`,
    url: absoluteUrl(`/cities/${city.slug}`),
    image: absoluteUrl("/brand/logo.svg"),
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteUrl(),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    priceRange: "$$",
  };
}

/** Convenience: every launch-city as a LocalBusiness array. */
export function allLocalBusinessesSchema(): WithContext<LocalBusiness>[] {
  return cities.map((c) =>
    localBusinessSchema({ ...c, country: c.country }),
  );
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/logo.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
  };
}

/** Phase-3 helper for Google for Jobs eligibility. */
export function jobPostingSchema(input: {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "INTERN";
  city: string;
  state: string;
  applyUrl: string;
}): WithContext<JobPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted,
    validThrough: input.validThrough,
    employmentType: input.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteUrl(),
      logo: absoluteUrl("/brand/logo.svg"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: input.city,
        addressRegion: input.state,
        addressCountry: "NG",
      },
    },
    directApply: true,
    url: input.applyUrl,
  };
}
