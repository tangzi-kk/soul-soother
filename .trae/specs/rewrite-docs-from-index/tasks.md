# Tasks

- [x] Task 1: 重写 PRD.md — 根据 index.html 的 SPA 五页架构，重写产品需求文档
  - [x] SubTask 1.1: 更新项目概述，反映 SPA 架构和五个页面模块
  - [x] SubTask 1.2: 更新功能规划，按首页/开心/测评/互助/急救包五个模块描述
  - [x] SubTask 1.3: 更新用户场景，匹配当前实际交互流程
  - [x] SubTask 1.4: 更新技术方案，反映 SPA + 水平滚动 + p5.js 引力场
  - [x] SubTask 1.5: 更新设计规范，引用 Cocoa Ink Palette 和 Google Fonts
  - [x] SubTask 1.6: 更新安全与伦理，反映当前实际的危机检测和求助资源

- [x] Task 2: 重写 DESIGN.md — 根据 css/style.css 的实际设计系统，重写设计文档
  - [x] SubTask 2.1: 更新 Brand Identity，反映"温暖墨水与纸张"设计哲学
  - [x] SubTask 2.2: 更新 Color System，完整列出 Cocoa Ink Palette 所有 CSS 变量
  - [x] SubTask 2.3: 更新 Typography，反映 ZCOOL XiaoWei + Noto Serif SC 字体栈
  - [x] SubTask 2.4: 更新 Spacing System，反映实际 CSS 变量值
  - [x] SubTask 2.5: 更新 Components，反映实际组件样式（state-btn/cta/feed-card 等）
  - [x] SubTask 2.6: 更新 Animation & Motion，反映实际动画定义
  - [x] SubTask 2.7: 更新 Layout Patterns，反映 SPA 水平滚动布局

- [x] Task 3: 重写 README.md — 反映当前项目实际状态
  - [x] SubTask 3.1: 更新项目简介，反映 SPA 架构
  - [x] SubTask 3.2: 更新核心功能列表，与 index.html 五个页面对应
  - [x] SubTask 3.3: 更新技术栈，反映 p5.js 引力场
  - [x] SubTask 3.4: 更新项目结构，反映实际文件布局

- [x] Task 4: 重写 sitemap.md — 反映 SPA 页面结构和导航
  - [x] SubTask 4.1: 更新页面结构，描述 SPA 五页水平滚动架构
  - [x] SubTask 4.2: 更新导航结构，描述顶部圆点导航
  - [x] SubTask 4.3: 更新页面跳转关系，描述 goToPage() 导航逻辑

- [x] Task 5: 重写 style-guide.md — 反映 Cocoa Ink Palette 和实际 CSS 变量
  - [x] SubTask 5.1: 更新色彩系统，完整列出所有 CSS 颜色变量
  - [x] SubTask 5.2: 更新字体规范，反映 Google Fonts 字体栈和实际字号
  - [x] SubTask 5.3: 更新间距系统，反映实际 CSS 间距变量
  - [x] SubTask 5.4: 更新圆角系统，反映实际 CSS 圆角变量
  - [x] SubTask 5.5: 更新阴影系统，反映实际多层阴影
  - [x] SubTask 5.6: 更新动画规范，反映实际动画定义
  - [x] SubTask 5.7: 更新组件规范，反映实际组件样式

- [x] Task 6: 重写 content-schema.md — 反映 js/data.js 的实际数据结构
  - [x] SubTask 6.1: 更新文案数据 schema（dailyQuotes/nightRescue/danmuList）
  - [x] SubTask 6.2: 更新互动工具数据 schema（tools 对象）
  - [x] SubTask 6.3: 更新测评数据 schema（quizzes 数组）
  - [x] SubTask 6.4: 更新治愈合集数据 schema（collections 数组）
  - [x] SubTask 6.5: 更新函数接口描述（getDailyQuote/generateFengwen 等）

- [x] Task 7: 重写参赛帖子.md — 反映当前 SPA 架构和实际功能
  - [x] SubTask 7.1: 更新项目介绍，反映 SPA 五页架构
  - [x] SubTask 7.2: 更新功能展示，与 index.html 五个页面对应
  - [x] SubTask 7.3: 更新技术亮点，反映 p5.js 引力场和 Cocoa Ink 设计系统

# Task Dependencies
- [Task 2] depends on [Task 1] (DESIGN.md 引用 PRD.md 中的设计规范章节)
- [Task 3] depends on [Task 1] (README.md 引用 PRD.md 中的功能描述)
- [Task 4] depends on [Task 1] (sitemap.md 引用 PRD.md 中的页面结构)
- [Task 5] depends on [Task 2] (style-guide.md 引用 DESIGN.md 中的设计系统)
- [Task 6] has no dependency (可并行)
- [Task 7] depends on [Task 1] (参赛帖子引用 PRD.md 中的功能描述)
