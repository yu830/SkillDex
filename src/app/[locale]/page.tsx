import Link from "next/link";
import { notFound } from "next/navigation";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Tag } from "@/components/Tag";
import { getAllSkills, getCategories, getCategoryLabel, getLocalizedText, isLocale } from "@/lib/skills";
import type { Locale, ToolScope } from "@/types/skill";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    eyebrow: "Personal AI Skills Hub",
    title: "Skills for agent work, indexed with care.",
    intro:
      "A static, reference-only archive for real Claude Code and Codex Skills. Browse source-grounded summaries, compatibility notes, licenses, and safe prompt starters without executing anything online.",
    skillsLink: "Browse skills",
    aboutLink: "Read policy",
    total: "Total skills",
    tools: "Tool scopes",
    categories: "Categories",
    featured: "Featured skills",
    featuredTitle: "Reusable workflows, shown as a browsable index.",
    archiveLabel: "Reference-only SkillDex archive",
    archiveSummary: "Source-grounded summaries, compatibility notes, licenses, and safe prompt starters",
    boundaryLabel: "Boundary",
    boundaries: ["No login", "No API keys", "No local scanning", "No online execution"],
  },
  zh: {
    eyebrow: "\u4e2a\u4eba AI Skills Hub",
    title: "\u4e3a\u667a\u80fd\u4f53\u5de5\u4f5c\u5efa\u7acb\u4e00\u4efd\u514b\u5236\u3001\u53ef\u9760\u7684 Skill \u7d22\u5f15\u3002",
    intro:
      "\u4e00\u4e2a\u9759\u6001\u3001\u4ec5\u4f9b\u53c2\u8003\u7684\u771f\u5b9e Claude Code \u548c Codex Skills \u6863\u6848\u3002\u6d4f\u89c8\u57fa\u4e8e\u6765\u6e90\u7684\u6458\u8981\u3001\u517c\u5bb9\u6027\u3001\u8bb8\u53ef\u8bc1\u548c\u5b89\u5168\u63d0\u793a\u8bcd\uff0c\u4e0d\u5728\u7ebf\u6267\u884c\u4efb\u4f55 Skill\u3002",
    skillsLink: "\u6d4f\u89c8 Skills",
    aboutLink: "\u67e5\u770b\u653f\u7b56",
    total: "Skills \u603b\u6570",
    tools: "\u5de5\u5177\u8303\u56f4",
    categories: "\u5206\u7c7b",
    featured: "\u7cbe\u9009 Skills",
    featuredTitle: "\u53ef\u590d\u7528\u5de5\u4f5c\u6d41\uff0c\u4ee5\u7d22\u5f15\u5f62\u5f0f\u5448\u73b0\u3002",
    archiveLabel: "\u4ec5\u4f9b\u53c2\u8003\u7684 SkillDex \u6863\u6848",
    archiveSummary: "\u57fa\u4e8e\u6765\u6e90\u7684\u6458\u8981\u3001\u517c\u5bb9\u6027\u8bf4\u660e\u3001\u8bb8\u53ef\u8bc1\u548c\u5b89\u5168\u63d0\u793a\u8bcd",
    boundaryLabel: "\u8fb9\u754c",
    boundaries: ["\u65e0\u767b\u5f55", "\u65e0 API Key", "\u65e0\u672c\u5730\u626b\u63cf", "\u65e0\u5728\u7ebf\u6267\u884c"],
  },
};

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const text = copy[locale];
  const skills = getAllSkills();
  const categories = getCategories();
  const toolScopes = Array.from(new Set(skills.map((skill) => skill.toolScope))) as ToolScope[];

  return (
    <main className="editorial-shell mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-4 py-4 text-[var(--ink)] sm:px-6 sm:py-6 lg:px-8">
      <div className="border border-[var(--line)] bg-[var(--paper)]">
        <header className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-5 border-b border-[var(--line)] px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link href={`/${locale}`} className="font-serif text-2xl font-normal leading-none tracking-[-0.035em] text-[var(--ink)]">
            SkillDex
          </Link>
          <nav className="order-3 col-span-2 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--muted-ink)] lg:order-none lg:col-span-1">
            <Link href={`/${locale}/skills`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.skillsLink}
            </Link>
            <Link href={`/${locale}/about`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.aboutLink}
            </Link>
          </nav>
          <div className="justify-self-end">
            <LanguageSwitcher locale={locale} path="" />
          </div>
        </header>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(0,8fr)_minmax(300px,4fr)]">
          <div className="border-[var(--line)] px-5 py-10 sm:px-8 sm:py-14 lg:border-r">
            <p className="mb-8 inline-flex border border-[var(--line)] px-3 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--ink)]">
              {text.eyebrow}
            </p>
            <h1 className="max-w-6xl font-serif text-[4.25rem] font-normal leading-[1.02] tracking-[-0.055em] text-[var(--ink)] sm:text-[5.75rem] sm:leading-[0.98] lg:text-[8rem] lg:leading-[0.95]">
              {text.title}
            </h1>
            <div className="mt-10 grid items-end gap-8 lg:grid-cols-[minmax(260px,0.58fr)_minmax(260px,0.42fr)]">
              <p className="max-w-3xl text-lg leading-8 tracking-[-0.01em] text-[var(--muted-ink)] sm:text-xl">{text.intro}</p>
              <div className="flex flex-wrap justify-start lg:justify-end">
                <Link href={`/${locale}/skills`} className="border border-[var(--line)] bg-[var(--ink)] px-5 py-4 text-sm font-medium text-[var(--paper)] hover:bg-[var(--clay)] hover:text-[var(--ink)]">
                  {text.skillsLink}
                </Link>
                <Link href={`/${locale}/about`} className="border-y border-r border-[var(--line)] px-5 py-4 text-sm font-medium text-[var(--ink)] hover:bg-[var(--paper-soft)]">
                  {text.aboutLink}
                </Link>
              </div>
            </div>
          </div>

          <aside className="grid bg-[var(--paper-soft)]">
            <div className="border-b border-[var(--line)] px-5 py-8 sm:px-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.total}</p>
              <p className="mt-6 font-serif text-[6.25rem] font-normal leading-[0.85] tracking-[-0.08em] text-[var(--ink)] lg:text-[9rem]">{skills.length}</p>
            </div>
            <div className="border-b border-[var(--line)] px-5 py-6 sm:px-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.tools}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {toolScopes.map((scope) => (
                  <Tag key={scope}>{scope}</Tag>
                ))}
              </div>
            </div>
            <div className="px-5 py-6 sm:px-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.categories}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Tag key={category}>{getCategoryLabel(category, locale)}</Tag>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.featured}</p>
          </div>
          <div className="px-5 py-7 sm:px-8">
            <h2 className="max-w-3xl font-serif text-[2.75rem] font-normal leading-[1] tracking-[-0.045em] text-[var(--ink)] sm:text-[3.75rem] sm:leading-[0.98] lg:text-[4.5rem]">
              {text.featuredTitle}
            </h2>
          </div>
        </section>

        <section aria-label={text.featured}>
          {skills.slice(0, 3).map((skill, index) => (
            <Link
              key={skill.slug}
              href={`/${locale}/skills/${skill.slug}`}
              className="group grid min-h-36 gap-5 border-b border-[var(--line)] px-5 py-7 transition hover:bg-[var(--paper-alt)] sm:px-8 lg:grid-cols-[9rem_minmax(0,1.1fr)_minmax(16rem,0.75fr)_4rem]"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">
                {skill.toolScope} / {getCategoryLabel(skill.categoryId, locale)}
              </p>
              <h3 className="font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)] lg:text-[3.25rem] lg:leading-[0.96]">{skill.name}</h3>
              <p className="max-w-xl text-sm leading-6 text-[var(--muted-ink)]">{getLocalizedText(skill.summary, locale)}</p>
              <span className="flex size-12 items-center justify-center border border-[var(--line)] font-sans text-2xl transition group-hover:translate-x-1" aria-hidden="true">
                {index + 1}
              </span>
            </Link>
          ))}
        </section>

        <section className="grid border-b border-[var(--line)] bg-[var(--paper-soft)] md:grid-cols-4">
          {text.boundaries.map((boundary) => (
            <div key={boundary} className="min-h-36 border-b border-[var(--line)] px-5 py-6 md:border-b-0 md:border-r md:last:border-r-0 sm:px-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.boundaryLabel}</p>
              <p className="mt-5 font-serif text-3xl font-normal leading-none tracking-[-0.025em] text-[var(--ink)]">{boundary}</p>
            </div>
          ))}
        </section>

        <footer className="flex flex-col justify-between gap-4 px-5 py-6 text-sm text-[var(--muted-ink)] sm:px-8 md:flex-row">
          <p>{text.archiveLabel}</p>
          <p className="max-w-2xl md:text-right">{text.archiveSummary}</p>
        </footer>
      </div>
    </main>
  );
}
