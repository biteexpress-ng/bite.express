/**
 * Hero phone visual — a single transparent-background mockup image.
 *
 * The previous coded shell + live screen (status header, SVG map,
 * order card, chat bar) was swapped out for a flat mockup PNG/AVIF.
 * If you ever need to bring the live screen back, restore from git
 * history rather than overlaying onto this image — the mockup is a
 * solid render, not a screen frame.
 *
 * Purely decorative — aria-hidden on the wrapper, never tab-stopped.
 */
export function PhoneOrderPreview() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="relative mx-auto w-full max-w-56 sm:max-w-64 lg:max-w-72 xl:max-w-80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative,
          already-optimised AVIF; sidestepping next/image avoids the
          intrinsic-dimension requirement for a transparent mockup. */}
      <img
        src="/brand/hero/phone-mockup.webp"
        alt=""
        className="block h-auto w-full select-none"
        draggable={false}
      />

      {/* Behind-the-phone soft red halo */}
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 rounded-[3.5rem] bg-brand-red/15 blur-3xl"
      />
    </div>
  );
}
