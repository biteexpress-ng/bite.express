"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const LOGOS = [
  { name: "Cold Stone", style: "font-serif text-[22px] font-bold italic tracking-tight" },
  { name: "SPAR", style: "font-sans text-[26px] font-black uppercase tracking-tighter", hasIcon: true },
  { name: "Medplus+", style: "font-sans text-[22px] font-bold tracking-tight" },
  { name: "Domino's", style: "font-sans text-[22px] font-bold tracking-tight", hasDomino: true },
  { name: "ShopRite", style: "font-serif text-[26px] font-bold italic tracking-tight" },
  { name: "Mobil", style: "font-sans text-[26px] font-black tracking-tight" },
];

function LogoItem({ logo }: { logo: typeof LOGOS[number] }) {
  return (
    <div className={`flex shrink-0 items-center gap-1.5 px-8 text-[#333] ${logo.style}`}>
      {logo.hasDomino && (
        <div className="grid h-5 w-5 grid-cols-2 gap-0.5 rotate-45">
          <div className="rounded-[2px] bg-[#333]" />
          <div className="rounded-[2px] bg-[#333]" />
          <div className="col-span-2 rounded-[2px] bg-[#333]" />
        </div>
      )}
      {logo.hasIcon && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-[#333]">
          <div className="mb-0.5 h-2 w-2 rounded-sm bg-[#333] rotate-45" />
        </div>
      )}
      {logo.hasIcon ? (
        <span className="ml-1.5">{logo.name}</span>
      ) : (
        logo.name
      )}
    </div>
  );
}

export function PartnerTrustStrip() {
  return (
    <section className="bg-white pb-16 pt-8">
      <Container className="max-w-[1400px]">
        <motion.div
          className="border-t border-dashed border-[#e5e5e5] pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Text */}
            <div className="flex-shrink-0">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
                TRUSTED BY THOUSANDS
              </h3>
              <p className="mt-2 text-[15px] font-bold text-[#1a1a1a]">
                Loved by customers. Powered by partners.
              </p>
            </div>

            {/* Right: Infinite scrolling logo marquee */}
            <div className="group relative flex-1 overflow-hidden lg:max-w-[60%]">
              {/* Fade edges */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

              <div
                className="flex w-max items-center opacity-60 grayscale transition-[filter,opacity] duration-500 hover:opacity-80 hover:grayscale-[0.3]"
                style={{
                  // The global prefers-reduced-motion rule in globals.css
                  // neutralises this for users who ask for it.
                  animation: "marquee-logos 25s linear infinite",
                  animationPlayState: "running",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
                }}
              >
                {/* Repeat logos twice for seamless loop */}
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                  <LogoItem key={`${logo.name}-${i}`} logo={logo} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
