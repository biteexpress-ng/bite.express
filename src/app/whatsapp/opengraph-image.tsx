import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Order food on WhatsApp with BiteExpress, no app, just chat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Route-specific Open Graph image for /whatsapp. Mirrors the site OG
 * composition but leans on the WhatsApp green as the accent. Satori
 * supports only a CSS subset (no Tailwind/@import); kept dependency-free
 * so it renders on cold edge invocations.
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
          background:
            "linear-gradient(135deg, #050505 0%, #06210f 60%, #0a7d3a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — brand mark + channel pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {siteConfig.name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              borderRadius: "9999px",
              background: "rgba(37,211,102,0.16)",
              border: "1px solid rgba(37,211,102,0.5)",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "9999px",
                background: "#25d366",
              }}
            />
            WhatsApp ordering
          </div>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "900px",
          }}
        >
          <div style={{ fontSize: "26px", fontWeight: 500, opacity: 0.72 }}>
            No app. No forms. Just chat.
          </div>
          <div
            style={{
              fontSize: "82px",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            Order food on WhatsApp.
          </div>
        </div>

        {/* Bottom — flow + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "24px",
            opacity: 0.9,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                background: "#25d366",
              }}
            />
            bite.express/whatsapp
          </div>
          <div style={{ opacity: 0.7 }}>
            Browse · Order · Pay by transfer · Track
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
