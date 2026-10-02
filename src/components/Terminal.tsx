"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/resume";
import type { Contact } from "@/data/contact";

const OPEN_EVENT = "terminal:open";
const PROMPT = "guest@sanjbuilds:~$";
const SECTIONS = ["experience", "projects", "skills", "contact"];
const COMMANDS = ["help", "whoami", "ls", "cd", ...SECTIONS, "github", "linkedin", "email", "resume", "date", "echo", "clear", "exit"];

const HELP = [
  "  whoami      who I am",
  "  ls          list sections",
  "  cd <dir>    jump to a section (e.g. cd projects)",
  "  github      open my GitHub",
  "  linkedin    open my LinkedIn",
  "  email       send me an email",
  "  resume      open my resume",
  "  date        current date and time",
  "  clear       clear the screen",
  "  exit        close the terminal (or press Esc)",
  "",
  "  tip: ↑/↓ for history, Tab to autocomplete",
];

const WELCOME: Line[] = [
  { kind: "out", text: "sanjbuilds terminal v1.0" },
  { kind: "out", text: "Type 'help' to see available commands." },
];

type Line = { kind: "in" | "out"; text: string };
type Result = { output: string[]; clear?: boolean; close?: boolean; action?: () => void };

export function openTerminal() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function OpenTerminalButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openTerminal} className={className}>
      {children}
    </button>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView();
}

function execute(input: string, contact: Contact): Result {
  const [rawCmd = "", ...args] = input.trim().split(/\s+/);
  const cmd = rawCmd.toLowerCase();
  const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

  if (SECTIONS.includes(cmd)) return { output: [], close: true, action: () => scrollTo(cmd) };

  switch (cmd) {
    case "":
      return { output: [] };
    case "help":
      return { output: HELP };
    case "whoami":
      return { output: [profile.name, profile.tagline, `${profile.education}, ${profile.school}`] };
    case "ls":
      return { output: [SECTIONS.map((s) => `${s}/`).join("  ")] };
    case "cd": {
      const dir = (args[0] ?? "~").replace(/\/$/, "");
      if (dir === "~" || dir === "..") return { output: [], close: true, action: () => scrollTo("top") };
      if (SECTIONS.includes(dir)) return { output: [], close: true, action: () => scrollTo(dir) };
      return { output: [`cd: no such directory: ${dir}`] };
    }
    case "github":
      return { output: [`opening ${contact.github} ...`], action: open(contact.github) };
    case "linkedin":
      return { output: [`opening ${contact.linkedin} ...`], action: open(contact.linkedin) };
    case "email":
      return { output: [`opening mail to ${contact.email} ...`], action: () => (window.location.href = `mailto:${contact.email}`) };
    case "resume":
      return contact.resume
        ? { output: ["opening resume ..."], action: open(contact.resume) }
        : { output: ["resume: not uploaded yet"] };
    case "date":
      return { output: [new Date().toString()] };
    case "echo":
      return { output: [args.join(" ")] };
    case "sudo":
      return { output: ["nice try. this incident will be reported."] };
    case "clear":
      return { output: [], clear: true };
    case "exit":
      return { output: [], close: true };
    default:
      return { output: [`command not found: ${rawCmd}. Type 'help' to see commands.`] };
  }
}

export default function Terminal({ contact }: { contact: Contact }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Open via openTerminal() or the ` key (unless typing in a field).
  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
      if (e.key === "`" && !typing) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else returnFocus.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const close = () => setOpen(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = value;
    setValue("");
    setHistoryIndex(null);
    if (input.trim()) setHistory((h) => [...h, input]);

    const result = execute(input, contact);
    if (result.clear) {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { kind: "in", text: input }, ...result.output.map((text) => ({ kind: "out" as const, text }))]);
    if (result.close) close();
    result.action?.();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown" && historyIndex !== null) {
      e.preventDefault();
      const i = historyIndex + 1;
      setHistoryIndex(i < history.length ? i : null);
      setValue(i < history.length ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [cmd, arg] = value.split(" ");
      const options = arg === undefined ? COMMANDS : cmd === "cd" ? SECTIONS : [];
      const prefix = arg === undefined ? cmd : arg;
      const matches = options.filter((o) => o.startsWith(prefix));
      if (matches.length === 1) setValue(arg === undefined ? `${matches[0]} ` : `cd ${matches[0]}`);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onKeyDown={(e) => e.key === "Escape" && close()}
        onClick={() => inputRef.current?.focus()}
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-surface font-mono text-sm shadow-[0_0_40px_-10px_var(--color-accent)]"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="flex-1 text-center text-xs text-muted">guest@sanjbuilds: ~</span>
          <button type="button" onClick={close} aria-label="Close terminal" className="text-muted hover:text-accent">
            ✕
          </button>
        </div>
        <div className="h-80 overflow-y-auto p-4">
          <div role="log">
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {l.kind === "in" ? (
                  <>
                    <span className="text-accent">{PROMPT}</span> {l.text}
                  </>
                ) : (
                  <span className="text-foreground/90">{l.text}</span>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="flex gap-2">
            <span className="shrink-0 text-accent" aria-hidden="true">
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-foreground caret-accent outline-none"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
