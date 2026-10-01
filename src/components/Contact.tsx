import { profile } from "@/data/resume";
import Section from "./Section";

const links = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "github", value: profile.github.replace("https://", ""), href: profile.github },
  { label: "linkedin", value: profile.linkedin.replace("https://www.", ""), href: profile.linkedin },
];

export default function Contact() {
  return (
    <Section id="contact" title="contact">
      <p className="mb-6 text-muted">
        Open to internships and new-grad roles. The fastest way to reach me is email.
      </p>
      <ul className="space-y-3 font-mono text-sm">
        {links.map((l) => (
          <li key={l.label} className="flex gap-3">
            <span className="w-20 shrink-0 text-muted">{l.label}</span>
            <a
              href={l.href}
              target={l.label === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="break-all text-accent hover:underline"
            >
              {l.value}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
