import { skills } from "#data/skills";
import type { Locale, LocalizedText, Skill, SkillCategoryId, SourceType, ToolScope } from "#types/skill";

export const LOCALES: Locale[] = ["en", "zh"];

export const CATEGORY_LABELS: Record<SkillCategoryId, { en: string; zh?: string }> = {
  coding: { en: "Coding", zh: "编码" },
  writing: { en: "Writing", zh: "写作" },
  "browser-automation": { en: "Browser Automation", zh: "浏览器自动化" },
  "design-image": { en: "Design / Image", zh: "设计 / 图像" },
  "project-management": { en: "Project Management", zh: "项目管理" },
  investing: { en: "Investing", zh: "投资" },
  research: { en: "Research", zh: "研究" },
  "data-spreadsheet": { en: "Data / Spreadsheet", zh: "数据 / 表格" },
  "devops-deployment": { en: "DevOps / Deployment", zh: "DevOps / 部署" },
  "testing-qa": { en: "Testing / QA", zh: "测试 / QA" },
  other: { en: "Other", zh: "其他" },
};

export const TOOL_SCOPE_LABELS: Record<ToolScope, { en: string; zh?: string }> = {
  "claude-code": { en: "Claude Code", zh: "Claude Code" },
  codex: { en: "Codex", zh: "Codex" },
};

export const SOURCE_TYPE_LABELS: Record<SourceType, { en: string; zh?: string }> = {
  own: { en: "My skill", zh: "\u6211\u7684 Skill" },
  "third-party": { en: "Other skill", zh: "\u5176\u4ed6 Skill" },
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getLocalizedText(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value.en;
}

export function getAllSkills(): Skill[] {
  return skills;
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((skill) => skill.slug === slug);
}

export function getSkillsByToolScope(scope: ToolScope): Skill[] {
  return skills.filter((skill) => skill.toolScopes.includes(scope));
}

export function getSkillsBySourceType(sourceType: SourceType): Skill[] {
  return skills.filter((skill) => skill.sourceType === sourceType);
}

export function getToolScopes(): ToolScope[] {
  return Array.from(new Set(skills.flatMap((skill) => skill.toolScopes))).sort();
}

export function getCategories(): SkillCategoryId[] {
  return Array.from(new Set(skills.map((skill) => skill.categoryId))).sort();
}

export function getTags(): string[] {
  return Array.from(new Set(skills.flatMap((skill) => skill.tags))).sort();
}

export function getSkillSearchText(skill: Skill, locale: Locale): string {
  return [
    skill.name,
    getLocalizedText(skill.summary, locale),
    getLocalizedText(skill.description, locale),
    getCategoryLabel(skill.categoryId, locale),
    ...skill.toolScopes,
    ...skill.toolScopes.map((scope) => getToolScopeLabel(scope, locale)),
    skill.sourceType,
    getSourceTypeLabel(skill.sourceType, locale),
    skill.source.author,
    skill.source.license,
    ...skill.tags,
    skill.evidence?.status,
    skill.evidence?.lastVerified,
    ...(skill.evidence?.artifacts ?? []).flatMap((artifact) => [artifact.label, artifact.kind, artifact.summary, artifact.href]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getCategoryLabel(categoryId: SkillCategoryId, locale: Locale): string {
  return getLocalizedText(CATEGORY_LABELS[categoryId], locale);
}

export function getToolScopeLabel(toolScope: ToolScope, locale: Locale): string {
  return getLocalizedText(TOOL_SCOPE_LABELS[toolScope], locale);
}

export function getSourceTypeLabel(sourceType: SourceType, locale: Locale): string {
  return getLocalizedText(SOURCE_TYPE_LABELS[sourceType], locale);
}
