"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { AppBadges } from "@/components/ui/app-badges";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

const bulletVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1 + 0.3,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

const orderItems = [
  { name: "Mama's Kitchen", meta: "Jollof · 25 min" },
  { name: "Sahel Grills", meta: "Suya · 22 min" },
  { name: "Greenfield Market", meta: "Grocery · 35 min" },
];

const orderCardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12 + 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

/**
 * App showcase section with animated phone mockup,
 * staggered feature bullets, and premium visual polish.
 */
export function AppShowcase({ eyebrow, title, subtitle, bullets }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <Section background="white" padding="xl">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <motion.span
              className="section-eyebrow"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              {eyebrow}
            </motion.span>

            <motion.h2
              className="mt-6 font-serif text-4xl leading-[1.05] tracking-normal text-ink-900 sm:text-5xl md:text-6xl"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="mt-6 max-w-xl text-lg text-ink-600"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {subtitle}
            </motion.p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  className="flex items-start gap-3 text-base text-ink-700"
                  custom={i}
                  variants={bulletVariants}
                  initial={reducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 flex-none text-brand-red"
                  />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <AppBadges variant="dark" />
            </motion.div>
          </div>

          {/* Right — decorative phone mockup */}
          <motion.div
            className="relative mx-auto w-full max-w-md"
            initial={reducedMotion ? false : { opacity: 0, y: 40, rotateY: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{ perspective: "1000px" }}
          >
            <div className="relative aspect-9/16 w-full rounded-[2rem] border-10 border-brand-black bg-brand-black shadow-cinematic">
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-gradient-to-b from-ink-50 to-white">
                <div className="mx-auto mt-3 h-5 w-24 rounded-full bg-brand-black" />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider text-ink-600">
                    Delivering to
                  </div>
                  <div className="font-serif text-xl text-ink-900">
                    Samaru, Zaria
                  </div>

                  <div className="mt-6 grid gap-3">
                    {orderItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        className="rounded-lg border border-ink-200 bg-white p-4 transition-shadow hover:shadow-card"
                        custom={i}
                        variants={orderCardVariants}
                        initial={reducedMotion ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <div className="font-semibold text-ink-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-ink-600">
                          {item.meta}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pulsing order status card */}
                  <motion.div
                    className="mt-6 flex items-center justify-between rounded-lg bg-brand-red p-4 text-white"
                    initial={
                      reducedMotion ? false : { opacity: 0, scale: 0.9 }
                    }
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.9,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <div>
                      <div className="text-xs uppercase tracking-wider opacity-80">
                        Order on the way
                      </div>
                      <div className="font-semibold">Arriving 6:42pm</div>
                    </div>
                    <motion.div
                      animate={
                        reducedMotion
                          ? undefined
                          : { rotate: [0, 15, -10, 0], scale: [1, 1.1, 1] }
                      }
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles size={22} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Behind-the-phone soft red halo */}
            <motion.div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[4rem] bg-brand-red/10 blur-3xl"
              animate={
                reducedMotion
                  ? undefined
                  : { scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
