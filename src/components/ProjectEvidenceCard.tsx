import Link from "next/link";

import { getProjectPath } from "@/lib/projects";
import { getLocalizedText, getToolScopeLabel } from "@/lib/skills";
import type { Locale } from "@/types/skill";
import type { ProjectEvidenceRecord } from "@/types/project";

import { Tag } from "./Tag";

type ProjectEvidenceCardProps = {
  project: ProjectEvidenceRecord;
  locale: Locale;
};

export function ProjectEvidenceCard({ project, locale }: ProjectEvidenceCardProps) {
  return (
    <Link
      href={getProjectPath(locale, project.slug)}
      className="group block min-w-0 border-b border-[var(--line)] px-5 py-7 transition hover:bg-[var(--paper-alt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--ink)] sm:px-8 md:border-r xl:[&:nth-child(3n)]:border-r-0"
    >
      <div className="mb-5 flex flex-wrap gap-2">
        <Tag>{project.evidence.status}</Tag>
        {project.toolScopes.map((scope) => (
          <Tag key={scope}>{getToolScopeLabel(scope, locale)}</Tag>
        ))}
        {project.evidence.lastVerified ? <Tag>{project.evidence.lastVerified}</Tag> : null}
      </div>
      <h3 className="font-serif text-[2.25rem] font-normal leading-[1] tracking-[-0.04em] text-[var(--ink)]">{project.name}</h3>
      <p className="mt-4 text-sm leading-6 text-[var(--muted-ink)]">{getLocalizedText(project.summary, locale)}</p>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-[var(--muted-ink)]">
        {project.highlights.slice(0, 2).map((highlight) => (
          <li key={highlight.en} className="border-t border-[var(--line-soft)] pt-3">
            {getLocalizedText(highlight, locale)}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-5 border-t border-[var(--line-soft)] pt-4 text-sm leading-6 text-[var(--muted-ink)]">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.1em]">Evidence</p>
        <p className="mt-2">{project.evidence.artifacts?.[0]?.summary ?? "Evidence details pending."}</p>
        <p className="mt-3 font-medium text-[var(--ink)] underline decoration-[var(--line-soft)] underline-offset-4 group-hover:decoration-[var(--ink)]">
          Open evidence record
        </p>
      </div>
    </Link>
  );
}
