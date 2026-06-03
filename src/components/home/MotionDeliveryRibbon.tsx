"use client";

/* ───────────────────────────────────────────────────────────────────────────
 * MotionDeliveryRibbon — two neon "rails" at the base of the hero.
 *
 * A BiteExpress rider drives across the upper rail (left → right) with a
 * headlight beam leading the way through the dark, exits off-screen, and a
 * couple of seconds later the rider returns along the lower rail the other
 * way (right → left). Pure CSS-keyframe transforms (GPU-composited), so it
 * stays cheap; honours prefers-reduced-motion.
 * ─────────────────────────────────────────────────────────────────────────*/

const RAIL_LINE =
  "absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#de1600] to-transparent opacity-80 shadow-[0_0_8px_rgba(222,22,0,0.6),0_0_24px_rgba(222,22,0,0.3)]";

function RiderRunner({
  src,
  direction,
  animation,
}: {
  src: string;
  direction: "forward" | "backward";
  animation: string;
}) {
  const forward = direction === "forward";
  return (
    <div
      className="rider-runner absolute bottom-0 left-0 will-change-transform"
      style={{ animation }}
    >
      <div className="relative">
        {/* Headlight beam — leads the rider in the travel direction. */}
        <div
          className={`absolute top-[40%] h-7 w-52 -translate-y-1/2 rounded-full blur-md sm:w-64 ${
            forward
              ? "left-[78%] bg-gradient-to-r from-amber-100/55 via-amber-200/15 to-transparent"
              : "right-[78%] bg-gradient-to-l from-amber-100/55 via-amber-200/15 to-transparent"
          }`}
        />
        {/* Bright headlight core. */}
        <div
          className={`absolute top-[44%] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-amber-50 blur-[1px] shadow-[0_0_14px_5px_rgba(255,221,150,0.8)] ${
            forward ? "left-[80%]" : "right-[80%]"
          }`}
        />
        {/* Rider */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative transparent sprite */}
        <img
          src={src}
          alt=""
          draggable={false}
          className="relative h-14 w-auto select-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.55)] sm:h-16"
        />
      </div>
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
        /* Upper rail: ride out left -> right (0-32%), then parked off-screen. */
        @keyframes rider-forward {
          0%   { transform: translateX(-14vw); }
          32%  { transform: translateX(140vw); }
          100% { transform: translateX(140vw); }
        }
        /* Lower rail: wait, then return right -> left (50-82%), then parked. */
        @keyframes rider-backward {
          0%, 50% { transform: translateX(140vw); }
          82%     { transform: translateX(-14vw); }
          100%    { transform: translateX(-14vw); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rider-runner { animation: none !important; opacity: 0; }
        }
      `}</style>

      {/* Rail A — rider rides out (left → right) */}
      <div className="absolute bottom-[9%] left-[50%] w-[150vw] -translate-x-1/2 -rotate-3">
        <div className={`${RAIL_LINE} top-0`} />
        <div className={`${RAIL_LINE} bottom-0`} />
        <div className="relative h-9 bg-[#080101]/90">
          <RiderRunner
            src="/brand/hero/delivery-rider-forward.png"
            direction="forward"
            animation="rider-forward 13s linear infinite"
          />
        </div>
      </div>

      {/* Rail B — rider returns (right → left) */}
      <div className="absolute bottom-[4%] left-[50%] w-[150vw] -translate-x-1/2 rotate-2">
        <div className={`${RAIL_LINE} top-0`} />
        <div className={`${RAIL_LINE} bottom-0`} />
        <div className="relative h-9 bg-[#080101]/90">
          <RiderRunner
            src="/brand/hero/delivery-rider-backward.png"
            direction="backward"
            animation="rider-backward 13s linear infinite"
          />
        </div>
      </div>

      {/* Ambient bloom */}
      <div
        aria-hidden
        className="absolute bottom-[4%] left-[64%] h-48 w-72 -translate-x-1/2 rounded-full bg-brand-red/15 blur-3xl"
      />
    </div>
  );
}
