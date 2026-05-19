import { MapPin, MessageCircle, Phone, UtensilsCrossed } from "lucide-react";

/**
 * Phone mockup matching the design reference:
 *   - Top: "Arriving in 18 min" with a soft pulse + status row.
 *   - Centre: dark map surface with light street grid + a red,
 *     dashed delivery route from rider pin to destination pin.
 *   - Bottom: an order card showing "Hot Jollof & Grilled Chicken"
 *     with a food thumbnail, then a "Chat with your rider" bar with
 *     phone + chat circular controls.
 *
 * Entirely decorative — aria-hidden on the wrapper, no interactive
 * elements that would steal focus.
 */
export function PhoneOrderPreview() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="relative mx-auto w-full max-w-[20rem] sm:max-w-[21rem]"
    >
      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-[6px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_60px_-10px_rgba(222,22,0,0.35)]">
        {/* Screen */}
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-[#050505]">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* Top status block: "Arriving in 18 min" */}
          <div className="relative z-10 px-5 pt-10">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Arriving in
                </div>
                <div className="mt-1 font-serif text-[2rem] leading-none text-brand-orange">
                  18 min
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] text-brand-orange">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-orange opacity-60 motion-reduce:hidden" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  </span>
                  Rider is on the way
                </div>
              </div>
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70">
                <Phone size={11} />
              </div>
            </div>
          </div>

          {/* Map area */}
          <div className="absolute inset-x-3 top-[7.5rem] bottom-[10.5rem] overflow-hidden rounded-[1.5rem] bg-[#1a1a1a]">
            <svg
              viewBox="0 0 280 360"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b4a" />
                  <stop offset="100%" stopColor="#de1600" />
                </linearGradient>
                <filter id="route-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              {/* Light street grid */}
              <g stroke="rgba(255,255,255,0.10)" strokeWidth="0.6">
                {Array.from({ length: 18 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" x2="280" y1={i * 22 + 10} y2={i * 22 + 10} />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v-${i}`} y1="0" y2="360" x1={i * 28 + 14} x2={i * 28 + 14} />
                ))}
              </g>

              {/* Thicker named streets — slightly brighter */}
              <g stroke="rgba(255,255,255,0.18)" strokeWidth="1.4">
                <line x1="0" x2="280" y1="120" y2="120" />
                <line x1="0" x2="280" y1="240" y2="240" />
                <line x1="80" x2="80" y1="0" y2="360" />
                <line x1="200" x2="200" y1="0" y2="360" />
              </g>

              {/* Route glow + route */}
              <path
                d="M40 290 Q 100 230 100 170 T 220 60"
                stroke="url(#route-glow)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
                filter="url(#route-blur)"
              />
              <path
                d="M40 290 Q 100 230 100 170 T 220 60"
                stroke="url(#route-glow)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M40 290 Q 100 230 100 170 T 220 60"
                stroke="#de1600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2 6"
                fill="none"
              />

              {/* Destination pin (top) */}
              <g>
                <circle cx="220" cy="60" r="12" fill="rgba(222,22,0,0.25)" />
                <circle cx="220" cy="60" r="6" fill="#de1600" />
                <circle cx="220" cy="60" r="2.5" fill="#ffffff" />
              </g>

              {/* Rider marker (bottom of route) */}
              <g>
                <circle cx="40" cy="290" r="12" fill="rgba(222,22,0,0.22)" />
                <circle cx="40" cy="290" r="7" fill="#0a0a0a" stroke="#de1600" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Order card */}
          <div className="absolute inset-x-3 bottom-[5rem] z-10 rounded-2xl bg-[#1a1a1a]/95 p-3 ring-1 ring-white/[0.06] backdrop-blur">
            <div className="flex items-center gap-3">
              {/* Food thumbnail — styled placeholder. When the real
                  PNG ships at /brand/hero/order-thumbnail.png swap the
                  div below for a <next/image> (the surrounding
                  component is server-rendered, so onError handlers
                  aren't allowed here). */}
              <div className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/40 to-brand-red/30 ring-1 ring-white/10">
                <UtensilsCrossed size={20} className="text-amber-200" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] uppercase tracking-wider text-white/45">
                  Your order
                </div>
                <div className="truncate text-xs font-semibold text-white">
                  Hot Jollof &amp; Grilled Chicken
                </div>
                <div className="mt-0.5 text-[10px] text-brand-orange/85">
                  View details ›
                </div>
              </div>
            </div>
          </div>

          {/* Chat with your rider bar */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between rounded-2xl bg-[#1a1a1a]/95 px-3 py-2.5 ring-1 ring-white/[0.06] backdrop-blur">
            <div className="text-[11px] text-white/70">Chat with your rider</div>
            <div className="flex items-center gap-1.5">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                <Phone size={11} />
              </div>
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_4px_12px_rgba(222,22,0,0.4)]">
                <MessageCircle size={11} />
              </div>
            </div>
          </div>

          {/* Map pin overlay (above the order card) */}
          <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2">
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_6px_18px_rgba(222,22,0,0.55)]">
              <MapPin size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Behind-the-phone soft red halo */}
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-[3.5rem] bg-brand-red/15 blur-3xl"
      />
    </div>
  );
}
