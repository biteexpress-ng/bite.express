"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type FaqItem = { question: string; answer: string };

type Props = {
  items: FaqItem[];
  /** Index of the item to open by default; pass -1 to start all closed. */
  defaultOpen?: number;
  className?: string;
};

export function FaqAccordion({ items, defaultOpen = 0, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <div className={cn("divide-y divide-ink-200 border-y border-ink-200", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-brand-red"
            >
              <h3 className="font-serif text-lg leading-snug text-ink-900 sm:text-xl">
                {item.question}
              </h3>
              <span
                className={cn(
                  "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-all",
                  open && "rotate-45 bg-brand-red text-white border-brand-red",
                )}
              >
                <Plus size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-base text-ink-600">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
