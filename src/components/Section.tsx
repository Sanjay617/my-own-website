// Shared wrapper: gives each section an anchor id and a "// title" heading.
export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-16">
      <h2 className="mb-8 font-mono text-xl text-foreground">
        <span className="text-accent">{"//"}</span> {title}
      </h2>
      {children}
    </section>
  );
}
