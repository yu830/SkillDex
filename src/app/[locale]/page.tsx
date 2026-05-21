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
    title: "SkillDex keeps Claude Code and Codex Skills easy to browse, filter, and reuse safely.",
    intro:
      "A static, reference-only archive for real Skills. Browse source-grounded summaries, compatibility notes, licenses, and safe prompt starters without executing anything online.",
    skillsLink: "Browse skills",
    aboutLink: "Read policy",
    total: "Total Skills",
    tools: "Tool scopes",
    categories: "Categories",
    notice: "No login, database, API keys, ChatGPT Skills, local scanning, or full third-party Skill text.",
  },
  zh: {
    eyebrow: "个人 AI Skills Hub",
    title: "SkillDex 让 Claude Code 和 Codex Skills 更易浏览、筛选和安全复用。",
    intro: "一个静态、仅供参考的真实 Skills 档案。浏览基于来源的摘要、兼容性、许可证和安全提示词，不在线执行任何 Skill。",
    skillsLink: "浏览 Skills",
    aboutLink: "查看政策",
    total: "Skills 总数",
    tools: "工具范围",
    categories: "分类",
    notice: "无登录、数据库、API Key、ChatGPT Skills、本地扫描或第三方 Skill 全文。",
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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link href={`/${locale}`} className="font-mono text-sm font-black uppercase tracking-[0.22em] text-stone-950">
          SkillDex
        </Link>
        <nav className="flex items-center gap-3">
          <Link href={`/${locale}/skills`} className="text-sm font-semibold text-stone-700 hover:text-stone-950">
            {text.skillsLink}
          </Link>
          <Link href={`/${locale}/about`} className="text-sm font-semibold text-stone-700 hover:text-stone-950">
            {text.aboutLink}
          </Link>
          <LanguageSwitcher locale={locale} path="" />
        </nav>
      </header>

      <section className="grid gap-6 rounded-[2rem] border border-stone-400 bg-[#fff8e6]/85 p-6 shadow-[12px_12px_0_rgba(68,52,32,0.14)] lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-stone-800 bg-amber-200 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-stone-950">
            {text.eyebrow}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-stone-950 sm:text-6xl">{text.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">{text.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/skills`} className="rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-amber-50 transition hover:bg-stone-800">
              {text.skillsLink}
            </Link>
            <Link href={`/${locale}/about`} className="rounded-full border border-stone-900 px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-100">
              {text.aboutLink}
            </Link>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-dashed border-stone-400 bg-[#f3e3bd]/80 p-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-stone-500">{text.total}</p>
          <p className="mt-2 text-6xl font-black text-stone-950">{skills.length}</p>
          <div className="mt-6 grid gap-4">
            <div>
              <p className="mb-2 text-sm font-bold text-stone-700">{text.tools}</p>
              <div className="flex flex-wrap gap-2">
                {toolScopes.map((scope) => (
                  <Tag key={scope}>{scope}</Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-stone-700">{text.categories}</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Tag key={category}>{getCategoryLabel(category, locale)}</Tag>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {skills.slice(0, 3).map((skill) => (
          <Link key={skill.slug} href={`/${locale}/skills/${skill.slug}`} className="rounded-3xl border border-stone-300 bg-[#fff9e8]/80 p-5 transition hover:-translate-y-0.5 hover:border-stone-500">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-stone-500">{skill.toolScope}</p>
            <h2 className="mt-3 text-xl font-black text-stone-950">{skill.name}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">{getLocalizedText(skill.summary, locale)}</p>
          </Link>
        ))}
      </section>

      <p className="rounded-2xl border border-stone-300 bg-amber-50/80 p-4 text-sm font-medium text-stone-700">{text.notice}</p>
    </main>
  );
}
