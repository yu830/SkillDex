import type { Skill } from "#types/skill";

const REVIEW_DATE = "2026-05-21";

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
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "react-component-performance",
    name: "React Component Performance",
    summary: {
      en: "A Codex Skill for analyzing and improving React component performance issues such as slow renders, repeated re-renders, laggy lists, and expensive computations.",
      zh: "用于分析和改善 React 组件性能问题的 Codex Skill，例如慢渲染、重复重渲染、列表卡顿和昂贵计算。",
    },
    description: {
      en: "Use this reference when React UI updates feel slow and the task needs profiling-oriented investigation and targeted component optimization.",
      zh: "当 React UI 更新变慢，并需要面向性能分析的调查和针对性组件优化时，可参考此 Skill。",
    },
    capabilities: [
      { en: "Frames a workflow for investigating slow React components.", zh: "组织调查慢 React 组件的工作流。" },
      { en: "Targets re-render thrash and unstable props or callbacks.", zh: "定位重渲染抖动以及不稳定的 props 或回调。" },
      { en: "Highlights expensive render-time computation patterns.", zh: "关注渲染时昂贵计算模式。" },
      { en: "Includes validation steps for profiling improvements.", zh: "包含性能分析改进的验证步骤。" },
    ],
    toolScopes: ["codex"],
    categoryId: "coding",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "Dimillian",
      repoUrl: "https://github.com/Dimillian/Skills",
      directoryUrl: "https://github.com/Dimillian/Skills/tree/main/react-component-performance",
      license: "MIT",
    },
    tags: ["react", "performance", "profiling", "rendering", "optimization"],
    useCases: [
      { en: "Investigating why a React component renders too often.", zh: "调查 React 组件为何渲染过于频繁。" },
      { en: "Optimizing laggy lists or expensive derived data.", zh: "优化卡顿列表或昂贵的派生数据。" },
      { en: "Validating component performance before and after a change.", zh: "在修改前后验证组件性能。" },
    ],
    antiUseCases: [
      { en: "General non-React performance tuning.", zh: "通用的非 React 性能调优。" },
      { en: "Premature optimization without a visible React performance symptom.", zh: "没有明显 React 性能症状时的过早优化。" },
      { en: "Replacing real profiling or user-flow verification.", zh: "替代真实性能分析或用户流程验证。" },
    ],
    inputs: [
      { en: "The React component or route with performance symptoms.", zh: "存在性能症状的 React 组件或路由。" },
      { en: "Observed lag, render count, profiling trace, or reproduction steps.", zh: "观察到的卡顿、渲染次数、性能追踪或复现步骤。" },
      { en: "Constraints around behavior and visual output that must remain unchanged.", zh: "必须保持不变的行为和视觉输出约束。" },
    ],
    outputs: [
      { en: "Ranked performance findings.", zh: "排序后的性能发现。" },
      { en: "Targeted React optimization suggestions.", zh: "有针对性的 React 优化建议。" },
      { en: "Validation steps for confirming improvement.", zh: "确认改进效果的验证步骤。" },
    ],
    examplePrompts: [
      {
        title: { en: "Investigate slow renders", zh: "调查慢渲染" },
        prompt: {
          en: "Use the React Component Performance skill to analyze why this component re-renders frequently and propose the smallest safe optimization.",
          zh: "使用 React Component Performance skill 分析该组件为何频繁重渲染，并提出最小且安全的优化。",
        },
      },
      {
        title: { en: "Profile a laggy list", zh: "分析卡顿列表" },
        prompt: {
          en: "Use the React Component Performance skill to inspect this laggy list view and identify expensive computations or unstable props.",
          zh: "使用 React Component Performance skill 检查这个卡顿列表视图，并识别昂贵计算或不稳定 props。",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream Skill directory.", zh: "参考上游 Skill 目录。" },
      steps: [
        { en: "Open the GitHub source directory for the Skill.", zh: "打开该 Skill 的 GitHub 源目录。" },
        { en: "Review the repository's usage guidance before invoking it with Codex.", zh: "在与 Codex 一起调用前，查看仓库中的使用说明。" },
      ],
      copyableText: "https://github.com/Dimillian/Skills/tree/main/react-component-performance",
    },
    compatibility: {
      tools: ["codex"],
      environments: ["Codex CLI or compatible Codex skill runtime", "React application codebase"],
      requirements: [
        { en: "Requires access to React component code and a performance symptom or reproduction path.", zh: "需要访问 React 组件代码，并有性能症状或复现路径。" },
        { en: "Best results come with profiling evidence or a repeatable UI flow.", zh: "最好提供性能分析证据或可重复的 UI 流程。" },
      ],
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "bug-hunt-swarm",
    name: "Bug Hunt Swarm",
    summary: {
      en: "A Codex Skill for read-only parallel root-cause investigation of bugs, regressions, crashes, flaky behavior, and unexplained failures.",
      zh: "用于对缺陷、回归、崩溃、 flaky 行为和无法解释的失败进行只读并行根因调查的 Codex Skill。",
    },
    description: {
      en: "Use this reference when the fastest path is to dispatch independent read-only investigations and synthesize ranked hypotheses before editing code.",
      zh: "当最快路径是在改代码前分派独立只读调查并综合排序假设时，可参考此 Skill。",
    },
    capabilities: [
      { en: "Builds a focused bug packet before investigation.", zh: "在调查前构建聚焦的 bug 信息包。" },
      { en: "Bounds investigation scope to avoid unfocused searching.", zh: "限定调查范围，避免无目标搜索。" },
      { en: "Separates reproduction, code path, regression, and proof-plan analysis.", zh: "分离复现、代码路径、回归和证明计划分析。" },
      { en: "Synthesizes ranked root-cause hypotheses and proof paths.", zh: "综合排序后的根因假设和验证路径。" },
    ],
    toolScopes: ["codex"],
    categoryId: "coding",
    status: "active",
    visibility: "reference-only",
    sourceType: "third-party",
    source: {
      author: "Dimillian",
      repoUrl: "https://github.com/Dimillian/Skills",
      directoryUrl: "https://github.com/Dimillian/Skills/tree/main/bug-hunt-swarm",
      license: "MIT",
    },
    tags: ["debugging", "root-cause", "regression", "multi-agent", "read-only"],
    useCases: [
      { en: "Investigating a regression before choosing a fix.", zh: "在选择修复方案前调查回归。" },
      { en: "Understanding flaky or unexplained failures.", zh: "理解 flaky 或无法解释的失败。" },
      { en: "Comparing independent hypotheses for a difficult bug.", zh: "为困难 bug 比较独立假设。" },
    ],
    antiUseCases: [
      { en: "Making code edits during the investigation phase.", zh: "在调查阶段进行代码修改。" },
      { en: "Simple bugs with an obvious single-file fix.", zh: "有明显单文件修复方案的简单 bug。" },
      { en: "Security testing without authorization.", zh: "未授权的安全测试。" },
    ],
    inputs: [
      { en: "Bug symptoms, reproduction steps, and expected behavior.", zh: "Bug 症状、复现步骤和预期行为。" },
      { en: "Known failing tests, logs, screenshots, or traces.", zh: "已知失败测试、日志、截图或追踪。" },
      { en: "Repository areas that are likely relevant or explicitly out of scope.", zh: "可能相关或明确排除的仓库区域。" },
    ],
    outputs: [
      { en: "Ranked root-cause hypotheses.", zh: "排序后的根因假设。" },
      { en: "Fastest proof path for each leading hypothesis.", zh: "每个主要假设的最快验证路径。" },
      { en: "Recommended next investigation or fix step.", zh: "推荐的下一步调查或修复动作。" },
    ],
    examplePrompts: [
      {
        title: { en: "Investigate a regression", zh: "调查回归" },
        prompt: {
          en: "Use the Bug Hunt Swarm skill to investigate this regression read-only and return ranked hypotheses with the fastest proof path.",
          zh: "使用 Bug Hunt Swarm skill 对这个回归进行只读调查，并返回排序假设和最快验证路径。",
        },
      },
      {
        title: { en: "Analyze flaky behavior", zh: "分析 flaky 行为" },
        prompt: {
          en: "Use the Bug Hunt Swarm skill to analyze this flaky failure without editing files, then summarize what evidence would confirm the root cause.",
          zh: "使用 Bug Hunt Swarm skill 在不编辑文件的情况下分析这个 flaky 失败，并总结确认根因所需证据。",
        },
      },
    ],
    install: {
      type: "reference",
      label: { en: "Reference the upstream Skill directory.", zh: "参考上游 Skill 目录。" },
      steps: [
        { en: "Open the GitHub source directory for the Skill.", zh: "打开该 Skill 的 GitHub 源目录。" },
        { en: "Review the investigation workflow before invoking it with Codex.", zh: "在与 Codex 一起调用前，查看其调查工作流。" },
      ],
      copyableText: "https://github.com/Dimillian/Skills/tree/main/bug-hunt-swarm",
    },
    compatibility: {
      tools: ["codex"],
      environments: ["Codex CLI or compatible Codex skill runtime", "Repository with readable code and history"],
      requirements: [
        { en: "Requires a concrete bug report or unexplained failure to investigate.", zh: "需要具体 bug 报告或无法解释的失败用于调查。" },
        { en: "Works best when read-only investigation agents or equivalent parallel analysis are available.", zh: "在可用只读调查代理或等效并行分析时效果最佳。" },
      ],
      notes: { en: "SkillDex does not dispatch agents; it only catalogs the reference.", zh: "SkillDex 不分派代理，仅编目该参考。" },
    },
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
  {
    slug: "frontend-design",
    name: "Frontend Design",
    summary: {
      en: "A frontend design Skill usable from Claude Code and Codex for creating distinctive, production-grade interfaces for components, pages, applications, and visual web artifacts.",
      zh: "用于创建具有辨识度、生产级前端界面的 Claude Code Skill，适用于组件、页面、应用和视觉类网页产物。",
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
    tags: ["frontend", "design", "ui", "visual-design", "claude-code"],
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
      { en: "Polished UI code or component/page structure when used in Claude Code.", zh: "在 Claude Code 中使用时输出精致 UI 代码或组件/页面结构。" },
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
      label: { en: "Reference the upstream Claude Code Skill directory.", zh: "参考上游 Claude Code Skill 目录。" },
      steps: [
        { en: "Open the GitHub source directory for the Skill.", zh: "打开该 Skill 的 GitHub 源目录。" },
        { en: "Review the repository's Claude Code Skill usage guidance before applying it.", zh: "在应用前查看仓库中的 Claude Code Skill 使用说明。" },
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
    indexedAt: REVIEW_DATE,
    lastReviewedAt: REVIEW_DATE,
  },
];
