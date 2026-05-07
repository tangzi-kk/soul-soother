# 根据实际 index.html 改写相关文档 Spec

## Why
当前 `index.html` 已从多页面架构演化为单页应用（SPA），采用水平滚动导航、Cocoa Ink 配色、Google Fonts 字体等，但 PRD.md、DESIGN.md、README.md、sitemap.md、style-guide.md、content-schema.md 等文档仍描述旧版多页面架构和旧设计系统，导致文档与代码严重脱节。

## What Changes
- 重写 PRD.md：反映 SPA 五页架构（首页/开心/测评/互助/急救），更新功能模块、用户场景、技术方案
- 重写 DESIGN.md：反映 Cocoa Ink Palette 配色、Google Fonts 字体、顶部圆点导航、SPA 布局模式
- 重写 README.md：反映当前项目结构、SPA 架构、实际功能列表
- 重写 sitemap.md：反映 SPA 页面结构和导航关系
- 重写 style-guide.md：反映 Cocoa Ink Palette、ZCOOL XiaoWei/Noto Serif SC 字体、实际 CSS 变量体系
- 重写 content-schema.md：反映 data.js 中的实际数据结构
- **BREAKING** 删除对多页面架构（quiz.html/collection.html/tools.html/about.html 独立页面）的描述

## Impact
- Affected specs: PRD.md, DESIGN.md, README.md, sitemap.md, style-guide.md, content-schema.md
- Affected code: 无代码变更，仅文档改写

## ADDED Requirements

### Requirement: SPA 五页架构文档
文档系统 SHALL 准确描述当前 index.html 的单页应用架构，包含五个水平滚动页面：首页、开心一秒、测评、互助、急救包。

#### Scenario: 文档与代码一致
- **WHEN** 开发者阅读 PRD.md
- **THEN** 功能模块描述与 index.html 中的五个页面完全对应

### Requirement: Cocoa Ink 设计系统文档
文档系统 SHALL 准确描述当前 CSS 中实际使用的设计系统，包括 Cocoa Ink Palette 配色、Google Fonts 字体栈、实际 CSS 变量。

#### Scenario: 设计系统与代码一致
- **WHEN** 开发者阅读 DESIGN.md 或 style-guide.md
- **THEN** 配色值、字体栈、间距值与 css/style.css 中的 CSS 变量完全一致

### Requirement: 数据结构文档
content-schema.md SHALL 准确描述 js/data.js 中的实际数据结构，包括 dailyQuotes、nightRescue、danmuList、tools、quizzes、collections 等变量。

#### Scenario: 数据结构描述与代码一致
- **WHEN** 开发者阅读 content-schema.md
- **THEN** 数据字段与 js/data.js 中的实际变量和属性完全对应

## MODIFIED Requirements

### Requirement: 项目结构文档
README.md 和 sitemap.md SHALL 描述当前实际项目结构：
- index.html 作为唯一入口（SPA）
- 旧的 quiz.html/collection.html/tools.html/about.html 作为遗留文件存在但非主入口
- css/style.css 为唯一样式文件
- js/data.js + js/app.js + js/p5-gravity.js 为核心逻辑

### Requirement: 功能模块文档
PRD.md SHALL 按以下五个模块描述功能：
1. **首页**：免责声明、深夜急救包、主标题 Hero、状态入口按钮、今日精神天气、今日抽象、快速入口
2. **开心一秒**：随机投喂、低能量小游戏、发疯工具（发疯文学生成器+坏念头翻译机）、治愈网页推荐
3. **测评**：测评列表、答题流程、结果展示（含推荐）
4. **互助**：互助卡抽取、深夜弹幕墙、留一句给陌生人
5. **急救包**：30秒缓冲、求救卡（轻度/中度/高危）、紧急资源、安全声明

## REMOVED Requirements

### Requirement: 多页面架构描述
**Reason**: index.html 已改为 SPA，旧的多页面描述不再适用
**Migration**: 旧页面文件（quiz.html/collection.html/tools.html/about.html）仍保留在仓库中作为遗留，但文档不再将其作为主要架构描述
