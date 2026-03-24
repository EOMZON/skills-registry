# Vercel Deploy

Deploy an existing project to Vercel and handle the final shipping checks.

## Use When

- 你已经有可发布工程
- 你需要上线到 Vercel
- 你可能还需要域名或分析配置

## Input

- `project_path`：项目路径
- `domain`：可选域名

## Returns

- 部署状态
- 线上地址
- 后续配置建议

## Notes

- 公开版不包含任何私有 token 读取路径
- 具体凭据管理应由使用者自己配置
