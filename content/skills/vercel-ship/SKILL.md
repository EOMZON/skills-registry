# Vercel Ship

把“提交、推送、部署、分析、域名”串成一条可以重复执行的 ship 流水线。

## Use When

- 想把本地项目一口气 ship 到 GitHub 与 Vercel
- 想把 preview/prod、analytics 与域名处理成统一入口
- 需要一个稳定的发布流程，而不是手工拼几段命令

## Input

- `project_path`：待发布项目路径
- `shipping_overrides`：preview/prod、push、域名等覆盖项

## Returns

- 已提交并推送的 Git 状态
- Vercel 部署结果与线上地址
- 域名、Analytics 与后续验收信息

## Notes

- 公开版保留 ship 的结构与安全前置
- 私有 token 文件位置、个人默认域名和本地路径约定已被通用化
