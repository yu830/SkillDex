import type { FilterState, ProjectCardData, SkillCardData } from '../data/schema';

export const ALL_VALUE = 'all';

export function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export function getSkillCategories(skills: SkillCardData[]): string[] {
  return uniqueSorted(skills.map((skill) => skill.category));
}

export function getTags(skills: SkillCardData[], projects: ProjectCardData[]): string[] {
  return uniqueSorted([...skills.flatMap((skill) => skill.tags), ...projects.flatMap((project) => project.tags)]);
}

export function getTools(skills: SkillCardData[]): string[] {
  return uniqueSorted(skills.flatMap((skill) => skill.tools));
}

export function skillMatchesFilters(skill: SkillCardData, filters: FilterState): boolean {
  const query = filters.query.trim().toLowerCase();
  const queryMatches =
    !query ||
    [skill.name, skill.summary, skill.category, ...skill.tags, ...skill.tools]
      .join(' ')
      .toLowerCase()
      .includes(query);

  return (
    queryMatches &&
    (filters.category === ALL_VALUE || skill.category === filters.category) &&
    (filters.tag === ALL_VALUE || skill.tags.includes(filters.tag)) &&
    (filters.risk === ALL_VALUE || skill.risk_level === filters.risk) &&
    (filters.tool === ALL_VALUE || skill.tools.includes(filters.tool))
  );
}

export function projectMatchesFilters(project: ProjectCardData, filters: FilterState): boolean {
  const query = filters.query.trim().toLowerCase();
  const queryMatches =
    !query ||
    [project.name, project.summary, project.status, ...project.tags].join(' ').toLowerCase().includes(query);

  return (
    queryMatches &&
    filters.category === ALL_VALUE &&
    (filters.tag === ALL_VALUE || project.tags.includes(filters.tag)) &&
    filters.risk === ALL_VALUE &&
    filters.tool === ALL_VALUE
  );
}
