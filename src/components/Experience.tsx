import { experience } from "@/data/resume";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" title="experience">
      <ol className="relative border-l border-border">
        {experience.map((job) => (
          <li key={`${job.company}-${job.dates}`} className="mb-10 ml-6 last:mb-0">
            <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-semibold">
                {job.title} <span className="text-accent">@ {job.company}</span>
              </h3>
              <p className="font-mono text-xs text-muted">{job.dates}</p>
            </div>
            <p className="text-sm text-muted">{job.location}</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/90">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-accent" aria-hidden="true">
                    ▹
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
