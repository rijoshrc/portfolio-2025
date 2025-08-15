import { Reveal, TextReveal } from "./motion";
import { cn } from "@/util/cn";

export default function SectionHeader({
  index,
  label,
  title,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:gap-12",
        className,
      )}
    >
      <Reveal className="eyebrow flex items-center gap-3 md:col-span-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-6 bg-line" />
        <span>{label}</span>
      </Reveal>
      <div className="md:col-span-9">
        <TextReveal
          as="h2"
          text={title}
          className="block font-display text-display-lg text-balance"
        />
        {aside ? <Reveal delay={0.2} className="mt-6 max-w-xl text-muted">{aside}</Reveal> : null}
      </div>
    </header>
  );
}
