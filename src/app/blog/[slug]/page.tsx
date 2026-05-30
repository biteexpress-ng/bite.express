import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Markdown } from "@/components/content/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/blog-api";

type RouteProps = { params: Promise<{ slug: string }> };

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { posts } = await fetchBlogPosts({ perPage: 100 });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta_title ?? post.title,
    description:
      post.meta_description ??
      post.excerpt ??
      `Read "${post.title}" on the BiteExpress blog.`,
    path: `/blog/${post.slug}`,
    image: post.og_image_url ?? post.cover_image_url ?? undefined,
    imageAlt: post.cover_image_alt ?? post.title,
    ogType: "article",
    article: {
      publishedTime: post.published_at ?? undefined,
      authors: [post.author.name],
      section: post.category?.name,
      tags: post.tags,
    },
    keywords: post.tags.length ? post.tags : undefined,
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

export default async function BlogPostPage({ params }: RouteProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const image =
    post.og_image_url ??
    post.cover_image_url ??
    absoluteUrl("/opengraph-image");

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-post"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          ...(post.category
            ? [
                {
                  name: post.category.name,
                  path: `/blog?category=${post.category.slug}`,
                },
              ]
            : []),
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        id="ld-article"
        data={articleSchema({
          title: post.title,
          description: post.excerpt ?? post.title,
          url,
          image,
          datePublished: post.published_at ?? new Date().toISOString(),
          authorName: post.author.name,
          authorRole: post.author.role ?? undefined,
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-b from-ink-50 to-white pt-10 pb-12 sm:pt-14">
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-red"
          >
            <ArrowLeft size={14} />
            All posts
          </Link>

          {post.category && (
            <div
              className="mt-6 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: (post.category.color ?? "#DE1600") + "1A",
                color: post.category.color ?? "#DE1600",
              }}
            >
              {post.category.icon} {post.category.name}
            </div>
          )}

          <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3rem] md:text-[3.75rem]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-lg text-ink-600 sm:text-xl">
              {post.excerpt}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
            <div className="flex items-center gap-2">
              {post.author.avatar_url ? (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-brand-red/15 text-brand-red text-xs font-semibold flex items-center justify-center">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-semibold text-ink-900">
                  {post.author.name}
                </div>
                {post.author.role && (
                  <div className="text-xs text-ink-600">{post.author.role}</div>
                )}
              </div>
            </div>
            {post.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-red" />
                {formatDate(post.published_at)}
              </span>
            )}
            {post.reading_time_minutes && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-brand-red" />
                {post.reading_time_minutes} min read
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* COVER IMAGE */}
      {post.cover_image_url && (
        <Container size="narrow" className="mb-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-ink-100">
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt ?? post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        </Container>
      )}

      {/* CONTENT */}
      <Section background="white" padding="md">
        <Container size="narrow">
          {post.content ? (
            <Markdown content={post.content} />
          ) : (
            <p className="text-ink-600">No content yet for this post.</p>
          )}

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-ink-200 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ink-100 px-3 py-1 text-xs uppercase tracking-wider text-ink-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
