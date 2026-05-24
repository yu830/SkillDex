export type Locale = "en" | "zh";
export type ToolScope = "claude-code" | "codex";
export type SkillStatus = "active" | "draft" | "experimental" | "archived";
export type Visibility = "public" | "reference-only" | "private";
export type SourceType = "own" | "third-party";

export type SkillCategoryId =
  | "coding"
  | "writing"
  | "browser-automation"
  | "design-image"
  | "project-management"
  | "investing"
  | "research"
  | "data-spreadsheet"
  | "devops-deployment"
  | "testing-qa"
  | "other";

export interface SkillSource {
  author: string;
  repoUrl: string;
  directoryUrl: string;
  license: "MIT" | "Apache-2.0";
  licenseUrl?: string;
}

export interface LocalizedText {
  en: string;
  zh?: string;
}

export interface SkillInstall {
  type: "reference" | "manual";
  label: LocalizedText;
  steps: LocalizedText[];
  copyableText?: string;
}

export interface SkillCompatibility {
  tools: ToolScope[];
  environments: string[];
  requirements: LocalizedText[];
  notes?: LocalizedText;
}

export interface ExamplePrompt {
  title: LocalizedText;
  prompt: LocalizedText;
}

export interface Skill {
  slug: string;
  name: string;
  summary: LocalizedText;
  description: LocalizedText;
  capabilities: LocalizedText[];
  toolScopes: ToolScope[];
  categoryId: SkillCategoryId;
  status: SkillStatus;
  visibility: Visibility;
  sourceType: SourceType;
  source: SkillSource;
  tags: string[];
  useCases: LocalizedText[];
  antiUseCases: LocalizedText[];
  inputs: LocalizedText[];
  outputs: LocalizedText[];
  examplePrompts: ExamplePrompt[];
  install: SkillInstall;
  compatibility: SkillCompatibility;
  indexedAt: string;
  lastReviewedAt: string;
}
