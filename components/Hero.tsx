"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { site, stats } from "@/lib/site";
import { useIntroDone } from "./Providers";
import { Counter, EASE_OUT_EXPO, Magnetic, TextReveal } from "./ui/motion";

export default function Hero() {
  const ready = useIntroDone();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease: EASE_OUT_EXPO },
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between pb-10 pt-28 md:pt-32"
    >
      <motion.div className="container-x" style={reduce ? undefined : { opacity: fade }}>
        <motion.div className="eyebrow flex flex-wrap justify-between gap-3" {...fadeIn(0.2)}>
          <span>
            {site.role} <span className="text-subtle">/</span> {site.title}
          </span>
          <span>Based in {site.location} · Since {site.startYear}</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="container-x my-12 md:my-0"
        style={reduce ? undefined : { y: nameY }}
      >
        <h1 className="font-display text-display-xl" aria-label={site.name}>
          <TextReveal text="Rijosh" play={ready} delay={0.05} className="block" />
          <TextReveal
            text="Ravi C."
            play={ready}
            delay={0.18}
            className="block italic text-muted md:pl-[18%]"
          />
        </h1>
      </motion.div>

      <div className="container-x">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <motion.p
            className="text-pretty text-lg leading-relaxed text-muted md:col-span-6 md:text-xl lg:col-span-5"
            {...fadeIn(0.5)}
          >
            Crafting digital experiences for a decade —{" "}
            <span className="text-fg">
              scalable web platforms, SaaS products and AI-driven automation
            </span>
            , and leading the teams that ship them.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            {...fadeIn(0.6)}
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollTo("work")}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-fg pl-7 pr-2 text-sm font-medium text-bg transition-colors hover:bg-accent"
              >
                View selected work
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                  <ArrowRight size={16} />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="inline-flex h-14 items-center rounded-full border border-line px-7 text-sm text-fg transition-colors hover:border-fg/40"
              >
                Get in touch
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4"
          {...fadeIn(0.75)}
        >
          {stats.map((s) => (
            <div key={s.label} className="border-b border-line py-5 pr-4 md:border-b-0 md:border-r md:px-6 md:first:pl-0">
              <p className="font-display text-5xl leading-none md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} play={ready} />
              </p>
              <p className="mt-2 max-w-[18ch] text-sm text-muted">{s.label}</p>
            </div>
          ))}
          <div className="flex items-end justify-between py-5 md:pl-6">
            <span className="max-w-[18ch] text-sm text-muted">
              Now exploring <span className="text-fg">AI &amp; RAG</span> systems
            </span>
            <button
              type="button"
              onClick={() => scrollTo("about")}
              aria-label="Scroll to about"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
