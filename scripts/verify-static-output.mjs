import { existsSync, readFileSync } from "node:fs";

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
  "out/en/skills/playwright/index.html",
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
