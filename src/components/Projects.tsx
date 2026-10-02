import { projects, type Project } from "@/data/resume";
import Section from "./Section";

const cardClass =
  "group flex flex-col rounded-lg border border-border bg-surface p-5 transition";
const linkedCardClass =
  "hover:border-accent hover:shadow-[0_0_20px_-5px_var(--color-accent)]";

function CardBody({ p }: { p: Project }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className={`font-semibold ${p.link ? "group-hover:text-accent" : ""}`}>
          {p.name}
        </h3>
        <span className="shrink-0 font-mono text-xs text-muted">{p.date}</span>
      </div>
      <ul className="mt-3 flex-1 space-y-2 text-sm text-foreground/90">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-accent">
        {p.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) =>
          p.link ? (
            <a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} ${linkedCardClass}`}
            >
              <CardBody p={p} />
            </a>
          ) : (
            <div key={p.name} className={cardClass}>
              <CardBody p={p} />
            </div>
          ),
        )}
      </div>
    </Section>
  );
}
