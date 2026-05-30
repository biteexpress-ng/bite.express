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
 * customer-app side (Food, Grocery, Pharmacy, Parcel, Shopping, Petrol).
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
    href: `${APP_URL}/home?module=food`,
  },
  {
    slug: "grocery",
    name: "Grocery",
    description: "Groceries and household essentials delivered to your door.",
    icon: ShoppingBasket,
    accent: "bg-emerald-50 text-emerald-700",
    href: `${APP_URL}/home?module=grocery`,
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    description: "Medicines, health essentials and personal care.",
    icon: Pill,
    accent: "bg-sky-50 text-sky-700",
    href: `${APP_URL}/home?module=pharmacy`,
  },
  {
    slug: "parcel",
    name: "Parcel",
    description: "Send packages across town with fast, reliable pickups.",
    icon: Package,
    accent: "bg-amber-50 text-amber-700",
    href: `${APP_URL}/home?module=parcel`,
  },
  {
    slug: "shopping",
    name: "Shopping",
    description: "Shop trending items from trusted local stores.",
    icon: ShoppingBag,
    accent: "bg-violet-50 text-violet-700",
    href: `${APP_URL}/home?module=shopping`,
  },
  {
    slug: "petrol",
    name: "Petrol",
    description: "Refuel your vehicle without leaving your home.",
    icon: Fuel,
    accent: "bg-rose-50 text-rose-700",
    href: `${APP_URL}/home?module=petrol`,
  },
];
