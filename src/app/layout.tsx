import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/resume";
import { contact, chatbot } from "@/data/config";
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

export const metadata: Metadata = {
  title: profile.name,
  description: `${profile.name} — ${profile.tagline}. ${profile.education}, ${profile.school}.`,
};

// Shared on every page: nav, footer, status bar, and the terminal.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="font-sans">
        <Nav />
        {children}
        <footer className="pt-10 pb-16 text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </footer>
        <StatusBar />
        <Terminal
          contact={contact}
          chat={{
            enabled: chatbot.enabled,
            maxQuestionChars: chatbot.limits.max_question_chars,
            historyMessages: chatbot.limits.history_messages,
          }}
        />
        <ConsoleGreeting repo={`${contact.github}/my-own-website`} />
      </body>
    </html>
  );
}
