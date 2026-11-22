// Color themes. `activeTheme` is the default (and what the favicon and social image use);
// visitors can switch themes at runtime with the ThemeSwitcher, saved in localStorage.

export type Theme = {
  label: string;
  scheme: "dark" | "light";
  bg: string; // page background
  surface: string; // cards
  elevated: string; // raised elements
  fg: string; // primary text
  muted: string; // secondary text (AA on bg)
  subtle: string; // decorative text only
  accent: string; // highlights, links, CTAs
  glow: string; // second ambient background glow
  ink: string; // hairlines and grid lines are this color at low opacity
};

export const themes = {
  lime: {
    label: "Terminal",
    scheme: "dark",
    bg: "#0A0A0B",
    surface: "#111113",
    elevated: "#18181B",
    fg: "#EDEDEF",
    muted: "#A1A1AA",
    subtle: "#71717A",
    accent: "#C6F36B",
    glow: "#7C8CFF",
    ink: "#FFFFFF",
  },
  graphite: {
    label: "Blueprint",
    scheme: "dark",
    bg: "#0B0D12",
    surface: "#12151C",
    elevated: "#1A1E27",
    fg: "#E8EAF0",
    muted: "#9AA3B2",
    subtle: "#6B7385",
    accent: "#6EA8FF",
    glow: "#8B7CFF",
    ink: "#FFFFFF",
  },
  warmInk: {
    label: "Ember",
    scheme: "dark",
    bg: "#0F0D0B",
    surface: "#181512",
    elevated: "#211D19",
    fg: "#F2EDE6",
    muted: "#A89F94",
    subtle: "#776F65",
    accent: "#F2A93B",
    glow: "#E0674B",
    ink: "#FFF4E6",
  },
  paper: {
    label: "Manuscript",
    scheme: "light",
    bg: "#F4F1EA",
    surface: "#EBE6DC",
    elevated: "#E2DCD0",
    fg: "#1C1A17",
    muted: "#5F5950", // darker than the swatch so body text stays AA on paper
    subtle: "#8A8379",
    accent: "#C2410C",
    glow: "#D9A441",
    ink: "#1C1A17",
  },
  navy: {
    label: "Deep Sea",
    scheme: "dark",
    bg: "#0A1020",
    surface: "#101A2E",
    elevated: "#16223A",
    fg: "#E6EDF7",
    muted: "#93A1B8",
    subtle: "#64728A",
    accent: "#5EEAD4",
    glow: "#3B82F6",
    ink: "#DCE6F5",
  },
  violet: {
    label: "Nebula",
    scheme: "dark",
    bg: "#0D0B14",
    surface: "#15121F",
    elevated: "#1D1929",
    fg: "#ECE9F5",
    muted: "#A39DB8",
    subtle: "#716B85",
    accent: "#A78BFA",
    glow: "#EC6FB0",
    ink: "#EAE4FF",
  },
} satisfies Record<string, Theme>;

export type ThemeName = keyof typeof themes;

export const activeTheme: ThemeName = "violet";

export const theme: Theme = themes[activeTheme];

/** "#RRGGBB" -> "R G B" (space-separated channels for `rgb(var(--x) / a)`). */
const channels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");

export const themeNames = Object.keys(themes) as ThemeName[];

export const isThemeName = (v: unknown): v is ThemeName =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(themes, v);

/** localStorage key holding the visitor's chosen theme. */
export const THEME_STORAGE_KEY = "theme";

/** One `html[data-theme="…"]` block per theme with the variables app/globals.css consumes. */
export const themeCss = () =>
  themeNames
    .map((name) => {
      const t: Theme = themes[name];
      const vars = (["bg", "surface", "elevated", "fg", "muted", "subtle", "accent", "glow", "ink"] as const)
        .map((k) => `--${k}:${channels(t[k])};`)
        .join("");
      return `html[data-theme="${name}"]{${vars}color-scheme:${t.scheme};}`;
    })
    .join("\n");

/**
 * Inline script run before first paint: applies the saved theme so there's no flash
 * of the default one. Kept dependency-free because it's serialised into the page.
 */
export const themeBootScript = () => `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t&&${JSON.stringify(themeNames)}.indexOf(t)>-1){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

/** "#RRGGBB" + alpha -> "rgba(...)" for places that can't use CSS variables (OG image). */
export const withAlpha = (hex: string, a: number) => `rgba(${channels(hex).split(" ").join(",")},${a})`;
