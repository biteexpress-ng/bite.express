import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { fetchBlogPosts, type BlogPostListItem } from "@/lib/blog-api";
import { siteConfig } from "@/lib/site-config";

type RouteProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export const revalidate = 300;

export const metadata = buildMetadata({
  title: "Blog, stories, guides and updates from BiteExpress",
  description:
    "Behind-the-scenes stories from BiteExpress, product updates, engineering notes, vendor spotlights, rider stories and city guides from the team building Nigeria's delivery network.",
  path: "/blog",
  keywords: [
    "BiteExpress blog",
    "Nigerian delivery blog",
    "food delivery stories",
    "vendor stories Nigeria",
    "rider stories Nigeria",
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

function PostCard({ post }: { post: BlogPostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className="relative aspect-16/9 w-full overflow-hidden bg-ink-100">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#1a0606] to-brand-red"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {post.category && (
          <div
            className="inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: (post.category.color ?? "#DE1600") + "1A",
              color: post.category.color ?? "#DE1600",
            }}
          >
            {post.category.icon} {post.category.name}
          </div>
        )}
        <h3 className="font-serif text-xl leading-tight text-ink-900 sm:text-2xl">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="line-clamp-3 text-sm text-ink-600">{post.excerpt}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-ink-600">
          <span>
            {post.author.name}
            {post.published_at ? ` · ${formatDate(post.published_at)}` : ""}
            {post.reading_time_minutes
              ? ` · ${post.reading_time_minutes} min`
              : ""}
          </span>
          <ArrowUpRight
            size={16}
            className="text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red"
          />
        </div>
      </div>
    </Link>
  );
}

export default async function BlogIndexPage({ searchParams }: RouteProps) {
  const sp = await searchParams;
  const activeCategory = sp.category;
  const page = Number(sp.page ?? "1") || 1;

  const { posts, categories } = await fetchBlogPosts({
    category: activeCategory,
    page,
    perPage: 24,
  });

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-blog"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden aurora-bg pt-16 pb-12 sm:pt-24 sm:pb-16">
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>The BiteExpress blog</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              Stories from the people building delivery in Nigeria.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              Product updates, engineering notes, vendor spotlights, rider
              stories, and the occasional behind-the-scenes look at how we run.
            </p>
          </div>
        </Container>
      </section>

      {/* CATEGORY PILLS */}
      {categories.length > 0 && (
        <Container className="mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                (!activeCategory
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-red hover:text-brand-red")
              }
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog?category=${c.slug}`}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                  (activeCategory === c.slug
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:border-brand-red hover:text-brand-red")
                }
              >
                {c.icon && <span className="mr-1.5">{c.icon}</span>}
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      )}

      {/* POSTS */}
      <Section background="white" padding="md">
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-ink-200 bg-ink-50 p-10 text-center">
              <h2 className="font-serif text-2xl text-ink-900">
                Nothing here yet.
              </h2>
              <p className="mt-3 text-base text-ink-600">
                {activeCategory
                  ? "No posts in this category right now. Try a different filter, or check back soon."
                  : "We're working on it, our first posts go live shortly. Subscribe in the footer to know when."}
              </p>
            </div>
          ) : (
            <>
              {/* Featured (first post) */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group mb-12 grid items-center gap-8 lg:grid-cols-2"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-ink-100">
                    {featured.cover_image_url ? (
                      <Image
                        src={featured.cover_image_url}
                        alt={featured.cover_image_alt ?? featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#1a0606] to-brand-red" />
                    )}
                  </div>
                  <div>
                    {featured.category && (
                      <div
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor:
                            (featured.category.color ?? "#DE1600") + "1A",
                          color: featured.category.color ?? "#DE1600",
                        }}
                      >
                        {featured.category.icon} {featured.category.name}
                      </div>
                    )}
                    <h2 className="mt-4 font-serif text-3xl leading-tight text-ink-900 sm:text-4xl md:text-5xl">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 text-base text-ink-600 sm:text-lg">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="mt-6 text-sm text-ink-600">
                      {featured.author.name}
                      {featured.published_at
                        ? ` · ${formatDate(featured.published_at)}`
                        : ""}
                      {featured.reading_time_minutes
                        ? ` · ${featured.reading_time_minutes} min read`
                        : ""}
                    </div>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      <CTABand
        variant="dark"
        eyebrow="Stay in the loop"
        title="Get our best stories in your inbox."
        subtitle="Subscribe to the BiteExpress newsletter, no spam, just the good stuff."
        cta={
          <ButtonLink href={siteConfig.shopHref} variant="primary" size="lg">
            Open the app
          </ButtonLink>
        }
      />
    </>
  );
}
