# MCP Builder

用于把外部 API 或系统组织成高质量 MCP server，而不是只写一组零散工具。

## Use When

- 需要为 agent 暴露一套稳定的工具接口
- 需要决定用 TypeScript 还是 Python 来实现 MCP server
- 需要补协议理解、工具设计、测试和 evaluation

## Input

- `target_service`：要接入的 API、数据源或系统
- `stack_constraints`：语言偏好、鉴权方式、运行环境

## Returns

- MCP server 的实现路线
- 更适合 agent 发现和调用的 tool 设计建议
- 测试、评估和质量检查清单

## Notes

- 公开版保留协议与工程方法
- 私有密钥、账号配置和组织内部 API 细节需要由使用者自行补充
