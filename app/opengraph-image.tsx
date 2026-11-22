import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 72,
          background: "radial-gradient(circle at 15% 10%, rgba(198,243,107,0.14), transparent 45%), #0A0A0B",
          color: "#EDEDEF",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#A1A1AA", fontFamily: "monospace", letterSpacing: 3 }}>
          <span style={{ color: "#C6F36B" }}>rijosh:~$</span>
          <span>{`${site.role.toUpperCase()} · SINCE ${site.startYear}`}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
          <span style={{ fontSize: 150, letterSpacing: -5 }}>Rijosh</span>
          <span style={{ fontSize: 150, letterSpacing: -5, fontStyle: "italic", color: "#A1A1AA", paddingLeft: 160 }}>Ravi C.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#A1A1AA" }}>
          Scalable web platforms, SaaS products &amp; AI-driven automation.
        </div>
      </div>
    ),
    size,
  );
}
