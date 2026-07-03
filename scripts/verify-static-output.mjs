import { existsSync, readFileSync } from "node:fs";

const relatedSkillProjectLinks = {
  "vercel-deploy": ["loopengineering"],
  playwright: ["bug-hunter-replay", "loopengineering"],
  "vibe-coding-review": ["insightcanvas-agent", "repolens-rag", "bug-hunter-replay", "vibe-coding-review", "loopengineering"],
  "frontend-design": ["insightcanvas-agent"],
  "skill-creator": ["vibe-coding-review"],
  "mcp-builder": ["memorybridge-mcp", "repolens-rag"],
  "gh-fix-ci": ["bug-hunter-replay", "vibe-coding-review", "loopengineering"],
  "gh-address-comments": ["vibe-coding-review", "loopengineering"],
};

const phase33SkillSlugs = ["cloudflare-deploy", "security-threat-model", "migrate-to-codex", "webapp-testing"];

const requiredFiles = [
  "out/index.html",
  "out/en/index.html",
  "out/en/about/index.html",
  "out/en/projects/index.html",
  "out/en/projects/insightcanvas-agent/index.html",
  "out/en/projects/memorybridge-mcp/index.html",
  "out/en/projects/repolens-rag/index.html",
  "out/en/projects/bug-hunter-replay/index.html",
  "out/en/projects/vibe-coding-review/index.html",
  "out/en/projects/loopengineering/index.html",
  "out/en/skills/index.html",
  ...Object.keys(relatedSkillProjectLinks).map((skillSlug) => `out/en/skills/${skillSlug}/index.html`),
  ...phase33SkillSlugs.map((skillSlug) => `out/en/skills/${skillSlug}/index.html`),
  "out/zh/index.html",
  "out/zh/about/index.html",
  "out/zh/projects/index.html",
  "out/zh/projects/insightcanvas-agent/index.html",
  "out/zh/projects/memorybridge-mcp/index.html",
  "out/zh/projects/repolens-rag/index.html",
  "out/zh/projects/bug-hunter-replay/index.html",
  "out/zh/projects/vibe-coding-review/index.html",
  "out/zh/projects/loopengineering/index.html",
  "out/zh/skills/index.html",
  "out/zh/skills/frontend-design/index.html",
  "out/zh/skills/vibe-coding-review/index.html",
  ...phase33SkillSlugs.map((skillSlug) => `out/zh/skills/${skillSlug}/index.html`),
];

const forbiddenChecks = [
  {
    label: "GitHub Pages repo base path in asset or link URL",
    matches: (html) => /(?:href|src)=["']\/SkillDex(?:\/|["'])/.test(html),
  },
  {
    label: "NEXT_REDIRECT",
    matches: (html) => html.includes("NEXT_REDIRECT"),
  },
  {
    label: "__next_error__",
    matches: (html) => html.includes("__next_error__"),
  },
];

const contentChecks = [
  {
    file: "out/en/skills/index.html",
    label: "Skill risk filter and Phase 33 catalog entries",
    matches: (html) =>
      html.includes("Risk") &&
      html.includes("All risks") &&
      html.includes("High risk") &&
      /14\s*(?:<!--\s*-->\s*)*matching skills/.test(html) &&
      html.includes("Cloudflare Deploy") &&
      html.includes("Security Threat Model") &&
      html.includes("Migrate to Codex") &&
      html.includes("Webapp Testing"),
  },
  {
    file: "out/zh/skills/index.html",
    label: "Chinese Skill risk filter",
    matches: (html) => html.includes("All risks") && html.includes("High risk") && html.includes("Cloudflare Deploy"),
  },
  {
    file: "out/en/projects/insightcanvas-agent/index.html",
    label: "InsightCanvas related Skill links",
    matches: (html) => html.includes("Related skills") && html.includes('href="/en/skills/frontend-design/"') && html.includes("not be read as proof"),
  },
  {
    file: "out/zh/projects/insightcanvas-agent/index.html",
    label: "InsightCanvas Chinese related Skill links",
    matches: (html) => html.includes('href="/zh/skills/frontend-design/"') && html.includes('href="/zh/skills/vibe-coding-review/"'),
  },
  {
    file: "out/en/projects/loopengineering/index.html",
    label: "LoopEngineering related Skill links",
    matches: (html) => html.includes("Related skills") && html.includes('href="/en/skills/vercel-deploy/"') && html.includes('href="/en/skills/playwright/"'),
  },
  ...Object.entries(relatedSkillProjectLinks).map(([skillSlug, projectSlugs]) => ({
    file: `out/en/skills/${skillSlug}/index.html`,
    label: `${skillSlug} related Project links`,
    matches: (html) =>
      html.includes("Related projects") &&
      html.includes("Project evidence status") &&
      html.includes("Project record updated") &&
      html.includes("2026-07-02") &&
      html.includes("do not replace evidence artifacts") &&
      projectSlugs.every((projectSlug) => html.includes(`href="/en/projects/${projectSlug}/"`)),
  })),
  {
    file: "out/zh/skills/vibe-coding-review/index.html",
    label: "Vibe Coding Review Chinese related Project links",
    matches: (html) => html.includes("项目证据状态") && html.includes('href="/zh/projects/insightcanvas-agent/"') && html.includes('href="/zh/projects/loopengineering/"'),
  },
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error(`Missing static export files: ${missing.join(", ")}`);
  process.exit(1);
}

const foundMarkers = requiredFiles.flatMap((file) => {
  const html = readFileSync(file, "utf8");
  return forbiddenChecks.filter((check) => check.matches(html)).map((check) => `${file}: ${check.label}`);
});

if (foundMarkers.length > 0) {
  console.error(`Unexpected static export markers: ${foundMarkers.join(", ")}`);
  process.exit(1);
}

const missingContent = contentChecks.filter((check) => !check.matches(readFileSync(check.file, "utf8"))).map((check) => `${check.file}: ${check.label}`);

if (missingContent.length > 0) {
  console.error(`Missing static export content: ${missingContent.join(", ")}`);
  process.exit(1);
}

console.log("Static export files verified.");
