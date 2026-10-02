import { profile } from "@/data/resume";
import { contact } from "@/data/contact";
import Typewriter from "./Typewriter";
import { OpenTerminalButton } from "./Terminal";

const buttons = [
  ...(contact.resume ? [{ label: "Resume", href: contact.resume }] : []),
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
];

export default function Hero() {
  return (
    <section id="top" className="flex min-h-[80vh] flex-col justify-center py-16">
      <p className="mb-4 font-mono text-sm text-accent">$ whoami</p>
      <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-4 font-mono text-lg text-foreground sm:text-2xl">
        <span className="text-accent" aria-hidden="true">
          &gt;{" "}
        </span>
        <Typewriter text={profile.tagline} />
      </p>
      <p className="mt-2 text-muted">
        {profile.education} · {profile.school} · {profile.graduation}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
        {buttons.map((b, i) => (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              i === 0
                ? "rounded border border-accent bg-accent px-4 py-2 text-background transition hover:opacity-90"
                : "rounded border border-border px-4 py-2 text-foreground transition hover:border-accent hover:text-accent"
            }
          >
            {b.label}
          </a>
        ))}
      </div>
      <OpenTerminalButton className="mt-6 self-start font-mono text-xs text-muted transition hover:text-accent">
        tip: press <kbd className="rounded border border-border px-1.5 py-0.5 text-accent">`</kbd> or
        click here to open the terminal
      </OpenTerminalButton>
    </section>
  );
}
