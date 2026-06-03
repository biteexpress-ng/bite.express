"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroCards, type HeroCard } from "@/lib/hero-cards";
import { FloatingServiceCard } from "./FloatingServiceCard";
import { PhoneOrderPreview } from "./PhoneOrderPreview";

/**
 * The hero phone flanked by floating service cards.
 *
 * All five cards live in ONE container per breakpoint (a CSS grid on desktop,
 * a wrap row on mobile) and keep stable React keys, so periodically reshuffling
 * their order makes Framer `layout` slide each card to its new slot instead of
 * re-mounting/flickering — giving the cluster a living, animated feel.
 */

const SLOT_TRANSITION = {
  layout: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
};

/** Grid placement per slot around the centered phone: column 1 = left, 3 = right. */
function slotFor(index: number) {
  const slots = [
    { gridColumn: 1, gridRow: 1 },
    { gridColumn: 1, gridRow: 3 },
    { gridColumn: 3, gridRow: 1 },
    { gridColumn: 3, gridRow: 2 },
    { gridColumn: 3, gridRow: 3 },
  ];
  return slots[index] ?? { gridColumn: 3, gridRow: 3 };
}

function reshuffle(cards: HeroCard[]): HeroCard[] {
  const next = cards
    .map((card) => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => card);
  // Guarantee a visible change for such a small set.
  if (next.every((card, i) => card === cards[i])) return reshuffle(cards);
  return next;
}

export function HeroCardCluster() {
  const reducedMotion = useReducedMotion();
  const [order, setOrder] = useState<HeroCard[]>(() => [...heroCards]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setOrder((o) => reshuffle(o)), 3600);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const renderCard = (card: HeroCard) => (
    <FloatingServiceCard
      label={card.label}
      detail={card.detail}
      imagePath={card.imagePath}
      iconKey={card.iconKey}
      placeholderAccent={card.placeholderAccent}
      variant="square"
      delay={card.delay}
    />
  );

  return (
    <>
      {/* Phone flanked by the shuffling cards on every screen — scaled down on
          small viewports so the cards sit beside the phone, not below it. */}
      <div
        className="grid items-center justify-center justify-items-center gap-y-4 sm:gap-y-6 lg:gap-y-7"
        style={{
          gridTemplateColumns: "auto auto auto",
          gridTemplateRows: "auto auto auto",
        }}
      >
        <div
          className="relative z-10 -mx-3 self-center sm:-mx-6 lg:-mx-9 xl:-mx-12"
          style={{ gridColumn: 2, gridRow: "1 / 4" }}
        >
          <PhoneOrderPreview />
        </div>
        {order.map((card, index) => (
          <motion.div
            key={card.key}
            layout
            transition={SLOT_TRANSITION}
            className="relative z-0"
            style={slotFor(index)}
          >
            {renderCard(card)}
          </motion.div>
        ))}
      </div>
    </>
  );
}
