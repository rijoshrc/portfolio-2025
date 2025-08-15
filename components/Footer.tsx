import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import LocalTime from "./LocalTime";
import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-line">
      <div className="container-x grid gap-10 py-14 text-sm md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Local time</p>
          <LocalTime className="text-fg" />
          <p className="mt-1 text-muted">{site.location}</p>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="space-y-1.5">
            {[
              ["LinkedIn", site.socials.linkedin],
              ["GitHub", site.socials.github],
              ["Email", `mailto:${site.email}`],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-1 text-fg transition-colors hover:text-accent"
                >
                  {label}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 md:col-span-4 md:items-end">
          <BackToTop />
          <p className="text-muted">
            © {new Date().getFullYear()} {site.name}. Built with Next.js.
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display leading-[0.75] tracking-[-0.04em] text-fg/[0.06]"
        style={{ fontSize: "clamp(6rem, 26vw, 26rem)", marginBottom: "-0.12em" }}
      >
        {site.shortName}
      </p>
    </footer>
  );
}
