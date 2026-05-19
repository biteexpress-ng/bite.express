import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { City } from "@/lib/cities";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cities: readonly City[];
};

/**
 * Pin positions per city slug, on the 400×380 viewBox used by the
 * Nigeria outline below. Tuned by eye from approximate lat/lng so
 * pins read as "roughly where the city is" without claiming
 * cartographic accuracy. New cities can be added by appending here.
 */
const cityPins: Record<string, { x: number; y: number }> = {
  sokoto: { x: 110, y: 110 },
  kano: { x: 218, y: 130 },
  zaria: { x: 188, y: 158 },
  kaduna: { x: 180, y: 178 },
  jos: { x: 222, y: 198 },
  yola: { x: 312, y: 218 },
  makurdi: { x: 215, y: 252 },
  ilorin: { x: 110, y: 235 },
  offa: { x: 120, y: 248 },
  "omu-aran": { x: 128, y: 258 },
};

/**
 * "Now serving 10 cities" — 3-column layout:
 *   - Left:   eyebrow + title + subtitle + "See all cities" CTA
 *   - Middle: hand-traced dotted Nigeria outline with city pins
 *   - Right:  3-column grid of city chips
 *
 * On tablet (md): stacks to 2 rows — header on top, then a row
 *   containing map + chip grid side by side.
 * On mobile (<md): single column — header, chips, then a smaller
 *   map as a final visual element.
 */
export function CitiesCoverage({ eyebrow, title, subtitle, cities }: Props) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[0.85fr_1fr_1.15fr] lg:gap-12">
          {/* LEFT — header */}
          <div className="md:col-span-2 lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
              {eyebrow}
            </p>
            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-ink-600">
              {subtitle}
            </p>
            <Link
              href="/cities"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-sm transition-colors hover:border-brand-red hover:text-brand-red"
            >
              See all cities
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* MIDDLE — Nigeria map */}
          <div className="order-3 md:order-2 lg:order-2">
            <NigeriaMap cities={cities} />
          </div>

          {/* RIGHT — city chip grid */}
          <div className="order-2 grid grid-cols-2 gap-3 md:order-3 sm:grid-cols-3 lg:order-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-200 bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-brand-red hover:shadow-soft"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-red/8 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <MapPin size={14} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-serif text-base leading-tight text-ink-900">
                      {c.name}
                    </div>
                    <div className="truncate text-[10px] uppercase tracking-[0.14em] text-ink-500">
                      {c.state} State
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="flex-none text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-red"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Stylised Nigeria outline. The path is a hand-traced approximation
 * (the country's silhouette is geographic fact; the rendering style
 * is original). We fill the clipped interior with a tiny dot grid
 * for the "dotted map" look used across the reference design.
 */
function NigeriaMap({ cities }: { cities: readonly City[] }) {
  return (
    <div className="relative mx-auto aspect-[400/380] w-full max-w-[28rem]">
      <svg
        viewBox="0 0 400 380"
        className="h-full w-full"
        aria-hidden
        role="presentation"
      >
        <defs>
          <pattern
            id="ng-dots"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="0.9" fill="rgba(17,17,17,0.20)" />
          </pattern>
          <clipPath id="ng-clip">
            <path d={nigeriaPath} />
          </clipPath>
          <radialGradient id="pin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#de1600" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#de1600" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dotted fill inside Nigeria */}
        <rect
          width="400"
          height="380"
          fill="url(#ng-dots)"
          clipPath="url(#ng-clip)"
        />

        {/* Outline */}
        <path
          d={nigeriaPath}
          fill="none"
          stroke="rgba(17,17,17,0.30)"
          strokeWidth="1.25"
          strokeDasharray="2.5 3.5"
          strokeLinecap="round"
        />

        {/* City pins */}
        {cities.map((c) => {
          const pos = cityPins[c.slug];
          if (!pos) return null;
          return (
            <g key={c.slug}>
              <circle cx={pos.x} cy={pos.y} r="14" fill="url(#pin-glow)" />
              <circle cx={pos.x} cy={pos.y} r="5.5" fill="#de1600" />
              <circle cx={pos.x} cy={pos.y} r="2" fill="#ffffff" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Hand-traced Nigeria outline at viewBox 400×380. Smooth quadratic
 * curves keep file size tiny and the silhouette recognisable without
 * pretending to be a precise cartographic asset.
 *
 * Bounding box ≈ x:40..365, y:100..330 — pin coordinates above
 * sit comfortably inside.
 */
const nigeriaPath = `
  M 60 145
  Q 95 100 165 95
  Q 225 92 275 100
  Q 320 108 355 130
  Q 365 150 360 175
  L 355 200
  Q 350 235 325 260
  L 305 285
  Q 290 305 270 318
  Q 245 330 210 332
  Q 175 332 150 322
  Q 120 312 95 290
  L 75 265
  Q 55 235 50 205
  L 45 180
  Q 42 160 60 145
  Z
`;
