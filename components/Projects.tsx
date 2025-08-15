"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";
import SectionHeader from "./ui/SectionHeader";
import { Reveal, SpotlightCard } from "./ui/motion";

function Cover({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-xl border border-line bg-bg/60 font-mono text-[13px]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="ml-3 text-[11px] text-subtle">~/projects/{project.slug}</span>
      </div>
      <div className="flex-1 space-y-1.5 p-5 leading-relaxed">
        <p>
          <span className="text-accent">$</span> <span className="text-fg">stack</span>{" "}
          <span className="text-subtle">--list</span>
        </p>
        {project.tech.map((t, i) => (
          <p key={t} className="text-muted">
            <span className="text-subtle">{String(i + 1).padStart(2, "0")}</span>{"  "}
            {t}
          </p>
        ))}
        <p>
          <span className="text-accent">$</span> <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-accent/80" />
        </p>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-3 font-display text-[9rem] leading-none text-fg/[0.04]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function FeaturedCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reducePref = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const reduce = reducePref || !desktop;
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, index === total - 1 ? 0 : 0.5]);

  return (
    <div className="relative flex md:sticky md:top-28 md:pt-[var(--stack-offset)]" style={{ ["--stack-offset" as string]: `${index * 16}px` }}>
      <motion.article
        style={reduce ? undefined : { scale }}
        className="relative w-full origin-top overflow-hidden rounded-3xl border border-line bg-surface"
      >
        <SpotlightCard className="grid gap-8 p-6 md:grid-cols-12 md:gap-12 md:p-12">
          <div className="flex flex-col md:col-span-7">
            <div className="eyebrow flex items-center justify-between">
              <span>{project.category}</span>
              <span className="tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-10 font-display text-display-md md:mt-16">{project.title}</h3>
            <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-muted md:text-lg">
              {project.summary}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2 md:mt-auto md:pt-10">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 text-sm text-fg"
              >
                Visit project
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : null}
          </div>
          <div className="md:col-span-5">
            <Cover project={project} index={index} />
          </div>
        </SpotlightCard>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-bg"
          style={reduce ? { opacity: 0 } : { opacity: dim }}
        />
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative z-10 py-28 md:py-40">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Selected work"
          title="Products built for real teams, at real scale."
          aside={`${featuredProjects.length + otherProjects.length} products across SaaS, real-time dashboards, AI and mobile — a few highlights first.`}
        />

        <div ref={stackRef} className="mt-16 flex flex-col gap-6 md:mt-24 md:gap-[12vh]">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} total={featuredProjects.length} progress={scrollYProgress} />
          ))}
        </div>

        <div className="mt-32 md:mt-40">
          <Reveal className="eyebrow mb-6 flex items-center justify-between">
            <span>More projects</span>
            <span>{String(otherProjects.length).padStart(2, "0")}</span>
          </Reveal>
          <ul className="border-t border-line">
            {otherProjects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={Math.min(i * 0.03, 0.2)} y={12}>
                <div className="group relative grid grid-cols-12 items-baseline gap-4 border-b border-line py-6 transition-colors duration-500 hover:bg-surface/60 md:py-7">
                  <span className="col-span-2 font-mono text-xs text-subtle md:col-span-1 md:pl-4">
                    {String(i + 5).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 md:col-span-5">
                    <h3 className="font-display text-2xl transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted md:hidden">{p.summary}</p>
                  </div>
                  <p className="col-span-4 hidden text-sm text-muted md:block">{p.summary}</p>
                  <p className="col-span-10 col-start-3 font-mono text-[11px] text-subtle md:col-span-2 md:col-start-auto md:pr-4 md:text-right">
                    {p.tech.join(" · ")}
                  </p>
                  <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
