import { profile, experience } from "@/data/resume";
import { contact, chatbot } from "@/data/config";
import TypedLines, { type TypedLine } from "./TypedLines";
import { OpenTerminalButton } from "./Terminal";

const buttons = [
  ...(contact.resume ? [{ label: "Resume", href: contact.resume }] : []),
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
];

// Plays like a terminal session: type the command, then print its output at once.
const lines: TypedLine[] = [
  { text: "whoami", prefix: "$ ", className: "mb-4 font-mono text-sm text-accent", pause: 300, speed: 60 },
  { text: profile.name, as: "h1", className: "font-mono text-4xl font-bold tracking-tight sm:text-6xl", pause: 200, instant: true },
  { text: profile.tagline, prefix: "> ", className: "mt-4 font-mono text-lg text-foreground sm:text-2xl", pause: 150, instant: true },
];

const chip =
  "rounded border border-border bg-surface px-2.5 py-1 text-foreground transition-colors hover:border-accent hover:text-accent";

export default function Hero() {
  return (
    <section id="top" className="flex min-h-[65vh] flex-col justify-center py-16">
      <TypedLines lines={lines} />
      <p className="mt-2 text-muted">
        {profile.education} · {profile.school} · {profile.graduation}
      </p>
      <p className="mt-4 text-foreground/90">
        <span className="font-mono text-accent">{experience.length} software roles</span> · {profile.highlight}
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
      {chatbot.enabled ? (
        <div className="mt-8 font-mono text-xs">
          <p className="text-muted">
            <span className="text-accent">&gt;</span> ask my AI about me:
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.sampleQuestions.map((q) => (
              <OpenTerminalButton key={q} question={q} className={chip}>
                {q}
              </OpenTerminalButton>
            ))}
            <OpenTerminalButton className={`${chip} text-muted`}>your own question…</OpenTerminalButton>
          </div>
          <p className="mt-3 text-muted">
            <span className="pointer-coarse:hidden">
              or press <kbd className="rounded border border-border px-1.5 py-0.5 text-accent">`</kbd> anytime
            </span>
            <span className="hidden pointer-coarse:inline">or tap &gt;_ terminal at the bottom anytime</span>
          </p>
        </div>
      ) : (
        <OpenTerminalButton className="mt-6 self-start font-mono text-xs text-muted transition hover:text-accent">
          <span className="pointer-coarse:hidden">tip: press ` or click here to open the terminal</span>
          <span className="hidden pointer-coarse:inline">tip: tap here to open the terminal</span>
        </OpenTerminalButton>
      )}
    </section>
  );
}
