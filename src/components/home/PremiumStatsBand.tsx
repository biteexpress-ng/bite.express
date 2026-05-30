import { Bike, MapPinned, PackageCheck, Store, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";

type StatItem = { value: string; label: string; icon: LucideIcon };

const stats: StatItem[] = [
  { value: "10+",    label: "Cities Served",      icon: MapPinned    },
  { value: "500+",   label: "Active Vendors",      icon: Store        },
  { value: "1,200+", label: "Riders on the Road",  icon: Bike         },
  { value: "100K+",  label: "Orders Delivered",    icon: PackageCheck },
];

export function PremiumStatsBand() {
  return (
    <section className="bg-[#f8f3ee] px-5 py-8 sm:px-6 lg:px-8">
      <Container className="px-0">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-black px-8 py-12 text-white shadow-2xl sm:px-12 lg:px-16">
          {/* Decorative background curves */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-[0.18]"
            viewBox="0 0 1200 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-80 240C118 132 216 302 380 166C507 60 610 76 756 160C925 258 1011 80 1280 124"
              stroke="#de1600"
              strokeWidth="2"
              strokeDasharray="8 18"
            />
            <path
              d="M-40 106C174 182 315 12 506 90C722 178 822 326 1046 190C1124 142 1193 128 1260 138"
              stroke="#ff6b4a"
              strokeWidth="1"
              strokeDasharray="2 18"
            />
          </svg>

          <div className="relative grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-0">
            {stats.map(({ value, label, icon: Icon }, index) => (
              <div
                key={label}
                className="relative flex flex-col items-center text-center lg:px-10 first:lg:pl-0 last:lg:pr-0"
              >
                {/* Vertical rule between columns (desktop) */}
                {index > 0 && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 hidden h-16 -translate-y-1/2 border-l border-white/10 lg:block"
                  />
                )}

                {/* Icon */}
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-red/30 bg-brand-red/10 text-brand-orange">
                  <Icon size={20} strokeWidth={1.8} />
                </span>

                {/* Value */}
                <span className="mt-4 block font-serif text-4xl leading-none text-white sm:text-5xl">
                  {value}
                </span>

                {/* Label */}
                <span className="mt-2.5 block text-[11px] font-semibold uppercase tracking-widest text-white/45">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
