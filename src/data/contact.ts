// Loads contact.yaml at build time. Server-only: client components receive
// these values as props (import the Contact type with `import type`).
import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";

export type Contact = {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resume?: string;
};

const file = path.join(process.cwd(), "src/data/contact.yaml");
const raw = (parse(readFileSync(file, "utf8")) ?? {}) as Record<string, unknown>;

// Fail the build with a clear message instead of shipping broken links.
for (const key of ["email", "phone", "github", "linkedin"] as const) {
  if (typeof raw[key] !== "string" || !raw[key].trim()) {
    throw new Error(`src/data/contact.yaml: "${key}" must be a non-empty quoted value`);
  }
}
if (raw.resume !== undefined && typeof raw.resume !== "string") {
  throw new Error(`src/data/contact.yaml: "resume" must be a quoted path like "/resume.pdf"`);
}

export const contact = raw as Contact;
