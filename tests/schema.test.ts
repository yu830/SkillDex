import { describe, expect, it } from 'vitest';
import projects from '../src/data/projects.json';
import skills from '../src/data/skills.json';
import {
  hasRequiredProjectFields,
  hasRequiredSkillFields,
  type ProjectCardData,
  type ProjectStatus,
  type SkillCardData,
} from '../src/data/schema';

const skillData = skills as SkillCardData[];
const projectData = projects as ProjectCardData[];
const allowedProjectStatuses: ProjectStatus[] = ['draft', 'local', 'published', 'archived'];

function duplicateIds(ids: string[]): string[] {
  return ids.filter((id, index) => ids.indexOf(id) !== index);
}

describe('SkillDex data schema', () => {
  it('contains at least 20 total cards', () => {
    expect(skillData.length + projectData.length).toBeGreaterThanOrEqual(20);
  });

  it('has no duplicate ids across skills and projects', () => {
    const duplicates = duplicateIds([...skillData.map((skill) => skill.id), ...projectData.map((project) => project.id)]);

    expect(duplicates).toEqual([]);
  });

  it('has required fields for every skill', () => {
    expect(skillData.every(hasRequiredSkillFields)).toBe(true);
  });

  it('has required fields for every project', () => {
    expect(projectData.every(hasRequiredProjectFields)).toBe(true);
  });

  it('has auditable evidence fields for every project', () => {
    expect(
      projectData.every(
        (project) =>
          allowedProjectStatuses.includes(project.status) &&
          /^\d{4}-\d{2}-\d{2}$/.test(project.updated_at) &&
          project.tools.length > 0 &&
          project.evidence.length > 0 &&
          project.highlights.length >= 2 &&
          Object.keys(project.links).sort().join(',') === 'caseStudy,demo,docs,repo',
      ),
    ).toBe(true);
  });

  it('keeps missing project links auditable instead of inventing URLs', () => {
    expect(
      projectData.every((project) =>
        [project.links.repo, project.links.demo, project.links.docs, project.links.caseStudy].every(
          (href) => href === '' || href.startsWith('https://'),
        ),
      ),
    ).toBe(true);
  });

  it('requires published projects to include at least one real link', () => {
    const publishedProjects = projectData.filter((project) => project.status === 'published');

    expect(
      publishedProjects.every((project) =>
        [project.links.repo, project.links.demo, project.links.docs, project.links.caseStudy].some(Boolean),
      ),
    ).toBe(true);
  });

  it('includes required portfolio projects', () => {
    const projectIds = new Set(projectData.map((project) => project.id));

    expect(projectIds.has('insightcanvas-agent')).toBe(true);
    expect(projectIds.has('memorybridge-mcp')).toBe(true);
    expect(projectIds.has('repolens-rag')).toBe(true);
    expect(projectIds.has('bug-hunter-replay')).toBe(true);
    expect(projectIds.has('vibe-coding-review-project')).toBe(true);
    expect(projectIds.has('loopengineering')).toBe(true);
  });
});
