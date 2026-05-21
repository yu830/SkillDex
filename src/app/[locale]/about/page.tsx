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
  },
  zh: {
    title: "关于 SkillDex",
    intro: "SkillDex 是一个静态个人档案，用于浏览 Claude Code 和 Codex Skills。它适合公开阅读、学习和复制安全使用提示词，但不在线执行 Skills。",
    includesTitle: "它包含什么",
    includes: ["基于公开来源元数据撰写的原创短摘要。", "工具范围、分类、状态、标签、兼容性和许可证元数据。", "安全示例提示词以及上游 GitHub 来源链接。"],
    excludesTitle: "它有意不做什么",
    excludes: ["无登录系统、数据库、账号或 API Key 处理。", "无在线 Skill 执行或执行按钮。", "无动态本地文件系统扫描或本地路径暴露。", "MVP 不做 GitHub API 同步。", "不包含 ChatGPT Skills。", "不复制第三方 Skill 全文。"],
    policyTitle: "仅供参考的内容政策",
    policy: "初始目录条目都是第三方 reference-only 记录。SkillDex 保存原创摘要和元数据，并链接到公开来源目录以查看完整上游上下文和许可证条款。",
    skills: "浏览 Skills",
  },
};

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const text = copy[locale];

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-stone-300 pb-6">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-stone-500">SkillDex</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl">{text.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700">{text.intro}</p>
        </div>
        <nav className="flex items-center gap-3">
          <Link href={`/${locale}/skills`} className="text-sm font-semibold text-stone-700 hover:text-stone-950">
            {text.skills}
          </Link>
          <LanguageSwitcher locale={locale} path="/about" />
        </nav>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <PolicyCard title={text.includesTitle} items={text.includes} />
        <PolicyCard title={text.excludesTitle} items={text.excludes} />
      </section>

      <section className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-6">
        <h2 className="text-2xl font-black text-stone-950">{text.policyTitle}</h2>
        <p className="mt-3 leading-7 text-stone-700">{text.policy}</p>
      </section>
    </main>
  );
}

type PolicyCardProps = {
  title: string;
  items: string[];
};

function PolicyCard({ title, items }: PolicyCardProps) {
  return (
    <article className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-6">
      <h2 className="text-2xl font-black text-stone-950">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-stone-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
