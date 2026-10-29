import Link from "next/link";

const links = ["experience", "projects", "skills", "contact"];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 font-mono text-xs sm:px-6 sm:text-sm">
        <Link href="/#top" className="text-accent hover:opacity-80">
          ~/sanjay
        </Link>
        <ul className="flex gap-3 sm:gap-6">
          {links.map((link) => (
            <li key={link}>
              <Link
                href={`/#${link}`}
                className="text-muted transition-colors hover:text-accent"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
