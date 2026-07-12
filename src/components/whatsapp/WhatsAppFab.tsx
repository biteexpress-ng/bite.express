"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Subtle, site-wide floating "Order on WhatsApp" button. Mobile-first and
 * thumb-friendly (56px target), it fades in shortly after mount so it never
 * competes with first paint, and expands to a labelled pill on hover/focus
 * at desktop widths. Hidden on `/whatsapp`, which is already wall-to-wall
 * WhatsApp CTAs. Sits below the header/menu (z-40) so it never traps focus
 * or covers navigation.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (pathname?.startsWith("/whatsapp")) return null;

  return (
    <motion.a
      href={siteConfig.whatsappOrder.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Order on WhatsApp, chat ${siteConfig.whatsappOrder.display}`}
      title="Order on WhatsApp"
      className="group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 inline-flex h-14 items-center gap-0 overflow-hidden rounded-full bg-whatsapp-cta pl-4 pr-4 text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] outline-none transition-[gap,padding,box-shadow] duration-300 ease-out-expo hover:gap-2.5 hover:shadow-[0_16px_40px_-8px_rgba(37,211,102,0.7)] focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 md:hover:pr-5"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.6 }}
    >
      {/* Soft attention ring — motion-safe only */}
      {!reducedMotion && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-whatsapp/40 motion-safe:animate-ping"
          style={{ animationDuration: "2.6s" }}
        />
      )}
      <WhatsAppIcon size={26} aria-hidden />
      <span className="hidden max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity] duration-300 ease-out-expo group-hover:max-w-[12rem] group-hover:opacity-100 group-focus-visible:max-w-[12rem] group-focus-visible:opacity-100 md:inline">
        Order on WhatsApp
      </span>
    </motion.a>
  );
}
