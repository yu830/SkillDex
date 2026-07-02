import Link from "next/link";
import { notFound } from "next/navigation";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ProjectEvidenceCard } from "@/components/ProjectEvidenceCard";
import { getAllProjectEvidence } from "@/lib/projects";
import { isLocale } from "@/lib/skills";
import type { Locale } from "@/types/skill";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Project evidence",
    intro: "Portfolio project records, organized by proof state. Missing public proof remains visible as TBD or pending notes.",
    home: "Home",
    skills: "Skills",
    about: "About",
    kicker: "Portfolio",
  },
  zh: {
    title: "\u9879\u76ee\u8bc1\u636e",
    intro: "\u4f5c\u54c1\u9879\u76ee\u8bb0\u5f55\uff0c\u6309\u8bc1\u636e\u72b6\u6001\u5448\u73b0\u3002\u7f3a\u5c11\u516c\u5f00\u8bc1\u636e\u7684\u90e8\u5206\u4fdd\u6301 TBD \u6216 pending \u8bf4\u660e\u3002",
    home: "\u9996\u9875",
    skills: "Skills",
    about: "\u5173\u4e8e",
    kicker: "\u4f5c\u54c1\u96c6",
  },
};

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const text = copy[locale];
  const projects = getAllProjectEvidence();

  return (
    <main className="editorial-shell mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-4 py-4 text-[var(--ink)] sm:px-6 sm:py-6 lg:px-8">
      <div className="border border-[var(--line)] bg-[var(--paper)]">
        <header className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-5 border-b border-[var(--line)] px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link href={`/${locale}`} className="font-serif text-2xl font-normal leading-none tracking-[-0.035em] text-[var(--ink)]">
            SkillDex
          </Link>
          <nav className="order-3 col-span-2 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--muted-ink)] lg:order-none lg:col-span-1">
            <Link href={`/${locale}`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.home}
            </Link>
            <Link href={`/${locale}/skills`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.skills}
            </Link>
            <Link href={`/${locale}/about`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.about}
            </Link>
          </nav>
          <div className="justify-self-end">
            <LanguageSwitcher locale={locale} path="/projects" />
          </div>
        </header>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.kicker}</p>
          </div>
          <div className="px-5 py-10 sm:px-8 sm:py-14">
            <h1 className="max-w-5xl font-serif text-[4.25rem] font-normal leading-[1.02] tracking-[-0.055em] text-[var(--ink)] sm:text-[5.75rem] sm:leading-[0.98] lg:text-[8rem] lg:leading-[0.95]">
              {text.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 tracking-[-0.01em] text-[var(--muted-ink)] sm:text-xl">{text.intro}</p>
          </div>
        </section>

        <section aria-label={text.title} className="grid md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectEvidenceCard key={project.slug} project={project} locale={locale} />
          ))}
        </section>
      </div>
    </main>
  );
}
