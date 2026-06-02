/**
 * Grain overlay — adds a barely-perceptible film grain texture to the
 * page, the kind of finishing touch that separates agency-grade design
 * from typical startup pages. Uses an inline SVG `feTurbulence` filter
 * so there's no external asset to load.
 *
 * Mount once in the page (or layout). Position is fixed full-viewport,
 * pointer-events: none so it never interferes with interaction.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      style={{
        opacity: 0.035,
        mixBlendMode: "multiply",
      }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-filter)"
        />
      </svg>
    </div>
  );
}
