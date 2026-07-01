import { describe, expect, it } from 'vitest';
import projects from '../src/data/projects.json';
import skills from '../src/data/skills.json';
import {
  hasRequiredProjectFields,
  hasRequiredSkillFields,
  type ProjectCardData,
  type SkillCardData,
} from '../src/data/schema';

const skillData = skills as SkillCardData[];
const projectData = projects as ProjectCardData[];

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
