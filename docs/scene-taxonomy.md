# Scene Taxonomy

Public navigation is scenario-first.

## Scenes

1. `research-decision` -> 调研与决策
2. `writing-docs` -> 写作与文档
3. `design-visual` -> 设计与视觉
4. `website-frontend` -> 网站与前端
5. `coding-engineering` -> 编程与工程
6. `automation-shipping` -> 自动化与交付
7. `product-project` -> 项目与产品推进

## Rules

- Every public skill gets exactly one primary `scene`.
- Tool names are not scenes.
- Platform names usually belong in `keywords` or `dependencies`.
- Use `subscenes` for narrower routing without adding another public taxonomy layer.

## Examples

- `frontend-design` -> `website-frontend`
- `best-minds` -> `research-decision`
- `vercel-deploy` -> `automation-shipping`
- `doc-coauthoring` -> `writing-docs`
- `mcp-builder` -> `coding-engineering`
