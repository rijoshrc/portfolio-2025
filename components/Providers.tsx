"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const IntroContext = createContext<{ done: boolean; finish: () => void }>({
  done: true,
  finish: () => {},
});

/** True once the preloader curtain starts lifting — hero animations key off this. */
export const useIntroDone = () => useContext(IntroContext).done;
export const useFinishIntro = () => useContext(IntroContext).finish;

function ScrollLock({ locked }: { locked: boolean }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);
  return null;
}

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [finished, setFinished] = useState(false);
  // Reduced-motion visitors skip the intro entirely.
  const done = finished || !!reduce;

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const value = useMemo(() => ({ done, finish: () => setFinished(true) }), [done]);

  return (
    <IntroContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{
            lerp: 0.09,
            smoothWheel: !prefersReduced(),
            anchors: { offset: -80 },
          }}
        >
          <ScrollLock locked={!done} />
          {children}
        </ReactLenis>
      </MotionConfig>
    </IntroContext.Provider>
  );
}
