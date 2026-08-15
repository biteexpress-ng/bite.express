"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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

/**
 * App showcase section with the real order-tracking screen,
 * staggered feature bullets, and premium visual polish.
 */
export function AppShowcase({ eyebrow, title, subtitle, bullets }: Props) {
  return (
    <Section background="white" padding="xl">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <motion.span
              className="section-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              {eyebrow}
            </motion.span>

            <motion.h2
              className="mt-6 font-serif text-4xl leading-[1.05] tracking-normal text-ink-900 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 24 }}
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
              initial={{ opacity: 0, y: 18 }}
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
                  initial="hidden"
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
              initial={{ opacity: 0, y: 12 }}
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

          {/* Right: live order-tracking screen from the app */}
          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={{ opacity: 0, y: 40, rotateY: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{ perspective: "1000px" }}
          >
            <Image
              src="/brand/screens/app-tracking.png"
              alt="BiteExpress app showing live order tracking on a map, with the rider 16 minutes away"
              width={884}
              height={1779}
              sizes="(min-width: 1024px) 384px, 90vw"
              draggable={false}
              className="relative z-10 h-auto w-full select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            />

            {/* Behind-the-phone soft red halo */}
            <motion.div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[4rem] bg-brand-red/10 blur-3xl"
              animate={
                { scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
