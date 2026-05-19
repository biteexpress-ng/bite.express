"use client";

import { motion, useReducedMotion } from "framer-motion";

const ribbonText =
  "FOOD • GROCERY • PHARMACY • PARCEL • PETROL • DELIVERED";

export function MotionDeliveryRibbon() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        className="absolute left-1/2 top-[9%] h-[62rem] w-[92rem] -translate-x-1/2 opacity-80"
        viewBox="0 0 1440 960"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-route-gradient" x1="173" y1="222" x2="1259" y2="702">
            <stop stopColor="#ff6b4a" stopOpacity="0" />
            <stop offset="0.25" stopColor="#ff6b4a" stopOpacity="0.7" />
            <stop offset="0.55" stopColor="#de1600" />
            <stop offset="1" stopColor="#ff6b4a" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.87 0 0.2 0 0 0.09 0 0 0.2 0 0 0 0 0 0.9 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M78 651C246 520 318 205 548 247C733 281 721 553 914 548C1101 543 1163 342 1350 414"
          stroke="url(#hero-route-gradient)"
          strokeWidth="2"
          opacity="0.35"
        />
        <motion.path
          d="M78 651C246 520 318 205 548 247C733 281 721 553 914 548C1101 543 1163 342 1350 414"
          stroke="url(#hero-route-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="20 24"
          filter="url(#hero-route-glow)"
          animate={
            reducedMotion
              ? { strokeDashoffset: 0 }
              : { strokeDashoffset: [0, -220] }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      <div className="motion-ribbon absolute left-1/2 top-[18%] w-[72rem] -translate-x-1/2 rotate-[-8deg] opacity-65">
        <div className="motion-ribbon-track">
          <span>{ribbonText}</span>
          <span>{ribbonText}</span>
          <span>{ribbonText}</span>
          <span>{ribbonText}</span>
        </div>
      </div>
    </div>
  );
}
