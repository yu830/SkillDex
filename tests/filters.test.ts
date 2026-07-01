import { describe, expect, it } from 'vitest';
import projects from '../src/data/projects.json';
import skills from '../src/data/skills.json';
import type { FilterState, ProjectCardData, SkillCardData } from '../src/data/schema';
import { ALL_VALUE, projectMatchesFilters, skillMatchesFilters } from '../src/lib/filters';

const skillData = skills as SkillCardData[];
const projectData = projects as ProjectCardData[];

const baseFilters: FilterState = {
  query: '',
  category: ALL_VALUE,
  tag: ALL_VALUE,
  risk: ALL_VALUE,
  tool: ALL_VALUE,
};

describe('SkillDex filters', () => {
  it('searches skill names, summaries, tags, and tools', () => {
    const matches = skillData.filter((skill) => skillMatchesFilters(skill, { ...baseFilters, query: 'regression' }));

    expect(matches.map((skill) => skill.id)).toContain('systematic-debugging');
    expect(matches.map((skill) => skill.id)).toContain('test-driven-development');
  });

  it('combines category, risk, and tool filters', () => {
    const matches = skillData.filter((skill) =>
      skillMatchesFilters(skill, {
        ...baseFilters,
        category: 'testing',
        risk: 'medium',
        tool: 'Claude Code',
      }),
    );

    expect(matches.every((skill) => skill.category === 'testing')).toBe(true);
    expect(matches.every((skill) => skill.risk_level === 'medium')).toBe(true);
    expect(matches.every((skill) => skill.tools.includes('Claude Code'))).toBe(true);
  });

  it('filters projects by query and tags while respecting skill-only dimensions', () => {
    const queryMatches = projectData.filter((project) =>
      projectMatchesFilters(project, { ...baseFilters, query: 'memory' }),
    );
    const blockedByRisk = projectData.filter((project) =>
      projectMatchesFilters(project, { ...baseFilters, risk: 'medium' }),
    );

    expect(queryMatches.map((project) => project.id)).toContain('memorybridge-mcp');
    expect(blockedByRisk).toEqual([]);
  });
});
