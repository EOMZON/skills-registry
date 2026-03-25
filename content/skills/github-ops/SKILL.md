# GitHub Ops

把 GitHub 日常操作压成一套安全默认的 gh + git workflow，而不是临时拼命令。

## Use When

- 需要处理仓库、PR、Issue、Release、Actions、Secrets 或权限
- 需要在 `gh`、`git` 和 `gh api` 之间选合适的工具层级
- 需要在不泄露凭据的前提下做 GitHub 运维

## Input

- `repo_target`：目标仓库、组织或本地仓库路径
- `operation_goal`：要完成的具体 GitHub 操作

## Returns

- 安全默认下的执行路径
- 可复制命令或已经完成的 GitHub 操作
- 历史、权限和 secrets 相关的风险提示

## Notes

- 公开版保留操作模型和安全原则
- 私有 token 文件位置和个人 wrapper 默认值不在公开版暴露
