"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Package,
  Pill,
  ShoppingBag,
  ShoppingBasket,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  slug: string;
  name: string;
  description: string;
  accent: string;
  image?: string;
  href: string;
  index?: number;
};

const ICON_MAP: Record<string, LucideIcon> = {
  food: UtensilsCrossed,
  grocery: ShoppingBasket,
  pharmacy: Pill,
  parcel: Package,
  shopping: ShoppingBag,
  wine: Wine,
};

/**
 * Premium service card with:
 *   - Cursor-tracking inner glow (radial gradient follows mouse)
 *   - Subtle 3D perspective tilt on hover
 *   - Image micro-parallax on hover
 *   - Scroll-triggered entrance via parent StaggerReveal
 */
export function HomeServiceCard({
  slug,
  name,
  description,
  accent,
  image,
  href,
  index = 0,
}: Props) {
  const Icon = ICON_MAP[slug] || UtensilsCrossed;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reducedMotion) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);

      // 3D tilt based on cursor position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    },
    [reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <Link
        ref={cardRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-glow-card group flex min-h-[23rem] flex-col overflow-hidden rounded-lg border border-ink-200 bg-surface shadow-card transition-[box-shadow,border-color] duration-[280ms] ease-out-expo hover:border-brand-red/30 hover:shadow-floating"
        style={{ willChange: "transform" }}
      >
        {/* Visual area — product image or icon on accent background */}
        <div
          className={cn(
            "relative flex h-48 items-center justify-center overflow-hidden",
            accent,
          )}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),transparent_42%),radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.7),transparent_30%)]"
          />
          <div
            aria-hidden
            className="absolute left-4 top-4 rounded-md bg-white/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-600 shadow-soft backdrop-blur"
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          {image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image}
              alt=""
              draggable={false}
              className="relative h-full w-full select-none object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="relative flex h-24 w-24 items-center justify-center rounded-lg border border-current/15 bg-white/55 shadow-soft backdrop-blur-sm transition duration-300 group-hover:scale-[1.04]">
              <Icon
                size={48}
                strokeWidth={1.25}
                className="transition duration-300 group-hover:scale-110"
              />
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-5 pt-5">
          <h3 className="text-lg font-bold leading-snug text-ink-900">
            {name}
          </h3>
          <p className="mt-2 text-sm leading-[1.65] text-ink-600">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-semibold text-brand-red">
            <span className="h-px flex-1 bg-gradient-to-r from-brand-red/24 to-transparent" />
            <span className="inline-flex items-center gap-1.5">
              Explore
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
