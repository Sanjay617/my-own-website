import { profile } from "@/data/resume";
import { contact, chatbot } from "@/data/config";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Terminal from "@/components/Terminal";
import StatusBar from "@/components/StatusBar";
import ConsoleGreeting from "@/components/ConsoleGreeting";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 sm:px-6">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
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
    </>
  );
}
