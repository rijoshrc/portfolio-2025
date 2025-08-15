"use client";

import { useEffect, useRef } from "react";

/**
 * Quiet ambient layer: two slow-drifting accent glows, a pointer-following
 * spotlight (CSS vars, rAF-throttled — no canvas), a faint grid and film grain.
 */
export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[30%] h-[70vmax] w-[70vmax] animate-drift rounded-full bg-accent/[0.06] blur-[120px]" />
        <div
          className="absolute -bottom-[35%] -right-[25%] h-[60vmax] w-[60vmax] animate-drift rounded-full bg-[#7c8cff]/[0.05] blur-[140px]"
          style={{ animationDelay: "-11s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
            maskImage: "linear-gradient(to bottom, #000, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx, -999px) var(--my, -999px), rgb(var(--accent) / 0.05), transparent 60%)",
          }}
        />
      </div>
      <div aria-hidden className="grain" />
    </>
  );
}
