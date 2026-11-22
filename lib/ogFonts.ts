import { readFile } from "node:fs/promises";
import { join } from "node:path";

// next/og (Satori) can't read woff2, so the generated icon and social image load
// TTF copies of Instrument Serif. They're read at build time and never sent to visitors.
const fontPath = (file: string) => join(process.cwd(), "app", "fonts", file);

export const SERIF = "Instrument Serif";

export async function serifFonts() {
  const [regular, italic] = await Promise.all([
    readFile(fontPath("InstrumentSerif-Regular.ttf")),
    readFile(fontPath("InstrumentSerif-Italic.ttf")),
  ]);
  return [
    { name: SERIF, data: regular, style: "normal" as const, weight: 400 as const },
    { name: SERIF, data: italic, style: "italic" as const, weight: 400 as const },
  ];
}
