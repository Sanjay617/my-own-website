"use client";

import { useEffect, useState } from "react";

export type TypedLine = {
  text: string;
  as?: "p" | "h1";
  className?: string;
  prefix?: string; // shown instantly when the line starts, like a shell prompt
  pause?: number; // ms to wait before this line starts
  speed?: number; // ms per character
  instant?: boolean; // print the whole line at once, like a command's output
};

/** Fired once when the typing finishes on a first visit (StatusBar listens). */
export const HERO_DONE_EVENT = "hero:done";
const SEEN_KEY = "hero-typed";

function seenThisSession() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

// Types lines out one after another like a terminal session. Untyped text
// stays in the layout (invisible) so nothing jumps, and screen readers get
// each full line immediately. Any click, key, or scroll finishes it, and it
// doesn't replay on later visits in the same browser session.
export default function TypedLines({ lines }: { lines: TypedLine[] }) {
  const [pos, setPos] = useState({ line: 0, char: 0 });
  const done = pos.line >= lines.length;

  useEffect(() => {
    if (done) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skip = reduce || seenThisSession();
    const current = lines[pos.line];
    const delay = skip ? 0 : pos.char === 0 ? (current.pause ?? 0) : current.instant ? 0 : (current.speed ?? 50);
    const id = setTimeout(() => {
      if (skip) setPos({ line: lines.length, char: 0 });
      else if (pos.char >= current.text.length) setPos({ line: pos.line + 1, char: 0 });
      else setPos({ line: pos.line, char: current.instant ? current.text.length : pos.char + 1 });
    }, delay);
    return () => clearTimeout(id);
  }, [pos, done, lines]);

  useEffect(() => {
    if (done) return;
    const finish = () => setPos({ line: lines.length, char: 0 });
    const events = ["keydown", "pointerdown", "wheel", "touchstart", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, finish, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, finish));
  }, [done, lines.length]);

  useEffect(() => {
    if (!done || seenThisSession()) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(HERO_DONE_EVENT));
  }, [done]);

  return (
    <>
      {lines.map((l, i) => {
        const Tag = l.as ?? "p";
        const typed = i < pos.line ? l.text.length : i === pos.line ? pos.char : 0;
        const started = i <= pos.line;
        const hasCursor = i === pos.line || (done && i === lines.length - 1);
        // Solid cursor while typing, blinking while idle (like a real shell).
        const idle = done || pos.char === 0;
        return (
          <Tag key={i} className={l.className}>
            <span className="sr-only">{l.text}</span>
            <span aria-hidden="true">
              {l.prefix && <span className={`text-accent ${started ? "" : "invisible"}`}>{l.prefix}</span>}
              {l.text.slice(0, typed)}
              {hasCursor && (
                <span className="relative">
                  <span className={`absolute left-0 text-accent ${idle ? "cursor" : ""}`}>_</span>
                </span>
              )}
              <span className="invisible">{l.text.slice(typed)}</span>
            </span>
          </Tag>
        );
      })}
    </>
  );
}
