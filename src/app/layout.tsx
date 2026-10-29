import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile, skills } from "@/data/resume";
import { site, contact, chatbot } from "@/data/config";
import Nav from "@/components/Nav";
import Terminal from "@/components/Terminal";
import StatusBar from "@/components/StatusBar";
import ConsoleGreeting from "@/components/ConsoleGreeting";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `${profile.name}: ${profile.tagline}. ${profile.education}, ${profile.school}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Sub-pages show as e.g. "World model: ... · Sanjay Subramanian" in the browser tab.
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: profile.name,
    title: profile.name,
    description,
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
};

// Tells Google and AI tools "this site is about this person" (JSON-LD).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  email: `mailto:${contact.email}`,
  jobTitle: profile.tagline,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
  knowsAbout: [...skills.Languages, ...skills.Frameworks],
  sameAs: [contact.github, contact.linkedin],
};

// Set by Vercel at build time; empty when running locally.
const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null;
const built = new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "America/Toronto" });

// Shared on every page: nav, footer, status bar, and the terminal.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Nav />
        {children}
        <footer className="pt-10 pb-16 text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </footer>
        <StatusBar repo={site.repo} commit={commit} built={built} />
        <Terminal
          contact={contact}
          repo={site.repo}
          chat={{
            enabled: chatbot.enabled,
            maxQuestionChars: chatbot.limits.max_question_chars,
            historyMessages: chatbot.limits.history_messages,
          }}
        />
        <ConsoleGreeting repo={site.repo} />
        <Analytics />
      </body>
    </html>
  );
}
