import Link from "next/link";

export default function RootPage() {
  return (
    <main className="editorial-shell mx-auto flex min-h-screen w-full max-w-[900px] flex-col justify-center px-6 py-12 text-[var(--ink)]">
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">SkillDex</p>
      <h1 className="mt-4 font-serif text-5xl font-normal leading-none tracking-[-0.045em] text-[var(--ink)]">Opening the English catalog</h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted-ink)]">
        Continue to{" "}
        <Link href="/en/" className="font-medium text-[var(--ink)] underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]">
          /en/
        </Link>
        .
      </p>
    </main>
  );
}
