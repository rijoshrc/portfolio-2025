import { Code2, Sparkles, Users } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { Reveal, ScrollHighlight } from "./ui/motion";

const focus = [
  {
    icon: Code2,
    title: "Full stack product engineering",
    body: "React, Next.js and Vue on the front; Node.js, Laravel and Frappe behind; MySQL, PostgreSQL and MongoDB underneath.",
  },
  {
    icon: Sparkles,
    title: "AI-driven automation",
    body: "Retrieval-Augmented Generation pipelines with vector databases that turn documents into decisions.",
  },
  {
    icon: Users,
    title: "Technical leadership",
    body: "Project and client management, and mentoring an open source team of 18 developers.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 py-28 md:py-40">
      <div className="container-x">
        <SectionHeader index="01" label="About" title="A decade of turning complex requirements into calm software." />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-4">
            <ScrollHighlight
              className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.2] tracking-[-0.01em]"
              text="I started in 2015 as a PHP developer at Phases India Technologies. Ten years on, I lead projects end to end — from architecture and code to clients and teams — building scalable, user-centric products with clean, efficient code."
            />
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-28 md:grid-cols-3">
          {focus.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="bg-bg p-8 md:p-10">
              <Icon size={20} strokeWidth={1.5} className="text-accent" />
              <h3 className="mt-10 text-lg font-medium">{title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
