import { projectEvidence } from "#data/projects";
import { LOCALES } from "#lib/skills";
import type { Locale } from "#types/skill";

export function getAllProjectEvidence() {
  return projectEvidence;
}

export function getProjectEvidenceBySlug(slug: string) {
  return projectEvidence.find((project) => project.slug === slug);
}

export function getProjectPath(locale: Locale, slug: string) {
  return `/${locale}/projects/${slug}`;
}

export function getProjectStaticParams() {
  return LOCALES.flatMap((locale) => projectEvidence.map((project) => ({ locale, slug: project.slug })));
}
