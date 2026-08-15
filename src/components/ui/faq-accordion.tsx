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

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export function FaqAccordion({ items, defaultOpen = 0, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <div className={cn("divide-y divide-ink-200 border-y border-ink-200", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <motion.div
            key={i}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 ease-out-expo hover:text-brand-red"
            >
              <h3 className="font-serif text-lg leading-snug text-ink-900 sm:text-xl">
                {item.question}
              </h3>
              <motion.span
                className={cn(
                  "inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors duration-200 ease-out-expo",
                  open && "border-brand-red bg-brand-red text-white shadow-glow-sm",
                )}
                animate={{ rotate: open ? 45 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                }}
              >
                <Plus size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-12 text-base text-ink-600">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
