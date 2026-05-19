import { api } from "./api-client";

/**
 * Live module data from the backend. Used to:
 *   - Surface real store counts per module (and per zone, when zoneId
 *     header is supplied)
 *   - Validate which modules are actually active in production
 *
 * The visual layer for module cards (lucide icon, brand copy, link)
 * stays in lib/modules.ts — backend module URLs and icons are
 * inconsistent and tend to fight the brand. We marry the two at the
 * render layer: lucide icon + curated copy + live store count.
 */

export type BackendModule = {
  id: number;
  module_name: string;
  module_type: string;
  description?: string | null;
  status?: number | boolean;
  stores_count?: number;
  items_count?: number;
  thumbnail_full_url?: string;
  icon_full_url?: string;
};

/**
 * Fetch active modules. Optionally pass a zoneId to get store counts
 * scoped to that zone — the backend reads the `zoneId` header.
 */
export async function fetchModules(opts?: {
  zoneId?: number | number[];
  locale?: string;
}): Promise<BackendModule[]> {
  const headers: Record<string, string> = {};
  if (opts?.zoneId !== undefined) {
    headers.zoneId = Array.isArray(opts.zoneId)
      ? JSON.stringify(opts.zoneId)
      : String(opts.zoneId);
  }

  const res = await api<BackendModule[]>("/api/v1/module", {
    headers,
    locale: opts?.locale,
    next: { revalidate: 1800, tags: ["modules"] },
  });

  if (!res.ok) {
    if ("skipped" in res) {
      console.info(`[modules-api] ${res.reason}`);
    } else {
      console.warn(`[modules-api] /module failed: ${res.status} ${res.message}`);
    }
    return [];
  }
  return Array.isArray(res.data) ? res.data : [];
}

/**
 * Build a quick lookup of stores_count keyed by module_type
 * ("food" / "grocery" / "pharmacy" / etc.) — perfect for stamping
 * onto our static module cards.
 */
export async function getStoreCountsByModuleType(opts?: {
  zoneId?: number | number[];
}): Promise<Record<string, number>> {
  const modules = await fetchModules(opts);
  const out: Record<string, number> = {};
  for (const m of modules) {
    if (m.module_type) out[m.module_type] = m.stores_count ?? 0;
  }
  return out;
}
