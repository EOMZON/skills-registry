# Handdrawn Run Report

把图像生成的一次运行整理成可打印、可复查、可分享的 HTML 报告。

## Use When

- 已经有输出图片和对应的 meta JSON
- 需要保留 prompt、参数、结果和复现命令
- 需要把一次运行沉淀成更适合展示或审计的页面

## Input

- `meta_json`：包含 prompt、模型、尺寸和时间的运行元数据
- `image_files`：输出图片文件

## Returns

- 单文件 HTML 报告
- 图片预览、prompt 与参数记录
- 复现和审计所需的上下文

## Notes

- 公开版只保留通用生成报告的流程
- 本地项目路径和私有素材位置已抽象成通用输入
