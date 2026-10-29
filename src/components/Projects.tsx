import Link from "next/link";
import { projects, type Project } from "@/data/resume";
import Section from "./Section";

const cardClass =
  "group flex flex-col rounded-lg border border-border bg-surface p-5 transition";
const linkedCardClass =
  "hover:border-accent hover:shadow-[0_0_20px_-5px_var(--color-accent)]";

const isInternal = (p: Project) => p.link?.startsWith("/") ?? false;

function CardBody({ p }: { p: Project }) {
  const text = (
    <div className="flex flex-1 flex-col">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className={`font-semibold ${p.link ? "group-hover:text-accent" : ""}`}>{p.name}</h3>
        <span className="shrink-0 font-mono text-xs text-muted">{p.date}</span>
      </div>
      <ul className="mt-3 flex-1 space-y-2 text-[15px] text-foreground/90">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2 font-mono text-[13px] text-accent">
        {p.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {p.link && (
        <p className="mt-4 font-mono text-xs text-muted group-hover:text-accent">
          {isInternal(p) ? "read case study →" : "view code ↗"}
        </p>
      )}
    </div>
  );
  if (!p.featured) return text;
  return (
    <div className="grid gap-5 sm:grid-cols-[2fr_3fr]">
      {/* Animated WebP: a plain <img> keeps it animating at its real size. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.featured.image}
        alt={p.featured.alt}
        width={360}
        height={270}
        loading="lazy"
        className="h-auto w-full rounded-md border border-border bg-background"
      />
      {text}
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => {
          const className = `${cardClass} ${p.link ? linkedCardClass : ""} ${p.featured ? "sm:col-span-2" : ""}`;
          if (isInternal(p)) {
            return (
              <Link key={p.name} href={p.link!} className={className}>
                <CardBody p={p} />
              </Link>
            );
          }
          if (p.link) {
            return (
              <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" className={className}>
                <CardBody p={p} />
              </a>
            );
          }
          return (
            <div key={p.name} className={className}>
              <CardBody p={p} />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
