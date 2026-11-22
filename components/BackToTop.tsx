"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export default function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() =>
        lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="group inline-flex items-center gap-2 self-start text-fg md:self-end"
    >
      Back to top
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
        <ArrowUp size={14} />
      </span>
    </button>
  );
}
