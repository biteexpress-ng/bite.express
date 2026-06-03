"use client";

/* ───────────────────────────────────────────────────────────────────────────
 * MotionDeliveryRibbon — lightweight CSS-only marquee bands.
 *
 * Two rotated strips of scrolling text sit at the bottom of the hero,
 * crossing each other in an X-pattern. The entire effect uses plain HTML
 * divs + a single CSS @keyframes translateX animation, making it
 * dramatically cheaper than the previous SVG textPath approach.
 *
 * Performance notes:
 *   • No SVG, no <textPath>, no Bézier path calculations.
 *   • Animation runs on `transform` (GPU-composited, no layout/paint).
 *   • `will-change: transform` promotes each strip to its own layer.
 *   • Only two duplicated text spans per band (minimum for seamless loop).
 * ─────────────────────────────────────────────────────────────────────────*/

const ITEMS = ["FOOD", "GROCERY", "PHARMACY", "PARCEL", "WINE", "DELIVERY"];
const SEPARATOR = "   •   ";
// Repeat the items sufficiently so a single block spans well over any screen width
const REPEATED_ITEMS = Array(10).fill(ITEMS).flat();
const TEXT = REPEATED_ITEMS.join(SEPARATOR) + SEPARATOR;

/**
 * A single scrolling text strip. The text is duplicated once so the second
 * copy slides in seamlessly as the first scrolls away.
 */
function MarqueeStrip({
  reverse = false,
  duration = "30s",
}: {
  reverse?: boolean;
  duration?: string;
}) {
  return (
    <div className="flex w-max" style={{ willChange: "transform" }}>
      <span
        className="flex shrink-0 items-center"
        style={{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <span className="px-2">{TEXT}</span>
        <span className="px-2">{TEXT}</span>
      </span>
      <span
        aria-hidden
        className="flex shrink-0 items-center"
        style={{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <span className="px-2">{TEXT}</span>
        <span className="px-2">{TEXT}</span>
      </span>
    </div>
  );
}

export function MotionDeliveryRibbon() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 overflow-hidden"
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Band A */}
      <div className="absolute bottom-[8%] left-[50%] w-[150vw] -translate-x-1/2 -rotate-3">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#de1600] to-transparent opacity-80 shadow-[0_0_8px_rgba(222,22,0,0.6),0_0_24px_rgba(222,22,0,0.3)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#de1600] to-transparent opacity-80 shadow-[0_0_8px_rgba(222,22,0,0.6),0_0_24px_rgba(222,22,0,0.3)]" />

        <div className="overflow-hidden bg-[#080101]/90 py-2.5">
          <div
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 sm:text-xs"
            style={{
              textShadow:
                "0 0 4px rgba(255,255,255,0.9), 0 0 10px rgba(255,107,74,0.8), 0 0 22px rgba(222,22,0,0.6)",
            }}
          >
            <MarqueeStrip duration="28s" />
          </div>
        </div>
      </div>

      {/* Band B */}
      <div className="absolute bottom-[4%] left-[50%] w-[150vw] -translate-x-1/2 rotate-2">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#de1600] to-transparent opacity-80 shadow-[0_0_8px_rgba(222,22,0,0.6),0_0_24px_rgba(222,22,0,0.3)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#de1600] to-transparent opacity-80 shadow-[0_0_8px_rgba(222,22,0,0.6),0_0_24px_rgba(222,22,0,0.3)]" />

        <div className="overflow-hidden bg-[#080101]/90 py-2.5">
          <div
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 sm:text-xs"
            style={{
              textShadow:
                "0 0 4px rgba(255,255,255,0.9), 0 0 10px rgba(255,107,74,0.8), 0 0 22px rgba(222,22,0,0.6)",
            }}
          >
            <MarqueeStrip reverse duration="34s" />
          </div>
        </div>
      </div>

      {/* Bloom */}
      <div
        aria-hidden
        className="absolute bottom-[4%] left-[68%] h-48 w-72 -translate-x-1/2 rounded-full bg-brand-red/20 blur-3xl"
      />
    </div>
  );
}
