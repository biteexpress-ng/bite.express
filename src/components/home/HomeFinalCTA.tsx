"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title: string;
  subtitle: string;
  placeholder: string;
  cta: string;
};

export function HomeFinalCTA({ title, subtitle, placeholder, cta }: Props) {
  return (
    <section className="bg-white px-5 pb-16 sm:px-6 lg:px-8">
      <Container className="px-0 max-w-[1400px]">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#DE1600] to-[#b31200] px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14 lg:py-16"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Animated SVG background curve — draws itself in */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-10"
            viewBox="0 0 1200 420"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M-90 300C150 110 330 405 526 210C710 28 886 164 1290 78"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="12 24"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16">
            
            {/* Left: Text */}
            <motion.div
              className="w-full text-center lg:w-1/2 lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              <h2 className="font-serif text-[36px] leading-[1.1] tracking-normal text-white sm:text-[44px]">
                {title}
              </h2>
              <p className="mt-3 text-[15px] text-white/90">
                {subtitle}
              </p>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              className="w-full lg:w-1/2 lg:max-w-[500px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <form
                action={siteConfig.shopHref}
                method="get"
                className="relative flex w-full flex-col gap-2 rounded-lg bg-white p-1.5 shadow-lg transition-shadow focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.3),0_8px_32px_rgba(0,0,0,0.2)] sm:h-[60px] sm:flex-row sm:items-center sm:gap-0"
              >
                <div className="pointer-events-none absolute left-5 top-5 text-[#8e8e93] sm:static sm:pl-3">
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className="h-12 w-full rounded-md bg-ink-50 pl-11 pr-3 text-[15px] font-medium text-[#1a1a1a] placeholder:text-[#8e8e93] focus:outline-none sm:h-full sm:bg-transparent sm:pl-3 sm:pr-[140px]"
                />
                <div className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5">
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1a1a1a] px-6 text-[14px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-black hover:shadow-elevated active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:h-full sm:w-auto"
                  >
                    {cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
