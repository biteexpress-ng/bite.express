import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation webhook for the Laravel admin.
 *
 * When an editor publishes / updates / deletes a blog post, news item
 * or job posting, the admin can POST here to instantly refresh the
 * affected page on the marketing site instead of waiting for the
 * ISR cycle.
 *
 * Usage from Laravel (or curl):
 *   curl -X POST 'https://bite.express/api/revalidate?secret=...' \
 *     -H 'Content-Type: application/json' \
 *     -d '{"type":"blog","slug":"hello-world"}'
 *
 * `type` ∈ {"blog","news","jobs","team","zones","modules","agents","all"}
 *   - blog/news/jobs: revalidates the index + the slug detail (if provided)
 *   - team: refreshes /about after the roster changes
 *   - zones/modules: revalidates pages that depend on those caches
 *   - agents: refreshes /agents after the agent programme settings change
 *     (the advertised welcome bonus)
 *   - all: nuclear option — revalidates every CMS-driven path + tag
 *
 * `slug` is optional. When present, the per-slug page is also bumped.
 *
 * The shared secret is REVALIDATION_SECRET (env). If unset, the
 * endpoint refuses every request — never accidentally open to the
 * internet.
 */

type Body = {
  type?:
    | "blog"
    | "news"
    | "jobs"
    | "team"
    | "zones"
    | "modules"
    | "agents"
    | "all";
  slug?: string;
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, message: "Revalidation secret not configured." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const provided =
    url.searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");
  if (provided !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    /* allow empty body — treat as "all" */
  }

  const type = body.type ?? "all";
  const slug = body.slug?.trim();
  const revalidated: string[] = [];

  const bumpTag = (tag: string) => {
    // { expire: 0 } is Next 16's documented pattern for third-party
    // webhooks that need immediate expiration (vs the default
    // stale-while-revalidate semantics).
    revalidateTag(tag, { expire: 0 });
    revalidated.push(`tag:${tag}`);
  };
  const bumpPath = (path: string) => {
    revalidatePath(path);
    revalidated.push(`path:${path}`);
  };

  if (type === "blog" || type === "all") {
    bumpTag("blog");
    bumpPath("/blog");
    if (slug) bumpPath(`/blog/${slug}`);
  }
  if (type === "news" || type === "all") {
    bumpTag("news");
    bumpPath("/press");
    if (slug) bumpPath(`/press/${slug}`);
  }
  if (type === "jobs" || type === "all") {
    bumpTag("jobs");
    bumpPath("/careers");
    if (slug) bumpPath(`/careers/${slug}`);
  }
  // Team roster on /about. No per-slug page: the roster is one section.
  if (type === "team" || type === "all") {
    bumpTag("team");
    bumpPath("/about");
  }
  if (type === "zones" || type === "all") {
    bumpTag("zones");
    bumpPath("/cities");
  }
  if (type === "modules" || type === "all") {
    bumpTag("modules");
  }
  // Agent programme settings (the welcome bonus advertised on /agents).
  if (type === "agents" || type === "all") {
    bumpTag("agent-program");
    bumpPath("/agents");
  }

  // Sitemap is computed from all of the above sources.
  if (type === "all" || type === "blog" || type === "news" || type === "jobs") {
    bumpPath("/sitemap.xml");
  }

  return NextResponse.json({ ok: true, revalidated });
}

/** GET is allowed for casual diagnostics — returns whether the secret is configured. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: Boolean(process.env.REVALIDATION_SECRET),
    hint: "POST {type, slug?} with ?secret=… or X-Revalidate-Secret header to refresh.",
  });
}
