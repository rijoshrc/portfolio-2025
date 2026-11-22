import { ImageResponse } from "next/og";
import { SERIF, serifFonts } from "@/lib/ogFonts";
import { site } from "@/lib/site";
import { theme, withAlpha } from "@/lib/themes";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          fontFamily: SERIF,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: theme.muted, fontFamily: "monospace", letterSpacing: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 999,
                border: `2px solid ${withAlpha(theme.accent, 0.5)}`,
                color: theme.accent,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 32,
                letterSpacing: 0,
              }}
            >
              {site.shortName.charAt(0)}
            </div>
            <span style={{ color: theme.fg, fontFamily: "sans-serif", letterSpacing: 0 }}>{site.name}</span>
          </div>
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
    { ...size, fonts: await serifFonts() },
  );
}
