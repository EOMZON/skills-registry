# GitHub Repo Bootstrap

把一个本地文件夹快速而可靠地变成 GitHub 仓库，而不是手工散落地做初始化、建远端和推送。

## Use When

- 需要给现有本地目录创建 GitHub 仓库
- 需要自动配置 `origin` 并推送 `main`
- 需要排查首次推送时的 PAT、SSH 或权限问题

## Input

- `local_path`：要初始化或推送的本地目录
- `owner_repo`：可选 owner/repo、仓库命名偏好或可见性要求

## Returns

- 已创建的 GitHub 远端仓库
- 已配置的远端和首次推送结果
- 失败时的快速诊断与替代路径

## Notes

- 公开版只保留通用 bootstrap 流程
- 个人 PAT 文件路径和本地环境约定已改成抽象输入
