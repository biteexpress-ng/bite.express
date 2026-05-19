import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Markdown } from "@/components/content/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, newsArticleSchema } from "@/lib/jsonld";
import { fetchNewsItem, fetchNewsItems } from "@/lib/news-api";

type RouteProps = { params: Promise<{ slug: string }> };

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { items } = await fetchNewsItems({ perPage: 100 });
  // Skip coverage items with external links — those redirect, not render
  return items
    .filter((i) => !(i.type === "coverage" && i.source?.url))
    .map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const item = await fetchNewsItem(slug);
  if (!item) return {};
  return buildMetadata({
    title: item.meta_title ?? item.title,
    description:
      item.meta_description ??
      item.excerpt ??
      `Read "${item.title}" in the BiteExpress newsroom.`,
    path: `/press/${item.slug}`,
    image: item.og_image_url ?? item.cover_image_url ?? undefined,
    imageAlt: item.cover_image_alt ?? item.title,
    ogType: "article",
    article: {
      publishedTime: item.published_at ?? undefined,
      authors: item.author?.name ? [item.author.name] : undefined,
      section: item.category?.name,
    },
  });
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PressItemPage({ params }: RouteProps) {
  const { slug } = await params;
  const item = await fetchNewsItem(slug);
  if (!item) notFound();

  // Coverage items just redirect to the source — no need for an internal page
  if (item.type === "coverage" && item.source?.url) {
    redirect(item.source.url);
  }

  const url = absoluteUrl(`/press/${item.slug}`);
  const image =
    item.og_image_url ??
    item.cover_image_url ??
    absoluteUrl("/opengraph-image");

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-press-item"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Newsroom", path: "/press" },
          { name: item.title, path: `/press/${item.slug}` },
        ])}
      />
      <JsonLd
        id="ld-newsarticle"
        data={newsArticleSchema({
          title: item.title,
          description: item.excerpt ?? item.title,
          url,
          image,
          datePublished: item.published_at ?? new Date().toISOString(),
          authorName: item.author?.name,
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white pt-10 pb-12 sm:pt-14">
        <Container size="narrow">
          <Link
            href="/press"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-red"
          >
            <ArrowLeft size={14} />
            Newsroom
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider">
            <Eyebrow>
              {item.type === "press_release"
                ? "Press release"
                : item.type === "announcement"
                  ? "Announcement"
                  : "In the news"}
            </Eyebrow>
            {item.category && (
              <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">
                {item.category.name}
              </span>
            )}
          </div>

          <h1 className="mt-5 font-serif text-[2.25rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3rem] md:text-[3.75rem]">
            {item.title}
          </h1>

          {item.excerpt && (
            <p className="mt-5 text-lg text-ink-600 sm:text-xl">{item.excerpt}</p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
            {item.author?.name && (
              <span>
                <strong className="font-semibold text-ink-900">{item.author.name}</strong>
                {item.author.role && <> · {item.author.role}</>}
              </span>
            )}
            {item.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-red" />
                {formatDate(item.published_at)}
              </span>
            )}
          </div>
        </Container>
      </section>

      {item.cover_image_url && (
        <Container size="narrow" className="mb-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink-100">
            <Image
              src={item.cover_image_url}
              alt={item.cover_image_alt ?? item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Section background="white" padding="md">
        <Container size="narrow">
          {item.content ? (
            <Markdown content={item.content} />
          ) : (
            <p className="text-ink-600">No content yet for this item.</p>
          )}

          {item.source?.url && (
            <div className="mt-10 rounded-2xl border border-ink-200 bg-ink-50 p-5">
              <div className="text-xs uppercase tracking-wider text-ink-600">
                Original source
              </div>
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-semibold text-ink-900 hover:text-brand-red"
              >
                {item.source.name ?? item.source.url}
                <ExternalLink size={16} />
              </a>
            </div>
          )}

          <div className="mt-12 border-t border-ink-200 pt-8">
            <ButtonLink href="/press" variant="outline">
              ← All news
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
