# Phase 4 开发进度汇报：Cloudflare Pages

## 基本信息

- 项目：SkillDex
- 阶段：Phase 4 - Cloudflare Pages Deployment
- 日期：2026-07-01
- 当前分支：codex/skilldex-phase-4-cloudflare-pages
- GitHub remote：https://github.com/yu830/SkillDex
- Cloudflare Pages 项目：skilldex

## 本阶段目标

将 SkillDex 的首选部署目标切换到 Cloudflare Pages，同时保留 GitHub Pages 作为 fallback 准备。修正 Vite `base`，执行 Wrangler 认证核对，创建/发现 Cloudflare Pages 项目，完成 preview deployment，并用 HTTP 200 验证真实 URL。

## 修改摘要

- `vite.config.ts`：默认 `base` 改为 `/`，只有 `VITE_DEPLOY_TARGET=github-pages` 时使用 `/SkillDex/`。
- `.github/workflows/deploy-pages.yml`：GitHub Pages build step 显式设置 `VITE_DEPLOY_TARGET=github-pages`。
- `.github/workflows/deploy-cloudflare-pages.yml`：新增 Cloudflare Pages Direct Upload workflow，占位使用 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` GitHub Secrets，只在 `main` push 和 `workflow_dispatch` 触发，使用触发时的 GitHub ref name 作为 Cloudflare branch，并固定 `wrangler@4.106.0`。
- `.gitignore`：忽略 `.env` / `.env.*`，保留 `.env.example` 例外，避免误提交 secrets。
- `README.md`：更新 Cloudflare Pages 为首选部署目标，记录 build command、output dir、Direct Upload、secrets 要求和当前 URL 验证状态。

## Cloudflare 认证状态

- 全局 `wrangler --version`：失败，本机没有全局 Wrangler 命令。
- `npx --yes wrangler@latest --version`：首次下载失败，错误为 `ECONNRESET`，并有 npm cache cleanup `EPERM` 警告。
- `npx wrangler --version`：成功，Wrangler `4.106.0`。
- `npx wrangler whoami`：成功，已登录到 Cloudflare OAuth 账号；输出确认 token 包含 `pages (write)` 权限。具体邮箱与账号 ID 未写入仓库文档，避免公开账号元数据。
- Wrangler 输出提示检测到 proxy environment variables，并会用于 fetch requests。

## 项目创建与部署结果

- `npx wrangler pages project list --json` 初始只发现 `todolist`，未发现 `skilldex`。
- `npx wrangler pages project create --help` 确认支持非交互参数：`project-name` 和 `--production-branch`。
- 执行 `npx wrangler pages project create skilldex --production-branch main` 成功。
- `npm run test`：通过，4 个 test files，20 个 tests。
- 执行 `npm run build` 后，默认 `dist/index.html` 资产路径为 `/assets/...`，适合 Cloudflare root base。
- 执行 `VITE_DEPLOY_TARGET=github-pages npm run build` 后，资产路径为 `/SkillDex/assets/...`，GitHub Pages fallback 仍可构建。
- `npm audit --audit-level=moderate`：通过，0 vulnerabilities。
- 执行 preview deployment：

```bash
npx wrangler pages deploy dist --project-name skilldex --branch codex/skilldex-phase-4-cloudflare-pages
```

Wrangler 输出：

- Wrangler 输出了一个 unique deployment URL。
- Branch alias URL：`https://codex-skilldex-phase-4-cloud.skilldex.pages.dev`

## URL 验证结果

- `https://codex-skilldex-phase-4-cloud.skilldex.pages.dev`：HTTP 200。
- `https://skilldex.pages.dev`：HTTP 404，因为本阶段只部署 preview branch，未部署 `main` production。

## 命令输出摘要

```bash
git status --short --branch
git branch --show-current
git remote -v
git log --oneline -5
wrangler --version
npx --yes wrangler@latest --version
npx wrangler --version
npx wrangler whoami
npx wrangler pages project list --json
npx wrangler pages project create --help
npx wrangler pages project create skilldex --production-branch main
npm run test
npm run build
$env:VITE_DEPLOY_TARGET='github-pages'; npm run build; Remove-Item Env:\VITE_DEPLOY_TARGET
npm audit --audit-level=moderate
npx wrangler pages deploy dist --project-name skilldex --branch codex/skilldex-phase-4-cloudflare-pages
Invoke-WebRequest https://codex-skilldex-phase-4-cloud.skilldex.pages.dev
Invoke-WebRequest https://skilldex.pages.dev
```

## 已知缺口

- Cloudflare production URL 尚未部署；`main` deployment 前不能声明 production 已上线。
- GitHub Actions Cloudflare workflow 只提交 secrets 占位名，真实 secrets 需要在 GitHub repository settings 中配置，不能提交到仓库。
- 当前 preview deployment 是 feature branch 环境；合并到 `main` 前不要把它当作正式作品首页。
- Cloudflare Direct Upload 项目使用 Wrangler/GitHub Actions 直接上传，不是 Cloudflare Git integration。

## Phase 5 建议

- 项目总监批准后，将 Phase 4 合并到 `main` 并触发 Cloudflare production deployment。
- 配置 GitHub Secrets：`CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。
- production deployment 完成后验证 `https://skilldex.pages.dev/` HTTP 200，再更新公开入口说明。
- 如需长期域名，后续再绑定自定义域名；不要在本阶段引入 Workers Functions、数据库或后端。
