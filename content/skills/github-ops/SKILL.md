# GitHub Ops

Use `gh`, `git`, and `gh api` as a layered GitHub operations playbook with safe defaults.

## Use When

- 需要处理 repo、PR、Issue、Release、Actions、Secrets 或权限
- 需要在 `gh`、`git` 和 `gh api` 之间选合适的工具层级
- 需要在不泄露凭据的前提下做 GitHub 运维

## Best-minds mental model（默认心法）

- **Junio C Hamano**：默认选择可逆操作；重写历史前先保证可追溯和可回滚
- **Scott Chacon**：把 Git 当作提交 DAG，清晰历史本身就是产品的一部分
- **GitHub Flow**：小步提交、PR 合并、让 `main` 尽量始终可部署

## Default workflow（先问清楚再动手）

1. **先确认上下文**：目标 repo、默认分支、是要改代码还是只做 GitHub 配置
2. **先做鉴权体检**：优先 `gh auth status`
3. **优先走 PR**：除非用户明确授权，否则不要默认直推 `main`
4. **破坏性操作二次确认**：删 repo、改保护规则、强推、重写历史都要先确认
5. **工具优先级**：`gh` -> `git` -> `gh api`

## Auth Sources

公开版应保留可执行的认证入口，而不是只说“凭据自行配置”。

可用入口：

- `gh auth login`
- 当前 shell 中提供 `GH_TOKEN` 或 `GITHUB_TOKEN`
- 如果你的自动化需要 env 文件，由调用方显式提供路径，例如 `/path/to/.env`

不要打印 token，也不要让用户把 token 粘贴到聊天里。

## Safety baseline（必须遵守）

- 默认不输出 secrets
- 默认不重写历史；如果必须强推，优先 `git push --force-with-lease`
- 默认不删不破坏；删除 repo、release、tag 或修改 branch protection 前先确认目标与后果

## Command cookbook（按需加载）

优先使用公开、原生、可复制的命令：

- Repo：`gh repo view`、`gh repo create`、`gh repo edit`
- PR：`gh pr create --fill`、`gh pr view`、`gh pr merge`
- Issue：`gh issue list`、`gh issue create`、`gh issue comment`
- Actions：`gh workflow list`、`gh run list`、`gh run watch`
- Git：`git fetch --all --prune`、`git rebase origin/main`、`git revert <sha>`
- API gap fill：`gh api repos/{owner}/{repo}/...`

详细命令清单在 `references/commands.md`。

## History Discipline

- 线性历史优先时，用 `rebase`
- 共享分支上的回滚优先 `git revert`
- 误操作恢复优先看 `git reflog`

## Bundled script（可选：无交互 token 注入）

如果你的本地工具链额外提供 wrapper，它只能作为可选糖层。

公开版的默认入口仍然应该是：

- `gh auth login`
- `gh auth status`
- 原生 `gh` / `git` / `gh api`

## Public Redaction Rule

可以脱敏的，是个人 token 文件路径、私有 wrapper 默认值、个人账号偏好。

不应该删掉的，是：

- `GH_TOKEN` / `GITHUB_TOKEN` 这类公开环境变量名
- `gh auth login` / `gh auth status` 这类公开认证入口
- `gh` / `git` / `gh api` 的原生命令面
