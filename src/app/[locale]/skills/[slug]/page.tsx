import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/CopyButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { StatusBadge } from "@/components/StatusBadge";
import { Tag } from "@/components/Tag";
import { getAllSkills, getCategoryLabel, getLocalizedText, getSkillBySlug, getSourceTypeLabel, getToolScopeLabel, isLocale, LOCALES } from "@/lib/skills";
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
    metaTool: "Tool scope",
    metaOwnership: "Ownership",
    metaCategory: "Category",
    metaLicense: "License",
    metaReviewed: "Reviewed",
  },
  zh: {
    overview: "\u6982\u89c8",
    capabilities: "\u8fd9\u4e2a Skill \u53ef\u4ee5\u505a\u4ec0\u4e48",
    useCases: "\u6700\u4f73\u4f7f\u7528\u573a\u666f",
    antiUseCases: "\u4e0d\u9002\u5408",
    inputs: "\u8f93\u5165",
    outputs: "\u8f93\u51fa",
    prompts: "\u5b89\u5168\u793a\u4f8b\u63d0\u793a\u8bcd",
    install: "\u5b89\u88c5 / \u4f7f\u7528",
    compatibility: "\u517c\u5bb9\u6027",
    source: "\u6765\u6e90\u5143\u6570\u636e",
    back: "\u8fd4\u56de Skills",
    copyPrompt: "\u590d\u5236\u63d0\u793a\u8bcd",
    copySource: "\u590d\u5236\u6765\u6e90 URL",
    copyUsage: "\u590d\u5236\u4f7f\u7528\u63d0\u793a",
    metaTool: "\u5de5\u5177\u8303\u56f4",
    metaOwnership: "\u5f52\u5c5e",
    metaCategory: "\u5206\u7c7b",
    metaLicense: "\u8bb8\u53ef\u8bc1",
    metaReviewed: "\u5df2\u5ba1\u9605",
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
  const toolLabels = skill.toolScopes.map((scope) => getToolScopeLabel(scope, locale));
  const ownershipLabel = getSourceTypeLabel(skill.sourceType, locale);
  const compatibilityToolLabels = skill.compatibility.tools.map((tool) => getToolScopeLabel(tool, locale));

  return (
    <main className="editorial-shell mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-4 py-4 text-[var(--ink)] sm:px-6 sm:py-6 lg:px-8">
      <div className="border border-[var(--line)] bg-[var(--paper)]">
        <header className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-5 border-b border-[var(--line)] px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link href={`/${locale}`} className="font-serif text-2xl font-normal leading-none tracking-[-0.035em] text-[var(--ink)]">
            SkillDex
          </Link>
          <nav className="order-3 col-span-2 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--muted-ink)] lg:order-none lg:col-span-1">
            <Link href={`/${locale}/skills`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              &larr; {text.back}
            </Link>
          </nav>
          <div className="justify-self-end">
            <LanguageSwitcher locale={locale} path={`/skills/${skill.slug}`} />
          </div>
        </header>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(0,8fr)_minmax(280px,4fr)]">
          <div className="border-[var(--line)] px-5 py-10 sm:px-8 sm:py-14 lg:border-r">
            <div className="mb-8 flex flex-wrap gap-2">
              {toolLabels.map((label) => (
                <Tag key={label}>{label}</Tag>
              ))}
              <Tag>{ownershipLabel}</Tag>
              <Tag>{getCategoryLabel(skill.categoryId, locale)}</Tag>
              <StatusBadge status={skill.status} />
            </div>
            <h1 className="max-w-5xl font-serif text-[4.25rem] font-normal leading-[1.02] tracking-[-0.055em] text-[var(--ink)] sm:text-[5.75rem] sm:leading-[0.98] lg:text-[8rem] lg:leading-[0.95]">
              {skill.name}
            </h1>
            <p className="mt-10 max-w-3xl text-lg leading-8 tracking-[-0.01em] text-[var(--muted-ink)] sm:text-xl">
              {getLocalizedText(skill.summary, locale)}
            </p>
          </div>

          <aside className="grid bg-[var(--paper-soft)]">
            <MetaBlock label={text.metaTool} value={toolLabels.join(", ")} />
            <MetaBlock label={text.metaOwnership} value={ownershipLabel} />
            <MetaBlock label={text.metaCategory} value={getCategoryLabel(skill.categoryId, locale)} />
            <MetaBlock label={text.metaLicense} value={skill.source.license} href={skill.source.licenseUrl} />
            <MetaBlock label={text.metaReviewed} value={skill.lastReviewedAt} />
          </aside>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.overview} />
          <div className="px-5 py-8 sm:px-8">
            <p className="max-w-4xl text-xl leading-9 tracking-[-0.015em] text-[var(--muted-ink)]">
              {getLocalizedText(skill.description, locale)}
            </p>
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-2">
          <ListSection title={text.capabilities} items={skill.capabilities} locale={locale} />
          <ListSection title={text.useCases} items={skill.useCases} locale={locale} />
          <ListSection title={text.antiUseCases} items={skill.antiUseCases} locale={locale} />
          <ListSection title={text.inputs} items={skill.inputs} locale={locale} />
          <ListSection title={text.outputs} items={skill.outputs} locale={locale} />
          <section className="border-b border-[var(--line)] px-5 py-8 sm:px-8 lg:border-r lg:[&:nth-child(even)]:border-r-0">
            <h2 className="font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)] lg:text-[3.25rem] lg:leading-[0.96]">
              {text.compatibility}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-[var(--muted-ink)]">
              <p>
                <strong className="font-medium text-[var(--ink)]">Tools:</strong> {compatibilityToolLabels.join(", ")}
              </p>
              <p>
                <strong className="font-medium text-[var(--ink)]">Environments:</strong> {skill.compatibility.environments.join(", ")}
              </p>
              <ul className="space-y-3">
                {skill.compatibility.requirements.map((item) => (
                  <li key={item.en} className="border-t border-[var(--line-soft)] pt-3">
                    {getLocalizedText(item, locale)}
                  </li>
                ))}
              </ul>
              {skill.compatibility.notes ? <p>{getLocalizedText(skill.compatibility.notes, locale)}</p> : null}
            </div>
          </section>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.prompts} />
          <div className="grid gap-0">
            {skill.examplePrompts.map((example) => (
              <article key={example.title.en} className="border-b border-[var(--line)] px-5 py-7 last:border-b-0 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h3 className="max-w-2xl font-serif text-3xl font-normal leading-none tracking-[-0.03em] text-[var(--ink)]">
                    {getLocalizedText(example.title, locale)}
                  </h3>
                  <CopyButton text={getLocalizedText(example.prompt, locale)} label={text.copyPrompt} />
                </div>
                <p className="mt-5 max-w-4xl text-sm leading-6 text-[var(--muted-ink)]">{getLocalizedText(example.prompt, locale)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-2">
          <div className="min-w-0 border-b border-[var(--line)] px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r">
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
              <h2 className="min-w-0 font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)] lg:text-[3.25rem] lg:leading-[0.96]">
                {text.install}
              </h2>
              {skill.install.copyableText ? <CopyButton text={skill.install.copyableText} label={text.copyUsage} /> : null}
            </div>
            <p className="mt-6 max-w-full font-medium text-[var(--ink)]">{getLocalizedText(skill.install.label, locale)}</p>
            <ol className="mt-5 grid gap-3 text-sm leading-6 text-[var(--muted-ink)]">
              {skill.install.steps.map((step, index) => (
                <li key={step.en} className="grid grid-cols-[2.5rem_1fr] border-t border-[var(--line-soft)] pt-3">
                  <span className="font-mono text-xs text-[var(--muted-ink)]">{index + 1}</span>
                  <span>{getLocalizedText(step, locale)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0 px-5 py-8 sm:px-8">
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
              <h2 className="min-w-0 font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)] lg:text-[3.25rem] lg:leading-[0.96]">
                {text.source}
              </h2>
              <CopyButton text={skill.source.directoryUrl} label={text.copySource} />
            </div>
            <dl className="mt-6 grid min-w-0 gap-5 text-sm text-[var(--muted-ink)]">
              <Meta label="Author" value={skill.source.author} />
              <Meta label="Repository" value={skill.source.repoUrl} href={skill.source.repoUrl} />
              <Meta label="Directory" value={skill.source.directoryUrl} href={skill.source.directoryUrl} />
              <Meta label="License" value={skill.source.license} href={skill.source.licenseUrl} />
              <Meta label="Indexed" value={skill.indexedAt} />
              <Meta label="Reviewed" value={skill.lastReviewedAt} />
            </dl>
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 bg-[var(--paper-soft)] px-5 py-6 sm:px-8">
          {skill.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </footer>
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
    <section className="border-b border-[var(--line)] px-5 py-8 sm:px-8 lg:border-r lg:[&:nth-child(even)]:border-r-0">
      <h2 className="font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)] lg:text-[3.25rem] lg:leading-[0.96]">{title}</h2>
      <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--muted-ink)]">
        {items.map((item) => (
          <li key={item.en} className="border-t border-[var(--line-soft)] pt-3">
            {getLocalizedText(item, locale)}
          </li>
        ))}
      </ul>
    </section>
  );
}

type SectionKickerProps = {
  title: string;
};

function SectionKicker({ title }: SectionKickerProps) {
  return (
    <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8 lg:border-b-0 lg:border-r">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{title}</p>
    </div>
  );
}

type MetaBlockProps = {
  label: string;
  value: string;
  href?: string;
};

function MetaBlock({ label, value, href }: MetaBlockProps) {
  return (
    <div className="border-b border-[var(--line)] px-5 py-6 last:border-b-0 sm:px-8">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{label}</p>
      <p className="mt-4 break-words font-serif text-3xl font-normal leading-none tracking-[-0.025em] text-[var(--ink)]">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]">
            {value}
          </a>
        ) : (
          value
        )}
      </p>
    </div>
  );
}

type MetaProps = {
  label: string;
  value: string;
  href?: string;
};

function Meta({ label, value, href }: MetaProps) {
  return (
    <div className="min-w-0 border-t border-[var(--line-soft)] pt-3">
      <dt className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{label}</dt>
      <dd className="mt-2 min-w-0 break-all font-medium text-[var(--ink)]">
        {href ? (
          <a className="underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]" href={href} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
