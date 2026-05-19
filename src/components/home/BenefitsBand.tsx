import {
  Headphones,
  ShieldCheck,
  Timer,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type Benefit = {
  title: string;
  description: string;
};

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
};

const icons: LucideIcon[] = [Waypoints, Timer, ShieldCheck, Headphones];

export function BenefitsBand({ eyebrow, title, subtitle, benefits }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-black py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(222,22,0,0.26),transparent_33%),radial-gradient(circle_at_14%_75%,rgba(255,107,74,0.12),transparent_30%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <div className="section-eyebrow border-white/15 bg-white/10 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              {eyebrow}
            </div>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] tracking-normal text-white sm:text-5xl md:text-6xl">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              {subtitle}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {benefits.map(({ title: benefitTitle, description }, index) => {
                const Icon = icons[index] ?? Waypoints;
                return (
                  <article
                    key={benefitTitle}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red/15 text-brand-orange ring-1 ring-brand-red/25">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl tracking-normal text-white">
                      {benefitTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:22px_22px]" />
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 520 620"
              fill="none"
            >
              <path
                d="M72 530C135 375 171 446 239 299C299 167 370 191 453 82"
                stroke="#de1600"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="14 16"
              />
              <path
                d="M62 208C144 140 219 240 302 175C369 123 394 91 466 100"
                stroke="#ff6b4a"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>

            <div className="relative z-10 mt-10 rounded-[1.75rem] border border-white/10 bg-black/55 p-5 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase text-white/45">Priority dispatch</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-3xl tracking-normal">
                    Rider matched
                  </h3>
                  <p className="mt-2 text-sm text-white/55">
                    Kaduna central to Barnawa. Estimated arrival: 24 min.
                  </p>
                </div>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red text-white">
                  <Waypoints size={25} />
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-6 grid grid-cols-2 gap-4">
              {["Vendor ready", "Rider en route", "Payment secured", "Support online"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={cn(
                      "rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-sm text-white/70",
                      index === 1 && "bg-brand-red/20 text-white",
                    )}
                  >
                    <span className="block font-serif text-xl text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
