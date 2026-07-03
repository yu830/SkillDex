import assert from "node:assert/strict";
import test from "node:test";

import {
  CATEGORY_LABELS,
  RISK_LEVEL_LABELS,
  SOURCE_TYPE_LABELS,
  TOOL_SCOPE_LABELS,
  getAllSkills,
  getCategories,
  getCategoryLabel,
  getLocalizedText,
  getRiskLevelLabel,
  getSkillBySlug,
  getSkillSearchText,
  getSkillsBySourceType,
  getSkillsByRiskLevel,
  getSkillsByToolScope,
  getSourceTypeLabel,
  getTags,
  getToolScopeLabel,
  isLocale,
} from "#lib/skills";
import { getAllProjectEvidence } from "#lib/projects";

const expectedSlugs = [
  "vercel-deploy",
  "playwright",
  "vibe-coding-review",
  "guizang-ppt-skill",
  "frontend-design",
  "skill-creator",
  "claude-api",
  "mcp-builder",
  "gh-fix-ci",
  "gh-address-comments",
  "cloudflare-deploy",
  "security-threat-model",
  "migrate-to-codex",
  "webapp-testing",
];

test("catalog contains the approved evidence-ready skills", () => {
  const skills = getAllSkills();

  assert.deepEqual(
    skills.map((skill) => skill.slug),
    expectedSlugs,
  );
  assert.equal(skills.length, 14);
  assert.ok(skills.length + getAllProjectEvidence().length >= 20);
  assert.equal(getSkillBySlug("vibe-coding-review")?.sourceType, "own");
  assert.equal(getSkillBySlug("guizang-ppt-skill")?.sourceType, "third-party");
  assert.ok(skills.every((skill) => Array.isArray(skill.toolScopes)));
  assert.ok(skills.every((skill) => !Object.hasOwn(skill, "toolScope")));
  assert.ok(skills.every((skill) => skill.visibility === "reference-only"));
  assert.ok(skills.every((skill) => skill.source.directoryUrl.startsWith("https://github.com/")));
});

test("catalog excludes ChatGPT skills and local source paths", () => {
  const serialized = JSON.stringify(getAllSkills()).toLowerCase();

  assert.equal(serialized.includes("chatgpt"), false);
  assert.equal(serialized.includes("d:\\"), false);
  assert.equal(serialized.includes("c:\\"), false);
});

test("helpers return skills by slug and multi-tool scope", () => {
  assert.deepEqual([...(getSkillBySlug("frontend-design")?.toolScopes ?? [])].sort(), ["claude-code", "codex"]);
  assert.equal(getSkillBySlug("missing-skill"), undefined);
  assert.deepEqual(
    getSkillsByToolScope("claude-code").map((skill) => skill.slug).sort(),
    ["claude-api", "frontend-design", "guizang-ppt-skill", "mcp-builder", "skill-creator", "vibe-coding-review", "webapp-testing"],
  );
  assert.deepEqual(
    getSkillsByToolScope("codex").map((skill) => skill.slug).sort(),
    [
      "cloudflare-deploy",
      "frontend-design",
      "gh-address-comments",
      "gh-fix-ci",
      "guizang-ppt-skill",
      "migrate-to-codex",
      "playwright",
      "security-threat-model",
      "vercel-deploy",
      "vibe-coding-review",
    ],
  );
});

test("ownership helpers expose stable labels and grouping", () => {
  assert.equal(getSourceTypeLabel("own", "en"), "My skill");
  assert.equal(getSourceTypeLabel("third-party", "en"), "Other skill");
  assert.equal(getSourceTypeLabel("own", "zh"), "\u6211\u7684 Skill");
  assert.equal(getSourceTypeLabel("third-party", "zh"), "\u5176\u4ed6 Skill");
  assert.equal(getToolScopeLabel("claude-code", "en"), "Claude Code");
  assert.equal(getToolScopeLabel("codex", "en"), "Codex");
  assert.equal(getToolScopeLabel("claude-code", "zh"), "Claude Code");
  assert.equal(getToolScopeLabel("codex", "zh"), "Codex");
  assert.ok(SOURCE_TYPE_LABELS.own);
  assert.ok(TOOL_SCOPE_LABELS.codex);
  assert.deepEqual(getSkillsBySourceType("own").map((skill) => skill.slug), ["vibe-coding-review"]);
  assert.deepEqual(
    getSkillsBySourceType("third-party").map((skill) => skill.slug),
    [
      "vercel-deploy",
      "playwright",
      "guizang-ppt-skill",
      "frontend-design",
      "skill-creator",
      "claude-api",
      "mcp-builder",
      "gh-fix-ci",
      "gh-address-comments",
      "cloudflare-deploy",
      "security-threat-model",
      "migrate-to-codex",
      "webapp-testing",
    ],
  );
});

test("risk helpers expose stable labels and filtering", () => {
  const skills = getAllSkills();
  const riskLevels = ["low", "medium", "high"] as const;

  assert.ok(skills.every((skill) => riskLevels.includes(skill.riskLevel)));
  assert.equal(getRiskLevelLabel("low", "en"), "Low risk");
  assert.equal(getRiskLevelLabel("medium", "en"), "Medium risk");
  assert.equal(getRiskLevelLabel("high", "en"), "High risk");
  assert.equal(getRiskLevelLabel("high", "zh"), "\u9ad8\u98ce\u9669");
  assert.ok(RISK_LEVEL_LABELS.medium);

  assert.deepEqual(getSkillsByRiskLevel("low").map((skill) => skill.slug), ["guizang-ppt-skill"]);
  assert.deepEqual(getSkillsByRiskLevel("high").map((skill) => skill.slug), ["claude-api", "mcp-builder", "cloudflare-deploy", "security-threat-model"]);
  assert.match(getSkillSearchText(getSkillBySlug("cloudflare-deploy")!, "en"), /high risk/);
});

test("category and tag helpers expose stable ids and labels", () => {
  assert.ok(getCategories().includes("design-image"));
  assert.ok(getCategories().includes("testing-qa"));
  assert.equal(getCategoryLabel("design-image", "en"), "Design / Image");
  assert.equal(getCategoryLabel("design-image", "zh"), "设计 / 图像");
  assert.ok(getTags().includes("browser-automation"));
  assert.ok(getTags().includes("ppt"));
  assert.ok(CATEGORY_LABELS["devops-deployment"]);
});

test("localized text falls back to English and locale validation is strict", () => {
  assert.equal(getLocalizedText({ en: "English only" }, "zh"), "English only");
  assert.equal(getLocalizedText({ en: "English", zh: "中文" }, "zh"), "中文");
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("zh"), true);
  assert.equal(isLocale("fr"), false);
});

test("example prompts are titled safe prompt objects", () => {
  for (const skill of getAllSkills()) {
    assert.ok(skill.examplePrompts.length > 0);
    for (const example of skill.examplePrompts) {
      assert.ok(example.title.en.length > 0);
      assert.ok(example.prompt.en.length > 0);
      assert.equal(example.prompt.en.includes("SKILL.md"), false);
    }
  }
});

test("install and compatibility data are structured", () => {
  for (const skill of getAllSkills()) {
    assert.ok(["reference", "manual"].includes(skill.install.type));
    assert.ok(skill.install.label.en.length > 0);
    assert.ok(skill.install.steps.length > 0);
    for (const toolScope of skill.toolScopes) {
      assert.ok(skill.compatibility.tools.includes(toolScope));
    }
    assert.ok(skill.compatibility.environments.length > 0);
    assert.ok(skill.compatibility.requirements.length > 0);
    assert.match(skill.indexedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(skill.lastReviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(skill.evidence);
  }
});
