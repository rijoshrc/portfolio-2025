import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { Magnetic, Reveal, TextReveal } from "./ui/motion";
import { Github, Linkedin } from "./ui/BrandIcons";

export default function Profile() {
  return (
    <section id="profile" className="relative z-10 py-28 md:py-40">
      <div className="container-x">
        <div className="border-t border-line pt-6">
          <Reveal className="eyebrow flex items-center gap-3">
            <span className="text-accent">05</span>
            <span className="h-px w-6 bg-line" />
            <span>Profile</span>
          </Reveal>
        </div>

        <h2 className="mt-12 font-display text-display-xl md:mt-16" aria-label="Find me on LinkedIn.">
          <TextReveal text="Find me" className="block" />
          <TextReveal text="on LinkedIn." className="block italic text-muted" delay={0.12} />
        </h2>

        <div className="mt-16 grid items-end gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="max-w-sm text-pretty text-lg leading-relaxed text-muted">
              My full career history, recommendations and recent updates live on my LinkedIn profile.
            </p>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <Github size={16} strokeWidth={1.5} />
              Code on GitHub
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <Magnetic strength={0.08} className="block">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on LinkedIn`}
                className="spotlight group flex items-center gap-5 rounded-3xl border border-accent/30 bg-surface p-6 transition-colors hover:border-accent/70 md:gap-7 md:p-8"              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-bg md:h-20 md:w-20">
                  <Linkedin size={30} strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-3xl leading-tight md:text-4xl">{site.name}</span>
                  <span className="mt-1 block text-pretty text-sm text-muted">
                    {site.title} · {site.company}
                  </span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
