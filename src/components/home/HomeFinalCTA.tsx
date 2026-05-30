import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title: string;
  subtitle: string;
  placeholder: string;
  cta: string;
};

export function HomeFinalCTA({ placeholder, cta }: Props) {
  return (
    <section className="bg-white px-5 pb-16 sm:px-6 lg:px-8">
      <Container className="px-0 max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#DE1600] to-[#b31200] px-8 py-14 text-white shadow-xl sm:px-12 lg:px-16 lg:py-16">
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-10"
            viewBox="0 0 1200 420"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-90 300C150 110 330 405 526 210C710 28 886 164 1290 78"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="12 24"
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16">
            
            {/* Left: Text */}
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <h2 className="font-serif text-[36px] leading-[1.1] tracking-tight text-white sm:text-[44px]">
                Your favourites, <br className="hidden lg:block" />
                faster than ever.
              </h2>
              <p className="mt-3 text-[15px] text-white/90">
                Great food. Daily essentials. Delivered to you.
              </p>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/2 lg:max-w-[500px]">
              <form
                action={siteConfig.shopHref}
                method="get"
                className="relative flex h-[60px] w-full items-center overflow-hidden rounded-full bg-white shadow-lg"
              >
                <div className="pointer-events-none pl-5 text-[#8e8e93]">
                  <MapPin size={20} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className="h-full w-full bg-transparent pl-3 pr-[140px] text-[15px] font-medium text-[#1a1a1a] placeholder:text-[#8e8e93] focus:outline-none"
                />
                <div className="absolute right-1.5 top-1.5 bottom-1.5">
                  <button
                    type="submit"
                    className="flex h-full items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-6 text-[14px] font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    {cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
