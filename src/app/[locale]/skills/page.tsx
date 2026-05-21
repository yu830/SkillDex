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
    intro: "Search and filter the reference-only MVP catalog. Every card links to the upstream source instead of copying full Skill content.",
    home: "Home",
    about: "About",
  },
  zh: {
    title: "Skill 档案",
    intro: "搜索并筛选仅供参考的 MVP 目录。每张卡片都链接到上游来源，而不是复制完整 Skill 内容。",
    home: "首页",
    about: "关于",
  },
};

export default async function SkillsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const text = copy[locale];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-stone-300 pb-6">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-stone-500">SkillDex</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl">{text.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-700">{text.intro}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-3">
          <Link href={`/${locale}`} className="text-sm font-semibold text-stone-700 hover:text-stone-950">
            {text.home}
          </Link>
          <Link href={`/${locale}/about`} className="text-sm font-semibold text-stone-700 hover:text-stone-950">
            {text.about}
          </Link>
          <LanguageSwitcher locale={locale} path="/skills" />
        </nav>
      </header>
      <SkillsExplorer locale={locale} skills={getAllSkills()} categories={getCategories()} tags={getTags()} />
    </main>
  );
}
