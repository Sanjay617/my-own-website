"use client";

import { useEffect, useState } from "react";
import { OpenTerminalButton } from "./Terminal";
import { HERO_DONE_EVENT } from "./TypedLines";

const torontoTime = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
});

const item = "flex h-full items-center px-3 transition-colors hover:text-accent";

// VS Code-style status bar pinned to the bottom of the screen. Shows the real
// deployed version (commit) and build date, linked to the code on GitHub.
export default function StatusBar({ repo, commit, built }: { repo: string; commit: string | null; built: string }) {
  // Time is only known in the browser, so it starts empty to match the server render.
  const [time, setTime] = useState<string | null>(null);
  // Nudges the terminal button once, right after the hero finishes typing.
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const tick = () => setTime(torontoTime.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    const onHeroDone = () => setNudge(true);
    window.addEventListener(HERO_DONE_EVENT, onHeroDone, { once: true });
    return () => {
      clearTimeout(first);
      clearInterval(id);
      window.removeEventListener(HERO_DONE_EVENT, onHeroDone);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex h-7 items-center justify-between border-t border-border bg-surface font-mono text-xs text-muted">
      <div className="flex h-full items-center">
        <OpenTerminalButton
          className={`flex h-full items-center bg-accent px-3 text-background transition hover:opacity-90 ${nudge ? "nudge" : ""}`}
        >
          &gt;_ terminal
        </OpenTerminalButton>
        <a href={repo} target="_blank" rel="noopener noreferrer" className={item}>
          ⎇ main
        </a>
        {commit && (
          <a
            href={`${repo}/commit/${commit}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex ${item}`}
            title="The exact code version running on this site"
          >
            ◉ {commit}
          </a>
        )}
      </div>
      <div className="flex h-full items-center">
        <span className="hidden px-3 sm:inline">built {built}</span>
        <span className="px-3">Toronto {time ?? "--:--"}</span>
      </div>
    </div>
  );
}
