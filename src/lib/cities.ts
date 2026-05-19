/**
 * Launch-market cities (curated). Each gets a hand-tuned SEO landing page
 * in Phase 4; in Phase 1 we use this registry for sitemap entries,
 * Organization.areaServed, and the homepage city showcase.
 *
 * When the backend exposes `GET /api/v1/zones`, Phase 4 will UNION this
 * curated list with the API result — entries here always win on slug
 * collisions because the copy is hand-tuned for search.
 */

export type City = {
  slug: string;
  name: string;
  state: string;
  country: "Nigeria";
  /** Optional concise tagline — used on city tiles and Phase-4 hero. */
  tagline?: string;
};

export const cities: readonly City[] = [
  {
    slug: "zaria",
    name: "Zaria",
    state: "Kaduna",
    country: "Nigeria",
    tagline: "From Sabon Gari to Samaru — your neighbourhood favourites in minutes.",
  },
  {
    slug: "kaduna",
    name: "Kaduna",
    state: "Kaduna",
    country: "Nigeria",
    tagline: "Suya, jollof and groceries delivered across Kaduna.",
  },
  {
    slug: "sokoto",
    name: "Sokoto",
    state: "Sokoto",
    country: "Nigeria",
    tagline: "Fast delivery from your favourite Sokoto kitchens and stores.",
  },
  {
    slug: "kano",
    name: "Kano",
    state: "Kano",
    country: "Nigeria",
    tagline: "Kano's best restaurants and supermarkets, at your door.",
  },
  {
    slug: "makurdi",
    name: "Makurdi",
    state: "Benue",
    country: "Nigeria",
    tagline: "Benue flavours delivered fresh in Makurdi.",
  },
  {
    slug: "jos",
    name: "Jos",
    state: "Plateau",
    country: "Nigeria",
    tagline: "Jos plateau eats and essentials, on demand.",
  },
  {
    slug: "yola",
    name: "Yola",
    state: "Adamawa",
    country: "Nigeria",
    tagline: "Yola's go-to vendors, delivered fast.",
  },
  {
    slug: "ilorin",
    name: "Ilorin",
    state: "Kwara",
    country: "Nigeria",
    tagline: "Ilorin's restaurants, supermarkets and pharmacies in one app.",
  },
  {
    slug: "offa",
    name: "Offa",
    state: "Kwara",
    country: "Nigeria",
    tagline: "Local Offa favourites brought to your door.",
  },
  {
    slug: "omu-aran",
    name: "Omu-Aran",
    state: "Kwara",
    country: "Nigeria",
    tagline: "Omu-Aran orders delivered hot and fast.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
