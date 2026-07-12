/**
 * WhatsApp ordering — presentation data that isn't user-facing copy.
 *
 * The wa.me deep link itself lives in `siteConfig.whatsappOrder` (single
 * source of truth). This module only holds the light, expandable data the
 * /whatsapp page renders: where ordering is live today vs. coming next.
 *
 * Keep this deliberately small. As WhatsApp ordering rolls out to more
 * markets, move a `name` from `waComingSoonCities` to `waLiveCities`.
 * City copy for the wider brand lives in `lib/cities.ts`; this is scoped
 * to the WhatsApp channel's own, narrower rollout.
 */

export type WaCity = {
  name: string;
  /** Optional — omitted where the name already reads as the location. */
  state?: string;
};

/** Markets where WhatsApp ordering is live right now. */
export const waLiveCities: readonly WaCity[] = [
  { name: "Zaria", state: "Kaduna" },
  { name: "Kaduna", state: "Kaduna" },
  { name: "Kano", state: "Kano" },
  { name: "Sokoto", state: "Sokoto" },
  { name: "Jos", state: "Plateau" },
  { name: "Minna", state: "Niger" },
  { name: "Ilorin", state: "Kwara" },
  { name: "Benue" },
  { name: "Yola", state: "Adamawa" },
  { name: "Offa", state: "Kwara" },
  { name: "Omu-Aran", state: "Kwara" },
];

/** Next markets in the rollout, shown as a lighter "coming soon" row. */
export const waComingSoonCities: readonly WaCity[] = [
  { name: "Abuja", state: "FCT" },
  { name: "Ibadan", state: "Oyo" },
  { name: "Lagos", state: "Lagos" },
];
