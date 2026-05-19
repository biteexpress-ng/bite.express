import { api } from "./api-client";

export type BlogCategory = {
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
};

export type BlogAuthor = {
  name: string;
  role: string | null;
  avatar_url: string | null;
};

export type BlogPostListItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  og_image_url: string | null;
  category: BlogCategory | null;
  tags: string[];
  author: BlogAuthor;
  reading_time_minutes: number | null;
  featured: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export type BlogPost = BlogPostListItem & {
  content: string | null;
};

type BlogListResponse = {
  data: BlogPostListItem[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  categories: BlogCategory[];
};

export type FetchBlogResult = {
  posts: BlogPostListItem[];
  categories: BlogCategory[];
  totalPages: number;
};

export async function fetchBlogPosts(opts?: {
  category?: string;
  featured?: boolean;
  page?: number;
  perPage?: number;
}): Promise<FetchBlogResult> {
  const params = new URLSearchParams();
  if (opts?.category) params.set("category", opts.category);
  if (opts?.featured) params.set("featured", "1");
  if (opts?.page) params.set("page", String(opts.page));
  params.set("per_page", String(opts?.perPage ?? 12));

  const res = await api<BlogListResponse>(`/api/v1/blog?${params.toString()}`, {
    next: { revalidate: 300, tags: ["blog"] }, // 5 min
  });

  if (!res.ok) {
    if ("skipped" in res) console.info(`[blog-api] ${res.reason}`);
    else console.warn(`[blog-api] /blog failed: ${res.status} ${res.message}`);
    return { posts: [], categories: [], totalPages: 0 };
  }

  return {
    posts: res.data.data ?? [],
    categories: res.data.categories ?? [],
    totalPages: res.data.meta?.last_page ?? 1,
  };
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await api<BlogPost>(`/api/v1/blog/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300, tags: ["blog", `blog:${slug}`] },
  });

  if (!res.ok) {
    if ("skipped" in res) {
      console.info(`[blog-api] ${res.reason}`);
    } else if (res.status !== 404) {
      console.warn(`[blog-api] /blog/${slug} failed: ${res.status} ${res.message}`);
    }
    return null;
  }

  return res.data;
}
