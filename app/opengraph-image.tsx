import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { theme, withAlpha } from "@/lib/themes";

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
          background: `radial-gradient(circle at 15% 10%, ${withAlpha(theme.accent, 0.14)}, transparent 45%), ${theme.bg}`,
          color: theme.fg,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: theme.muted, fontFamily: "monospace", letterSpacing: 3 }}>
          <span style={{ color: theme.accent }}>rijosh:~$</span>
          <span>{`${site.role.toUpperCase()} · SINCE ${site.startYear}`}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
          <span style={{ fontSize: 150, letterSpacing: -5 }}>Rijosh</span>
          <span style={{ fontSize: 150, letterSpacing: -5, fontStyle: "italic", color: theme.muted, paddingLeft: 160 }}>Ravi C.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: theme.muted }}>
          Scalable web platforms, SaaS products &amp; AI-driven automation.
        </div>
      </div>
    ),
    size,
  );
}
