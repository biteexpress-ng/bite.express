import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.shortDescription}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default site-wide Open Graph image. Branded composition rendered at
 * request time via Satori. Individual routes can override by adding
 * their own opengraph-image.tsx in the route segment.
 *
 * Satori supports a CSS subset (no Tailwind, no @import). Fonts are
 * fetched at runtime; we keep the design dependency-free so it always
 * renders even on cold edge invocations.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0b0b0b 0%, #1a0606 65%, #de1600 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#de1600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            b
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "880px",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              opacity: 0.7,
            }}
          >
            Delivery, reimagined for Nigeria
          </div>
          <div
            style={{
              fontSize: "80px",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            Everything you crave. Delivered fast.
          </div>
        </div>

        {/* Bottom — URL band */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "26px",
            opacity: 0.85,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                background: "#ff6b4a",
              }}
            />
            bite.express
          </div>
          <div style={{ opacity: 0.6 }}>Food · Groceries · Pharmacy · More</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
