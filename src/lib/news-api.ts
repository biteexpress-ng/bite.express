import { api } from "./api-client";

export type NewsCategory = {
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
};

export type NewsType = "press_release" | "coverage" | "announcement";

export type NewsSource = {
  name: string;
  url: string | null;
  logo_url: string | null;
};

export type NewsAuthor = {
  name: string;
  role: string | null;
};

export type NewsItemListItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  type: NewsType;
  source: NewsSource | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  og_image_url: string | null;
  category: NewsCategory | null;
  author: NewsAuthor | null;
  featured: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export type NewsItem = NewsItemListItem & {
  content: string | null;
};

type NewsListResponse = {
  data: NewsItemListItem[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  categories: NewsCategory[];
};

export type FetchNewsResult = {
  items: NewsItemListItem[];
  categories: NewsCategory[];
  totalPages: number;
};

export async function fetchNewsItems(opts?: {
  category?: string;
  type?: NewsType;
  featured?: boolean;
  page?: number;
  perPage?: number;
}): Promise<FetchNewsResult> {
  const params = new URLSearchParams();
  if (opts?.category) params.set("category", opts.category);
  if (opts?.type) params.set("type", opts.type);
  if (opts?.featured) params.set("featured", "1");
  if (opts?.page) params.set("page", String(opts.page));
  params.set("per_page", String(opts?.perPage ?? 12));

  const res = await api<NewsListResponse>(`/api/v1/news?${params.toString()}`, {
    next: { revalidate: 300, tags: ["news"] },
  });

  if (!res.ok) {
    if ("skipped" in res) console.info(`[news-api] ${res.reason}`);
    else console.warn(`[news-api] /news failed: ${res.status} ${res.message}`);
    return { items: [], categories: [], totalPages: 0 };
  }

  return {
    items: res.data.data ?? [],
    categories: res.data.categories ?? [],
    totalPages: res.data.meta?.last_page ?? 1,
  };
}

export async function fetchNewsItem(slug: string): Promise<NewsItem | null> {
  const res = await api<NewsItem>(`/api/v1/news/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300, tags: ["news", `news:${slug}`] },
  });

  if (!res.ok) {
    if ("skipped" in res) {
      console.info(`[news-api] ${res.reason}`);
    } else if (res.status !== 404) {
      console.warn(`[news-api] /news/${slug} failed: ${res.status} ${res.message}`);
    }
    return null;
  }

  return res.data;
}
