"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { EASE_OUT_EXPO, Magnetic, Reveal, TextReveal } from "./ui/motion";
import { cn } from "@/util/cn";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";
type Fields = { name: string; email: string; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please tell me your name.";
  if (!EMAIL_RE.test(f.email.trim())) errors.email = "That email doesn't look right.";
  if (f.message.trim().length < 10) errors.message = "A little more detail, please (10+ characters).";
  return errors;
}

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: {
  id: keyof Fields;
  label: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base =
    "peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-7 text-lg text-fg placeholder-transparent transition-colors focus:outline-none focus:ring-0";
  const cls = cn(base, error ? "border-red-400/70" : "border-line focus:border-accent");
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} rows={4} placeholder={label} className={cn(cls, "resize-none")} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      ) : (
        <input id={id} name={id} placeholder={label} className={cls} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:font-sans peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:font-mono peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent"
      >
        {label}
      </label>
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const update = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Hello from ${fields.name || "your portfolio"}`,
  )}&body=${encodeURIComponent(fields.message)}`;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company: form.get("company") ?? "" }),
      });
      if (res.status === 503) return setStatus("unavailable");
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="relative z-10 py-28 md:py-40">
      <div className="container-x">
        <div className="border-t border-line pt-6">
          <Reveal className="eyebrow flex items-center gap-3">
            <span className="text-accent">05</span>
            <span className="h-px w-6 bg-line" />
            <span>Contact</span>
          </Reveal>
        </div>

        <h2 className="mt-12 font-display text-display-xl md:mt-16" aria-label="Let's build something.">
          <TextReveal text="Let's build" className="block" />
          <TextReveal text="something." className="block italic text-muted" delay={0.12} />
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="max-w-sm text-pretty text-lg leading-relaxed text-muted">
                Have a product to build, a team to lead, or an AI workflow to automate? I reply within a
                couple of days.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow mb-3">Email</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${site.email}`} className="text-xl text-fg underline decoration-line underline-offset-8 transition-colors hover:decoration-accent md:text-2xl">
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg/40 hover:text-fg"
                >
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute -top-9 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-xs text-bg"
                      >
                        Copied
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <p className="eyebrow mb-3">Elsewhere</p>
              <div className="flex gap-3">
                {[
                  { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
                  { href: site.socials.github, label: "GitHub", Icon: Github },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-fg transition-colors hover:border-fg/40"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {label}
                    <ArrowUpRight size={14} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="rounded-2xl border border-line bg-surface p-10"
                  role="status"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg">
                    <Check size={20} />
                  </span>
                  <h3 className="mt-8 font-display text-4xl">Message received.</h3>
                  <p className="mt-3 text-muted">Thanks for reaching out — I&apos;ll get back to you shortly.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-fg underline underline-offset-4">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate className="space-y-8" exit={{ opacity: 0, y: -16 }}>
                  <Field id="name" label="Your name" autoComplete="name" value={fields.name} onChange={update("name")} error={errors.name} />
                  <Field id="email" label="Email address" type="email" autoComplete="email" value={fields.email} onChange={update("email")} error={errors.email} />
                  <Field id="message" label="Tell me about your project" textarea value={fields.message} onChange={update("message")} error={errors.message} />
                  {/* Honeypot — hidden from people, tempting to bots */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex h-14 items-center gap-3 rounded-full bg-fg pl-7 pr-2 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-60"
                      >
                        {status === "sending" ? "Sending…" : "Send message"}
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                          {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                        </span>
                      </button>
                    </Magnetic>
                    <div aria-live="polite" className="text-sm">
                      {status === "error" && <p className="text-red-300">Something went wrong. Please try again or email me directly.</p>}
                      {status === "unavailable" && (
                        <p className="text-muted">
                          The form is offline right now —{" "}
                          <a href={mailto} className="text-fg underline underline-offset-4">
                            send it by email instead
                          </a>
                          .
                        </p>
                      )}
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
