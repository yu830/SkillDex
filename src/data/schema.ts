export type RiskLevel = 'low' | 'medium' | 'high';

export type SkillCategory =
  | 'workflow'
  | 'review'
  | 'documentation'
  | 'testing'
  | 'research'
  | 'frontend'
  | 'data'
  | 'automation'
  | 'memory'
  | 'deployment';

export type ProjectStatus = 'active' | 'building' | 'planned' | 'archived';

export type LinkValue = string;

export interface SkillCardData {
  id: string;
  name: string;
  category: SkillCategory;
  summary: string;
  tools: string[];
  tags: string[];
  risk_level: RiskLevel;
  license: string;
  repo: LinkValue;
  safety_notes: string[];
}

export interface ProjectCardData {
  id: string;
  name: string;
  type: 'project';
  summary: string;
  status: ProjectStatus;
  tags: string[];
  repo: LinkValue;
  demo: LinkValue;
  docs: LinkValue;
}

export interface FilterState {
  query: string;
  category: string;
  tag: string;
  risk: string;
  tool: string;
}

export function hasRequiredSkillFields(skill: SkillCardData): boolean {
  return Boolean(
    skill.id &&
      skill.name &&
      skill.category &&
      skill.summary &&
      skill.tools.length > 0 &&
      skill.tags.length > 0 &&
      skill.risk_level &&
      skill.license &&
      Array.isArray(skill.safety_notes) &&
      skill.safety_notes.length > 0,
  );
}

export function hasRequiredProjectFields(project: ProjectCardData): boolean {
  return Boolean(
    project.id &&
      project.name &&
      project.type === 'project' &&
      project.summary &&
      project.status &&
      project.tags.length > 0,
  );
}
