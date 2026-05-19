/**
 * Shared BiteExpress backend HTTP client.
 *
 * Mirrors the headers the existing customer app's MainApi.js sends so
 * the backend treats us as a recognised client:
 *   - X-software-id: 33571750  (the 6amMart software identifier)
 *   - X-localization:           current locale (defaults to "en")
 *   - origin:                   our public site URL
 *   - Accept: application/json
 *
 * Everything here is server-side only — these calls happen during SSR
 * or in Server Actions, never from the browser. The browser talks to
 * the customer app (app.bite.express), not the backend directly.
 *
 * Errors never throw: callers get { ok: false, ... } and decide. This
 * makes the marketing site resilient to backend outages — pages still
 * render, just with curated fallbacks instead of live data.
 */

const SOFTWARE_ID = "33571750";

type RequestOpts = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  /** Plain object body — JSON-encoded for POST/PUT, ignored for GET. */
  body?: Record<string, unknown>;
  /** Extra headers merged on top of the canonical set. */
  headers?: Record<string, string>;
  /** Bearer token for authenticated calls (we don't use this yet). */
  token?: string;
  /** Locale for X-localization. Defaults to "en". */
  locale?: string;
  /** Optional Next.js fetch cache options (revalidate, tags). */
  next?: { revalidate?: number | false; tags?: string[] };
  /** Override the default 10s timeout. */
  timeoutMs?: number;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; status: number; message: string };

function apiBase(): string | null {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.API_BASE_URL ??
    null;
  return base ? base.replace(/\/$/, "") : null;
}

function publicOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://bite.express"
  );
}

export async function api<T>(
  path: string,
  opts: RequestOpts = {},
): Promise<ApiResult<T>> {
  const base = apiBase();
  if (!base) {
    return {
      ok: false,
      skipped: true,
      reason: "NEXT_PUBLIC_API_BASE_URL not set — backend call skipped.",
    };
  }

  const headers: Record<string, string> = {
    "X-software-id": SOFTWARE_ID,
    "X-localization": opts.locale ?? "en",
    "X-server": "server",
    origin: publicOrigin(),
    Accept: "application/json",
    ...opts.headers,
  };
  if (opts.body) headers["Content-Type"] = "application/json";
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: AbortSignal.timeout(opts.timeoutMs ?? 10_000),
      next: opts.next,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, status: res.status, message: text || res.statusText };
    }

    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 0, message };
  }
}
