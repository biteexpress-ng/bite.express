import { cities, type City } from "./cities";

/**
 * Backend zones fetcher with graceful fallback.
 *
 * When the Laravel backend exposes a `GET /api/v1/zones` list endpoint
 * returning active zones, we union those zones into the rendered city
 * set on /cities — so ops launching a new city automatically gets a
 * page without requiring a code deploy.
 *
 * If the endpoint isn't reachable, returns an empty array — callers
 * fall back to the curated list in lib/cities.ts. Curated entries
 * always win on slug collisions because their copy is hand-tuned.
 */

type ZoneApiResponse = {
  zones?: Array<{
    name?: string;
    slug?: string;
    state?: string;
    is_active?: boolean | number;
  }>;
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Fetch zones from the Laravel backend. Best-effort, never throws,
 * always returns an array (possibly empty).
 *
 * Cached for 1 hour at the data layer — combined with ISR on the
 * city index page, new zones surface within an hour without a deploy.
 */
export async function fetchBackendZones(): Promise<City[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return [];

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/v1/zones`, {
      headers: { Accept: "application/json", "X-software-id": "33571750" },
      next: { revalidate: 3600, tags: ["zones"] },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as ZoneApiResponse;
    const raw = Array.isArray(data?.zones) ? data.zones : [];

    return raw
      .filter((z) => z.is_active !== false && z.is_active !== 0)
      .map((z): City | null => {
        const name = (z.name ?? "").trim();
        if (!name) return null;
        const slug = z.slug?.trim() || toSlug(name);
        return {
          slug,
          name,
          state: z.state?.trim() || "Nigeria",
          country: "Nigeria",
          tagline: `Fast delivery across ${name}.`,
          intro: `BiteExpress now operates in ${name}. Order food, groceries and more from vendors near you — with live tracking from kitchen to door.`,
          neighborhoods: [],
          popularCuisineSlugs: [],
        };
      })
      .filter((z): z is City => z !== null);
  } catch (err) {
    console.warn("[zones-api] fetch failed, falling back to curated list:", err);
    return [];
  }
}

/**
 * Return the union of curated cities and backend zones, deduped by
 * slug. Curated entries always take precedence (they have hand-tuned
 * copy and neighborhood data).
 */
export async function getServedCities(): Promise<City[]> {
  const backend = await fetchBackendZones();
  if (backend.length === 0) return [...cities];

  const bySlug = new Map<string, City>();
  // Insert backend first so curated overrides on collision.
  for (const z of backend) bySlug.set(z.slug, z);
  for (const c of cities) bySlug.set(c.slug, c);

  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}
