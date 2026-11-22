"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "./ui/motion";
import { useFinishIntro } from "./Providers";
import { site } from "@/lib/site";

export default function Preloader() {
  const reduce = useReducedMotion();
  const finish = useFinishIntro();
  const [count, setCount] = useState(0);
  const [open, setVisible] = useState(true);
  const visible = open && !reduce;

  useEffect(() => {
    if (reduce) return;
    const end = () => {
      setVisible(false);
      finish();
    };
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: end,
    });
    // Safety net: never trap the visitor behind the curtain (e.g. throttled background tabs).
    const fallback = setTimeout(end, 3500);
    return () => {
      controls.stop();
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-surface p-5 sm:p-8 lg:p-12"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="eyebrow flex justify-between">
            <span>{site.name}</span>
            <span>Portfolio © {new Date().getFullYear()}</span>
          </div>

          <div className="overflow-hidden pb-[0.15em]">
            <motion.p
              className="font-display text-display-md italic text-muted"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
            >
              Crafting digital experiences
            </motion.p>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px flex-1 bg-line mr-8 relative overflow-hidden self-center">
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tabular-nums">
              {count.toString().padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
