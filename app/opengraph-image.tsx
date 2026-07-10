import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — IELTS prep for Telugu learners`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D1F3C",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            height: 64,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 12,
              height: 26,
              background: "#0097A7",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 38,
              background: "#0097A7",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 51,
              background: "#00BCD4",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: 12,
              height: 64,
              background: "#00BCD4",
              borderRadius: 4,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Band</span>
          <span style={{ color: "#00BCD4" }}>Forge</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#9FB3CC",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size },
  );
}
