"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { WhatsAppIcon } from "@/components/brand/social-icons";

type Props = {
  badge: string;
  title: string;
  body: string;
  cta: string;
  secondary: string;
};

/**
 * Homepage announcement band for WhatsApp ordering — sits directly under the
 * hero. Leans on the WhatsApp green as an ACCENT (chip, ring, glow) over the
 * warm canvas rather than recoloring the section, matching the homepage's
 * scroll-reveal motion. Primary CTA drives to the /whatsapp SEO landing;
 * secondary is the direct wa.me shortcut.
 */
export function WhatsAppAnnounce({ badge, title, body, cta, secondary }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <Section background="white" padding="md" className="border-b border-ink-200/70">
      <Container>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="relative isolate overflow-hidden rounded-3xl border border-whatsapp/30 bg-surface p-7 shadow-card sm:p-9"
        >
          {/* Green accent wash + ring — accent only, never a fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-whatsapp/12 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-whatsapp/8 blur-3xl"
          />

          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-whatsapp-ink">
                <span className="live-dot live-dot--success" />
                {badge}
              </span>
              <h2 className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-serif text-3xl leading-[1.1] tracking-tight text-ink-900 sm:text-4xl">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-whatsapp-cta text-white shadow-glow-sm">
                  <WhatsAppIcon size={24} aria-hidden />
                </span>
                <span className="text-balance">{title}</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-600">
                {body}
              </p>
            </div>

            <div className="flex flex-none flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/whatsapp" variant="whatsapp" size="lg">
                <WhatsAppIcon size={20} aria-hidden />
                {cta}
                <ArrowRight size={18} />
              </ButtonLink>
              <WhatsAppButton variant="outline" size="lg">
                {secondary}
              </WhatsAppButton>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
