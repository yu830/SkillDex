import type { Skill } from "#types/skill";

const REVIEW_DATE = "2026-05-21";
const EVIDENCE_DATE = "2026-07-02";

export const skills: Skill[] = [
  {
    slug: "vercel-deploy",
    name: "Vercel Deploy",
    summary: {
      en: "A Codex Skill for deploying applications and websites to Vercel, including preview and production deployment flows.",
      zh: "用于将应用和网站部署到 Vercel 的 Codex Skill，覆盖预览和生产部署流程。",
    },
    description: {
      en: "Use this reference when you want Codex to help prepare or run a Vercel deployment request and return deployment output clearly.",
      zh: "当你希望 Codex 协助准备或执行 Vercel 部署请求，并清晰返回部署结果时，可参考此 Skill。",
    },
    capabilities: [
      { en: "Guides Vercel preview deployment workflows.", zh: "指导 Vercel 预览部署流程。" },
      { en: "Covers production deployment requests when explicitly needed.", zh: "在明确需要时覆盖生产部署请求。" },
      { en: "Describes fallback handling when authentication is unavailable.", zh: "描述认证不可用时的降级处理。" },
      { en: "Frames deployment output and troubleshooting information.", zh: "组织部署输出和故障排查信息。" },
    ],
    toolScopes: ["codex"],
    categoryId: "devops-deployment",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "openai",
      repoUrl: "https://github.com/openai/skills",
      directoryUrl: "https://github.com/openai/skills/tree/main/skills/.curated/vercel-deploy",
      license: "MIT",
    },
    tags: ["vercel", "deployment", "preview-deploy", "production-deploy", "devops"],
    useCases: [
      { en: "Deploying an app to Vercel from a prepared project.", zh: "从已准备好的项目部署应用到 Vercel。" },
      { en: "Creating a preview deployment and reporting the resulting link.", zh: "创建预览部署并报告生成的链接。" },
      { en: "Documenting deployment prerequisites before asking Codex to act.", zh: "在请求 Codex 操作前整理部署前提条件。" },
    ],
    antiUseCases: [
      { en: "Managing non-Vercel hosting platforms.", zh: "管理非 Vercel 托管平台。" },
      { en: "Storing deployment tokens or API keys in SkillDex.", zh: "在 SkillDex 中保存部署令牌或 API Key。" },
      { en: "Running deployments from this static website.", zh: "从这个静态网站直接执行部署。" },
    ],
    inputs: [
      { en: "A deployable project or build artifact context.", zh: "可部署项目或构建产物上下文。" },
      { en: "Desired deployment target such as preview or production.", zh: "目标部署类型，例如预览或生产。" },
      { en: "Relevant Vercel authentication state in the working environment.", zh: "工作环境中的 Vercel 认证状态。" },
    ],
    outputs: [
      { en: "Deployment command guidance or deployment result summary.", zh: "部署命令指导或部署结果摘要。" },
      { en: "Preview or production URL when available.", zh: "可用时返回预览或生产 URL。" },
      { en: "Troubleshooting notes for deployment failures.", zh: "部署失败时的故障排查说明。" },
    ],
    examplePrompts: [
      {
        title: { en: "Preview deploy", zh: "预览部署" },
        prompt: {
          en: "Use the Vercel Deploy skill to create a preview deployment for this app and report the resulting URL and any warnings.",
          zh: "使用 Vercel Deploy skill 为这个应用创建预览部署，并报告生成的 URL 和任何警告。",
        },
      },
      {
        title: { en: "Deployment readiness", zh: "部署就绪检查" },
        prompt: {
          en: "Use the Vercel Deploy skill to check whether this project is ready for a Vercel deployment before taking action.",
          zh: "使用 Vercel Deploy skill 检查此项目是否已准备好部署到 Vercel，先不要执行部署。",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream curated Skill directory.", zh: "参考上游 curated Skill 目录。" },
      steps: [
        { en: "Open the GitHub source directory for the Skill.", zh: "打开该 Skill 的 GitHub 源目录。" },
        { en: "Review the repository's installation or usage instructions before using it with Codex.", zh: "在与 Codex 一起使用前，查看仓库中的安装或使用说明。" },
      ],
      copyableText: "https://github.com/openai/skills/tree/main/skills/.curated/vercel-deploy",
    },
    compatibility: {
      tools: ["codex"],
      environments: ["Codex CLI or compatible Codex skill runtime", "Vercel project context"],
      requirements: [
        { en: "Requires a project suitable for Vercel deployment.", zh: "需要适合部署到 Vercel 的项目。" },
        { en: "Deployment actions depend on local Vercel authentication and network access.", zh: "部署操作取决于本地 Vercel 认证和网络访问。" },
      ],
      notes: { en: "SkillDex links to the source only; it does not deploy anything.", zh: "SkillDex 仅链接到来源，不执行任何部署。" },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/openai/skills/tree/main/skills/.curated/vercel-deploy",
          summary: "Public source directory and license metadata are represented as reference-only catalog evidence.",
        },
      ],
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "playwright",
    name: "Playwright",
    summary: {
      en: "A Codex Skill for automating a real browser from the terminal for navigation, form work, screenshots, snapshots, extraction, and UI-flow debugging.",
      zh: "用于从终端自动化真实浏览器的 Codex Skill，覆盖导航、表单、截图、快照、数据提取和 UI 流程调试。",
    },
    description: {
      en: "Use this reference when a task needs browser automation through Playwright CLI-style workflows rather than static code inspection alone.",
      zh: "当任务需要通过 Playwright CLI 风格流程进行浏览器自动化，而不只是静态代码检查时，可参考此 Skill。",
    },
    capabilities: [
      { en: "Automates browser navigation and interaction workflows.", zh: "自动化浏览器导航和交互流程。" },
      { en: "Supports screenshots and accessibility-style snapshots for UI checks.", zh: "支持截图和类似可访问性快照的 UI 检查。" },
      { en: "Helps debug UI flows with real browser behavior.", zh: "利用真实浏览器行为帮助调试 UI 流程。" },
      { en: "Can extract visible page data during browser sessions.", zh: "可在浏览器会话中提取可见页面数据。" },
    ],
    toolScopes: ["codex"],
    categoryId: "testing-qa",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "openai",
      repoUrl: "https://github.com/openai/skills",
      directoryUrl: "https://github.com/openai/skills/tree/main/skills/.curated/playwright",
      license: "Apache-2.0",
    },
    tags: ["browser-automation", "testing", "qa", "screenshots", "ui-debugging"],
    useCases: [
      { en: "Checking a UI flow in a real browser.", zh: "在真实浏览器中检查 UI 流程。" },
      { en: "Capturing screenshots or snapshots while debugging a page.", zh: "调试页面时捕获截图或快照。" },
      { en: "Filling forms and validating browser-visible behavior.", zh: "填写表单并验证浏览器可见行为。" },
    ],
    antiUseCases: [
      { en: "Replacing application unit tests.", zh: "替代应用单元测试。" },
      { en: "Automating sites without authorization.", zh: "在未授权的情况下自动化网站。" },
      { en: "Executing browser actions from SkillDex itself.", zh: "从 SkillDex 本身执行浏览器操作。" },
    ],
    inputs: [
      { en: "A target URL or local development server URL.", zh: "目标 URL 或本地开发服务器 URL。" },
      { en: "The browser flow to inspect or automate.", zh: "需要检查或自动化的浏览器流程。" },
      { en: "Expected visual or interaction outcome.", zh: "预期的视觉或交互结果。" },
    ],
    outputs: [
      { en: "Browser interaction findings.", zh: "浏览器交互发现。" },
      { en: "Screenshots, snapshots, traces, or extracted page facts when requested.", zh: "按需输出截图、快照、追踪或页面事实。" },
      { en: "UI-flow debugging notes.", zh: "UI 流程调试说明。" },
    ],
    examplePrompts: [
      {
        title: { en: "Debug a form flow", zh: "调试表单流程" },
        prompt: {
          en: "Use the Playwright skill to open the local app, complete the signup form, and report where the flow fails or succeeds.",
          zh: "使用 Playwright skill 打开本地应用，完成注册表单，并报告流程在哪一步失败或成功。",
        },
      },
      {
        title: { en: "Capture UI evidence", zh: "捕获 UI 证据" },
        prompt: {
          en: "Use the Playwright skill to capture a screenshot and page snapshot of the dashboard after login.",
          zh: "使用 Playwright skill 在登录后捕获仪表盘截图和页面快照。",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream curated Skill directory.", zh: "参考上游 curated Skill 目录。" },
      steps: [
        { en: "Open the GitHub source directory for the Skill.", zh: "打开该 Skill 的 GitHub 源目录。" },
        { en: "Review its Playwright CLI prerequisites before using it with Codex.", zh: "在与 Codex 一起使用前，查看其中的 Playwright CLI 前提条件。" },
      ],
      copyableText: "https://github.com/openai/skills/tree/main/skills/.curated/playwright",
    },
    compatibility: {
      tools: ["codex"],
      environments: ["Codex CLI or compatible Codex skill runtime", "Node.js environment with browser automation support"],
      requirements: [
        { en: "Requires an authorized target app or page to automate.", zh: "需要有授权的目标应用或页面可供自动化。" },
        { en: "Browser automation depends on local Playwright-compatible tooling.", zh: "浏览器自动化依赖本地 Playwright 兼容工具。" },
      ],
      notes: { en: "SkillDex provides prompts and source links only, not browser execution.", zh: "SkillDex 仅提供提示词和来源链接，不执行浏览器操作。" },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/openai/skills/tree/main/skills/.curated/playwright",
          summary: "Public source directory and license metadata are represented as reference-only catalog evidence.",
        },
      ],
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "vibe-coding-review",
    name: "Vibe Coding Review",
    summary: {
      en: "A personal project-governance Skill for keeping AI-assisted coding work aligned with project briefs, active phases, review gates, and explicit non-goals.",
      zh: "用于治理 AI 辅助编码项目的个人 Skill，帮助工作始终对齐项目简报、当前阶段、审查关卡和明确的非目标。",
    },
    description: {
      en: "Use this reference when a coding project needs scope control, phase supervision, plan review, diff review, or closeout discipline across Claude Code and Codex.",
      zh: "当编码项目需要范围控制、阶段监督、计划审查、diff 审查或收尾纪律时，可在 Claude Code 和 Codex 中参考这个 Skill。",
    },
    capabilities: [
      { en: "Checks work against durable project anchors and active phase scope.", zh: "根据持久项目锚点和当前阶段范围检查工作。" },
      { en: "Separates brainstorming, plan review, implementation supervision, diff review, and closeout modes.", zh: "区分头脑风暴、计划审查、实施监督、diff 审查和项目收尾模式。" },
      { en: "Stops scope drift by proposing phase updates before implementation continues.", zh: "通过先提出阶段更新来阻止范围漂移。" },
      { en: "Defines when Codex review gates are required before acceptance or deployment.", zh: "定义何时需要在验收或部署前进行 Codex 审查关卡。" },
    ],
    toolScopes: ["claude-code", "codex"],
    categoryId: "project-management",
    status: "active",
    visibility: "reference-only",
    sourceType: "own",
    source: {
      author: "yu830",
      repoUrl: "https://github.com/yu830/SkillDex",
      directoryUrl: "https://github.com/yu830/SkillDex",
      license: "MIT",
    },
    tags: ["project-governance", "vibe-coding", "scope-control", "codex-review", "planning"],
    useCases: [
      { en: "Keeping an AI coding project aligned with an approved phase plan.", zh: "让 AI 编码项目保持与已批准阶段计划一致。" },
      { en: "Reviewing whether a requested change is inside or outside the active phase.", zh: "审查某个变更请求是否属于当前阶段范围。" },
      { en: "Running a closeout check before publishing, deploying, or presenting work.", zh: "在发布、部署或展示前进行收尾检查。" },
    ],
    antiUseCases: [
      { en: "Generating application code directly without project anchors.", zh: "在没有项目锚点的情况下直接生成应用代码。" },
      { en: "Replacing tests, code review, or repository-specific engineering judgment.", zh: "替代测试、代码审查或针对仓库的工程判断。" },
      { en: "Using governance steps as a substitute for user approval.", zh: "用治理步骤替代用户批准。" },
    ],
    inputs: [
      { en: "Project brief, active phase, approved plan, or explicit user request.", zh: "项目简报、当前阶段、已批准计划或明确用户请求。" },
      { en: "Changed files, implementation summary, or proposed scope change.", zh: "已变更文件、实施摘要或拟议范围变更。" },
      { en: "Verification expectations and any required review gates.", zh: "验证预期以及任何必需的审查关卡。" },
    ],
    outputs: [
      { en: "Scope fit assessment and active phase status.", zh: "范围匹配评估和当前阶段状态。" },
      { en: "Blocking and non-blocking governance findings.", zh: "阻断和非阻断治理发现。" },
      { en: "Suggested next step for planning, implementation, review, or closeout.", zh: "针对计划、实施、审查或收尾的下一步建议。" },
    ],
    examplePrompts: [
      {
        title: { en: "Review scope fit", zh: "审查范围匹配" },
        prompt: {
          en: "Use the Vibe Coding Review skill to check whether this requested change fits the active phase before implementation starts.",
          zh: "使用 Vibe Coding Review skill 在开始实施前检查这个变更请求是否符合当前阶段。",
        },
      },
      {
        title: { en: "Close out a phase", zh: "阶段收尾" },
        prompt: {
          en: "Use the Vibe Coding Review skill to run a closeout review for this branch before publishing or deployment.",
          zh: "使用 Vibe Coding Review skill 在发布或部署前对这个分支进行收尾审查。",
        },
      },
    ],
    install: {
      type: "manual",
      label: { en: "Use the locally maintained Skill source as the canonical reference.", zh: "以本地维护的 Skill 来源作为规范参考。" },
      steps: [
        { en: "Review the maintained Skill instructions before applying the governance workflow.", zh: "在应用治理流程前查看维护中的 Skill 说明。" },
        { en: "Apply it manually in Claude Code or Codex according to the current project phase.", zh: "根据当前项目阶段，在 Claude Code 或 Codex 中手动应用。" },
      ],
      copyableText: "vibe-coding-review",
    },
    compatibility: {
      tools: ["claude-code", "codex"],
      environments: ["Claude Code", "Codex CLI or compatible Codex skill runtime", "Repository with project planning or governance context"],
      requirements: [
        { en: "Works best when project anchors or an approved plan are available.", zh: "在有项目锚点或已批准计划时效果最好。" },
        { en: "Requires explicit user approval before changing scope or moving phases.", zh: "变更范围或切换阶段前需要明确用户批准。" },
      ],
      notes: { en: "SkillDex catalogs the workflow only; it does not enforce project governance automatically.", zh: "SkillDex 只编目该工作流，不会自动执行项目治理。" },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Owned catalog record",
          kind: "doc",
          href: "/en/skills/vibe-coding-review/",
          summary: "The owned workflow is represented in SkillDex with source, scope, and review-gate metadata.",
        },
      ],
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "guizang-ppt-skill",
    name: "Guizang PPT Skill",
    summary: {
      en: "A presentation Skill for generating single-file horizontal HTML decks with WebGL backgrounds, magazine-style layouts, Swiss-style layouts, image grids, and data hero pages.",
      zh: "用于生成单文件横向翻页 HTML 演示文稿的 Skill，支持 WebGL 背景、杂志风版式、瑞士风版式、图片网格和数据大字报页面。",
    },
    description: {
      en: "Use this reference when a presentation should become a polished web-based deck rather than a conventional slide file, especially for talks, demos, launches, or highly visual narrative decks.",
      zh: "当演示内容需要成为精致的网页式 deck，而不是常规幻灯片文件时，可参考这个 Skill，尤其适合分享、demo、发布会和强视觉叙事演示。",
    },
    capabilities: [
      { en: "Generates static single-file HTML decks with horizontal slide navigation.", zh: "生成带横向翻页导航的静态单文件 HTML deck。" },
      { en: "Provides electronic-magazine and Swiss International Style visual systems.", zh: "提供电子杂志风和瑞士国际主义两套视觉系统。" },
      { en: "Guides theme, layout, image-slot, and screenshot-framing decisions.", zh: "指导主题色、版式、图片槽位和截图适配决策。" },
      { en: "Includes quality checks for typography, spacing, animation, and slide safety areas.", zh: "包含排版、间距、动画和页面安全区的质量检查。" },
    ],
    toolScopes: ["claude-code", "codex"],
    categoryId: "design-image",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "op7418 (归藏)",
      repoUrl: "https://github.com/op7418/guizang-ppt-skill",
      directoryUrl: "https://github.com/op7418/guizang-ppt-skill",
      license: "MIT",
      licenseUrl: "https://github.com/op7418/guizang-ppt-skill/blob/main/LICENSE",
    },
    tags: ["ppt", "presentation", "html-deck", "webgl", "swiss-style", "claude-code", "codex"],
    useCases: [
      { en: "Creating a web-based talk deck with a strong visual point of view.", zh: "创建具有鲜明视觉风格的网页演讲 deck。" },
      { en: "Building demo-day, product-launch, or private-sharing presentations.", zh: "制作 demo day、产品发布或私享会演示。" },
      { en: "Turning narrative outlines, screenshots, and images into a polished HTML presentation.", zh: "把叙事大纲、截图和图片整理成精致 HTML 演示文稿。" },
    ],
    antiUseCases: [
      { en: "Collaborative editing workflows that require standard PowerPoint files.", zh: "需要标准 PowerPoint 文件进行多人协作编辑的流程。" },
      { en: "Dense spreadsheet-style tables or chart-heavy training material.", zh: "密集表格数据或大量图表堆叠的培训材料。" },
      { en: "Running deck generation from the SkillDex website itself.", zh: "从 SkillDex 网站本身执行 deck 生成。" },
    ],
    inputs: [
      { en: "Presentation topic, audience, duration, preferred style, and constraints.", zh: "演示主题、受众、时长、偏好风格和约束。" },
      { en: "Outline, source material, images, screenshots, or data points.", zh: "大纲、原始素材、图片、截图或数据点。" },
      { en: "Theme choice and whether the deck should use magazine or Swiss-style templates.", zh: "主题色选择，以及 deck 使用杂志风还是瑞士风模板。" },
    ],
    outputs: [
      { en: "A static HTML slide deck structure and implementation guidance.", zh: "静态 HTML 幻灯片结构和实现指导。" },
      { en: "Theme, layout, image-framing, and quality-check decisions.", zh: "主题、版式、图片适配和质量检查决策。" },
      { en: "Preview and validation steps for the generated deck.", zh: "生成 deck 的预览和验证步骤。" },
    ],
    examplePrompts: [
      {
        title: { en: "Create a web deck", zh: "创建网页演示" },
        prompt: {
          en: "Use the Guizang PPT Skill to turn this outline into a horizontal HTML deck with a Swiss-style visual system.",
          zh: "使用 Guizang PPT Skill 把这个大纲转换为瑞士风横向翻页 HTML deck。",
        },
      },
      {
        title: { en: "Make a magazine-style talk", zh: "制作杂志风分享" },
        prompt: {
          en: "Use the Guizang PPT Skill to create an electronic-magazine style presentation for this private sharing session.",
          zh: "使用 Guizang PPT Skill 为这场私享会创建电子杂志风演示文稿。",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream Guizang PPT Skill repository.", zh: "参考上游 Guizang PPT Skill 仓库。" },
      steps: [
        { en: "Open the GitHub source repository for the Skill.", zh: "打开该 Skill 的 GitHub 源仓库。" },
        { en: "Review its template, theme, layout, and checklist files before using it in Claude Code or Codex.", zh: "在 Claude Code 或 Codex 中使用前，查看其模板、主题、版式和检查清单文件。" },
      ],
      copyableText: "https://github.com/op7418/guizang-ppt-skill",
    },
    compatibility: {
      tools: ["claude-code", "codex"],
      environments: ["Claude Code", "Codex CLI or compatible Codex skill runtime", "Static HTML presentation workspace"],
      requirements: [
        { en: "Requires enough presentation context to choose a deck style and layout rhythm.", zh: "需要足够演示上下文来选择 deck 风格和版式节奏。" },
        { en: "Works best when images, screenshots, and hard constraints are named before generation starts.", zh: "在生成前明确图片、截图和硬性约束时效果最好。" },
      ],
      notes: { en: "SkillDex links to the source only; it does not reproduce the full Skill or generate decks online.", zh: "SkillDex 只链接到来源，不复制完整 Skill，也不在线生成 deck。" },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source repository",
          kind: "repo",
          href: "https://github.com/op7418/guizang-ppt-skill",
          summary: "Public source repository is linked as reference-only evidence; SkillDex does not copy the full Skill.",
        },
      ],
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "frontend-design",
    name: "Frontend Design",
    summary: {
      en: "A frontend design Skill usable from Claude Code and Codex for creating distinctive, production-grade interfaces for components, pages, applications, and visual web artifacts.",
      zh: "可在 Claude Code 和 Codex 中使用的前端设计 Skill，用于创建具有辨识度、生产级的组件、页面、应用和视觉类 Web 界面。",
    },
    description: {
      en: "Use this reference when a frontend task needs polished visual direction and implementation that avoids generic AI-looking interface patterns.",
      zh: "当前端任务需要精致视觉方向和实现，并避免通用 AI 风格界面时，可参考此 Skill。",
    },
    capabilities: [
      { en: "Frames high-quality frontend design thinking.", zh: "组织高质量前端设计思路。" },
      { en: "Supports web components, pages, dashboards, landing pages, and application UI.", zh: "支持 Web 组件、页面、仪表盘、落地页和应用 UI。" },
      { en: "Emphasizes distinctive visual systems over generic layouts.", zh: "强调有辨识度的视觉系统，而不是通用布局。" },
      { en: "Connects aesthetics with production-grade frontend implementation.", zh: "将美学方向与生产级前端实现连接起来。" },
    ],
    toolScopes: ["claude-code", "codex"],
    categoryId: "design-image",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "anthropics",
      repoUrl: "https://github.com/anthropics/skills",
      directoryUrl: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
      license: "Apache-2.0",
    },
    tags: ["frontend", "design", "ui", "visual-design", "claude-code", "codex"],
    useCases: [
      { en: "Designing a polished page or component from a rough brief.", zh: "根据粗略需求设计精致页面或组件。" },
      { en: "Improving a web UI that feels generic or unfinished.", zh: "改善显得通用或未完成的 Web UI。" },
      { en: "Creating a coherent visual system for a small product surface.", zh: "为小型产品界面创建一致的视觉系统。" },
    ],
    antiUseCases: [
      { en: "Backend-only tasks with no visual interface.", zh: "没有视觉界面的纯后端任务。" },
      { en: "Blindly copying an existing brand or proprietary design system.", zh: "盲目复制现有品牌或专有设计系统。" },
      { en: "Generating images unrelated to frontend implementation.", zh: "生成与前端实现无关的图像。" },
    ],
    inputs: [
      { en: "A frontend brief, target audience, and desired visual direction.", zh: "前端需求、目标受众和期望视觉方向。" },
      { en: "Existing UI constraints, framework, and component context.", zh: "现有 UI 约束、框架和组件上下文。" },
      { en: "Reference style goals or examples when available.", zh: "可用时提供参考风格目标或示例。" },
    ],
    outputs: [
      { en: "Frontend design direction and implementation guidance.", zh: "前端设计方向和实现指导。" },
      { en: "Polished UI code or component/page structure when used in Claude Code or Codex.", zh: "在 Claude Code 或 Codex 中使用时输出精致 UI 代码或组件/页面结构。" },
      { en: "Visual details such as layout, spacing, typography, and interaction states.", zh: "布局、间距、排版和交互状态等视觉细节。" },
    ],
    examplePrompts: [
      {
        title: { en: "Design a product page", zh: "设计产品页面" },
        prompt: {
          en: "Use the Frontend Design skill to redesign this dashboard with a distinctive visual system while keeping the existing data and interactions intact.",
          zh: "使用 Frontend Design skill 以有辨识度的视觉系统重新设计这个仪表盘，同时保持现有数据和交互不变。",
        },
      },
      {
        title: { en: "Polish a component", zh: "打磨组件" },
        prompt: {
          en: "Use the Frontend Design skill to improve this component's layout, typography, and interaction states without adding a component library.",
          zh: "使用 Frontend Design skill 改善该组件的布局、排版和交互状态，不要添加组件库。",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream Claude Code source; usage may be adapted for Claude Code or Codex.", zh: "参考上游 Claude Code 来源，并按需适配到 Claude Code 或 Codex 使用。" },
      steps: [
        { en: "Open the GitHub source directory for the Skill.", zh: "打开该 Skill 的 GitHub 源目录。" },
        { en: "Review the upstream Claude Code guidance, then apply the Skill manually in Claude Code or Codex as appropriate.", zh: "先查看上游 Claude Code 使用说明，再按需要手动应用到 Claude Code 或 Codex。" },
      ],
      copyableText: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
    },
    compatibility: {
      tools: ["claude-code", "codex"],
      environments: ["Claude Code", "Codex CLI or compatible Codex skill runtime", "Frontend codebase or web UI artifact"],
      requirements: [
        { en: "Requires a frontend surface to design or improve.", zh: "需要一个待设计或改进的前端界面。" },
        { en: "Works best with clear audience, constraints, and style direction.", zh: "在目标受众、约束和风格方向明确时效果最佳。" },
      ],
      notes: { en: "SkillDex links to the Skill source and does not reproduce its full text.", zh: "SkillDex 链接到 Skill 来源，不复制其全文。" },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
          summary: "Public source directory and license metadata are represented as reference-only catalog evidence.",
        },
      ],
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "skill-creator",
    name: "Skill Creator",
    summary: {
      en: "A Claude Skill for creating, improving, and evaluating Skills with explicit trigger descriptions and test prompts.",
    },
    description: {
      en: "Use this reference when a user wants to design a new Skill, revise an existing Skill, or evaluate whether a Skill triggers and performs as intended.",
    },
    capabilities: [
      { en: "Guides intent capture before drafting a Skill." },
      { en: "Describes Skill structure, metadata, bundled resources, and progressive disclosure." },
      { en: "Supports qualitative and quantitative evaluation loops for Skill revisions." },
    ],
    toolScopes: ["claude-code"],
    categoryId: "project-management",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "anthropics",
      repoUrl: "https://github.com/anthropics/skills",
      directoryUrl: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
      license: "Apache-2.0",
      licenseUrl: "https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/LICENSE.txt",
    },
    tags: ["skills", "evaluation", "prompting", "claude-code"],
    useCases: [
      { en: "Drafting a new Skill from an observed workflow." },
      { en: "Improving an existing Skill after test runs or user review." },
      { en: "Creating trigger-focused evaluation prompts." },
    ],
    antiUseCases: [
      { en: "Creating misleading or unsafe Skills." },
      { en: "Copying private workflow details into a public Skill without review." },
      { en: "Treating subjective feedback as a substitute for explicit test cases." },
    ],
    inputs: [
      { en: "Skill intent, trigger conditions, expected outputs, and example tasks." },
      { en: "Existing Skill draft or workflow notes when available." },
      { en: "Evaluation criteria or user feedback from previous runs." },
    ],
    outputs: [
      { en: "Draft or revised Skill instructions." },
      { en: "Test prompts and evaluation notes." },
      { en: "Recommendations for trigger description improvements." },
    ],
    examplePrompts: [
      {
        title: { en: "Draft a Skill" },
        prompt: {
          en: "Use the Skill Creator reference to turn this repeated workflow into a Skill draft with clear trigger conditions and two test prompts.",
        },
      },
      {
        title: { en: "Improve a Skill" },
        prompt: {
          en: "Use the Skill Creator reference to review this Skill description and propose a tighter evaluation plan.",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream public Skill directory." },
      steps: [
        { en: "Open the GitHub source directory for the Skill." },
        { en: "Review the current upstream instructions before using this as a Skill-writing reference." },
      ],
      copyableText: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
    },
    compatibility: {
      tools: ["claude-code"],
      environments: ["Claude Code or compatible Skill runtime", "Skill authoring workspace"],
      requirements: [
        { en: "Requires a concrete workflow or Skill draft to evaluate." },
        { en: "Skill evaluation quality depends on realistic test prompts and user review." },
      ],
      notes: { en: "SkillDex links to the source only; it does not run Skill evaluations." },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/anthropics/skills/tree/main/skills/skill-creator",
          summary: "Public source directory and Apache-2.0 license file were checked for this catalog entry.",
        },
      ],
    },
    indexedAt: EVIDENCE_DATE,
    lastReviewedAt: EVIDENCE_DATE,
  },
  {
    slug: "claude-api",
    name: "Claude API",
    summary: {
      en: "A Claude Skill for building or reviewing Claude API and Anthropic SDK integrations with current model, streaming, tool, and migration guidance.",
    },
    description: {
      en: "Use this reference when a task involves Claude or Anthropic API implementation details and needs provider-specific SDK verification instead of memory-based guesses.",
    },
    capabilities: [
      { en: "Routes implementation work to language-specific Claude API guidance." },
      { en: "Calls out API drift around models, streaming, tool use, and parameter shapes." },
      { en: "Frames provider-boundary checks before editing code." },
    ],
    toolScopes: ["claude-code"],
    categoryId: "coding",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "anthropics",
      repoUrl: "https://github.com/anthropics/skills",
      directoryUrl: "https://github.com/anthropics/skills/tree/main/skills/claude-api",
      license: "Apache-2.0",
      licenseUrl: "https://raw.githubusercontent.com/anthropics/skills/main/skills/claude-api/LICENSE.txt",
    },
    tags: ["claude-api", "anthropic-sdk", "llm", "tools", "streaming"],
    useCases: [
      { en: "Checking Claude SDK usage before writing integration code." },
      { en: "Reviewing model or parameter migration work." },
      { en: "Separating Anthropic-specific implementation from other providers." },
    ],
    antiUseCases: [
      { en: "OpenAI, Gemini, or provider-neutral API implementation work." },
      { en: "Answering current API questions without checking the source." },
      { en: "Storing API keys or credentials in SkillDex." },
    ],
    inputs: [
      { en: "Target language, existing API code, or intended Claude feature." },
      { en: "Provider boundary information from the repository or user request." },
      { en: "Relevant SDK or raw HTTP constraint." },
    ],
    outputs: [
      { en: "Provider-specific implementation guidance." },
      { en: "Migration or compatibility notes." },
      { en: "Verification steps for the target language." },
    ],
    examplePrompts: [
      {
        title: { en: "Review API usage" },
        prompt: {
          en: "Use the Claude API reference to check this TypeScript integration for current Anthropic SDK patterns before editing it.",
        },
      },
      {
        title: { en: "Plan a migration" },
        prompt: {
          en: "Use the Claude API reference to identify migration risks before moving this project to a newer Claude model.",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream public Skill directory." },
      steps: [
        { en: "Open the GitHub source directory for the Skill." },
        { en: "Review the provider-boundary and language-detection rules before applying the guidance." },
      ],
      copyableText: "https://github.com/anthropics/skills/tree/main/skills/claude-api",
    },
    compatibility: {
      tools: ["claude-code"],
      environments: ["Claude Code or compatible Skill runtime", "Claude API or Anthropic SDK project"],
      requirements: [
        { en: "Requires a Claude/Anthropic API task, not another provider's SDK." },
        { en: "Implementation details should be verified against current official documentation." },
      ],
      notes: { en: "SkillDex catalogs the reference and does not make API calls." },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/anthropics/skills/tree/main/skills/claude-api",
          summary: "Public source directory and Apache-2.0 license file were checked for this catalog entry.",
        },
      ],
    },
    indexedAt: EVIDENCE_DATE,
    lastReviewedAt: EVIDENCE_DATE,
  },
  {
    slug: "mcp-builder",
    name: "MCP Builder",
    summary: {
      en: "A Claude Skill for designing and implementing MCP servers with clear tool names, schemas, transports, and evaluation coverage.",
    },
    description: {
      en: "Use this reference when building an MCP server and deciding how to map an external API or service into useful tools for LLM clients.",
    },
    capabilities: [
      { en: "Frames MCP server planning around API coverage, workflow tools, and context management." },
      { en: "Covers TypeScript and Python implementation paths." },
      { en: "Includes review, test, and evaluation expectations for MCP quality." },
    ],
    toolScopes: ["claude-code"],
    categoryId: "coding",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "anthropics",
      repoUrl: "https://github.com/anthropics/skills",
      directoryUrl: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
      license: "Apache-2.0",
      licenseUrl: "https://raw.githubusercontent.com/anthropics/skills/main/skills/mcp-builder/LICENSE.txt",
    },
    tags: ["mcp", "tools", "typescript", "python", "evaluation"],
    useCases: [
      { en: "Planning MCP tools for an external API." },
      { en: "Implementing typed MCP server infrastructure." },
      { en: "Creating evaluations for realistic MCP tasks." },
    ],
    antiUseCases: [
      { en: "Adding broad API wrappers without task-oriented tool descriptions." },
      { en: "Skipping authentication, transport, or pagination design." },
      { en: "Claiming an MCP server works without inspector or build verification." },
    ],
    inputs: [
      { en: "External API documentation, target language, and transport constraints." },
      { en: "Candidate tool names, input schemas, and expected outputs." },
      { en: "Evaluation questions or representative user tasks." },
    ],
    outputs: [
      { en: "MCP server design and implementation plan." },
      { en: "Tool schema and response-format guidance." },
      { en: "Testing and evaluation checklist." },
    ],
    examplePrompts: [
      {
        title: { en: "Plan an MCP server" },
        prompt: {
          en: "Use the MCP Builder reference to plan a TypeScript MCP server for this external service before implementation.",
        },
      },
      {
        title: { en: "Review tools" },
        prompt: {
          en: "Use the MCP Builder reference to review whether these tool names, schemas, and outputs are agent-friendly.",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream public Skill directory." },
      steps: [
        { en: "Open the GitHub source directory for the Skill." },
        { en: "Review the MCP planning, implementation, and evaluation sections before building a server." },
      ],
      copyableText: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
    },
    compatibility: {
      tools: ["claude-code"],
      environments: ["Claude Code or compatible Skill runtime", "TypeScript or Python MCP server workspace"],
      requirements: [
        { en: "Requires a concrete service/API target and an MCP client context." },
        { en: "Testing depends on local build tools and MCP Inspector or equivalent verification." },
      ],
      notes: { en: "SkillDex catalogs the reference and does not run MCP servers." },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder",
          summary: "Public source directory and Apache-2.0 license file were checked for this catalog entry.",
        },
      ],
    },
    indexedAt: EVIDENCE_DATE,
    lastReviewedAt: EVIDENCE_DATE,
  },
  {
    slug: "gh-fix-ci",
    name: "GH Fix CI",
    summary: {
      en: "A Codex Skill for investigating failing GitHub Actions checks, reading logs with gh, and preparing a bounded fix plan.",
    },
    description: {
      en: "Use this reference when a current branch or pull request has failing GitHub Actions checks and the next step is diagnosis before implementation.",
    },
    capabilities: [
      { en: "Uses gh to locate PR checks and workflow runs." },
      { en: "Extracts actionable GitHub Actions log snippets." },
      { en: "Separates external CI providers from GitHub Actions scope." },
    ],
    toolScopes: ["codex"],
    categoryId: "devops-deployment",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "openai",
      repoUrl: "https://github.com/openai/skills",
      directoryUrl: "https://github.com/openai/skills/tree/main/skills/.curated/gh-fix-ci",
      license: "Apache-2.0",
      licenseUrl: "https://raw.githubusercontent.com/openai/skills/main/skills/.curated/gh-fix-ci/LICENSE.txt",
    },
    tags: ["github-actions", "ci", "gh", "debugging", "codex"],
    useCases: [
      { en: "Diagnosing a failing GitHub Actions run on a PR." },
      { en: "Summarizing log context before proposing a fix." },
      { en: "Rechecking CI status after a targeted patch." },
    ],
    antiUseCases: [
      { en: "Debugging non-GitHub CI systems as if they were Actions." },
      { en: "Implementing a fix before the failure context is known." },
      { en: "Assuming gh authentication or workflow scopes are already available." },
    ],
    inputs: [
      { en: "Repository path and optional PR number or URL." },
      { en: "GitHub CLI authentication state." },
      { en: "Relevant failing check or workflow run context." },
    ],
    outputs: [
      { en: "Failing check summary with run URL when available." },
      { en: "Relevant log excerpt and failure classification." },
      { en: "Fix plan and verification recommendation." },
    ],
    examplePrompts: [
      {
        title: { en: "Investigate failing checks" },
        prompt: {
          en: "Use the GH Fix CI skill to inspect the failing GitHub Actions checks on this branch and summarize the actionable log lines.",
        },
      },
      {
        title: { en: "Plan a CI fix" },
        prompt: {
          en: "Use the GH Fix CI skill to draft a minimal fix plan for this failed workflow before changing files.",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream curated Skill directory." },
      steps: [
        { en: "Open the GitHub source directory for the Skill." },
        { en: "Confirm gh authentication before applying the workflow in a repository." },
      ],
      copyableText: "https://github.com/openai/skills/tree/main/skills/.curated/gh-fix-ci",
    },
    compatibility: {
      tools: ["codex"],
      environments: ["Codex CLI or compatible Codex skill runtime", "GitHub repository with Actions checks"],
      requirements: [
        { en: "Requires gh CLI access to the target repository." },
        { en: "Only GitHub Actions logs are in scope; external provider URLs remain reference-only." },
      ],
      notes: { en: "SkillDex links to the source and does not inspect CI logs itself." },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/openai/skills/tree/main/skills/.curated/gh-fix-ci",
          summary: "Public source directory and Apache-2.0 license file were checked for this catalog entry.",
        },
      ],
    },
    indexedAt: EVIDENCE_DATE,
    lastReviewedAt: EVIDENCE_DATE,
  },
  {
    slug: "gh-address-comments",
    name: "GH Address Comments",
    summary: {
      en: "A Codex Skill for collecting GitHub PR review or issue comments and helping address selected threads with gh CLI context.",
    },
    description: {
      en: "Use this reference when the current branch has GitHub review comments that need triage before deciding which changes to implement.",
    },
    capabilities: [
      { en: "Finds the current branch PR and fetches comments or review threads." },
      { en: "Summarizes required follow-up before implementation." },
      { en: "Keeps authentication and rate-limit issues explicit." },
    ],
    toolScopes: ["codex"],
    categoryId: "project-management",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "openai",
      repoUrl: "https://github.com/openai/skills",
      directoryUrl: "https://github.com/openai/skills/tree/main/skills/.curated/gh-address-comments",
      license: "Apache-2.0",
      licenseUrl: "https://raw.githubusercontent.com/openai/skills/main/skills/.curated/gh-address-comments/LICENSE.txt",
    },
    tags: ["github", "review-comments", "pull-request", "gh", "codex"],
    useCases: [
      { en: "Reviewing unresolved PR comments before editing code." },
      { en: "Numbering comment threads so the user can choose what to address." },
      { en: "Handling GitHub auth or rate-limit blockers transparently." },
    ],
    antiUseCases: [
      { en: "Applying every review suggestion without user selection." },
      { en: "Treating comments as approval to change unrelated files." },
      { en: "Fetching private review content without repository authorization." },
    ],
    inputs: [
      { en: "Current branch, PR number or URL, and repository context." },
      { en: "GitHub CLI authentication state." },
      { en: "User-selected review threads to address." },
    ],
    outputs: [
      { en: "Comment summary and numbered action list." },
      { en: "Patch plan for selected threads." },
      { en: "Verification notes after comments are addressed." },
    ],
    examplePrompts: [
      {
        title: { en: "Summarize review threads" },
        prompt: {
          en: "Use the GH Address Comments skill to list unresolved PR comments on this branch and summarize what each one asks for.",
        },
      },
      {
        title: { en: "Address selected comments" },
        prompt: {
          en: "Use the GH Address Comments skill to address only the selected review comments and leave unrelated files alone.",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream curated Skill directory." },
      steps: [
        { en: "Open the GitHub source directory for the Skill." },
        { en: "Confirm gh authentication and repository access before applying the workflow." },
      ],
      copyableText: "https://github.com/openai/skills/tree/main/skills/.curated/gh-address-comments",
    },
    compatibility: {
      tools: ["codex"],
      environments: ["Codex CLI or compatible Codex skill runtime", "GitHub pull request workflow"],
      requirements: [
        { en: "Requires gh CLI access to the repository and PR comments." },
        { en: "Implementation should wait until the user selects which comments to address." },
      ],
      notes: { en: "SkillDex links to the source and does not fetch PR comments itself." },
    },
    evidence: {
      status: "implemented",
      lastVerified: EVIDENCE_DATE,
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/openai/skills/tree/main/skills/.curated/gh-address-comments",
          summary: "Public source directory and Apache-2.0 license file were checked for this catalog entry.",
        },
      ],
    },
    indexedAt: EVIDENCE_DATE,
    lastReviewedAt: EVIDENCE_DATE,
  },
];
