"use client";

import { useEffect, useState } from "react";
import { OpenTerminalButton } from "./Terminal";

const torontoTime = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
});

// VS Code-style status bar pinned to the bottom of the screen.
export default function StatusBar() {
  // Time is only known in the browser, so it starts empty to match the server render.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(torontoTime.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex h-7 items-center justify-between border-t border-border bg-surface font-mono text-xs text-muted">
      <div className="flex h-full items-center">
        <OpenTerminalButton className="flex h-full items-center bg-accent px-3 text-background transition hover:opacity-90">
          &gt;_ terminal
        </OpenTerminalButton>
        <span className="px-3">⎇ main</span>
        <span className="hidden px-3 sm:inline">✓ 0 problems</span>
      </div>
      <div className="flex items-center">
        <span className="px-3">Toronto {time ?? "--:--"}</span>
        <span className="hidden px-3 sm:inline">TypeScript</span>
        <span className="hidden px-3 sm:inline">UTF-8</span>
      </div>
    </div>
  );
}
