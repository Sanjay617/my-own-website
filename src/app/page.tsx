import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
