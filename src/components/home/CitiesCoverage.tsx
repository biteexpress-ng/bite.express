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

const pinPositions = [
  "left-[46%] top-[25%]",
  "left-[40%] top-[33%]",
  "left-[56%] top-[35%]",
  "left-[62%] top-[45%]",
  "left-[50%] top-[54%]",
  "left-[42%] top-[61%]",
  "left-[57%] top-[64%]",
  "left-[35%] top-[70%]",
  "left-[48%] top-[75%]",
  "left-[61%] top-[76%]",
];

export function CitiesCoverage({ eyebrow, title, subtitle, cities }: Props) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              {eyebrow}
            </div>
            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] tracking-normal text-ink-900 sm:text-5xl md:text-6xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-600">
              {subtitle}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-4 transition hover:border-brand-red/35 hover:shadow-soft"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                      <MapPin size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-lg leading-tight tracking-normal text-ink-900">
                        {city.name}
                      </span>
                      <span className="block text-xs uppercase text-ink-500">
                        {city.state} State
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="flex-none text-ink-400 transition group-hover:translate-x-1 group-hover:text-brand-red"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-ink-200 bg-[#f8f3ee] p-6 shadow-soft">
            <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle,rgba(17,17,17,0.2)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute inset-8 rounded-[45%_55%_48%_52%/44%_46%_54%_56%] border border-brand-red/20 bg-white/45 shadow-inner" />
            <div className="absolute left-[18%] top-[12%] h-[78%] w-[64%] rounded-[45%_55%_48%_52%/44%_46%_54%_56%] border border-ink-900/10 bg-gradient-to-br from-white/70 to-white/10" />

            {cities.slice(0, 10).map((city, index) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className={`absolute ${pinPositions[index]} group z-10`}
                aria-label={`${city.name}, ${city.state}`}
              >
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-brand-red shadow-lg shadow-brand-red/30 ring-4 ring-white">
                  <span className="absolute h-7 w-7 rounded-full border border-brand-red/35" />
                </span>
                <span className="pointer-events-none absolute left-1/2 top-7 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-black px-3 py-1 text-xs text-white shadow-lg group-hover:block">
                  {city.name}
                </span>
              </Link>
            ))}

            <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/60 bg-white/80 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase text-ink-500">
                Coverage pulse
              </p>
              <p className="mt-2 font-serif text-2xl tracking-normal text-ink-900">
                Launch zones expanding city by city.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
