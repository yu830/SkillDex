import Link from "next/link";
import { notFound } from "next/navigation";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { isLocale } from "@/lib/skills";
import type { Locale } from "@/types/skill";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "About SkillDex",
    intro:
      "SkillDex is a static personal archive for browsing Claude Code and Codex Skills. It is designed for public reading, learning, and copying safe usage prompts without executing Skills online.",
    includesTitle: "What it includes",
    includes: [
      "Short original summaries based on public source metadata.",
      "Tool scope, category, status, tags, compatibility, and license metadata.",
      "Safe example prompts and links to upstream GitHub sources.",
    ],
    excludesTitle: "What it intentionally does not do",
    excludes: [
      "No login system, database, accounts, or API-key handling.",
      "No online Skill execution or execution buttons.",
      "No dynamic local filesystem scanning or local path exposure.",
      "No GitHub API sync in the MVP.",
      "No ChatGPT Skills.",
      "No copied full third-party Skill text.",
    ],
    policyTitle: "Reference-only content policy",
    policy:
      "The initial catalog entries are third-party reference-only records. SkillDex stores original summaries and metadata, then links to the public source directories for full upstream context and license terms.",
    skills: "Browse skills",
    home: "Home",
  },
  zh: {
    title: "\u5173\u4e8e SkillDex",
    intro:
      "SkillDex \u662f\u4e00\u4e2a\u9759\u6001\u4e2a\u4eba\u6863\u6848\uff0c\u7528\u4e8e\u6d4f\u89c8 Claude Code \u548c Codex Skills\u3002\u5b83\u9002\u5408\u516c\u5f00\u9605\u8bfb\u3001\u5b66\u4e60\u548c\u590d\u5236\u5b89\u5168\u4f7f\u7528\u63d0\u793a\u8bcd\uff0c\u4f46\u4e0d\u5728\u7ebf\u6267\u884c Skills\u3002",
    includesTitle: "\u5b83\u5305\u542b\u4ec0\u4e48",
    includes: [
      "\u57fa\u4e8e\u516c\u5f00\u6765\u6e90\u5143\u6570\u636e\u64b0\u5199\u7684\u539f\u521b\u77ed\u6458\u8981\u3002",
      "\u5de5\u5177\u8303\u56f4\u3001\u5206\u7c7b\u3001\u72b6\u6001\u3001\u6807\u7b7e\u3001\u517c\u5bb9\u6027\u548c\u8bb8\u53ef\u8bc1\u5143\u6570\u636e\u3002",
      "\u5b89\u5168\u793a\u4f8b\u63d0\u793a\u8bcd\u4ee5\u53ca\u4e0a\u6e38 GitHub \u6765\u6e90\u94fe\u63a5\u3002",
    ],
    excludesTitle: "\u5b83\u6709\u610f\u4e0d\u505a\u4ec0\u4e48",
    excludes: [
      "\u65e0\u767b\u5f55\u7cfb\u7edf\u3001\u6570\u636e\u5e93\u3001\u8d26\u53f7\u6216 API Key \u5904\u7406\u3002",
      "\u65e0\u5728\u7ebf Skill \u6267\u884c\u6216\u6267\u884c\u6309\u94ae\u3002",
      "\u65e0\u52a8\u6001\u672c\u5730\u6587\u4ef6\u7cfb\u7edf\u626b\u63cf\u6216\u672c\u5730\u8def\u5f84\u66b4\u9732\u3002",
      "MVP \u4e0d\u505a GitHub API \u540c\u6b65\u3002",
      "\u4e0d\u5305\u542b ChatGPT Skills\u3002",
      "\u4e0d\u590d\u5236\u7b2c\u4e09\u65b9 Skill \u5168\u6587\u3002",
    ],
    policyTitle: "\u4ec5\u4f9b\u53c2\u8003\u7684\u5185\u5bb9\u653f\u7b56",
    policy:
      "\u521d\u59cb\u76ee\u5f55\u6761\u76ee\u90fd\u662f\u7b2c\u4e09\u65b9\u4ec5\u4f9b\u53c2\u8003\u7684\u8bb0\u5f55\u3002SkillDex \u4fdd\u5b58\u539f\u521b\u6458\u8981\u548c\u5143\u6570\u636e\uff0c\u5e76\u94fe\u63a5\u5230\u516c\u5f00\u6765\u6e90\u76ee\u5f55\u4ee5\u67e5\u770b\u5b8c\u6574\u4e0a\u6e38\u4e0a\u4e0b\u6587\u548c\u8bb8\u53ef\u8bc1\u6761\u6b3e\u3002",
    skills: "\u6d4f\u89c8 Skills",
    home: "\u9996\u9875",
  },
};

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const text = copy[locale];

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
          </nav>
          <div className="justify-self-end">
            <LanguageSwitcher locale={locale} path="/about" />
          </div>
        </header>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">Policy</p>
          </div>
          <div className="px-5 py-10 sm:px-8 sm:py-14">
            <h1 className="max-w-5xl font-serif text-[4.25rem] font-normal leading-[1.02] tracking-[-0.055em] text-[var(--ink)] sm:text-[5.75rem] sm:leading-[0.98] lg:text-[8rem] lg:leading-[0.95]">
              {text.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 tracking-[-0.01em] text-[var(--muted-ink)] sm:text-xl">{text.intro}</p>
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] md:grid-cols-2">
          <PolicySection title={text.includesTitle} items={text.includes} />
          <PolicySection title={text.excludesTitle} items={text.excludes} />
        </section>

        <section className="grid lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{text.policyTitle}</p>
          </div>
          <div className="px-5 py-8 sm:px-8">
            <p className="max-w-4xl text-xl leading-9 tracking-[-0.015em] text-[var(--muted-ink)]">{text.policy}</p>
          </div>
        </section>
      </div>
    </main>
  );
}

type PolicySectionProps = {
  title: string;
  items: string[];
};

function PolicySection({ title, items }: PolicySectionProps) {
  return (
    <article className="border-b border-[var(--line)] px-5 py-8 sm:px-8 md:border-r md:last:border-r-0">
      <h2 className="font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)] lg:text-[3.25rem] lg:leading-[0.96]">{title}</h2>
      <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--muted-ink)]">
        {items.map((item) => (
          <li key={item} className="border-t border-[var(--line-soft)] pt-3">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
