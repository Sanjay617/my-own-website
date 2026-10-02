"use client";

import { useEffect, useState } from "react";

export type TypedLine = {
  text: string;
  as?: "p" | "h1";
  className?: string;
  prefix?: string; // shown instantly when the line starts, like a shell prompt
  pause?: number; // ms to wait before typing this line
  speed?: number; // ms per character
};

// Types lines out one after another like a terminal session, then fades in
// `children`. Untyped text stays in the layout (invisible) so nothing jumps,
// and screen readers get each full line immediately.
export default function TypedLines({
  lines,
  children,
}: {
  lines: TypedLine[];
  children?: React.ReactNode;
}) {
  const [pos, setPos] = useState({ line: 0, char: 0 });
  const done = pos.line >= lines.length;

  useEffect(() => {
    if (done) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = lines[pos.line];
    const delay = reduce ? 0 : pos.char === 0 ? (current.pause ?? 0) : (current.speed ?? 50);
    const id = setTimeout(() => {
      if (reduce) setPos({ line: lines.length, char: 0 });
      else if (pos.char >= current.text.length) setPos({ line: pos.line + 1, char: 0 });
      else setPos({ line: pos.line, char: pos.char + 1 });
    }, delay);
    return () => clearTimeout(id);
  }, [pos, done, lines]);

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
      <div
        className={
          done
            ? "visible opacity-100 transition-[opacity,visibility] duration-700"
            : "invisible opacity-0"
        }
      >
        {children}
      </div>
    </>
  );
}
