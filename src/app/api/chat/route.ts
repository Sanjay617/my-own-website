// POST /api/chat — answers a visitor's question about Sanjay.
// Order: check input → rate limit → ask the AI (main, then backup) → stream text.
// Every reply is plain text so the terminal can show it as-is.
import { z } from "zod";
import { site, chatbot, contact } from "@/data/config";
import { checkLimits, visitorId } from "@/lib/chat/ratelimit";
import { streamAnswer } from "@/lib/chat/answer";

export const maxDuration = 30;

const { limits } = chatbot;

const body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        // Generous cap for earlier answers echoed back; the new question is checked below.
        content: z.string().max(4000),
      }),
    )
    .min(1)
    .max(50),
});

function reply(status: number, message: string) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// Only this site's own pages may use the chatbot, so other websites can't
// spend its free daily allowance. Browsers send these headers on every
// fetch; a script that fakes them still hits the per-visitor limit.
function fromThisSite(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!chatbot.enabled) return reply(404, "The chatbot is turned off.");
  if (!fromThisSite(request)) return reply(403, `The chatbot only answers on ${new URL(site.url).host}.`);

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return reply(400, "That request didn't look right. Try asking again.");

  // Keep only recent history, starting with a visitor message as AI providers expect.
  const messages = parsed.data.messages.slice(-limits.history_messages);
  while (messages[0]?.role === "assistant") messages.shift();
  const question = messages.at(-1);
  if (!question || question.role !== "user" || !question.content.trim()) {
    return reply(400, "Ask a question about Sanjay.");
  }
  if (question.content.length > limits.max_question_chars) {
    return reply(400, `Please keep questions under ${limits.max_question_chars} characters.`);
  }

  try {
    const limit = await checkLimits(visitorId(request));
    if (!limit.ok) return reply(limit.status, limit.message);
  } catch (error) {
    console.error("[chat] rate limit check failed:", error);
    return reply(503, `The bot is busy right now. Try again soon, or email Sanjay at ${contact.email}.`);
  }

  try {
    const answer = await streamAnswer(messages, request.signal);
    return new Response(answer.pipeThrough(new TextEncoderStream()), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (request.signal.aborted) return reply(499, "Cancelled.");
    console.error("[chat] no answer:", error);
    return reply(503, `The bot is napping right now. Try again later, or email Sanjay at ${contact.email}.`);
  }
}
