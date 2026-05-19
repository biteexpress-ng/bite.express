/**
 * Curated launch-market cities. Each entry feeds:
 *   - /cities (index page)
 *   - /cities/[slug] (detail page)
 *   - Organization.areaServed + per-city LocalBusiness JSON-LD
 *   - Sitemap
 *
 * Phase 4 reads this file as the source of truth. When the backend
 * exposes a list-zones endpoint, lib/zones-api.ts unions any new
 * zones into the rendered set — but curated entries here always
 * win on slug collisions because the copy is hand-tuned for search.
 */

export type City = {
  slug: string;
  name: string;
  state: string;
  country: "Nigeria";
  /** Concise tagline shown on tiles and as the city subtitle. */
  tagline: string;
  /** Hand-tuned paragraph used as the city-page intro. */
  intro: string;
  /** Neighbourhood / district names — surface in copy and the
   *  "Now delivering across" chip row. */
  neighborhoods: string[];
  /** Slugs from lib/cuisines.ts that are popular in this city. */
  popularCuisineSlugs: string[];
};

export const cities: readonly City[] = [
  {
    slug: "zaria",
    name: "Zaria",
    state: "Kaduna",
    country: "Nigeria",
    tagline:
      "From Sabon Gari to Samaru — your neighbourhood favourites in minutes.",
    intro:
      "Zaria's food and grocery scene runs from the Sabon Gari markets through to the Samaru student strip — and BiteExpress brings the best of it to your door. Whether you're a student needing a late-night plate or a family stocking up for the week, our rider network is on the road from morning till late.",
    neighborhoods: ["Samaru", "Sabon Gari", "Tudun Wada", "Wusasa", "Kongo"],
    popularCuisineSlugs: ["jollof", "suya", "pastries", "swallow", "rice-and-stew"],
  },
  {
    slug: "kaduna",
    name: "Kaduna",
    state: "Kaduna",
    country: "Nigeria",
    tagline: "Suya, jollof and groceries delivered across Kaduna.",
    intro:
      "Kaduna is BiteExpress's home town and our busiest market — we know every neighbourhood from Barnawa to Malali, every favourite suya joint, every late-night cravings spot. Restaurants, supermarkets, pharmacies and parcel deliveries, all on the same app.",
    neighborhoods: ["Barnawa", "Malali", "Ungwan Rimi", "Trikania", "Kawo", "Narayi"],
    popularCuisineSlugs: ["suya", "jollof", "swallow", "pepper-soup", "burgers"],
  },
  {
    slug: "sokoto",
    name: "Sokoto",
    state: "Sokoto",
    country: "Nigeria",
    tagline: "Fast delivery from your favourite Sokoto kitchens and stores.",
    intro:
      "Sokoto's BiteExpress riders crisscross the city from the Central Market to the university and beyond, bringing food, groceries and pharmacy essentials to your door. The selection grows every week as new vendors come on board.",
    neighborhoods: ["Mabera", "Runjin Sambo", "Gawon Nama", "Tudun Wada"],
    popularCuisineSlugs: ["jollof", "swallow", "rice-and-stew", "grilled-fish"],
  },
  {
    slug: "kano",
    name: "Kano",
    state: "Kano",
    country: "Nigeria",
    tagline: "Kano's best restaurants and supermarkets, at your door.",
    intro:
      "Kano is the commercial heart of Northern Nigeria and BiteExpress is here for it — from Sabon Gari to Nasarawa GRA, from Bompai to Sharada, our riders deliver hot food, weekly groceries, prescription refills and on-demand parcels across the city.",
    neighborhoods: [
      "Sabon Gari",
      "Nasarawa GRA",
      "Bompai",
      "Sharada",
      "Tarauni",
      "Hotoro",
    ],
    popularCuisineSlugs: ["suya", "jollof", "swallow", "grilled-fish", "burgers", "chinese"],
  },
  {
    slug: "makurdi",
    name: "Makurdi",
    state: "Benue",
    country: "Nigeria",
    tagline: "Benue flavours delivered fresh in Makurdi.",
    intro:
      "Makurdi has some of the most underrated food in the country and BiteExpress is bringing it to your door — from rice and beans done the Benue way to neighbourhood pizza and grill spots. Add groceries and pharmacy delivery and your day just got simpler.",
    neighborhoods: ["High Level", "Wadata", "North Bank", "Wurukum"],
    popularCuisineSlugs: ["rice-and-stew", "swallow", "grilled-fish", "pizza", "pastries"],
  },
  {
    slug: "jos",
    name: "Jos",
    state: "Plateau",
    country: "Nigeria",
    tagline: "Jos plateau eats and essentials, on demand.",
    intro:
      "Jos's mild weather and rich food culture are a perfect match for delivery — BiteExpress riders cover the city from Rayfield to Bukuru, bringing you everything from continental breakfast to local rice-and-stew, fresh groceries and pharmacy basics.",
    neighborhoods: ["Rayfield", "Bukuru", "Jenta Adamu", "Angwan Rukuba", "Tudun Wada"],
    popularCuisineSlugs: ["continental", "jollof", "burgers", "pastries", "smoothies"],
  },
  {
    slug: "yola",
    name: "Yola",
    state: "Adamawa",
    country: "Nigeria",
    tagline: "Yola's go-to vendors, delivered fast.",
    intro:
      "Yola's BiteExpress network covers Jimeta through Yola town and reaches the AUN community — bringing local kitchens, supermarkets and pharmacies onto a single, fast app. Order in 3 taps; track every step on the map.",
    neighborhoods: ["Jimeta", "Yola Town", "Karewa", "Sangere"],
    popularCuisineSlugs: ["jollof", "suya", "rice-and-stew", "swallow", "grilled-fish"],
  },
  {
    slug: "ilorin",
    name: "Ilorin",
    state: "Kwara",
    country: "Nigeria",
    tagline: "Ilorin's restaurants, supermarkets and pharmacies in one app.",
    intro:
      "Ilorin's growing food scene meets BiteExpress's rider network — from GRA to Tanke and out to the University of Ilorin, we connect students, families and offices to the best local kitchens, supermarkets and pharmacies in the city.",
    neighborhoods: ["GRA", "Tanke", "Sango", "Adewole", "Fate", "Unilorin"],
    popularCuisineSlugs: ["jollof", "swallow", "rice-and-stew", "burgers", "pastries"],
  },
  {
    slug: "offa",
    name: "Offa",
    state: "Kwara",
    country: "Nigeria",
    tagline: "Local Offa favourites brought to your door.",
    intro:
      "Offa might be smaller than the megacities, but BiteExpress treats it with the same care — covering the town's restaurants, neighbourhood vendors and pharmacies with the same fast, tracked delivery as anywhere else.",
    neighborhoods: ["Iree", "Sango", "Owode", "Town centre"],
    popularCuisineSlugs: ["jollof", "swallow", "rice-and-stew", "grilled-fish"],
  },
  {
    slug: "omu-aran",
    name: "Omu-Aran",
    state: "Kwara",
    country: "Nigeria",
    tagline: "Omu-Aran orders delivered hot and fast.",
    intro:
      "Omu-Aran's BiteExpress operation serves the Landmark University community and the wider town — from morning pastries to evening rice and stews, plus groceries and pharmacy basics whenever you need them.",
    neighborhoods: ["Landmark area", "Town centre", "Idofin", "Aran"],
    popularCuisineSlugs: ["jollof", "swallow", "rice-and-stew", "pastries", "smoothies"],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Cities sorted alphabetically — used by the index page and footers. */
export function citiesAlphabetical(): City[] {
  return [...cities].sort((a, b) => a.name.localeCompare(b.name));
}
