import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { fetchNewsItems, type NewsItemListItem } from "@/lib/news-api";
import { siteConfig } from "@/lib/site-config";

type RouteProps = {
  searchParams: Promise<{ type?: string; category?: string }>;
};

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Newsroom — press releases and BiteExpress in the news",
  description:
    "Press releases, announcements and external coverage of BiteExpress. Media inquiries: press@bite.express.",
  path: "/press",
  keywords: [
    "BiteExpress newsroom",
    "BiteExpress press",
    "BiteExpress news",
    "Nigerian delivery news",
    "BiteExpress media",
  ],
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function typeLabel(t: NewsItemListItem["type"]) {
  switch (t) {
    case "press_release": return "Press release";
    case "coverage": return "In the news";
    case "announcement": return "Announcement";
  }
}

/** Coverage items link out to the external source; everything else
 *  links to our internal /press/[slug] detail page. */
function ItemCard({ item }: { item: NewsItemListItem }) {
  const isExternal = item.type === "coverage" && !!item.source?.url;
  const href = isExternal ? (item.source!.url as string) : `/press/${item.slug}`;

  const cardContent = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-100">
        {item.cover_image_url ? (
          <Image
            src={item.cover_image_url}
            alt={item.cover_image_alt ?? item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#1a0606] to-brand-red" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-red/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
            {typeLabel(item.type)}
          </span>
          {item.source?.name && (
            <span className="text-xs text-ink-600">via {item.source.name}</span>
          )}
        </div>
        <h3 className="font-serif text-xl leading-tight text-ink-900 sm:text-2xl">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="line-clamp-3 text-sm text-ink-600">{item.excerpt}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-ink-600">
          <span>{formatDate(item.published_at)}</span>
          {isExternal ? (
            <ExternalLink
              size={16}
              className="text-ink-400 transition-colors group-hover:text-brand-red"
            />
          ) : (
            <ArrowUpRight
              size={16}
              className="text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red"
            />
          )}
        </div>
      </div>
    </>
  );

  const classes =
    "group flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-elevated";

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {cardContent}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {cardContent}
    </Link>
  );
}

export default async function PressIndexPage({ searchParams }: RouteProps) {
  const sp = await searchParams;
  const activeType = sp.type as NewsItemListItem["type"] | undefined;

  const { items, categories } = await fetchNewsItems({
    type: activeType,
    perPage: 30,
  });

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-press"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Newsroom", path: "/press" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden aurora-bg pt-16 pb-12 sm:pt-24 sm:pb-16">
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>Newsroom</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              Press releases, announcements and BiteExpress in the news.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              Media enquiries: <a href={`mailto:press@bite.express`} className="text-brand-red underline-offset-4 hover:underline">press@bite.express</a>. Logos and brand assets available on request.
            </p>
          </div>
        </Container>
      </section>

      {/* TYPE PILLS */}
      <Container className="mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/press"
            className={
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
              (!activeType
                ? "border-brand-red bg-brand-red text-white"
                : "border-ink-200 bg-white text-ink-700 hover:border-brand-red hover:text-brand-red")
            }
          >
            All
          </Link>
          {(["press_release", "coverage", "announcement"] as const).map((t) => (
            <Link
              key={t}
              href={`/press?type=${t}`}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                (activeType === t
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-red hover:text-brand-red")
              }
            >
              {typeLabel(t)}
            </Link>
          ))}
        </div>
      </Container>

      {/* ITEMS */}
      <Section background="white" padding="md">
        <Container>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-ink-200 bg-ink-50 p-10 text-center">
              <h2 className="font-serif text-2xl text-ink-900">
                Nothing in the newsroom yet.
              </h2>
              <p className="mt-3 text-base text-ink-600">
                Check back soon — we ship news regularly. In the meantime, follow us on social.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <ItemCard key={it.slug} item={it} />
              ))}
            </div>
          )}
          {/* Unused for now but keeps the categories prop alive for future filters */}
          <span hidden>{categories.length}</span>
        </Container>
      </Section>

      <CTABand
        variant="dark"
        eyebrow="Press contact"
        title="For media enquiries, get in touch."
        subtitle="Logos, brand assets and interviews available on request. We aim to reply within 1 business day."
        cta={
          <ButtonLink href={`mailto:press@bite.express`} variant="primary" size="lg">
            press@bite.express
          </ButtonLink>
        }
        secondaryCta={
          <ButtonLink href={siteConfig.shopHref} variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
            About BiteExpress
          </ButtonLink>
        }
      />
    </>
  );
}
