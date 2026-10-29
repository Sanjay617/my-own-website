import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 font-mono sm:px-6">
      <p className="text-sm">
        <span className="text-accent">guest@sanjbuilds:~$</span> cd this-page
      </p>
      <p className="mt-2 text-sm text-muted">cd: no such file or directory (404)</p>
      <h1 className="mt-8 text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-muted">The link may be old, or there may be a typo in the address.</p>
      <Link href="/" className="mt-8 self-start text-accent hover:underline">
        cd ~ (back to home)
      </Link>
    </main>
  );
}
