import { CreditCard, Headphones, MapPin, Timer, type LucideIcon } from "lucide-react";

type Benefit = { title: string; description: string };

type Props = {
  eyebrow: string;
  title: string;
  /** Rendered on its own line in brand-red italic — e.g. "by design." */
  titleHighlight?: string;
  benefits: Benefit[];
};

const ICONS: LucideIcon[] = [MapPin, Timer, CreditCard, Headphones];

export function BenefitsBand({
  eyebrow,
  title,
  titleHighlight,
  benefits,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d]">
      {/* Subtle ambient red glow — top-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_72%_50%,rgba(222,22,0,0.18),transparent)]"
      />

      <div className="relative flex min-h-[260px] flex-col lg:flex-row lg:items-stretch">

        {/* ── Left: eyebrow + heading ────────────────────────────────
            Aligned with the standard site container on the left edge. */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:w-[28%] lg:shrink-0 lg:px-12 xl:pl-[max(3rem,calc(50vw-40rem))]">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-[1.1] text-white sm:text-4xl">
            {title}
            {titleHighlight && (
              <>
                <br />
                <em className="text-brand-red">{titleHighlight}</em>
              </>
            )}
          </h2>
        </div>

        {/* ── Middle: 2 × 2 benefit cards ──────────────────────────── */}
        <div className="flex flex-1 items-center px-6 py-8 sm:px-8 lg:px-8">
          <div className="grid w-full grid-cols-2 gap-2.5">
            {benefits.map(({ title: t, description }, i) => {
              const Icon = ICONS[i] ?? MapPin;
              return (
                <article
                  key={t}
                  className="rounded-xl bg-white/[0.07] px-4 py-3.5"
                >
                  <Icon size={17} strokeWidth={1.7} className="text-white/75" />
                  <h3 className="mt-2.5 text-[13px] font-semibold leading-snug text-white">
                    {t}
                  </h3>
                  <p className="mt-1 text-[11px] leading-[1.55] text-white/48">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Right: delivery rider image ───────────────────────────
            Fills remaining width; bleeds to the section's right edge.
            Gradient on the left fades it into the dark background.   */}
        <div className="relative hidden overflow-hidden lg:block lg:w-[30%] lg:shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/rider.webp"
            alt=""
            draggable={false}
            className="h-full w-full select-none object-cover object-center"
          />
          {/* Left-to-dark gradient */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0d0d0d] to-transparent"
          />
        </div>

      </div>
    </section>
  );
}
