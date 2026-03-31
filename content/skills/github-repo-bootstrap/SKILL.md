# GitHub Repo Bootstrap

Turn a local folder into a GitHub repo reliably: **prepare local repo -> create remote -> set `origin` -> push `main`**.

## Use When

- 需要给现有本地目录创建 GitHub 仓库
- 需要自动配置 `origin` 并完成首次推送
- 需要排查 PAT、SSH 或权限问题

## Workflow (decision tree)

1. **已有 remote 吗？**
   - 有：不要猜，先确认该用哪个 remote
   - 没有：继续
2. **至少有一个 commit 吗？**
   - 没有：先做初始提交
   - 有：继续
3. **怎么创建远端仓库？**
   - 权限不确定：优先 GitHub Web UI 或 `gh repo create`
   - 批量或自动化：用 `gh api` 或其他脚本化方式
4. **怎么推送？**
   - SSH remote：`git@github.com:<OWNER>/<REPO>.git`
   - HTTPS remote：也可以，但要和你的认证方式一致

## Auth Options

公开版至少要保留这些可执行入口：

- `gh auth login`
- 当前 shell 中提供 `GITHUB_TOKEN` 或 `GH_TOKEN`
- 由调用方显式传入 env 文件路径，例如 `/path/to/.env`

公开版不暴露个人 PAT 存放位置，但不能把“PAT / gh auth / SSH”这些入口一起抹掉。

## Quick runbook (Codex CLI friendly)

### A) Prepare Local Repo

```bash
git status -sb
git init
git add -A
git commit -m "init"
git branch -M main
```

如果目录本来已经是 repo，就跳过 `git init`。

### B) Create GitHub repo (API / CLI)

最直接的公开方式：

```bash
gh repo create <repo-name> --private --source=. --remote=origin --push
```

如果你要显式指定 owner 或走 API：

```bash
gh api -X POST /user/repos -f name=<repo-name> -F private=true
```

组织仓库：

```bash
gh api -X POST /orgs/<org>/repos -f name=<repo-name> -F private=true
```

如果你更偏好 SSH remote，也可以创建后手动设置：

```bash
git remote add origin git@github.com:<OWNER>/<REPO>.git
git push -u origin main
```

### C) Add remote + push

如果 `gh repo create` 没直接帮你完成推送，可以手动执行：

```bash
git remote add origin git@github.com:<OWNER>/<REPO>.git
git push -u origin main
```

## Common failures (fast diagnosis)

- **403 `Resource not accessible by personal access token`**
  - Fine-grained PAT 往往受限，无法创建新 repo
  - 解决：改用 classic PAT、`gh auth login`，或直接走 Web UI

- **404 when calling `/orgs/<ORG>/repos`**
  - 通常是 token 没有组织权限，或你没有该组织的建仓权限

- **SSH push fails**
  - 检查本机 SSH key、网络出口，以及 GitHub 账号是否已登记公钥

## Security rules

- 不要打印 token
- 不要提交 `.env`
- token 文件如果必须存在，权限尽量收紧，例如 `chmod 600`

## Included resources

额外的 API 说明在 `references/github-api.md`。
