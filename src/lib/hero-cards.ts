/**
 * Floating service cards around the hero phone mockup.
 *
 * Each card has an `imagePath` that points into /public/brand/hero/.
 * Until the real PNGs are dropped in, FloatingServiceCard falls back
 * to a styled icon placeholder so the layout reads as finished.
 *
 * To swap to real images:
 *   1. Drop PNGs at the imagePath locations below (suggested ~512x410,
 *      transparent background or matching dark card tint).
 *   2. No code change needed — FloatingServiceCard detects load
 *      success at runtime and hides the placeholder.
 *
 * Positions are tuned for the lg+ layout and use a 2-on-the-left,
 * 3-on-the-right arrangement that matches the design reference.
 *
 * NOTE: This module is imported by a SERVER component, so it cannot
 * export functions / component references that get forwarded to the
 * client. The icon is identified by a string `iconKey`; the client
 * `FloatingServiceCard` resolves the key to a LucideIcon internally.
 */

export type HeroCardIconKey =
  | "food"
  | "pharmacy"
  | "grocery"
  | "parcel"
  | "petrol";

export type HeroCard = {
  key: string;
  label: string;
  detail: string;
  imagePath: string;
  iconKey: HeroCardIconKey;
  /** Tailwind classes for the placeholder tile background + icon color. */
  placeholderAccent: string;
  /** Absolute positioning relative to the hero right column. */
  position: string;
  /** Reveal delay (seconds) — gives the cards a staggered entrance. */
  delay: number;
};

export const heroCards: readonly HeroCard[] = [
  {
    key: "food",
    label: "Food",
    detail: "Hot & fresh",
    imagePath: "/brand/hero/food.png",
    iconKey: "food",
    placeholderAccent:
      "bg-gradient-to-br from-amber-500/25 via-amber-700/15 to-transparent text-amber-200",
    position: "left-[2%] top-[8%]",
    delay: 0.05,
  },
  {
    key: "pharmacy",
    label: "Pharmacy",
    detail: "Health & wellness",
    imagePath: "/brand/hero/pharmacy.png",
    iconKey: "pharmacy",
    placeholderAccent:
      "bg-gradient-to-br from-sky-500/25 via-sky-700/15 to-transparent text-sky-200",
    position: "right-[2%] top-[8%]",
    delay: 0.14,
  },
  {
    key: "grocery",
    label: "Grocery",
    detail: "Daily essentials",
    imagePath: "/brand/hero/grocery.png",
    iconKey: "grocery",
    placeholderAccent:
      "bg-gradient-to-br from-emerald-500/25 via-emerald-700/15 to-transparent text-emerald-200",
    position: "left-[2%] top-[42%]",
    delay: 0.22,
  },
  {
    key: "parcel",
    label: "Parcel",
    detail: "Send & receive",
    imagePath: "/brand/hero/parcel.png",
    iconKey: "parcel",
    placeholderAccent:
      "bg-gradient-to-br from-orange-500/25 via-orange-700/15 to-transparent text-orange-200",
    position: "right-[2%] top-[40%]",
    delay: 0.3,
  },
  {
    key: "petrol",
    label: "Petrol",
    detail: "Refuel on demand",
    imagePath: "/brand/hero/petrol.png",
    iconKey: "petrol",
    placeholderAccent:
      "bg-gradient-to-br from-rose-500/25 via-rose-700/15 to-transparent text-rose-200",
    position: "right-[4%] top-[72%]",
    delay: 0.38,
  },
];

/**
 * Same paths exposed for the food-thumbnail inside the phone's order
 * card and any other one-off hero image. Keeps the file structure
 * documented in one place.
 */
export const heroAssetPaths = {
  orderThumbnail: "/brand/hero/order-thumbnail.png",
} as const;
