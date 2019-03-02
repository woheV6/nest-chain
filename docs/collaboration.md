# 协作规范

!> 不遵守协作规范的 PR 不会被合并

## Git Commit 格式

- 组成部分：标题（必须） + 内容（可选） + 注脚（可选）
- 格式:
  - **标题** 和 **注脚** 为单行
  - **内容** 为单行或多行
    - 组成部分之间使用空行分割
  - **标题** 的组成部分及格式：(type) (scope): (subject)
    - **type** 的取值范围：
      - feat：新功能（feature）
      - fix：修补 bug
      - docs：文档（documentation）
      - style： 格式（不影响代码运行的变动）
      - refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
      - test：增加测试
      - chore：构建过程或辅助工具的变动
  - **脚注** 的规定：
    - BREAKING CHANGE：表示版本不兼容
    - Closes：表示关闭某个 Issue
