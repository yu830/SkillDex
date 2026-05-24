import Link from "next/link";

import { getCategoryLabel, getLocalizedText } from "@/lib/skills";
import type { Locale, Skill } from "@/types/skill";

import { StatusBadge } from "./StatusBadge";
import { Tag } from "./Tag";

type SkillCardProps = {
  skill: Skill;
  locale: Locale;
};

export function SkillCard({ skill, locale }: SkillCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col gap-5 border-b border-[var(--line)] px-5 py-7 transition hover:bg-[var(--paper-alt)] sm:px-8 md:border-r xl:[&:nth-child(3n)]:border-r-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">{skill.toolScope}</span>
        <StatusBadge status={skill.status} />
      </div>
      <div>
        <h2 className="font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)]">{skill.name}</h2>
        <p className="mt-4 text-sm leading-6 text-[var(--muted-ink)]">{getLocalizedText(skill.summary, locale)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag>{getCategoryLabel(skill.categoryId, locale)}</Tag>
        {skill.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--line-soft)] pt-4 text-sm">
        <span className="font-mono text-xs text-[var(--muted-ink)]">{skill.source.license}</span>
        <Link className="font-medium text-[var(--ink)] underline decoration-[var(--line-soft)] underline-offset-4 hover:decoration-[var(--ink)]" href={`/${locale}/skills/${skill.slug}`}>
          Open card
        </Link>
      </div>
    </article>
  );
}
