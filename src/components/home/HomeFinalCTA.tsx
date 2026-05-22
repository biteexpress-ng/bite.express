import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

type Props = {
  title: string;
  subtitle: string;
  placeholder: string;
  cta: string;
};

export function HomeFinalCTA({ title, subtitle, placeholder, cta }: Props) {
  return (
    <section className="bg-white px-5 py-8 sm:px-6 lg:px-8">
      <Container className="px-0">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-brand-red via-brand-red-600 to-brand-orange px-6 py-16 text-white shadow-2xl sm:px-10 lg:px-16">
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 1200 420"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-90 300C150 110 330 405 526 210C710 28 886 164 1290 78"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="3 18"
            />
          </svg>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl leading-[1.02] tracking-normal text-white sm:text-5xl md:text-7xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
              {subtitle}
            </p>

            <form
              action={siteConfig.shopHref}
              method="get"
              className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-[2rem] border border-white/20 bg-white/[0.18] p-2 backdrop-blur sm:flex-row"
            >
              <label className="relative flex min-w-0 flex-1 items-center">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-5 text-white/65"
                />
                <input
                  type="text"
                  name="q"
                  placeholder={placeholder}
                  aria-label={placeholder}
                  className="h-14 w-full rounded-full border border-white/15 bg-white/15 pl-12 pr-5 text-base text-white placeholder:text-white/65 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/45"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-brand-red shadow-lg transition hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red"
              >
                {cta}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
