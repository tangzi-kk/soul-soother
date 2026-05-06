# Soul Soother - 视觉风格指南

## 1. 设计理念

### 核心概念
**"温柔的陪伴"** —— 像一位安静坐在你身边的朋友，不说话，只是陪着你。

### 设计原则
1. **柔软（Soft）**：无尖锐边缘，无强烈对比
2. **缓慢（Slow）**：动画舒缓，不催促
3. **安全（Safe）**：无压迫感，无评判
4. **简单（Simple）**：低认知负荷，一目了然
5. **温暖（Warm）**：有温度的色彩，有人情味的文字

---

## 2. 色彩系统

### 2.1 主色调 - 雾蓝灰
适合抑郁状态人群的色彩，低饱和、不刺眼，带来平静感。

| 色阶 | 色值 | 用途 |
|------|------|------|
| 50 | `#f0f4f8` | 最浅背景、hover状态 |
| 100 | `#d9e2ec` | 分割线、边框 |
| 200 | `#bcccdc` | 次要边框 |
| 300 | `#9fb3c8` | 禁用状态 |
| 400 | `#829ab1` | 辅助文字 |
| 500 | `#627d98` | 主色、按钮 |
| 600 | `#486581` | 按钮hover、链接 |

### 2.2 暖色调
用于营造温暖、舒适的氛围，避免纯白色的冰冷感。

| 色阶 | 色值 | 用途 |
|------|------|------|
| 50 | `#fdf8f6` | 页面背景 |
| 100 | `#f2e8e5` | 卡片背景、高亮 |
| 200 | `#eaddd7` | hover背景 |
| 300 | `#e0cec7` | 装饰元素 |
| 400 | `#d2bab0` | 图标、装饰 |

### 2.3 强调色 - 薄荷绿
用于需要引起注意但又不刺眼的场景。

| 色阶 | 色值 | 用途 |
|------|------|------|
| 50 | `#e6fffa` | 轻量背景 |
| 100 | `#b2f5ea` | 成功状态、正向反馈 |
| 200 | `#81e6d9` | 按钮、标签 |
| 300 | `#4fd1c5` | 链接、交互元素 |

### 2.4 中性色
用于文字和界面元素。

| 色阶 | 色值 | 用途 |
|------|------|------|
| 50 | `#f7fafc` | 背景 |
| 100 | `#edf2f7` | 卡片背景 |
| 200 | `#e2e8f0` | 边框 |
| 300 | `#cbd5e0` | 禁用文字 |
| 400 | `#a0aec0` | 辅助文字、placeholder |
| 500 | `#718096` | 次要文字 |
| 600 | `#4a5568` | 正文 |
| 700 | `#2d3748` | 标题 |

### 2.5 背景色

| 名称 | 色值 | 用途 |
|------|------|------|
| 主背景 | `#faf9f7` | 页面主背景（暖白色） |
| 次背景 | `#f5f3f0` | 区块背景 |
| 卡片背景 | `#ffffff` | 卡片、浮层 |

### 2.6 文字色

| 名称 | 色值 | 用途 |
|------|------|------|
| 主文字 | `#2d3748` | 标题、重要文字 |
| 次文字 | `#718096` | 正文、描述 |
| 辅助文字 | `#a0aec0` | 时间、标签 |
| 反白文字 | `#ffffff` | 深色背景上的文字 |

---

## 3. 字体规范

### 3.1 字体栈
```css
/* 中文 */
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", sans-serif;

/* 英文/数字 */
font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

### 3.2 字号规范

| 层级 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| 页面标题 | 24px | 500 | 1.4 | 页面大标题 |
| 区块标题 | 20px | 500 | 1.4 | 区块标题 |
| 卡片标题 | 16px | 500 | 1.5 | 卡片标题、列表项 |
| 正文 | 14px | 400 | 1.6 | 正文内容 |
| 辅助文字 | 13px | 400 | 1.5 | 描述、提示 |
| 标签文字 | 12px | 400 | 1.4 | 标签、时间 |

### 3.3 文字排版原则
- **避免大段文字**：抑郁状态人群阅读长文困难，尽量精简
- **段落间距**：段落间距大于行高，增加呼吸感
- **重点突出**：使用颜色或背景高亮，而非加粗（加粗有压迫感）
- **避免全大写**：全大写给人命令感

---

## 4. 间距系统

### 4.1 基础单位
基础单位为 **4px**，所有间距为4的倍数。

### 4.2 常用间距

| 名称 | 值 | 用途 |
|------|-----|------|
| xs | 4px | 图标与文字间距 |
| sm | 8px | 紧凑间距 |
| md | 16px | 卡片内边距、元素间距 |
| lg | 24px | 区块间距 |
| xl | 32px | 页面边距（桌面） |
| 2xl | 48px | 大区块间距 |

### 4.3 页面边距
- 移动端：16px
- 平板：24px
- 桌面：32px（最大宽度680px居中）

---

## 5. 圆角系统

| 名称 | 值 | 用途 |
|------|-----|------|
| sm | 8px | 小按钮、标签 |
| md | 12px | 卡片、输入框 |
| lg | 16px | 大卡片、弹窗 |
| xl | 24px | 特殊卡片、按钮 |
| full | 50% | 圆形元素、头像 |

---

## 6. 阴影系统

使用柔和、弥散的阴影，避免锐利、浓重的阴影。

```css
/* 轻量阴影 - 卡片默认 */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);

/* 中等阴影 - 卡片hover、浮层 */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);

/* 强调阴影 - 弹窗、下拉 */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04);
```

---

## 7. 动画规范

### 7.1 动画原则
- **缓慢**：动画速度要比常规慢，给人从容感
- **柔和**：使用 ease-out 或 ease-in-out，避免线性
- **有意义**：每个动画都有目的，不为了动而动
- **可关闭**：尊重用户偏好，支持 `prefers-reduced-motion`

### 7.2 常用动画

#### 呼吸动画
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
}
/* 周期：4秒，用于呼吸引导 */
```

#### 淡入动画
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
/* 时长：400ms，用于页面加载、内容出现 */
```

#### 悬浮动画
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
/* 周期：3秒，用于装饰元素 */
```

#### 脉冲动画
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
/* 周期：2秒，用于提示、加载 */
```

### 7.3 过渡动画

```css
/* 默认过渡 */
transition: all 0.3s ease-out;

/* 颜色过渡 */
transition: color 0.2s ease-out, background-color 0.2s ease-out;

/* 变换过渡 */
transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
```

---

## 8. 组件规范

### 8.1 按钮

#### 主按钮
```css
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### 次按钮
```css
.btn-secondary {
  background: transparent;
  color: var(--primary-500);
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  border: 1.5px solid var(--primary-200);
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-300);
}
```

#### 文字按钮
```css
.btn-text {
  background: transparent;
  color: var(--primary-500);
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-out;
}
.btn-text:hover {
  color: var(--primary-600);
}
```

### 8.2 卡片

```css
.card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--neutral-100);
  transition: all 0.3s ease-out;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### 8.3 标签

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 400;
  background: var(--primary-50);
  color: var(--primary-500);
}
```

### 8.4 输入框

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1.5px solid var(--neutral-200);
  background: var(--bg-card);
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.2s ease-out;
}
.input:focus {
  outline: none;
  border-color: var(--primary-300);
  box-shadow: 0 0 0 3px var(--primary-50);
}
.input::placeholder {
  color: var(--text-muted);
}
```

---

## 9. 图标规范

### 9.1 图标风格
- 使用线性图标（outline），避免填充图标
- 线条粗细：1.5-2px
- 圆角线帽和圆角连接
- 风格统一：简洁、无多余装饰

### 9.2 图标尺寸

| 尺寸 | 用途 |
|------|------|
| 16px | 按钮内、列表项 |
| 20px | 导航栏、标签 |
| 24px | 功能图标、空状态 |
| 32px | 大功能入口 |

### 9.3 图标颜色
- 默认：var(--text-secondary)
- Hover：var(--primary-500)
- 激活：var(--primary-500)

---

## 10. 响应式断点

| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | 640px | 大手机 |
| md | 768px | 平板 |
| lg | 1024px | 小桌面 |
| xl | 1280px | 桌面 |

### 容器最大宽度
- 移动端：100% - 32px（边距）
- 平板：640px
- 桌面：680px（内容型网站，不宜过宽）

---

## 11. 无障碍设计

### 11.1 色彩对比度
- 正文文字与背景对比度 >= 4.5:1
- 大文字与背景对比度 >= 3:1
- 避免仅使用颜色传达信息

### 11.2 交互无障碍
- 所有交互元素可通过键盘访问
- 焦点状态清晰可见
- 支持屏幕阅读器

### 11.3 动画无障碍
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 11.4 文字无障碍
- 支持浏览器字体大小调整
- 避免固定高度容器
- 行高 >= 1.5

---

## 12. 情绪设计

### 12.1 微文案规范

#### 原则
- **温暖**：像朋友一样说话，不是机器
- **鼓励**：正向表达，避免否定
- **简洁**：短句为主，易于理解
- **无压力**：不使用"必须""应该"等强制性词汇

#### 示例

| 场景 | 不佳 | 优秀 |
|------|------|------|
| 加载中 | "加载中，请稍候..." | "正在准备温暖的内容..." |
| 空状态 | "暂无内容" | "这里还空空的，去逛逛吧~" |
| 错误 | "操作失败" | "哎呀，出了点小问题，再试一次？" |
| 完成 | "操作成功" | "完成了，你真棒 ✨" |
| 离开 | "确定要退出吗？" | "要离开了吗？随时欢迎回来~" |

### 12.2 空状态设计
- 使用温暖的插画或图标
- 文案友好、无责备
- 提供明确的下一步引导

### 12.3 加载状态
- 使用柔和的动画
- 文案温暖，说明正在发生什么
- 避免"加载中"等机械文案

---

## 13. 禁止事项

### 13.1 视觉禁止
- ❌ 高饱和度颜色（纯红、纯黄、荧光色）
- ❌ 强烈对比（纯黑纯白）
- ❌ 尖锐边角
- ❌ 快速闪烁、高频动画
- ❌ 大面积红色或橙色
- ❌ 密集的信息排布

### 13.2 交互禁止
- ❌ 强制注册/登录
- ❌ 弹窗广告、诱导点击
- ❌ 倒计时、限时催促
- ❌ 通知红点、数字角标
- ❌ 社交比较（排行榜、点赞数）
- ❌ 负面评价（"你错了""失败"）

### 13.3 内容禁止
- ❌ 医学诊断或建议
- ❌ 触发负面情绪的内容
- ❌ 暴力、恐怖、自杀相关内容
- ❌ 过度积极的"毒鸡汤"
- ❌ 要求用户"振作起来"等说教
