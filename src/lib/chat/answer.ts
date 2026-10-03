// Asks the main AI, switching to the backup if the main one fails or is too
// slow to start answering. Switching only happens before the first word,
// so a visitor never sees two half-answers. Server-only.
import { streamText, type ModelMessage } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { chatbot, type ProviderConfig } from "@/data/config";
import { instructions } from "./prompt";

const { limits } = chatbot;

// Keys come from Vercel env vars (or .env.local), never from config.yaml.
function languageModel({ provider, model }: ProviderConfig) {
  if (provider === "gemini") {
    const apiKey = process.env.GEMINI_API_KEY;
    return apiKey ? createGoogle({ apiKey })(model) : null;
  }
  const apiKey = process.env.GROQ_API_KEY;
  return apiKey ? createGroq({ apiKey })(model) : null;
}

/** Streams the answer as text. Throws if every AI fails before answering. */
export async function streamAnswer(
  messages: ModelMessage[],
  signal: AbortSignal,
): Promise<ReadableStream<string>> {
  for (const provider of [chatbot.main, chatbot.backup]) {
    const model = languageModel(provider);
    if (!model) {
      console.warn(`[chat] ${provider.provider}: no API key set, skipping`);
      continue;
    }

    const result = streamText({
      model,
      instructions,
      messages,
      // Room for brief reasoning plus an answer of max_answer_words.
      maxOutputTokens: limits.max_answer_words * 2 + 1024,
      reasoning: "low",
      maxRetries: 0, // on failure, switch to the backup instead of waiting on retries
      timeout: { firstChunkMs: limits.first_word_timeout_seconds * 1000, totalMs: 25_000 },
      abortSignal: signal,
    });
    const parts = result.stream[Symbol.asyncIterator]();

    // Wait for the first word, or for a reason to try the next AI.
    let first: string | null = null;
    let failure: unknown = "finished without an answer";
    for (let next = await parts.next(); !next.done; next = await parts.next()) {
      const part = next.value;
      if (part.type === "text-delta" && part.text) {
        first = part.text;
        break;
      }
      if (part.type === "error") {
        failure = part.error;
        break;
      }
      if (part.type === "abort") throw new DOMException("Visitor left", "AbortError");
    }

    if (first === null) {
      await parts.return?.();
      if (signal.aborted) throw new DOMException("Visitor left", "AbortError");
      console.warn(`[chat] ${provider.provider} failed, trying next:`, errorText(failure));
      continue;
    }

    const opening = first;
    return new ReadableStream<string>({
      start(controller) {
        controller.enqueue(opening);
      },
      async pull(controller) {
        const next = await parts.next();
        if (next.done) return controller.close();
        const part = next.value;
        if (part.type === "text-delta") controller.enqueue(part.text);
        else if (part.type === "error") {
          console.warn(`[chat] ${provider.provider} failed mid-answer:`, errorText(part.error));
          controller.enqueue("\n[answer cut off, please ask again]");
          controller.close();
        }
      },
      async cancel() {
        await parts.return?.();
      },
    });
  }
  throw new Error("All AI providers failed");
}

function errorText(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
