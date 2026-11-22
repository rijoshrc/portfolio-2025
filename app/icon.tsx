import { ImageResponse } from "next/og";
import { SERIF, serifFonts } from "@/lib/ogFonts";
import { theme } from "@/lib/themes";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.bg,
          borderRadius: 14,
          color: theme.accent,
          fontSize: 42,
          fontFamily: SERIF,
          fontStyle: "italic",
        }}
      >
        R
      </div>
    ),
    { ...size, fonts: await serifFonts() },
  );
}
