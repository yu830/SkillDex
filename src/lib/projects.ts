import { projectEvidence } from "#data/projects";

export function getAllProjectEvidence() {
  return projectEvidence;
}

export function getProjectEvidenceBySlug(slug: string) {
  return projectEvidence.find((project) => project.slug === slug);
}
