import { Bot, Layout, Server, Wrench } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { Reveal, SpotlightCard } from "./ui/motion";
import { cn } from "@/util/cn";

const categories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "React Native"],
    span: "md:col-span-7",
  },
  {
    title: "AI",
    icon: Bot,
    skills: ["RAG", "FAISS", "Vector databases", "Azure AI", "Prompt engineering"],
    span: "md:col-span-5",
    highlight: true,
  },
  {
    title: "Backend & data",
    icon: Server,
    skills: ["Node.js", "Express", "PHP", "Laravel", "Symfony", "Frappe", "GraphQL", "REST", "Socket.io", "MySQL", "PostgreSQL", "MongoDB"],
    span: "md:col-span-8",
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Docker", "Git", "CI/CD", "Jest", "Webpack"],
    span: "md:col-span-4",
  },
];

const marquee = categories.flatMap((c) => c.skills);

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-28 md:py-40">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Stack"
          title="The right tool, not the newest one."
          aside="A broad toolkit sharpened across ten years of client work — chosen per problem, not per trend."
        />

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12">
          {categories.map(({ title, icon: Icon, skills, span, highlight }, i) => (
            <Reveal key={title} delay={i * 0.06} className={span}>
              <SpotlightCard
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-line bg-surface p-7 md:p-9",
                  highlight && "bg-linear-to-br from-accent/[0.07] to-surface",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <Icon size={20} strokeWidth={1.5} className={highlight ? "text-accent" : "text-muted"} />
                </div>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-bg/50 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-fg/30 hover:text-fg"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mask-fade-x group mt-20 overflow-hidden border-y border-line py-8 md:mt-28" aria-hidden>
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="flex items-center font-display text-4xl italic text-fg/80 md:text-6xl">
              <span className="px-6 md:px-10">{s}</span>
              <span className="text-accent text-2xl not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
