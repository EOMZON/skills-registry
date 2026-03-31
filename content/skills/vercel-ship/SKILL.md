# Vercel Ship

Turn release into a repeatable pipeline: **git commit / push -> Vercel deploy -> analytics -> optional custom domain**.

## Use When

- 想把本地项目一口气 ship 到 GitHub 与 Vercel
- 想把 preview / prod、analytics 和域名绑定收敛成一条流程
- 需要稳定的发布顺序，而不是手工拼命令

## 默认模式：不问问题，直接按规则执行

除非遇到缺少凭据、无法自动判断、或存在安全风险，否则不要把发布过程变成长问答。

### 默认值（按公开版通用习惯）

- 若 `./html/index.html` 存在，优先部署 `./html/`
- 否则部署当前项目目录
- 默认当作静态站；只有检测到框架特征时才切到框架逻辑
- 默认发布到 production：`vercel deploy --prod --yes`
- 如果用户没有要求自定义域名，保留 `*.vercel.app` 即可

### 覆盖默认值（用户一句话即可）

用户可以自然语言覆盖这些默认值，例如：

- “部署目录改为 `path/to/app`”
- “这次不要 push”
- “只要 preview，不要 prod”
- “域名改成 `your-subdomain.example`”

## 0) 安全前置（必须做）

- 不要提交 `.env*`、`*.pem`、`*.key`、token 文件
- 永远不要提交 `.vercel/`
- push 之前先看一次 staged files 和 `git diff --cached --stat`

建议检查：

```bash
git diff --cached --name-only | rg -n "^(\\.env($|\\.)|\\.vercel/|.*\\.(pem|key)$)" | rg -v -n "^\\.env\\.(example|sample|template)$" || true
```

## 1) Git：初始化 / 提交 / 默认 push

### A) 如果目录还不是 git repo：初始化

如果目录还不是 git repo：

```bash
git init
```

### B) 暂存 -> 提交（默认）

```bash
git status
git add -A
git diff --cached --stat
git commit -m "chore: ship"
```

`.gitignore` 至少应覆盖：

```gitignore
.DS_Store
.vercel
node_modules
dist
.env
.env.*
!.env.example
!.env.sample
!.env.template
```

### C) 默认 push 到远端；若无 remote 则自动创建 GitHub repo

#### 1) 检查是否已有 `origin`

先检查是否已有 `origin`：

```bash
git remote get-url origin
```

#### 2) 若没有 `origin`：用公开可执行方式创建 repo 并配置 remote

如果没有远端，可以选一种公开可执行的方式：

- 已登录 GitHub CLI：`gh repo create <repo-name> --private --source=. --remote=origin --push`
- 或先用配套的 repo bootstrap 流程创建远端，再执行：

```bash
git branch -M main
git push -u origin main
```

认证入口应至少保留以下任一种：

- `gh auth login`
- 当前 shell 中提供 `GH_TOKEN` 或 `GITHUB_TOKEN`
- 调用方自己指定一个 `.env` 文件路径，例如 `/path/to/.env`

公开版不暴露个人 token 文件位置，但不能把认证入口一起删掉。

#### 3) push（默认）

```bash
git branch -M main
git push -u origin main
```

## 2) Vercel：部署（默认 prod）

满足下面任一方式即可：

- 先执行 `vercel login`
- 在当前 shell 提供 `VERCEL_TOKEN`

部署命令：

```bash
vercel deploy --prod --yes
```

monorepo 子目录：

```bash
vercel deploy --cwd path/to/app --prod --yes
```

如果只做预览：

```bash
vercel deploy
```

## 3) Analytics：默认启用 / 接入

### 静态站点（HTML）

```html
<script defer src="/_vercel/insights/script.js"></script>
```

### Next.js

```bash
npm i @vercel/analytics
```

```tsx
import { Analytics } from "@vercel/analytics/react";

<Analytics />
```

## 4) 域名：默认保留 `*.vercel.app`，需要时再绑定自定义域名

如果需要自定义域名：

```bash
vercel domains add your-subdomain.example <project-name>
vercel domains inspect your-subdomain.example
```

DNS 以 `vercel domains inspect` 输出为准。常见子域名方式：

- `CNAME`：`subdomain` -> `cname.vercel-dns.com`
- 某些场景下 Vercel 也可能要求 `A` 记录

## 5) 验收

发布完成后至少记录：

- 最新 commit hash
- prod URL（或 preview URL）
- 自定义域名状态
- 是否还有手工 DNS 步骤待完成

## 故障排查（快速）

- `*.vercel.app` 无法访问：先用 `vercel inspect <url>` 判断是部署问题还是网络环境问题
- 子页面 404：检查目录结构、构建输出和 `trailingSlash`
- Analytics 没数据：确认接入已上线，并等待回传延迟
