"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";
import { useIntroDone } from "./Providers";
import { EASE_OUT_EXPO } from "./ui/motion";
import { Linkedin } from "./ui/BrandIcons";
import { cn } from "@/util/cn";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function Navigation() {
  const ready = useIntroDone();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.id));

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const go = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden ? -100 : 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-linear-to-b from-bg via-bg/80 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-x flex h-20 items-center justify-between">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              if (lenis) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 font-mono text-sm"
            aria-label={`${site.name} — back to top`}
          >
            <span className="text-accent">{site.shortName.toLowerCase()}</span>
            <span className="text-subtle">:~$</span>
            <span className="inline-block h-4 w-2 animate-pulse bg-accent/80" />
          </a>

          <nav
            aria-label="Primary"
            className={cn(
              "hidden items-center gap-1 rounded-full border p-1 backdrop-blur-xl transition-all duration-500 md:flex",
              scrolled ? "border-line bg-surface/70" : "border-transparent bg-transparent",
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  active === item.id ? "text-bg" : "text-muted hover:text-fg",
                )}
                aria-current={active === item.id ? "true" : undefined}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full border border-accent/30 px-4 py-2 text-sm transition-colors hover:border-accent md:flex"
          >
            <Linkedin size={14} strokeWidth={1.75} className="text-accent" />
            <span className="text-fg">LinkedIn</span>
            <ArrowUpRight size={14} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/70 backdrop-blur-xl md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70"
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[45] flex flex-col justify-between bg-bg/95 px-5 pb-10 pt-28 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navItems.map((item, i) => (
                <div key={item.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className="flex items-baseline justify-between py-4"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE_OUT_EXPO }}
                  >
                    <span className="font-display text-5xl">{item.label}</span>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-fg"
              >
                <Linkedin size={16} strokeWidth={1.75} className="text-accent" />
                LinkedIn <ArrowUpRight size={14} />
              </a>
              <div className="flex gap-6">
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                  GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
