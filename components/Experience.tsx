"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Award, GraduationCap } from "lucide-react";
import { useRef } from "react";
import SectionHeader from "./ui/SectionHeader";
import { Reveal } from "./ui/motion";

const timeline = [
  {
    period: "2015 — Present",
    role: "Technical Project Manager",
    org: "Phases India Technologies",
    current: true,
    points: [
      "Develop and maintain multiple web applications and integrations",
      "Own project delivery and client relationships end to end",
      "Mentor an open source team of 18 developers",
    ],
  },
  {
    period: "2015",
    role: "PHP Developer",
    org: "Phases India Technologies",
    points: [
      "Started in web development, laying the foundation for user-centric application work",
    ],
  },
];

const credentials = [
  {
    icon: GraduationCap,
    kicker: "Education · 2015",
    title: "B.Tech in Computer Science",
    body: "Calicut University — specialised in software engineering and web development.",
  },
  {
    icon: Award,
    kicker: "Certification",
    title: "Frappe Certified Full Stack Developer",
    body: "Certified on the Frappe framework for full stack business applications.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="relative z-10 py-28 md:py-40">
      <div className="container-x">
        <SectionHeader index="04" label="Experience" title="Ten years, one company, many hats." />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          <ol ref={ref} className="relative md:col-span-9 md:col-start-4">
            <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
            <motion.span
              aria-hidden
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent"
              style={{ scaleY }}
            />
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.role} delay={i * 0.1} className="relative pb-16 pl-10 last:pb-0 md:pl-14">
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 ${
                    item.current ? "border-accent bg-accent shadow-[0_0_0_6px_rgb(var(--accent)/0.15)]" : "border-fg/30 bg-bg"
                  }`}
                />
                <p className="eyebrow">{item.period}</p>
                <h3 className="mt-3 font-display text-4xl md:text-5xl">{item.role}</h3>
                <p className="mt-1 text-muted">{item.org}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed text-muted">
                      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-fg/30" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-24 grid gap-4 md:grid-cols-12">
          <Reveal className="eyebrow md:col-span-3">Education & credentials</Reveal>
          {credentials.map(({ icon: Icon, kicker, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="rounded-2xl border border-line bg-surface p-7 md:col-span-4 md:p-8 first-of-type:md:col-start-4"
            >
              <Icon size={20} strokeWidth={1.5} className="text-accent" />
              <p className="eyebrow mt-8">{kicker}</p>
              <h3 className="mt-2 text-lg font-medium">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
