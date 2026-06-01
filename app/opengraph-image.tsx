import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Daphni Georoglidis — Stand-up Comedienne & Schauspielerin";

// Branded social card, generated at build time (static export friendly).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0d",
          color: "#f4f0e6",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8c857b",
          }}
        >
          <span>Stand-up Comedienne</span>
          <span style={{ color: "#ff2e12" }}>@daphnigg</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 230, lineHeight: 0.85, fontWeight: 700 }}>
            DAPHNI
          </div>
          <div
            style={{
              fontSize: 96,
              fontStyle: "italic",
              color: "#8c857b",
              marginTop: 8,
            }}
          >
            Georoglidis
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 34, color: "#f4f0e6" }}>
          <span style={{ color: "#ff2e12" }}>Jung. Düster. Gnadenlos.</span>
          <span style={{ color: "#8c857b", marginLeft: 16 }}>
            Köln · deutschlandweit
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
