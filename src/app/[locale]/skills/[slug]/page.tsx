import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/CopyButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { StatusBadge } from "@/components/StatusBadge";
import { Tag } from "@/components/Tag";
import { getAllSkills, getCategoryLabel, getLocalizedText, getSkillBySlug, isLocale, LOCALES } from "@/lib/skills";
import type { Locale, LocalizedText } from "@/types/skill";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const sectionTitles = {
  en: {
    overview: "Overview",
    capabilities: "What this Skill can do",
    useCases: "Best use cases",
    antiUseCases: "Not suitable for",
    inputs: "Inputs",
    outputs: "Outputs",
    prompts: "Safe example prompts",
    install: "Installation / usage",
    compatibility: "Compatibility",
    source: "Source metadata",
    back: "Back to skills",
    copyPrompt: "Copy prompt",
    copySource: "Copy source URL",
    copyUsage: "Copy usage hint",
  },
  zh: {
    overview: "概览",
    capabilities: "这个 Skill 可以做什么",
    useCases: "最佳使用场景",
    antiUseCases: "不适合",
    inputs: "输入",
    outputs: "输出",
    prompts: "安全示例提示词",
    install: "安装 / 使用",
    compatibility: "兼容性",
    source: "来源元数据",
    back: "返回 Skills",
    copyPrompt: "复制提示词",
    copySource: "复制来源 URL",
    copyUsage: "复制使用提示",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getAllSkills().map((skill) => ({ locale, slug: skill.slug })));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  return {
    title: skill ? `${skill.name} | SkillDex` : "Skill not found | SkillDex",
  };
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  const locale = rawLocale as Locale;
  const text = sectionTitles[locale];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
      <header className="space-y-5 border-b border-dashed border-stone-300 pb-6">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/${locale}/skills`} className="text-sm font-bold text-stone-700 hover:text-stone-950">
            ← {text.back}
          </Link>
          <LanguageSwitcher locale={locale} path={`/skills/${skill.slug}`} />
        </nav>
        <div className="flex flex-wrap gap-2">
          <Tag>{skill.toolScope}</Tag>
          <Tag>{getCategoryLabel(skill.categoryId, locale)}</Tag>
          <StatusBadge status={skill.status} />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-6xl">{skill.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700">{getLocalizedText(skill.summary, locale)}</p>
        </div>
      </header>

      <section className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-6">
        <h2 className="text-2xl font-black text-stone-950">{text.overview}</h2>
        <p className="mt-3 leading-7 text-stone-700">{getLocalizedText(skill.description, locale)}</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <ListSection title={text.capabilities} items={skill.capabilities} locale={locale} />
        <ListSection title={text.useCases} items={skill.useCases} locale={locale} />
        <ListSection title={text.antiUseCases} items={skill.antiUseCases} locale={locale} />
        <ListSection title={text.inputs} items={skill.inputs} locale={locale} />
        <ListSection title={text.outputs} items={skill.outputs} locale={locale} />
        <section className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-5">
          <h2 className="text-xl font-black text-stone-950">{text.compatibility}</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
            <p><strong>Tools:</strong> {skill.compatibility.tools.join(", ")}</p>
            <p><strong>Environments:</strong> {skill.compatibility.environments.join(", ")}</p>
            <ul className="list-disc space-y-2 pl-5">
              {skill.compatibility.requirements.map((item) => (
                <li key={item.en}>{getLocalizedText(item, locale)}</li>
              ))}
            </ul>
            {skill.compatibility.notes ? <p>{getLocalizedText(skill.compatibility.notes, locale)}</p> : null}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-6">
        <h2 className="text-2xl font-black text-stone-950">{text.prompts}</h2>
        <div className="mt-4 grid gap-4">
          {skill.examplePrompts.map((example) => (
            <article key={example.title.en} className="rounded-2xl border border-dashed border-stone-300 bg-amber-50/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-bold text-stone-950">{getLocalizedText(example.title, locale)}</h3>
                <CopyButton text={getLocalizedText(example.prompt, locale)} label={text.copyPrompt} />
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-700">{getLocalizedText(example.prompt, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-stone-950">{text.install}</h2>
            {skill.install.copyableText ? <CopyButton text={skill.install.copyableText} label={text.copyUsage} /> : null}
          </div>
          <p className="mt-3 font-semibold text-stone-800">{getLocalizedText(skill.install.label, locale)}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-stone-700">
            {skill.install.steps.map((step) => (
              <li key={step.en}>{getLocalizedText(step, locale)}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-stone-950">{text.source}</h2>
            <CopyButton text={skill.source.directoryUrl} label={text.copySource} />
          </div>
          <dl className="mt-4 grid gap-3 text-sm text-stone-700">
            <Meta label="Author" value={skill.source.author} />
            <Meta label="Repository" value={skill.source.repoUrl} href={skill.source.repoUrl} />
            <Meta label="Directory" value={skill.source.directoryUrl} href={skill.source.directoryUrl} />
            <Meta label="License" value={skill.source.license} href={skill.source.licenseUrl} />
            <Meta label="Indexed" value={skill.indexedAt} />
            <Meta label="Reviewed" value={skill.lastReviewedAt} />
          </dl>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {skill.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </main>
  );
}

type ListSectionProps = {
  title: string;
  items: LocalizedText[];
  locale: Locale;
};

function ListSection({ title, items, locale }: ListSectionProps) {
  return (
    <section className="rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-5">
      <h2 className="text-xl font-black text-stone-950">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-stone-700">
        {items.map((item) => (
          <li key={item.en}>{getLocalizedText(item, locale)}</li>
        ))}
      </ul>
    </section>
  );
}

type MetaProps = {
  label: string;
  value: string;
  href?: string;
};

function Meta({ label, value, href }: MetaProps) {
  return (
    <div>
      <dt className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-stone-500">{label}</dt>
      <dd className="mt-1 break-words font-medium text-stone-900">
        {href ? (
          <a className="underline decoration-amber-700/40 underline-offset-4 hover:decoration-stone-950" href={href} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
