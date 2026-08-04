"use client";

/* ───────────────────────────────────────────────────────────────────────────
 * FooterRiderPath: a light "road" strip in the white gap between the final
 * CTA band and the footer. The BiteExpress rider rides out left to right,
 * then returns right to left on the same path. Same GPU-cheap CSS keyframe
 * approach as the hero's MotionDeliveryRibbon, but styled for a white
 * background: no headlight beam, no glow, soft daytime shadow only.
 * Honours prefers-reduced-motion (riders hide, the road stays).
 * ─────────────────────────────────────────────────────────────────────────*/

function Runner({ src, animation }: { src: string; animation: string }) {
  return (
    <div
      className="footer-rider absolute bottom-0 left-0 will-change-transform"
      style={{ animation }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative transparent sprite */}
      <img
        src={src}
        alt=""
        draggable={false}
        className="h-12 w-auto select-none drop-shadow-[0_5px_6px_rgba(0,0,0,0.18)] sm:h-14"
      />
    </div>
  );
}

export function FooterRiderPath() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="pointer-events-none relative overflow-hidden bg-white py-10"
    >
      <style>{`
        /* Ride out left -> right (0-38%), then wait off-screen. */
        @keyframes footer-rider-out {
          0%   { transform: translateX(-16vw); }
          38%  { transform: translateX(102vw); }
          100% { transform: translateX(102vw); }
        }
        /* Wait, then return right -> left (52-90%). */
        @keyframes footer-rider-back {
          0%, 52% { transform: translateX(102vw); }
          90%     { transform: translateX(-16vw); }
          100%    { transform: translateX(-16vw); }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-rider { animation: none !important; opacity: 0; }
        }
      `}</style>

      {/* The road: faint asphalt strip with a dashed centre line. */}
      <div className="relative mx-auto h-9 w-full border-y border-ink-200/80 bg-ink-50/60">
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-70 [background-image:linear-gradient(90deg,rgba(222,22,0,0.35)_0_18px,transparent_18px_34px)] [background-size:34px_1px]"
        />
        <Runner
          src="/brand/hero/delivery-rider-forward.png"
          animation="footer-rider-out 14s linear infinite"
        />
        <Runner
          src="/brand/hero/delivery-rider-backward.png"
          animation="footer-rider-back 14s linear infinite"
        />
      </div>
    </div>
  );
}
