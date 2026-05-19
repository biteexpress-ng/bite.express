/**
 * Curated cuisine / food-category registry. Used to power:
 *   - /cuisines (index)
 *   - /cuisines/[slug] (detail)
 *   - City pages, which list their popular cuisines via popularCuisineSlugs
 *   - Sitemap
 *
 * Slugs are stable URL identifiers — be deliberate about renaming.
 */

export type Cuisine = {
  slug: string;
  name: string;
  /** Short tagline used on tiles. */
  tagline: string;
  /** Long-form description used on the detail page. */
  description: string;
  /** Representative dishes / items — surface in copy. */
  popularItems: string[];
  /** Emoji used as a lightweight visual marker on tiles. */
  emoji: string;
};

export const cuisines: readonly Cuisine[] = [
  {
    slug: "jollof",
    name: "Jollof & Rice",
    tagline: "Smoky party jollof, fried rice, white rice and stew — all delivered hot.",
    description:
      "Jollof is the heartbeat of Nigerian dining and BiteExpress connects you to the kitchens that make it best in your city. Order classic Nigerian party jollof, fried rice, coconut rice or white rice and stew, with sides like fried plantain, moin moin and grilled chicken.",
    popularItems: [
      "Party jollof rice",
      "Fried rice",
      "Coconut rice",
      "Jollof with grilled chicken",
      "Rice & beans with stew",
    ],
    emoji: "🍚",
  },
  {
    slug: "suya",
    name: "Suya & Grills",
    tagline: "Hot off the grill — beef, chicken and kilishi from your favourite mai-suya.",
    description:
      "Whether it's late-night suya, kilishi for the road or a full asun platter, BiteExpress finds you the best grilled meats in your neighbourhood and delivers them hot and well-spiced.",
    popularItems: [
      "Beef suya",
      "Chicken suya",
      "Tsire",
      "Asun (peppered goat)",
      "Kilishi packs",
    ],
    emoji: "🍢",
  },
  {
    slug: "swallow",
    name: "Pounded Yam & Swallow",
    tagline: "Pounded yam, eba, fufu and amala with the soups you crave.",
    description:
      "The classics done right. Order pounded yam with egusi, eba with okra, amala with ewedu and gbegiri, fufu with onugbu — paired with assorted meat or fish, delivered while still piping hot.",
    popularItems: [
      "Pounded yam & egusi",
      "Eba & okra soup",
      "Amala with ewedu & gbegiri",
      "Fufu & onugbu",
      "Tuwo shinkafa",
    ],
    emoji: "🍲",
  },
  {
    slug: "pepper-soup",
    name: "Pepper Soup",
    tagline: "Catfish, goat, assorted — soulful, peppery, just right.",
    description:
      "When you need something soulful, pepper soup hits every time. Choose from catfish, goat meat, assorted, chicken or cow leg — well-seasoned, well-spiced, delivered hot.",
    popularItems: [
      "Catfish pepper soup",
      "Goat pepper soup",
      "Assorted pepper soup",
      "Chicken pepper soup",
    ],
    emoji: "🥣",
  },
  {
    slug: "rice-and-stew",
    name: "Rice & Stew",
    tagline: "Steaming white rice with hearty stew — comfort, fast.",
    description:
      "Sometimes you just want rice and stew and BiteExpress brings it to you the way home-cooking should taste — long-grain rice, tomato-rich stew, and your choice of chicken, beef, fish or assorted.",
    popularItems: [
      "White rice & stew",
      "White rice & chicken stew",
      "Rice & beans with fish",
      "Ofada rice with ayamase",
    ],
    emoji: "🍛",
  },
  {
    slug: "grilled-fish",
    name: "Grilled Fish",
    tagline: "Whole tilapia, croaker and catfish — grilled and seasoned right.",
    description:
      "Order whole grilled fish — tilapia, croaker or catfish — with pepper sauce, plantain and your sides of choice. Best paired with cold drinks; we deliver both.",
    popularItems: [
      "Grilled tilapia with plantain",
      "Croaker fish with pepper sauce",
      "Catfish point-and-kill",
    ],
    emoji: "🐟",
  },
  {
    slug: "burgers",
    name: "Burgers & Chicken",
    tagline: "Burgers, wings, fried chicken — your fast-food cravings, delivered.",
    description:
      "Beef burgers, chicken sandwiches, hot wings, fried chicken buckets — the whole fast-food repertoire from your favourite chains and local spots. Fast prep, faster delivery.",
    popularItems: [
      "Beef burger combo",
      "Chicken wings (8 pcs)",
      "Fried chicken bucket",
      "Chicken sandwich",
    ],
    emoji: "🍔",
  },
  {
    slug: "pizza",
    name: "Pizza",
    tagline: "Hot, fresh, properly cheesy pizza at your door.",
    description:
      "Classic margherita, pepperoni, BBQ chicken, meat-feast — order from your favourite pizzerias and enjoy live tracking from oven to door so you know exactly when to expect it.",
    popularItems: ["Margherita", "Pepperoni", "BBQ chicken", "Meat feast", "Veggie supreme"],
    emoji: "🍕",
  },
  {
    slug: "continental",
    name: "Continental",
    tagline: "Pasta, steaks, salads and breakfast plates done well.",
    description:
      "Continental classics — creamy pasta, well-rested steaks, fresh salads and proper breakfast plates — delivered hot and presented like the kitchen meant it.",
    popularItems: [
      "Chicken alfredo",
      "Spaghetti bolognese",
      "Grilled steak with sides",
      "Caesar salad",
      "Full English breakfast",
    ],
    emoji: "🍝",
  },
  {
    slug: "chinese",
    name: "Chinese & Asian",
    tagline: "Fried rice, noodles, sweet & sour — Asian favourites on demand.",
    description:
      "Chinese-style fried rice, chow mein, sweet & sour chicken, spring rolls, dumplings and beyond — from the Asian kitchens in your city.",
    popularItems: [
      "Chinese fried rice",
      "Chow mein noodles",
      "Sweet & sour chicken",
      "Spring rolls",
      "Sesame chicken",
    ],
    emoji: "🥡",
  },
  {
    slug: "shawarma",
    name: "Shawarma & Lebanese",
    tagline: "Chicken or beef shawarma — wrapped, sauced, perfect.",
    description:
      "Late-night cravings or a full Lebanese spread, BiteExpress delivers shawarma the way it was meant to be — generously filled, perfectly sauced and still hot when it lands.",
    popularItems: [
      "Chicken shawarma",
      "Beef shawarma",
      "Mixed shawarma",
      "Falafel wrap",
      "Hummus & pita",
    ],
    emoji: "🌯",
  },
  {
    slug: "pastries",
    name: "Pastries & Breakfast",
    tagline: "Meat pies, doughnuts, sausage rolls and breakfast pastries.",
    description:
      "From the early-morning meat pie run to that 11am sausage-roll-and-zobo combo — BiteExpress connects you to the bakeries and pastry shops your city loves.",
    popularItems: [
      "Meat pie",
      "Sausage roll",
      "Doughnut box",
      "Chicken pie",
      "Croissant + coffee",
    ],
    emoji: "🥐",
  },
  {
    slug: "smoothies",
    name: "Smoothies & Juices",
    tagline: "Fresh fruit smoothies, cold-pressed juices, milkshakes.",
    description:
      "Cold-pressed juices, fresh fruit smoothies, milkshakes and energy bowls from the healthy spots in your city — the way to start your day or beat the afternoon slump.",
    popularItems: [
      "Mixed-fruit smoothie",
      "Cold-pressed green juice",
      "Watermelon mint cooler",
      "Banana protein shake",
    ],
    emoji: "🥤",
  },
];

export function getCuisine(slug: string): Cuisine | undefined {
  return cuisines.find((c) => c.slug === slug);
}

export function cuisinesAlphabetical(): Cuisine[] {
  return [...cuisines].sort((a, b) => a.name.localeCompare(b.name));
}
