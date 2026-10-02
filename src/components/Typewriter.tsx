"use client";

import { useEffect, useState } from "react";

// Types `text` out one character at a time. Screen readers get the full text.
export default function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(
      () => setCount(reduce ? text.length : count + 1),
      reduce ? 0 : count === 0 ? 400 : 45,
    );
    return () => clearTimeout(id);
  }, [count, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="cursor text-accent">_</span>
      </span>
    </>
  );
}
