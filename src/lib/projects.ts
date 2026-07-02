import { projectEvidence } from "#data/projects";
import { getSkillBySlug, LOCALES } from "#lib/skills";
import type { ProjectEvidenceRecord } from "#types/project";
import type { Locale, Skill } from "#types/skill";

export function getAllProjectEvidence() {
  return projectEvidence;
}

export function getProjectEvidenceBySlug(slug: string) {
  return projectEvidence.find((project) => project.slug === slug);
}

export function getProjectPath(locale: Locale, slug: string) {
  return `/${locale}/projects/${slug}`;
}

export function getProjectRelatedSkills(project: ProjectEvidenceRecord): Skill[] {
  return project.relatedSkillSlugs.map((slug) => {
    const skill = getSkillBySlug(slug);
    if (!skill) {
      throw new Error(`Project ${project.slug} references missing related Skill slug: ${slug}`);
    }

    return skill;
  });
}

export function getProjectStaticParams() {
  return LOCALES.flatMap((locale) => projectEvidence.map((project) => ({ locale, slug: project.slug })));
}
