import { describe, expect, it } from 'vitest';
import projects from '../src/data/projects.json';
import skills from '../src/data/skills.json';
import type { FilterState, ProjectCardData, SkillCardData } from '../src/data/schema';
import { ALL_VALUE, countActiveFilters, projectMatchesFilters, skillMatchesFilters } from '../src/lib/filters';

const skillData = skills as SkillCardData[];
const projectData = projects as ProjectCardData[];

const baseFilters: FilterState = {
  query: '',
  category: ALL_VALUE,
  risk: ALL_VALUE,
  tags: [],
  tools: [],
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
        tools: ['Claude Code'],
      }),
    );

    expect(matches.every((skill) => skill.category === 'testing')).toBe(true);
    expect(matches.every((skill) => skill.risk_level === 'medium')).toBe(true);
    expect(matches.every((skill) => skill.tools.includes('Claude Code'))).toBe(true);
  });

  it('matches any selected tag or tool within each multi-select group', () => {
    const matches = skillData.filter((skill) =>
      skillMatchesFilters(skill, {
        ...baseFilters,
        tags: ['deployment', 'pull-request'],
        tools: ['GitHub', 'GitHub Pages'],
      }),
    );

    expect(matches.map((skill) => skill.id)).toContain('github-triage');
    expect(matches.map((skill) => skill.id)).toContain('deploy-checklist');
    expect(
      matches.every(
        (skill) =>
          ['deployment', 'pull-request'].some((tag) => skill.tags.includes(tag)) &&
          ['GitHub', 'GitHub Pages'].some((tool) => skill.tools.includes(tool)),
      ),
    ).toBe(true);
  });

  it('filters projects by query and tags while respecting skill-only dimensions', () => {
    const queryMatches = projectData.filter((project) =>
      projectMatchesFilters(project, { ...baseFilters, query: 'memory' }),
    );
    const tagMatches = projectData.filter((project) =>
      projectMatchesFilters(project, { ...baseFilters, tags: ['memory', 'debugging'] }),
    );
    const blockedByRisk = projectData.filter((project) =>
      projectMatchesFilters(project, { ...baseFilters, risk: 'medium' }),
    );
    const blockedByTool = projectData.filter((project) =>
      projectMatchesFilters(project, { ...baseFilters, tools: ['Codex'] }),
    );

    expect(queryMatches.map((project) => project.id)).toContain('memorybridge-mcp');
    expect(tagMatches.map((project) => project.id)).toEqual(['memorybridge-mcp', 'bug-hunter-replay']);
    expect(blockedByRisk).toEqual([]);
    expect(blockedByTool).toEqual([]);
  });

  it('counts active filters without counting defaults or blank search', () => {
    expect(countActiveFilters(baseFilters)).toBe(0);
    expect(
      countActiveFilters({
        query: '  review  ',
        category: 'review',
        risk: 'medium',
        tags: ['workflow', 'testing'],
        tools: ['Codex'],
      }),
    ).toBe(6);
  });
});
