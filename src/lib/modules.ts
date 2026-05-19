import {
  Fuel,
  Package,
  Pill,
  ShoppingBag,
  ShoppingBasket,
  UtensilsCrossed,
} from "lucide-react";
import type { ComponentType } from "react";

export type DeliveryModule = {
  slug: string;
  name: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** Tailwind classes for the icon tile background+foreground. */
  accent: string;
  /** Link destination on the customer app. */
  href: string;
};

/**
 * Verticals BiteExpress operates. Mirrors the modules concept on the
 * customer-app side (Food, Grocery, Pharmacy, Parcel, Shopping, Petrol).
 * Each card on the home page links to the equivalent module landing
 * on app.bite.express.
 */
const APP_URL = "https://app.bite.express";

export const deliveryModules: readonly DeliveryModule[] = [
  {
    slug: "food",
    name: "Food",
    description:
      "Order from neighbourhood kitchens, premium restaurants and everyday favourites.",
    icon: UtensilsCrossed,
    accent: "bg-brand-red/10 text-brand-red",
    href: `${APP_URL}/home?module=food`,
  },
  {
    slug: "grocery",
    name: "Grocery",
    description:
      "Fresh produce, pantry staples and household essentials from stores near you.",
    icon: ShoppingBasket,
    accent: "bg-emerald-100 text-emerald-700",
    href: `${APP_URL}/home?module=grocery`,
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    description:
      "Medicine, refills and personal care delivered with speed and discretion.",
    icon: Pill,
    accent: "bg-sky-100 text-sky-700",
    href: `${APP_URL}/home?module=pharmacy`,
  },
  {
    slug: "parcel",
    name: "Parcel",
    description:
      "Send packages across town with reliable riders and live route visibility.",
    icon: Package,
    accent: "bg-amber-100 text-amber-700",
    href: `${APP_URL}/home?module=parcel`,
  },
  {
    slug: "shopping",
    name: "Shopping",
    description:
      "Shop local stores, beauty counters and everyday retail without the errand.",
    icon: ShoppingBag,
    accent: "bg-violet-100 text-violet-700",
    href: `${APP_URL}/home?module=shopping`,
  },
  {
    slug: "petrol",
    name: "Petrol",
    description:
      "Fuel and station runs coordinated through BiteExpress where available.",
    icon: Fuel,
    accent: "bg-rose-100 text-rose-700",
    href: `${APP_URL}/home?module=petrol`,
  },
];
