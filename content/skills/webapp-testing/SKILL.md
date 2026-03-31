# Webapp Testing

Verify local or staged web applications in a real browser instead of guessing from source code alone.

## Use When

- 需要检查交互流程、按钮行为、表单提交或页面跳转
- 需要抓截图、日志或重现问题路径
- 需要对页面做浏览器级验收，而不是只看静态代码

## Inputs

- `app_url_or_path`：本地地址、页面入口或启动方式
- `verification_goal`：关键流程、问题现象或验收标准
- `auth_mode`：`fresh`、`profile:/path/to/browser-profile`、或 `state:/path/to/playwright-state.json`

## Decision Tree: Choosing Your Approach

1. **先判断是静态页面还是动态应用**
2. **如果页面依赖 JS 渲染，先等待稳定状态**
3. **先侦察，再执行动作**
4. **记录截图、日志和选择器证据，确保可以复跑**

```text
User task -> static HTML?
  Yes -> read HTML -> identify selectors -> automate
  No  -> start or confirm server -> wait for stable state -> inspect -> act
```

## Static HTML Path

如果目标是静态 HTML：

- 直接读 HTML，先找可能的选择器
- 用 Playwright 或等价浏览器自动化脚本验证点击、跳转和文案

## Example: Using with_server.py

如果你的本地工具包提供 server-lifecycle helper，例如 `with_server.py` 或等价脚本，先看它的 `--help`，再让它负责启动服务与等端口就绪。

如果没有 helper，也可以手动先起服务，再运行浏览器自动化。

## Dynamic App Path

如果目标是动态应用：

1. 启动应用服务器，或确认现有服务器已在运行
2. 打开页面后等待 `networkidle` 或其他稳定信号
3. 截图、读取渲染后的 DOM、识别可用选择器
4. 再执行点击、输入、提交、断言

示例：

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="/tmp/inspect.png", full_page=True)
    # ... your automation logic
    browser.close()
```

## Reconnaissance-Then-Action Pattern

1. 先打开页面并等待稳定
2. 截图、查看渲染后的 DOM、识别选择器
3. 再执行点击、输入、提交和断言

## Authenticated Flows

如果测试依赖登录态，公开版也应保留可执行的输入模式：

- `fresh`：从全新会话开始
- `profile:/path/to/browser-profile`：复用一个本地浏览器 profile
- `state:/path/to/playwright-state.json`：加载一个通用 state 文件

应该脱敏的是**个人真实路径和账号内容**，不是“需要登录态”这件事本身。

## Common Pitfall

- 不要在动态页面还没稳定时就读取 DOM
- 不要只凭源码猜选择器，先看渲染后的页面
- 不要只给结论，最好留下截图、日志和可复跑步骤

## Best Practices

- 尽量留下截图、日志和关键选择器证据
- 对动态页面优先等待 `networkidle` 或等价稳定信号
- 如果流程依赖登录态，明确写出 `fresh`、`profile:` 或 `state:` 模式

## Reference Files

- Playwright 官方文档
- 你自己的可复跑脚本或验收步骤

## Returns

- 浏览器内的验证结果
- 截图、日志和问题证据
- 可复跑的自动化步骤或脚本骨架
