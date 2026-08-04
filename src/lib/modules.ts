import {
  Package,
  Pill,
  ShoppingBag,
  ShoppingBasket,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import type { ComponentType } from "react";

export type DeliveryModule = {
  slug: string;
  name: string;
  description: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  /** Tailwind bg + text classes for the card visual area. */
  accent: string;
  /** Optional product image path — shown instead of the icon when set. */
  image?: string;
  /** Link destination on the customer app. */
  href: string;
};

/**
 * Verticals BiteExpress operates. Mirrors the modules concept on the
 * customer-app side (Food, Grocery, Pharmacy, Parcel, Shopping, Wine).
 * Each card on the home page links to the equivalent module landing
 * on app.bite.express.
 */
const APP_URL = "https://app.bite.express";

export const deliveryModules: readonly DeliveryModule[] = [
  {
    slug: "food",
    name: "Food",
    description: "Order from your favourite restaurants and local kitchens.",
    icon: UtensilsCrossed,
    accent: "bg-brand-red/10 text-brand-red",
    image: "/brand/modules/food.png",
    href: `${APP_URL}/browse/2`,
  },
  {
    slug: "grocery",
    name: "Grocery",
    description: "Groceries and household essentials delivered to your door.",
    icon: ShoppingBasket,
    accent: "bg-emerald-50 text-emerald-700",
    image: "/brand/modules/grocery.png",
    href: `${APP_URL}/browse/3`,
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    description: "Medicines, health essentials and personal care.",
    icon: Pill,
    accent: "bg-sky-50 text-sky-700",
    image: "/brand/modules/pharmacy.png",
    href: `${APP_URL}/browse/4`,
  },
  {
    slug: "parcel",
    name: "Parcel",
    description: "Send packages across town with fast, reliable pickups.",
    icon: Package,
    accent: "bg-amber-50 text-amber-700",
    image: "/brand/modules/parcel.png",
    href: `${APP_URL}/browse/5`,
  },
  {
    slug: "shopping",
    name: "Shopping",
    description: "Shop trending items from trusted local stores.",
    icon: ShoppingBag,
    accent: "bg-violet-50 text-violet-700",
    image: "/brand/hero/shopping.png",
    href: `${APP_URL}/browse/6`,
  },
  {
    slug: "wine",
    name: "Wine",
    description: "Wine, spirits and beverages delivered to your door.",
    icon: Wine,
    accent: "bg-rose-50 text-rose-700",
    image: "/brand/modules/wine.png",
    href: `${APP_URL}/browse/7`,
  },
];
