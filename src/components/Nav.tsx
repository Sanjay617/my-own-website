const links = ["experience", "projects", "skills", "contact"];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 font-mono text-xs sm:px-6 sm:text-sm">
        <a href="#top" className="text-accent hover:opacity-80">
          ~/sanjay
        </a>
        <ul className="flex gap-3 sm:gap-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                className="text-muted transition-colors hover:text-accent"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
