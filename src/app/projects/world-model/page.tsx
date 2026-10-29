import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { worldModel as wm, type Result, type Figure } from "@/data/world-model";
import { contact } from "@/data/config";
import { OpenTerminalButton } from "@/components/Terminal";

export const metadata: Metadata = {
  title: wm.title,
  description: wm.description,
};

const card = "rounded-lg border border-border bg-surface p-5";

function ResultCard({ r, children }: { r: Result; children?: React.ReactNode }) {
  return (
    <article className={card}>
      <p className="font-mono text-2xl text-accent tabular-nums">{r.headline}</p>
      <h3 className="mt-1 font-semibold">{r.title}</h3>
      <p className="mt-3 text-[15px] text-foreground/90">{r.text}</p>
      {r.caveat && (
        <p className="mt-3 border-l-2 border-border pl-3 text-sm text-muted">{r.caveat}</p>
      )}
      {children}
    </article>
  );
}

function FigureImage({ f, priority }: { f: Figure; priority?: boolean }) {
  return (
    <figure>
      {/* unoptimized: an animated WebP and an SVG gain nothing from resizing */}
      <Image
        src={f.src}
        alt={f.alt}
        width={f.width}
        height={f.height}
        unoptimized
        priority={priority}
        className="h-auto w-full rounded-md border border-border bg-background"
      />
      <figcaption className="mt-2 font-mono text-xs text-muted">{f.caption}</figcaption>
    </figure>
  );
}

function Bullets({ items, muted }: { items: React.ReactNode[]; muted?: boolean }) {
  return (
    <ul className={`space-y-3 text-[15px] ${muted ? "text-muted" : "text-foreground/90"}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="font-mono text-accent">&gt;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WorldModelPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="pt-16 pb-4">
        <Link href="/#projects" className="font-mono text-xs text-muted transition-colors hover:text-accent">
          ← projects
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{wm.title}</h1>
        <p className="mt-5 text-foreground/90">{wm.lede}</p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-accent">
          {wm.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {wm.repo && (
          <a
            href={wm.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-mono text-sm text-accent hover:opacity-80"
          >
            view on github →
          </a>
        )}
        <div className="mt-8 sm:max-w-md">
          <FigureImage f={wm.clip} priority />
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {wm.stats.map((s) => (
            <div key={s.value} className="rounded-lg border border-border bg-surface p-4">
              <dt className="font-mono text-xl text-accent tabular-nums">{s.value}</dt>
              <dd className="mt-1 text-xs text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Section id="idea" title="the idea">
        <p className="mb-6 text-foreground/90">{wm.idea}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {wm.parts.map((p) => (
            <article key={p.title} className={card}>
              <p className="font-mono text-xs text-accent">{p.label}</p>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              <p className="mt-2 text-[15px] text-foreground/90">{p.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="results" title="results">
        <div className="space-y-4">
          <ResultCard r={wm.walking}>
            <div className="mt-5">
              <FigureImage f={wm.chart} />
            </div>
          </ResultCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {wm.brainResults.map((r) => (
              <ResultCard key={r.title} r={r} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="built" title="how it's built">
        <Bullets
          items={wm.built.map((b) => (
            <>
              <b className="font-semibold text-foreground">{b.lead}</b> {b.text}
            </>
          ))}
        />
      </Section>

      <Section id="limits" title="honest limits">
        <Bullets items={wm.limits} muted />
      </Section>

      <Section id="next" title="what next">
        <p className="text-foreground/90">Questions about this project, or want to work together?</p>
        <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
          <a
            href={`mailto:${contact.email}`}
            className="rounded border border-accent bg-accent px-4 py-2 text-background transition hover:opacity-90"
          >
            email me
          </a>
          <OpenTerminalButton
            question="tell me more about the world model project"
            className="rounded border border-border px-4 py-2 text-foreground transition hover:border-accent hover:text-accent"
          >
            ask the terminal
          </OpenTerminalButton>
          <Link
            href="/#projects"
            className="rounded border border-border px-4 py-2 text-foreground transition hover:border-accent hover:text-accent"
          >
            other projects
          </Link>
        </div>
      </Section>
    </main>
  );
}
