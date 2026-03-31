# Vercel Deploy

Deploy a new or existing project to Vercel, wire analytics, optionally attach a custom domain, and verify the final URLs.

## Use When

- 你已经有一个可发布工程，想把它上线到 Vercel
- 你需要区分 preview 和 production
- 你可能还需要自定义域名或 Analytics 接入

## 0) 先问 4 个问题（必须）

在执行前先确认这 4 项：

1. **项目路径**：是已有项目，还是要先生成一个静态站骨架？
2. **项目类型**：静态 HTML，还是框架 / monorepo 子目录？
3. **发布目标**：preview 还是 prod？
4. **域名策略**：只用 `*.vercel.app`，还是绑定 `your-subdomain.example`？

## Credentials

满足下面任一方式即可：

- 先执行 `vercel login`
- 在当前 shell 提供 `VERCEL_TOKEN`

公开版不暴露任何私有 token 文件位置，但必须保留“如何提供凭据”的入口。

## 1) 最短路径（静态站点，推荐）

### A) 生成一个全新静态站点（可选）

如果你还没有项目骨架，先准备一个最小静态站：

- `index.html`
- `vercel.json`（如需 `trailingSlash` 等行为）
- `.gitignore`（至少忽略 `.vercel`）

### B) 部署（Vercel CLI）

然后在项目目录执行：

```bash
vercel
```

生产发布：

```bash
vercel --prod
```

## 2) 现有项目（框架/Monorepo）部署要点

### A) Root Directory

Vercel 部署“吃的是一个目录”。

- 单项目：直接在项目目录运行 `vercel`
- monorepo：用 `vercel --cwd path/to/project`

### B) Analytics（两种常见方式）

静态站点：在 HTML `<head>` 添加：

```html
<script defer src="/_vercel/insights/script.js"></script>
```

Next.js：

```bash
npm i @vercel/analytics
```

```tsx
import { Analytics } from "@vercel/analytics/react";

<Analytics />
```

## 3) 绑定自定义域名（例如 `your-subdomain.example`）

最稳路径：先完成部署，再把域名加到项目并按 Vercel 提示配置 DNS。

```bash
vercel domains add your-subdomain.example <project-name>
```

检查域名状态：

```bash
vercel domains inspect your-subdomain.example
```

子域名常见做法：

- `CNAME`：`subdomain` -> `cname.vercel-dns.com`

注意：

- DNS 需要在你的域名服务商或 DNS 提供商里完成
- 生效时间可能从几分钟到几小时不等

## 4) 验证与交付

交付时至少记录：

- Vercel project 名称
- Production URL（`*.vercel.app`）
- 自定义域名状态
- 如果有问题，用 `vercel inspect <url>` 核查部署是否 `Ready`

## 5) 常见坑（快速排查）

- `*.vercel.app` 打不开：先用 `vercel inspect <url>` 判断是网络环境问题还是部署失败
- 子页面 404：检查目录结构、`trailingSlash` 和静态输出方式
- Analytics 没数据：确认项目内已开启对应接入，并等待回传延迟
