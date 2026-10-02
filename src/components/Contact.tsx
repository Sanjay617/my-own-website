import { contact } from "@/data/contact";
import Section from "./Section";

const links = [
  { label: "email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
  { label: "github", value: contact.github.replace(/^https?:\/\/(www\.)?/, ""), href: contact.github, external: true },
  { label: "linkedin", value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: contact.linkedin, external: true },
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
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
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
