"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  THEME_STORAGE_KEY,
  activeTheme,
  isThemeName,
  themeNames,
  themes,
  type ThemeName,
} from "@/lib/themes";
import { EASE_OUT_EXPO } from "./ui/motion";
import { cn } from "@/util/cn";

const EVENT = "themechange";

function subscribe(onChange: () => void) {
  // A choice made in another open tab arrives as a `storage` event; mirror it here.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_STORAGE_KEY || !isThemeName(e.newValue)) return;
    document.documentElement.dataset.theme = e.newValue;
    onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = (): ThemeName => {
  const t = document.documentElement.dataset.theme;
  return isThemeName(t) ? t : activeTheme;
};

function applyTheme(name: ThemeName) {
  document.documentElement.dataset.theme = name;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themes[name].bg);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, name);
  } catch {
    // Private mode / blocked storage: the theme still applies for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

export default function ThemeSwitcher() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => activeTheme);
  const [open, setOpen] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Only offer the switcher once the visitor reaches the footer.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      setAtFooter(entry.isIntersecting);
      if (!entry.isIntersecting) setOpen(false);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="fixed bottom-5 right-5 z-[55] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            id="theme-menu"
            role="radiogroup"
            aria-label="Color theme"
            className="w-64 rounded-2xl border border-line bg-surface/90 p-2 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: "bottom right" }}
          >
            <p className="eyebrow px-3 pb-2 pt-2">Theme</p>
            {themeNames.map((name) => {
              const t = themes[name];
              const selected = name === current;
              return (
                <button
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => applyTheme(name)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    selected ? "bg-fg/[0.07] text-fg" : "text-muted hover:bg-fg/[0.04] hover:text-fg",
                  )}
                >
                  <span
                    aria-hidden
                    className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: t.bg, boxShadow: `inset 0 0 0 1px ${t.ink}26` }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.accent }} />
                  </span>
                  <span className="flex-1">{t.label}</span>
                  {selected && <Check size={14} className="text-accent" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {atFooter && (
          <motion.button
            key="theme-toggle"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="theme-menu"
            aria-label="Change color theme"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/80 text-fg shadow-lg backdrop-blur-xl transition-colors hover:border-accent"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            <Palette size={18} strokeWidth={1.75} className="transition-transform duration-500 group-hover:rotate-12" />
            <span aria-hidden className="absolute right-3 top-3 h-2 w-2 rounded-full bg-accent ring-2 ring-surface" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
