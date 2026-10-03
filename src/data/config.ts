// Loads config.yaml at build time. Server-only: client components receive
// these values as props (import types with `import type`).
import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";

const text = z.string().trim().min(1);
const count = z.number().int().positive();
const provider = z.object({ provider: z.enum(["gemini", "groq"]), model: text });

const schema = z.object({
  contact: z.object({
    email: text,
    phone: text,
    github: z.url(),
    linkedin: z.url(),
    resume: text.optional(),
  }),
  chatbot: z.object({
    enabled: z.boolean(),
    main: provider,
    backup: provider,
    limits: z.object({
      max_question_chars: count,
      history_messages: count,
      per_visitor_per_hour: count,
      site_per_day: count,
      max_answer_words: count,
      first_word_timeout_seconds: count,
    }),
  }),
});

export type Config = z.infer<typeof schema>;
export type Contact = Config["contact"];
export type Chatbot = Config["chatbot"];
export type ProviderConfig = Chatbot["main"];

const file = path.join(process.cwd(), "src/data/config.yaml");
const parsed = schema.safeParse(parse(readFileSync(file, "utf8")));

// Fail the build with a clear message instead of shipping a broken site.
if (!parsed.success) {
  const problems = parsed.error.issues
    .map((i) => `  - ${i.path.join(".") || "(file)"}: ${i.message}`)
    .join("\n");
  throw new Error(`src/data/config.yaml has problems:\n${problems}`);
}

export const { contact, chatbot } = parsed.data;
