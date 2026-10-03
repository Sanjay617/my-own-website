// Per-visitor and whole-site question limits, counted in Upstash Redis.
// Counting in memory wouldn't work: Vercel runs many short-lived copies of
// the server, each with its own memory. Server-only.
import { createHash } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { chatbot, contact } from "@/data/config";

const { limits } = chatbot;

// Upstash added through Vercel sets the KV_* names; a direct Upstash setup uses UPSTASH_*.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const perVisitor =
  redis &&
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limits.per_visitor_per_hour, "1 h"),
    prefix: "chat:visitor",
  });
const perSite =
  redis &&
  new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(limits.site_per_day, "1 d"),
    prefix: "chat:site",
  });

export type LimitCheck = { ok: true } | { ok: false; status: number; message: string };

/** Identifies a visitor by a hash of their IP, so raw IPs are never stored. */
export function visitorId(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function checkLimits(visitor: string): Promise<LimitCheck> {
  if (!perVisitor || !perSite) {
    // Fine on a laptop; on the live site, refuse rather than run unprotected.
    if (process.env.NODE_ENV === "development") return { ok: true };
    console.error("[chat] Upstash Redis env vars missing; chatbot disabled");
    return { ok: false, status: 503, message: "The chatbot isn't set up yet. Check back soon!" };
  }

  // Check the visitor first so a spammer's blocked questions don't use up the site's daily allowance.
  const visitorLimit = await perVisitor.limit(visitor);
  if (!visitorLimit.success) {
    const minutes = Math.max(1, Math.ceil((visitorLimit.reset - Date.now()) / 60_000));
    return {
      ok: false,
      status: 429,
      message: `You've asked a lot of questions! Try again in ${minutes} min, or email Sanjay at ${contact.email}.`,
    };
  }

  const siteLimit = await perSite.limit("all");
  if (!siteLimit.success) {
    return {
      ok: false,
      status: 429,
      message: `The bot has hit its daily limit. Try again tomorrow, or email Sanjay at ${contact.email}.`,
    };
  }
  return { ok: true };
}
