import type {
  Article,
  BreadcrumbList,
  FAQPage,
  HowTo,
  ItemList,
  JobPosting,
  LocalBusiness,
  Organization,
  Service,
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
  siteConfig.social.facebook,
  siteConfig.social.twitter,
  siteConfig.social.instagram,
  siteConfig.social.linkedin,
  siteConfig.social.youtube,
  siteConfig.social.whatsapp,
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
    name: `${siteConfig.name}, ${city.name}`,
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

/**
 * Service schema for a cuisine / category landing page. Lets Google
 * understand "BiteExpress delivers [cuisine]" as a discrete service
 * with a defined provider and service area.
 */
export function cuisineServiceSchema(input: {
  cuisineName: string;
  cuisineSlug: string;
  description: string;
  cityNames: string[];
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${input.cuisineName} delivery`,
    serviceType: `${input.cuisineName} delivery`,
    description: input.description,
    url: absoluteUrl(`/cuisines/${input.cuisineSlug}`),
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteUrl(),
    },
    areaServed: input.cityNames.map((name) => ({
      "@type": "City",
      name,
    })),
  };
}

/**
 * Generic Service schema for a programme/offering page (e.g. the Agent
 * Programme). Declares BiteExpress as the provider and the area it serves,
 * so Google can model the offering as a distinct entity.
 */
export function serviceSchema(input: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  /** Country/region served, defaults to Nigeria (nationwide). */
  areaServedName?: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteUrl(),
    },
    areaServed: {
      "@type": "Country",
      name: input.areaServedName ?? "Nigeria",
    },
  };
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

/**
 * The About-page roster as an ItemList of Person entries. Kept separate from
 * organizationSchema so the brand-level graph on every page stays small.
 */
export function teamSchema(
  members: {
    name: string;
    role: string;
    bio: string | null;
    photo_url: string | null;
    socials: Record<string, string | null>;
  }[],
): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} team`,
    itemListElement: members.map((member, i) => {
      const sameAs = Object.values(member.socials).filter(
        (url): url is string => Boolean(url),
      );
      return {
        "@type": "ListItem" as const,
        position: i + 1,
        item: {
          "@type": "Person" as const,
          name: member.name,
          jobTitle: member.role,
          ...(member.bio ? { description: member.bio } : {}),
          ...(member.photo_url ? { image: member.photo_url } : {}),
          ...(sameAs.length ? { sameAs } : {}),
          worksFor: {
            "@type": "Organization" as const,
            name: siteConfig.name,
            url: siteUrl(),
          },
        },
      };
    }),
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

/**
 * HowTo schema for step-based flows (e.g. "How to order food on WhatsApp").
 * Google can surface HowTo steps as a rich result. Keep `text` self-contained
 * per step — the same copy the visible "How it works" section renders.
 */
export function howToSchema(input: {
  name: string;
  description: string;
  /** ISO-8601 duration, e.g. "PT2M" for ~2 minutes. */
  totalTime?: string;
  steps: { name: string; text: string }[];
}): WithContext<HowTo> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
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
  authorRole?: string;
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
      ...(input.authorRole ? { jobTitle: input.authorRole } : {}),
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

/**
 * NewsArticle schema for press releases and announcements. Google
 * News and Discover surface NewsArticle distinctly from Article —
 * use this for /press/[slug] detail pages.
 */
export function newsArticleSchema(input: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: input.authorName
      ? { "@type": "Person", name: input.authorName }
      : { "@type": "Organization", name: siteConfig.legalName },
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
