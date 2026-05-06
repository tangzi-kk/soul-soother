# Soul Soother - 内容数据 schema

## 1. 内容条目 (Content Item)

### 1.1 Schema

```json
{
  "id": "string",           // 唯一标识符
  "name": "string",         // 内容名称
  "description": "string",  // 简短描述（50字以内）
  "url": "string",          // 外部链接
  "category": "string",     // 分类：games | websites | tools | tests
  "tags": ["string"],       // 标签数组
  "ratings": {              // 测评维度
    "fun": 1-5,             // 趣味性
    "ease": 1-5,            // 易用性
    "relief": 1-5,          // 情绪缓解感
    "safety": 1-5,          // 安全性
    "lowEnergy": 1-5        // 低能量友好度
  },
  "icon": "string",         // 图标（emoji或SVG路径）
  "color": "string",        // 主题色（用于卡片装饰）
  "featured": boolean,      // 是否推荐
  "isExternal": boolean,    // 是否外部链接
  "notes": "string"         // 内部备注（不展示给用户）
}
```

### 1.2 示例

```json
{
  "id": "pixel-thoughts",
  "name": "Pixel Thoughts",
  "description": "一个60秒的冥想工具，帮你把烦恼放进星星里，看着它慢慢消失",
  "url": "https://www.pixelthoughts.co/",
  "category": "tools",
  "tags": ["放松", "专注", "冥想"],
  "ratings": {
    "fun": 4,
    "ease": 5,
    "relief": 5,
    "safety": 5,
    "lowEnergy": 5
  },
  "icon": "✨",
  "color": "#9fb3c8",
  "featured": true,
  "isExternal": true,
  "notes": "非常经典的冥想工具，适合深夜使用"
}
```

---

## 2. 分类 (Category)

### 2.1 Schema

```json
{
  "id": "string",           // 分类标识
  "name": "string",         // 分类名称
  "description": "string",  // 分类描述
  "icon": "string",         // 分类图标
  "color": "string"         // 分类主题色
}
```

### 2.2 定义

```json
[
  {
    "id": "games",
    "name": "小游戏",
    "description": "简单、无压力的互动体验",
    "icon": "🎮",
    "color": "#81e6d9"
  },
  {
    "id": "websites",
    "name": "治愈网页",
    "description": "让人放松的视觉和听觉体验",
    "icon": "🌊",
    "color": "#9fb3c8"
  },
  {
    "id": "tools",
    "name": "互动工具",
    "description": "实用的放松和调节工具",
    "icon": "🧘",
    "color": "#d2bab0"
  },
  {
    "id": "tests",
    "name": "轻松测试",
    "description": "趣味性的自我探索",
    "icon": "🌈",
    "color": "#e0cec7"
  }
]
```

---

## 3. 标签 (Tag)

### 3.1 Schema

```json
{
  "id": "string",           // 标签标识
  "name": "string",         // 标签名称
  "color": "string"         // 标签颜色
}
```

### 3.2 定义

```json
[
  {
    "id": "relax",
    "name": "放松",
    "color": "#b2f5ea"
  },
  {
    "id": "focus",
    "name": "专注",
    "color": "#d9e2ec"
  },
  {
    "id": "sleep",
    "name": "睡眠",
    "color": "#e0cec7"
  },
  {
    "id": "happy",
    "name": "开心",
    "color": "#f2e8e5"
  },
  {
    "id": "relief",
    "name": "解压",
    "color": "#bcccdc"
  }
]
```

---

## 4. 测评 (Quiz)

### 4.1 Schema

```json
{
  "id": "string",           // 测评标识
  "name": "string",         // 测评名称
  "description": "string",  // 测评描述
  "type": "string",         // 类型：color | energy
  "duration": "string",     // 预计时间
  "questions": [Question],  // 题目数组
  "results": [Result]       // 结果数组
}
```

### 4.2 题目 (Question)

```json
{
  "id": "number",           // 题号
  "text": "string",         // 题目文字
  "type": "string",         // 类型：single | multi | color
  "options": [Option]       // 选项数组
}
```

### 4.3 选项 (Option)

```json
{
  "id": "string",           // 选项标识
  "text": "string",         // 选项文字
  "value": "number",        // 分值
  "color": "string",        // 颜色（颜色题使用）
  "icon": "string"          // 图标
}
```

### 4.4 结果 (Result)

```json
{
  "id": "string",           // 结果标识
  "name": "string",         // 结果名称
  "description": "string",  // 结果描述
  "advice": "string",       // 建议
  "color": "string",        // 结果主题色
  "minScore": "number",     // 最低分
  "maxScore": "number",     // 最高分
  "recommendations": ["string"] // 推荐内容ID数组
}
```

---

## 5. 内容收录标准

### 5.1 收录检查清单

- [ ] **免费**：无需付费、无需订阅
- [ ] **免登录**：无需注册账号
- [ ] **轻量级**：加载快、操作简单
- [ ] **安全**：无广告、无弹窗、无诱导
- [ ] **正向**：内容积极或中性，不触发负面情绪
- [ ] **低能量友好**：不需要高度集中注意力或快速反应
- [ ] **可访问**：链接有效，网站正常运行
- [ ] **中文友好**：有中文界面或操作简单到不需要文字

### 5.2 评分标准

| 维度 | 1星 | 2星 | 3星 | 4星 | 5星 |
|------|-----|-----|-----|-----|-----|
| 趣味性 | 很无聊 | 有点无聊 | 一般 | 有趣 | 非常有趣 |
| 易用性 | 很难用 | 有点难 | 一般 | 容易 | 非常容易 |
| 情绪缓解 | 无效果 | 效果微弱 | 有一定效果 | 效果明显 | 效果显著 |
| 安全性 | 有隐患 | 略有隐患 | 基本安全 | 很安全 | 完全安全 |
| 低能量友好 | 很费力 | 有点费力 | 一般 | 轻松 | 非常轻松 |

---

## 6. 数据文件结构

```
data/
├── contents.json       # 所有内容条目
├── categories.json     # 分类定义
├── tags.json           # 标签定义
└── quizzes.json        # 测评定义
```

### 6.1 contents.json

```json
{
  "version": "1.0",
  "lastUpdated": "2026-05-06",
  "total": 20,
  "items": [
    // Content Item 数组
  ]
}
```

### 6.2 categories.json

```json
{
  "version": "1.0",
  "categories": [
    // Category 数组
  ]
}
```

### 6.3 tags.json

```json
{
  "version": "1.0",
  "tags": [
    // Tag 数组
  ]
}
```

### 6.4 quizzes.json

```json
{
  "version": "1.0",
  "quizzes": [
    // Quiz 数组
  ]
}
```

---

## 7. 内容收录列表（V1.0）

### 7.1 小游戏 (Games)

| 名称 | 链接 | 描述 | 标签 |
|------|------|------|------|
| Fluid Simulation | https://paveldogreat.github.io/WebGL-Fluid-Simulation/ | 流体模拟，鼠标划过产生美丽的色彩流动 | 放松、解压 |
| Silk Drawing | http://weavesilk.com/ | 对称绘画工具，画出美丽的光影图案 | 放松、专注 |
| Neave.TV | https://neave.tv/ | 随机播放有趣的短视频，每次点击都是惊喜 | 开心 |
| Little Alchemy 2 | https://littlealchemy2.com/ | 组合元素创造新物品，简单有趣 | 放松、专注 |
| Windows 93 | https://www.windows93.net/ | 复古操作系统模拟，充满惊喜和彩蛋 | 开心 |

### 7.2 治愈网页 (Websites)

| 名称 | 链接 | 描述 | 标签 |
|------|------|------|------|
| A Soft Murmur | https://asoftmurmur.com/ | 自定义环境音（雨声、雷声、鸟鸣等） | 放松、睡眠、专注 |
| Rainy Mood | https://rainymood.com/ | 雨声背景音，经典治愈 | 放松、睡眠 |
| The Quiet Place | http://www.thequietplaceproject.com/ | 一个安静的角落，让你远离喧嚣 | 放松、专注 |
| Window Swap | https://window-swap.com/ | 看看世界各地陌生人窗外的风景 | 放松、开心 |
| Neave.TV | https://neave.tv/ | 随机播放有趣的短视频 | 开心 |

### 7.3 互动工具 (Tools)

| 名称 | 链接 | 描述 | 标签 |
|------|------|------|------|
| Pixel Thoughts | https://www.pixelthoughts.co/ | 60秒冥想，把烦恼放进星星里 | 放松、专注、冥想 |
| Calm Breathing | https://calm-breathing.com/ | 呼吸引导动画 | 放松、专注 |
| My Noise | https://mynoise.net/ | 高质量白噪音生成器 | 放松、睡眠、专注 |
| The Thoughts Room | http://www.thequietplaceproject.com/thethoughtsroom/ | 把想法敲出来，看着它们消失 | 放松、解压 |
| Weave Silk | http://weavesilk.com/ | 光影绘画，创作美丽的对称图案 | 放松、专注 |

### 7.4 轻松测试 (Tests)

| 名称 | 链接 | 描述 | 标签 |
|------|------|------|------|
| 16Personalities | https://www.16personalities.com/ | MBTI性格测试，了解自己的性格类型 | 专注 |
| The Big Five | https://www.truity.com/test/big-five-personality-test | 大五人格测试 | 专注 |
| Color Quiz | https://www.colorquiz.com/ | 颜色心理测试 | 放松 |

---

## 8. 本地存储 Schema

### 8.1 收藏 (Favorites)

```json
{
  "favorites": ["content-id-1", "content-id-2"]
}
```

### 8.2 测评历史 (Quiz History)

```json
{
  "quizHistory": [
    {
      "quizId": "string",
      "resultId": "string",
      "score": "number",
      "date": "string"
    }
  ]
}
```

### 8.3 设置 (Settings)

```json
{
  "settings": {
    "reduceMotion": false,
    "darkMode": false,
    "fontSize": "normal"
  }
}
```
