import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getAllProjectEvidence, getProjectEvidenceBySlug, getProjectPath, getProjectRelatedSkills, getProjectStaticParams, getProjectsByRelatedSkillSlug } from "#lib/projects";
import { getAllSkills, getSkillBySlug, getSkillPath, getSkillSearchText, getSkillsByRiskLevel, getSkillsBySourceType, getSkillsByToolScope } from "#lib/skills";
import { isEvidence } from "#lib/evidence";

const requiredProjectNames = [
  "InsightCanvas Agent",
  "MemoryBridge MCP",
  "RepoLens RAG",
  "Bug Hunter Replay",
  "Vibe Coding Review",
  "LoopEngineering",
];

test("evidence validator accepts valid evidence", () => {
  assert.equal(
    isEvidence({
      status: "implemented",
      lastVerified: "2026-07-02",
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/example/repo",
          summary: "Public source directory checked for this record.",
        },
      ],
    }),
    true,
  );
});

test("evidence validator rejects invalid status and artifact kind", () => {
  assert.equal(isEvidence({ status: "shipped", artifacts: [{ label: "Note", kind: "note" }] }), false);
  assert.equal(isEvidence({ status: "implemented", artifacts: [{ label: "Video", kind: "video" }] }), false);
});

test("required portfolio projects all have evidence", () => {
  const projects = getAllProjectEvidence();
  const names = projects.map((project) => project.name).sort();

  assert.deepEqual(names, [...requiredProjectNames].sort());

  for (const project of projects) {
    assert.equal(isEvidence(project.evidence), true, project.name);
    assert.match(project.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(project.highlights.length >= 2, project.name);
    assert.ok(project.problem.length >= 2, project.name);
    assert.ok(project.approach.length >= 2, project.name);
    assert.ok(project.nextSteps.length >= 2, project.name);
    assert.ok(project.evidence.artifacts && project.evidence.artifacts.length > 0, project.name);
  }
});

test("project slugs are unique, stable, and statically routable", () => {
  const projects = getAllProjectEvidence();
  const slugs = projects.map((project) => project.slug);

  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9-]+$/);
    assert.equal(getProjectEvidenceBySlug(slug)?.slug, slug);
    assert.equal(getProjectPath("en", slug), `/en/projects/${slug}`);
  }

  const routeKeys = new Set(getProjectStaticParams().map((param) => `${param.locale}/${param.slug}`));
  for (const slug of slugs) {
    assert.equal(routeKeys.has(`en/${slug}`), true, slug);
    assert.equal(routeKeys.has(`zh/${slug}`), true, slug);
  }
});

test("project TBD evidence stays unlinked until proof is verified", () => {
  const projects = getAllProjectEvidence();
  const tbdArtifacts = projects.flatMap((project) =>
    (project.evidence.artifacts ?? [])
      .filter((artifact) => `${artifact.label} ${artifact.summary ?? ""}`.toLowerCase().includes("tbd"))
      .map((artifact) => ({ project: project.name, artifact })),
  );

  assert.ok(tbdArtifacts.length > 0);

  for (const { project, artifact } of tbdArtifacts) {
    assert.equal(artifact.href, undefined, `${project} ${artifact.label}`);
    assert.doesNotMatch(`${artifact.label} ${artifact.summary ?? ""}`, /https?:\/\//i, `${project} ${artifact.label}`);
  }
});

test("project related skill slugs are populated, valid, and diverse", () => {
  const projects = getAllProjectEvidence();
  const skillSlugs = new Set(getAllSkills().map((skill) => skill.slug));
  const coveredSkillSlugs = new Set<string>();

  for (const project of projects) {
    assert.ok(project.relatedSkillSlugs.length >= 1, project.name);
    assert.equal(new Set(project.relatedSkillSlugs).size, project.relatedSkillSlugs.length, project.name);

    const relatedSkills = getProjectRelatedSkills(project);
    assert.equal(relatedSkills.length, project.relatedSkillSlugs.length, project.name);

    for (const slug of project.relatedSkillSlugs) {
      assert.equal(skillSlugs.has(slug), true, `${project.name} references missing Skill ${slug}`);
      assert.equal(getSkillBySlug(slug)?.slug, slug);
      assert.equal(getSkillPath("en", slug), `/en/skills/${slug}`);
      assert.equal(getSkillPath("zh", slug), `/zh/skills/${slug}`);
      coveredSkillSlugs.add(slug);
    }
  }

  assert.ok(coveredSkillSlugs.size >= 6, `expected at least 6 related Skills, found ${coveredSkillSlugs.size}`);
});

test("reverse related project helper derives stable Skill-to-Project navigation", () => {
  const projects = getAllProjectEvidence();
  const skillCoverage = new Map<string, string[]>();

  for (const skill of getAllSkills()) {
    const expectedProjectSlugs = projects.filter((project) => project.relatedSkillSlugs.includes(skill.slug)).map((project) => project.slug);
    const actualProjectSlugs = getProjectsByRelatedSkillSlug(skill.slug).map((project) => project.slug);

    assert.deepEqual(actualProjectSlugs, expectedProjectSlugs, skill.slug);
    assert.equal(new Set(actualProjectSlugs).size, actualProjectSlugs.length, skill.slug);

    if (actualProjectSlugs.length > 0) {
      skillCoverage.set(skill.slug, actualProjectSlugs);
    }
  }

  assert.deepEqual(getProjectsByRelatedSkillSlug("frontend-design").map((project) => project.slug), ["insightcanvas-agent"]);
  assert.deepEqual(getProjectsByRelatedSkillSlug("mcp-builder").map((project) => project.slug), ["memorybridge-mcp", "repolens-rag"]);
  assert.deepEqual(getProjectsByRelatedSkillSlug("playwright").map((project) => project.slug), ["bug-hunter-replay", "loopengineering"]);
  assert.deepEqual(getProjectsByRelatedSkillSlug("vibe-coding-review").map((project) => project.slug), [
    "insightcanvas-agent",
    "repolens-rag",
    "bug-hunter-replay",
    "vibe-coding-review",
    "loopengineering",
  ]);
  assert.deepEqual(getProjectsByRelatedSkillSlug("claude-api"), []);
  assert.ok(skillCoverage.size >= 6, `expected at least 6 Skills with related projects, found ${skillCoverage.size}`);
});

test("relationship matrix documents current Project and Skill slug coverage", () => {
  const matrix = readFileSync("docs/relationship-matrix.md", "utf8");
  const projects = getAllProjectEvidence();
  const skillsWithProjects = getAllSkills()
    .map((skill) => ({ skill, projects: getProjectsByRelatedSkillSlug(skill.slug) }))
    .filter(({ projects }) => projects.length > 0);

  assert.match(matrix, /Current coverage: 6 required Project records\./);
  assert.match(matrix, new RegExp(`Current coverage: ${skillsWithProjects.length} Skill slugs with at least one related Project\\.`));
  assert.match(matrix, /navigation or capability context, not proof/i);
  assert.match(matrix, /getProjectPath\(locale, project\.slug\)/);
  assert.match(matrix, /getSkillPath\(locale, skill\.slug\)/);

  for (const project of projects) {
    const skillCells = project.relatedSkillSlugs.map((skillSlug) => `\`${skillSlug}\``).join(", ");
    assert.ok(matrix.includes(`| \`${project.slug}\` | ${project.name} | ${skillCells} |`), project.slug);
  }

  for (const { skill, projects: relatedProjects } of skillsWithProjects) {
    const projectCells = relatedProjects.map((project) => `\`${project.slug}\``).join(", ");
    assert.ok(matrix.includes(`| \`${skill.slug}\` | ${projectCells} |`), skill.slug);
  }
});

test("relationship review checklist documents real slugs, commands, and proof boundaries", () => {
  const checklist = readFileSync("docs/relationship-review-checklist.md", "utf8");
  const matrix = readFileSync("docs/relationship-matrix.md", "utf8");
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const projects = getAllProjectEvidence();
  const skillsWithProjects = getAllSkills()
    .map((skill) => ({ skill, projects: getProjectsByRelatedSkillSlug(skill.slug) }))
    .filter(({ projects }) => projects.length > 0);

  assert.match(matrix, /docs\/relationship-review-checklist\.md/);
  assert.match(checklist, /src\/data\/projects\.ts/);
  assert.match(checklist, /getProjectsByRelatedSkillSlug/);
  assert.match(checklist, /getProjectPath\(locale, project\.slug\)/);
  assert.match(checklist, /getSkillPath\(locale, skill\.slug\)/);
  assert.match(checklist, new RegExp(`${projects.length} Projects`));
  assert.match(checklist, new RegExp(`${skillsWithProjects.length} Skills`));

  for (const project of projects) {
    assert.ok(checklist.includes(`\`${project.slug}\``), project.slug);
  }

  for (const { skill } of skillsWithProjects) {
    assert.ok(checklist.includes(`\`${skill.slug}\``), skill.slug);
  }

  const commands = [
    "npm ci --dry-run",
    "npm run test",
    "npm run lint",
    "npm run build",
    "npm run verify:static-output",
    "npx --yes npm@10.9.8 audit --audit-level=moderate",
    "npx npm@latest audit --audit-level=moderate",
    "git diff --check",
    "git status",
  ];

  for (const command of commands) {
    assert.ok(checklist.includes(command), command);
  }

  const scripts = packageJson.scripts as Record<string, string>;
  for (const match of checklist.matchAll(/npm run ([\w:-]+)/g)) {
    assert.ok(scripts[match[1]], `missing package script for ${match[0]}`);
  }

  const policyText = `${checklist}\n${matrix}`;
  for (const misleadingPhrase of [
    "relationship is evidence",
    "relationship is proof",
    "matrix is evidence",
    "matrix is proof",
    "related projects are evidence",
    "related projects prove",
    "built with this Skill",
    "powered by this Skill",
  ]) {
    assert.equal(policyText.includes(misleadingPhrase), false, misleadingPhrase);
  }
});

test("pull request template exposes relationship review guardrails", () => {
  const template = readFileSync(".github/pull_request_template.md", "utf8");
  const checklist = readFileSync("docs/relationship-review-checklist.md", "utf8");
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.match(checklist, /\.github\/pull_request_template\.md/);
  assert.match(template, /docs\/relationship-review-checklist\.md/);
  assert.match(template, /docs\/relationship-matrix\.md/);
  assert.match(template, /relatedSkillSlugs/);
  assert.match(template, /navigation and review context only/i);
  assert.match(template, /not proof or evidence artifacts/i);
  assert.match(template, /does not print, request, or store secret values/i);
  assert.doesNotMatch(template, /CLOUDFLARE_(ACCOUNT_ID|API_TOKEN)=/);

  const commands = [
    "npm run test",
    "npm run lint",
    "npm run build",
    "npm run verify:static-output",
    "npx --yes npm@10.9.8 audit --audit-level=moderate",
  ];

  for (const command of commands) {
    assert.ok(template.includes(command), command);
  }

  const scripts = packageJson.scripts as Record<string, string>;
  for (const match of template.matchAll(/npm run ([\w:-]+)/g)) {
    assert.ok(scripts[match[1]], `missing package script for ${match[0]}`);
  }

  for (const misleadingPhrase of [
    "relationship is evidence",
    "relationship is proof",
    "matrix is evidence",
    "matrix is proof",
    "related projects are evidence",
    "related projects prove",
    "built with this Skill",
    "powered by this Skill",
  ]) {
    assert.equal(template.includes(misleadingPhrase), false, misleadingPhrase);
  }
});

test("all current skills have structured evidence", () => {
  const skillsWithEvidence = getAllSkills().filter((skill) => isEvidence(skill.evidence));

  assert.equal(skillsWithEvidence.length, getAllSkills().length);
  assert.ok(skillsWithEvidence.length >= 14);
  assert.ok(skillsWithEvidence.every((skill) => skill.evidence?.lastVerified === "2026-07-02"));
});

test("search and filter helpers still return the established records", () => {
  assert.equal(getSkillBySlug("playwright")?.name, "Playwright");
  assert.ok(getSkillsByToolScope("codex").some((skill) => skill.slug === "playwright"));
  assert.deepEqual(getSkillsBySourceType("own").map((skill) => skill.slug), ["vibe-coding-review"]);
  assert.deepEqual(getSkillsByRiskLevel("high").map((skill) => skill.slug), ["claude-api", "mcp-builder", "cloudflare-deploy", "security-threat-model"]);
  assert.match(getSkillSearchText(getSkillBySlug("playwright")!, "en"), /browser automation/);
  assert.match(getSkillSearchText(getSkillBySlug("cloudflare-deploy")!, "en"), /high risk/);
  assert.match(getSkillSearchText(getSkillBySlug("gh-fix-ci")!, "en"), /github actions/);
  assert.match(getSkillSearchText(getSkillBySlug("vibe-coding-review")!, "en"), /owned catalog record/);
});
