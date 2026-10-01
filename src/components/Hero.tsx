import { profile } from "@/data/resume";

const buttons = [
  { label: "Resume", href: profile.resume, primary: true },
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
];

export default function Hero() {
  return (
    <section id="top" className="flex min-h-[80vh] flex-col justify-center py-16">
      <p className="mb-4 font-mono text-sm text-accent">$ whoami</p>
      <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
        <span className="cursor text-accent" aria-hidden="true">
          _
        </span>
      </h1>
      <p className="mt-4 text-xl text-foreground sm:text-2xl">{profile.tagline}</p>
      <p className="mt-2 text-muted">
        {profile.education} · {profile.school} · {profile.graduation}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
        {buttons.map((b) => (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              b.primary
                ? "rounded border border-accent bg-accent px-4 py-2 text-background transition hover:opacity-90"
                : "rounded border border-border px-4 py-2 text-foreground transition hover:border-accent hover:text-accent"
            }
          >
            {b.label}
          </a>
        ))}
      </div>
    </section>
  );
}
