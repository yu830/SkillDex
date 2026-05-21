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
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-stone-300 bg-[#fff9e8]/85 p-5 shadow-[0_18px_50px_rgba(72,52,28,0.08)] transition hover:-translate-y-0.5 hover:border-stone-500">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{skill.toolScope}</span>
        <StatusBadge status={skill.status} />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-stone-950">{skill.name}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-700">{getLocalizedText(skill.summary, locale)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag>{getCategoryLabel(skill.categoryId, locale)}</Tag>
        {skill.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-stone-300 pt-4 text-sm">
        <span className="font-mono text-stone-500">{skill.source.license}</span>
        <Link className="font-bold text-stone-950 underline decoration-amber-700/40 underline-offset-4 hover:decoration-stone-950" href={`/${locale}/skills/${skill.slug}`}>
          Open card
        </Link>
      </div>
    </article>
  );
}
