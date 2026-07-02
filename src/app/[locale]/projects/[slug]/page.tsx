import Link from "next/link";
import { notFound } from "next/navigation";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Tag } from "@/components/Tag";
import { getProjectEvidenceBySlug, getProjectRelatedSkills, getProjectStaticParams } from "@/lib/projects";
import { getCategoryLabel, getLocalizedText, getSkillPath, getSourceTypeLabel, getToolScopeLabel, isLocale } from "@/lib/skills";
import type { EvidenceArtifact, Locale, LocalizedText, Skill } from "@/types/skill";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

const copy = {
  en: {
    projects: "Projects",
    home: "Home",
    skills: "Skills",
    back: "Back to projects",
    summary: "Summary",
    problem: "Problem",
    approach: "Approach",
    evidence: "Evidence artifacts",
    boundary: "Proof boundary",
    relatedSkills: "Related skills",
    relatedSkillsNote:
      "Related skills are navigation and workflow-capability links. They do not replace evidence artifacts and should not be read as proof that a project is shipped.",
    nextSteps: "Next steps",
    tags: "Tags",
    status: "Status",
    evidenceStatus: "Evidence status",
    updated: "Updated",
    verified: "Evidence reviewed",
    tools: "Tool scope",
    missingProof:
      "Missing public proof stays visible here as TBD, pending, planned, prototype, research, or note-style evidence. SkillDex does not turn unverified artifacts into proof links.",
    noHref: "No verified URL attached",
  },
  zh: {
    projects: "\u9879\u76ee",
    home: "\u9996\u9875",
    skills: "Skills",
    back: "\u8fd4\u56de\u9879\u76ee",
    summary: "\u6458\u8981",
    problem: "\u95ee\u9898",
    approach: "\u65b9\u6cd5",
    evidence: "\u8bc1\u636e\u6761\u76ee",
    boundary: "\u8bc1\u636e\u8fb9\u754c",
    relatedSkills: "\u76f8\u5173 Skills",
    relatedSkillsNote:
      "\u76f8\u5173 Skills \u4ec5\u8868\u793a\u5bfc\u822a\u548c\u5de5\u4f5c\u6d41\u80fd\u529b\u6620\u5c04\uff0c\u4e0d\u80fd\u66ff\u4ee3 evidence artifacts\uff0c\u4e5f\u4e0d\u4ee3\u8868\u9879\u76ee\u5df2\u4ea4\u4ed8\u3002",
    nextSteps: "\u4e0b\u4e00\u6b65",
    tags: "\u6807\u7b7e",
    status: "\u72b6\u6001",
    evidenceStatus: "\u8bc1\u636e\u72b6\u6001",
    updated: "\u66f4\u65b0",
    verified: "\u8bc1\u636e\u590d\u6838",
    tools: "\u5de5\u5177\u8303\u56f4",
    missingProof:
      "\u7f3a\u5c11\u516c\u5f00\u8bc1\u636e\u7684\u90e8\u5206\u4f1a\u4ee5 TBD\u3001pending\u3001planned\u3001prototype\u3001research \u6216 note \u5f62\u5f0f\u4fdd\u7559\u3002SkillDex \u4e0d\u4f1a\u628a\u672a\u9a8c\u8bc1\u7684\u4ea7\u7269\u5199\u6210 proof \u94fe\u63a5\u3002",
    noHref: "\u672a\u9644\u5df2\u9a8c\u8bc1 URL",
  },
};

export function generateStaticParams() {
  return getProjectStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectEvidenceBySlug(slug);

  return {
    title: project ? `${project.name} | SkillDex Project Evidence` : "Project not found | SkillDex",
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const project = getProjectEvidenceBySlug(slug);
  if (!project) notFound();

  const locale = rawLocale as Locale;
  const text = copy[locale];
  const toolLabels = project.toolScopes.map((scope) => getToolScopeLabel(scope, locale));
  const relatedSkills = getProjectRelatedSkills(project);

  return (
    <main className="editorial-shell mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-4 py-4 text-[var(--ink)] sm:px-6 sm:py-6 lg:px-8">
      <div className="border border-[var(--line)] bg-[var(--paper)]">
        <header className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-5 border-b border-[var(--line)] px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link href={`/${locale}`} className="font-serif text-2xl font-normal leading-none tracking-[-0.035em] text-[var(--ink)]">
            SkillDex
          </Link>
          <nav className="order-3 col-span-2 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--muted-ink)] lg:order-none lg:col-span-1">
            <Link href={`/${locale}/projects`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              &larr; {text.back}
            </Link>
            <Link href={`/${locale}/skills`} className="underline-offset-4 hover:text-[var(--ink)] hover:underline">
              {text.skills}
            </Link>
          </nav>
          <div className="justify-self-end">
            <LanguageSwitcher locale={locale} path={`/projects/${project.slug}`} />
          </div>
        </header>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(0,8fr)_minmax(280px,4fr)]">
          <div className="border-[var(--line)] px-5 py-10 sm:px-8 sm:py-14 lg:border-r">
            <div className="mb-8 flex flex-wrap gap-2">
              <Tag>{project.evidence.status}</Tag>
              {toolLabels.map((label) => (
                <Tag key={label}>{label}</Tag>
              ))}
              <Tag>{project.updatedAt}</Tag>
            </div>
            <p className="mb-8 inline-flex border border-[var(--line)] px-3 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--ink)]">
              {text.projects}
            </p>
            <h1 className="max-w-5xl font-serif text-[4.25rem] font-normal leading-[1.02] tracking-[-0.055em] text-[var(--ink)] sm:text-[5.75rem] sm:leading-[0.98] lg:text-[8rem] lg:leading-[0.95]">
              {project.name}
            </h1>
            <p className="mt-10 max-w-3xl text-lg leading-8 tracking-[-0.01em] text-[var(--muted-ink)] sm:text-xl">
              {getLocalizedText(project.summary, locale)}
            </p>
          </div>

          <aside className="grid bg-[var(--paper-soft)]">
            <MetaBlock label={text.evidenceStatus} value={project.evidence.status} />
            <MetaBlock label={text.tools} value={toolLabels.join(", ")} />
            <MetaBlock label={text.updated} value={project.updatedAt} />
            {project.evidence.lastVerified ? <MetaBlock label={text.verified} value={project.evidence.lastVerified} /> : null}
          </aside>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.summary} />
          <div className="px-5 py-8 sm:px-8">
            <ul className="grid gap-3 text-sm leading-6 text-[var(--muted-ink)]">
              {project.highlights.map((highlight) => (
                <li key={highlight.en} className="border-t border-[var(--line-soft)] pt-3 first:border-t-0 first:pt-0">
                  {getLocalizedText(highlight, locale)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-2">
          <ListSection title={text.problem} items={project.problem} locale={locale} />
          <ListSection title={text.approach} items={project.approach} locale={locale} />
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.evidence} />
          <div className="px-5 py-8 sm:px-8">
            <div className="flex flex-wrap gap-2">
              <Tag>{project.evidence.status}</Tag>
              {project.evidence.lastVerified ? <Tag>{project.evidence.lastVerified}</Tag> : null}
            </div>
            <ul className="mt-6 grid gap-4 text-sm leading-6 text-[var(--muted-ink)]">
              {(project.evidence.artifacts ?? []).map((artifact) => (
                <EvidenceArtifactItem key={`${artifact.kind}-${artifact.label}`} artifact={artifact} locale={locale} noHrefLabel={text.noHref} />
              ))}
            </ul>
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.boundary} />
          <div className="px-5 py-8 sm:px-8">
            <p className="max-w-4xl text-sm leading-7 text-[var(--muted-ink)]">{text.missingProof}</p>
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.relatedSkills} />
          <div className="px-5 py-8 sm:px-8">
            <p className="max-w-4xl text-sm leading-7 text-[var(--muted-ink)]">{text.relatedSkillsNote}</p>
            <ul className="mt-6 grid gap-4">
              {relatedSkills.map((skill) => (
                <RelatedSkillItem key={skill.slug} skill={skill} locale={locale} />
              ))}
            </ul>
          </div>
        </section>

        <section className="grid border-b border-[var(--line)] lg:grid-cols-[minmax(220px,4fr)_minmax(0,8fr)]">
          <SectionKicker title={text.nextSteps} />
          <div className="px-5 py-8 sm:px-8">
            <ul className="grid gap-3 text-sm leading-6 text-[var(--muted-ink)]">
              {project.nextSteps.map((step) => (
                <li key={step.en} className="border-t border-[var(--line-soft)] pt-3 first:border-t-0 first:pt-0">
                  {getLocalizedText(step, locale)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-4 bg-[var(--paper-soft)] px-5 py-6 text-sm text-[var(--muted-ink)] sm:px-8 md:flex-row">
          <Link href={`/${locale}/projects`} className="font-medium text-[var(--ink)] underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]">
            &larr; {text.back}
          </Link>
          <div className="flex flex-wrap gap-2 md:justify-end" aria-label={text.tags}>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}

type RelatedSkillItemProps = {
  skill: Skill;
  locale: Locale;
};

function RelatedSkillItem({ skill, locale }: RelatedSkillItemProps) {
  return (
    <li className="border-t border-[var(--line-soft)] pt-4">
      <div className="flex flex-wrap gap-2">
        <Tag>{skill.status}</Tag>
        <Tag>{getCategoryLabel(skill.categoryId, locale)}</Tag>
        <Tag>{getSourceTypeLabel(skill.sourceType, locale)}</Tag>
      </div>
      <Link
        href={getSkillPath(locale, skill.slug)}
        className="mt-4 inline-block font-serif text-2xl font-normal leading-snug tracking-normal text-[var(--ink)] underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]"
      >
        {skill.name}
      </Link>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted-ink)]">{getLocalizedText(skill.summary, locale)}</p>
    </li>
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

type ListSectionProps = {
  title: string;
  items: LocalizedText[];
  locale: Locale;
};

function ListSection({ title, items, locale }: ListSectionProps) {
  return (
    <section className="border-b border-[var(--line)] px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:[&:nth-child(even)]:border-r-0">
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

type EvidenceArtifactItemProps = {
  artifact: EvidenceArtifact;
  locale: Locale;
  noHrefLabel: string;
};

function EvidenceArtifactItem({ artifact, locale, noHrefLabel }: EvidenceArtifactItemProps) {
  const href = normalizeInternalHref(artifact.href, locale);
  const isInternalHref = href?.startsWith("/");

  return (
    <li className="border-t border-[var(--line-soft)] pt-4">
      <p className="font-medium text-[var(--ink)]">
        {href ? (
          <a
            className="underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]"
            href={href}
            target={isInternalHref ? undefined : "_blank"}
            rel={isInternalHref ? undefined : "noreferrer"}
          >
            {artifact.label}
          </a>
        ) : (
          artifact.label
        )}
        <span className="ml-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted-ink)]">{artifact.kind}</span>
      </p>
      {artifact.summary ? <p className="mt-2">{artifact.summary}</p> : null}
      {!artifact.href ? <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted-ink)]">{noHrefLabel}</p> : null}
    </li>
  );
}

function normalizeInternalHref(href: string | undefined, locale: Locale) {
  if (!href?.startsWith("/")) return href;

  return href.replace(/^\/(?:en|zh)\//, `/${locale}/`);
}

type MetaBlockProps = {
  label: string;
  value: string;
};

function MetaBlock({ label, value }: MetaBlockProps) {
  return (
    <div className="border-b border-[var(--line)] px-5 py-6 last:border-b-0 sm:px-8">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{label}</p>
      <p className="mt-4 break-words font-serif text-3xl font-normal leading-none tracking-[-0.025em] text-[var(--ink)]">{value}</p>
    </div>
  );
}
