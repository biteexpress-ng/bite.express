/**
 * Pure URL-building helpers for the "use my current location" flow.
 * Kept dependency-free (no DOM, no Geolocation API) so the rounding and
 * query-param logic can be verified in isolation.
 */

const COORDINATE_DECIMALS = 5;

/**
 * Builds the customer-app URL carrying a rounded lat/lng pair, e.g.
 * `buildAppLocationUrl("https://app.bite.express", 6.5234567, 3.1234567)`
 * returns `"https://app.bite.express/?lat=6.52346&lng=3.12346"`.
 * Strips any trailing slash from `base` before appending the query.
 */
export function buildAppLocationUrl(
  base: string,
  lat: number,
  lng: number,
): string {
  const trimmedBase = base.replace(/\/+$/, "");
  const params = new URLSearchParams({
    lat: lat.toFixed(COORDINATE_DECIMALS),
    lng: lng.toFixed(COORDINATE_DECIMALS),
  });
  return `${trimmedBase}/?${params.toString()}`;
}
