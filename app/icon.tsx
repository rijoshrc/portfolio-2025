import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0B",
          borderRadius: 14,
          color: "#C6F36B",
          fontSize: 42,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
        }}
      >
        R
      </div>
    ),
    size,
  );
}
