import {
  Bike,
  Dumbbell,
  Package,
  Pill,
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
 * customer-app side (Food, Grocery, Pharmacy, Parcel, Rental, etc.).
 * Each card on the home page links to the equivalent module landing
 * on app.bite.express.
 */
const APP_URL = "https://app.bite.express";

export const deliveryModules: readonly DeliveryModule[] = [
  {
    slug: "food",
    name: "Food",
    description:
      "Order from your favourite restaurants — local kitchens, big chains, and everything in between.",
    icon: UtensilsCrossed,
    accent: "bg-brand-red/10 text-brand-red",
    href: `${APP_URL}/home?module=food`,
  },
  {
    slug: "grocery",
    name: "Grocery",
    description:
      "Fresh produce, pantry essentials and household items from supermarkets near you.",
    icon: ShoppingBasket,
    accent: "bg-emerald-100 text-emerald-700",
    href: `${APP_URL}/home?module=grocery`,
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    description:
      "Prescription refills, OTC essentials and personal care delivered discreetly.",
    icon: Pill,
    accent: "bg-sky-100 text-sky-700",
    href: `${APP_URL}/home?module=pharmacy`,
  },
  {
    slug: "parcel",
    name: "Parcel",
    description:
      "Send packages across town with live tracking and on-demand riders.",
    icon: Package,
    accent: "bg-amber-100 text-amber-700",
    href: `${APP_URL}/home?module=parcel`,
  },
  {
    slug: "rental",
    name: "Rental",
    description:
      "Rent a vehicle by the hour, day or week — from cars to power bikes.",
    icon: Bike,
    accent: "bg-violet-100 text-violet-700",
    href: `${APP_URL}/home?module=rental`,
  },
  {
    slug: "fitness",
    name: "Fitness & Wellness",
    description:
      "Book personal trainers, wellness sessions and recovery experiences nearby.",
    icon: Dumbbell,
    accent: "bg-rose-100 text-rose-700",
    href: `${APP_URL}/home?module=fitness`,
  },
];
