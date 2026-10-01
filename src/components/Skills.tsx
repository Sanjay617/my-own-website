import { skills } from "@/data/resume";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" title="skills">
      <dl className="space-y-5">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group}>
            <dt className="mb-2 font-mono text-sm text-muted">{group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-border bg-surface px-2.5 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
