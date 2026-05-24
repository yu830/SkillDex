import Link from "next/link";
import { notFound } from "next/navigation";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getAllSkills, getCategories, getTags, isLocale } from "@/lib/skills";
import type { Locale } from "@/types/skill";

import { SkillsExplorer } from "./SkillsExplorer";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Skill archive",
    intro: "Search and filter the reference-only MVP catalog. Every record links to the upstream source instead of copying full Skill content.",
    home: "Home",
    about: "About",
  },
  zh: {
    title: "Skill \u6863\u6848",
    intro:
      "\u641c\u7d22\u5e76\u7b5b\u9009\u4ec5\u4f9b\u53c2\u8003\u7684 MVP \u76ee\u5f55\u3002\u6bcf\u6761\u8bb0\u5f55\u90fd\u94fe\u63a5\u5230\u4e0a\u6e38\u6765\u6e90\uff0c\u800c\u4e0d\u590d\u5236\u5b8c\u6574 Skill \u5185\u5bb9\u3002",
    home: "\u9996\u9875",
    about: "\u5173\u4e8e",
  },
};

export default async function SkillsPage({ params }: PageProps) {
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
            <Link href={`/${locale}/about`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.about}
            </Link>
          </nav>
          <div className="justify-self-end">
            <LanguageSwitcher locale={locale} path="/skills" />
          </div>
        </header>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">SkillDex</p>
          </div>
          <div className="px-5 py-10 sm:px-8 sm:py-14">
            <h1 className="max-w-5xl font-serif text-[4.25rem] font-normal leading-[1.02] tracking-[-0.055em] text-[var(--ink)] sm:text-[5.75rem] sm:leading-[0.98] lg:text-[8rem] lg:leading-[0.95]">
              {text.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 tracking-[-0.01em] text-[var(--muted-ink)] sm:text-xl">{text.intro}</p>
          </div>
        </section>

        <SkillsExplorer locale={locale} skills={getAllSkills()} categories={getCategories()} tags={getTags()} />
      </div>
    </main>
  );
}
