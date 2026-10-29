// /llms.txt: a plain-text summary for AI search tools (https://llmstxt.org).
// Built from the same data as the site, so it never goes stale.
import { profile, experience, projects } from "@/data/resume";
import { site, contact } from "@/data/config";

export const dynamic = "force-static";

export function GET() {
  const absolute = (link: string) => (link.startsWith("/") ? `${site.url}${link}` : link);
  const body = [
    `# ${profile.name}`,
    "",
    `> ${profile.tagline}. ${profile.education}, ${profile.school} (${profile.graduation}).`,
    "",
    "## Experience",
    ...experience.map((j) => `- ${j.title}, ${j.company} (${j.dates}): ${j.highlights[0]}`),
    "",
    "## Projects",
    ...projects.map((p) => `- ${p.link ? `[${p.name}](${absolute(p.link)})` : p.name}: ${p.highlights[0]}`),
    "",
    "## Links",
    `- [Website](${site.url})`,
    ...(contact.resume ? [`- [Resume (PDF)](${absolute(contact.resume)})`] : []),
    `- [GitHub](${contact.github})`,
    `- [LinkedIn](${contact.linkedin})`,
    `- Email: ${contact.email}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
