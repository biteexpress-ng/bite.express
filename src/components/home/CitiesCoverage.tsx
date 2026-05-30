import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { City } from "@/lib/cities";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cities: readonly City[];
};

/* ───────────────────────────────────────────────────────────────────────────
 * City pin positions as percentages of the SVG viewBox (0 0 1536 1024).
 *
 * Calculated from geographic lat/lng mapped to the SVG coordinate space:
 *   x = (lon − 2.7) × 101.4 + 190   →   left% = x / 1536 × 100
 *   y = (13.9 − lat) × 94.4 + 83    →   top%  = y / 1024 × 100
 *
 * `label` controls which direction the city name renders relative to the
 * pin dot so nearby cities don't overlap (bottom is the default).
 * ─────────────────────────────────────────────────────────────────────────*/
const cityPins: Record<
  string,
  { left: string; top: string; label?: "top" | "left" | "right" }
> = {
  sokoto:     { left: "29.2%", top: "15.8%" },
  kano:       { left: "50.8%", top: "25.6%" },
  zaria:      { left: "45.4%", top: "34.2%", label: "right" },
  kaduna:     { left: "43.7%", top: "39.3%", label: "left" },
  jos:        { left: "53.1%", top: "45.0%" },
  yola:       { left: "76.8%", top: "51.2%" },
  makurdi:    { left: "50.8%", top: "64.9%" },
  ilorin:     { left: "24.6%", top: "58.0%", label: "left" },
  offa:       { left: "25.7%", top: "61.1%" },
  "omu-aran": { left: "28.2%", top: "61.3%", label: "right" },
};

/**
 * Cities coverage section — dark-themed, featuring the actual
 * `nigeria_dotted_outline.svg` from `public/brand/` with animated
 * glowing pins for every active delivery city.
 */
export function CitiesCoverage({ eyebrow, subtitle, cities }: Props) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container className="max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* 1. TEXT BLOCK (Left) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-[44px]">
              Now serving 10 cities — <br className="hidden lg:block" />
              with more on the way.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#666666]">
              {subtitle}
            </p>
            <div className="mt-8">
              <Link
                href="/cities"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e5e5e5] px-6 text-[13px] font-semibold text-[#1a1a1a] transition-all hover:border-[#1a1a1a]"
              >
                See all cities
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* 2. MAP (Middle) */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-4 xl:col-span-4">
            <Image
              src="/brand/nigeria_dotted_outline.svg"
              alt="Map of Nigeria"
              width={1536}
              height={1024}
              draggable={false}
              className="block w-full select-none"
              style={{ filter: "brightness(0) opacity(0.08)" }}
            />
            {cities.map((c) => {
              const pin = cityPins[c.slug];
              if (!pin) return null;
              return (
                <div
                  key={c.slug}
                  className="absolute z-20 -translate-x-1/2 -translate-y-[100%]"
                  style={{ left: pin.left, top: pin.top }}
                >
                  <svg
                    width="18"
                    height="24"
                    viewBox="0 0 24 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-md"
                  >
                    <path
                      d="M12 29.5C12 29.5 22 20.5 22 11.5C22 5.97715 17.5228 1.5 12 1.5C6.47715 1.5 2 5.97715 2 11.5C2 20.5 12 29.5 12 29.5Z"
                      fill="#DE1600"
                    />
                    <circle cx="12" cy="11.5" r="4" fill="white" />
                  </svg>
                </div>
              );
            })}
          </div>

          {/* 3. CITY GRID (Right) */}
          <div className="lg:col-span-4 xl:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cities/${c.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-[#f0f0f0] bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#e0e0e0] hover:shadow-md"
                >
                  <div className="flex-none text-brand-red">
                    <MapPin size={18} strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-serif text-[15px] font-semibold text-[#1a1a1a]">
                      {c.name}
                    </div>
                    <div className="truncate text-[10px] text-[#8e8e93]">
                      {c.state} State
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className="flex-none text-[#cccccc] transition-colors group-hover:text-[#1a1a1a]"
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
