# Soul Soother - Design System

## Brand Identity

### Philosophy
Soul Soother is a lightweight, fun healing website for people in extreme emotional states. It uses Gen-Z's favorite abstract self-deprecating humor to help people on the edge of breakdown find a moment of relief through a knowing smile.

**Core Message**: "用抽象接住崩溃，用玩笑降低痛感" (Use absurdity to catch breakdowns, use jokes to reduce pain)

### Personality
- **Warm but not cheesy**: Like a friend who understands your pain without being patronizing
- **Funny but not mocking**: Self-deprecating humor that invites you in, not pushes you away
- **Playful but respectful**: Lighthearted approach to serious topics
- **Mobile-first**: Designed for thumb-scrolling, late-night phone use

## Color System

### Primary Palette
```css
--color-bg: #FAF8F5;           /* Warm off-white, like a soft blanket */
--color-surface: #FFFFFF;       /* Pure white for cards */
--color-primary: #6B9080;       /* Sage green - calming, natural */
--color-primary-light: #A4C3B2; /* Light sage for hover states */
--color-primary-dark: #4A6B5D;  /* Darker sage for text */
--color-accent: #E8A87C;        /* Warm peach - friendly, approachable */
--color-accent-light: #F4D03F;  /* Soft yellow for highlights */
```

### Neutral Palette
```css
--color-text-primary: #2C3E50;   /* Deep blue-gray for readability */
--color-text-secondary: #5D6D7E; /* Medium gray for descriptions */
--color-text-muted: #95A5A6;     /* Light gray for timestamps */
--color-border: #E8E4E0;         /* Warm gray for borders */
--color-border-light: #F0EDE9;   /* Lighter border for subtle separation */
```

### Semantic Colors
```css
--color-night: #1A1A2E;          /* Deep navy for night mode sections */
--color-night-text: #E8E8F0;     /* Soft white for night text */
--color-crisis: #E74C3C;         /* Red for crisis warnings (sparingly) */
--color-success: #27AE60;        /* Green for positive actions */
```

### Gradient Patterns
```css
--gradient-warm: linear-gradient(135deg, #FAF8F5 0%, #F5F0EB 100%);
--gradient-card: linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%);
--gradient-night: linear-gradient(180deg, #1A1A2E 0%, #16213E 100%);
--gradient-accent: linear-gradient(135deg, #E8A87C 0%, #F4D03F 100%);
```

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif;
```

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| --text-hero | 32px | 800 | 1.2 | Page titles |
| --text-title | 24px | 700 | 1.3 | Section headers |
| --text-subtitle | 18px | 600 | 1.4 | Card titles |
| --text-body | 16px | 400 | 1.7 | Body text |
| --text-small | 14px | 400 | 1.5 | Descriptions |
| --text-caption | 12px | 500 | 1.4 | Labels, timestamps |
| --text-tiny | 10px | 500 | 1.3 | Badges |

### Typography Rules
- **Titles**: Tight letter-spacing (-0.02em), bold weight for impact
- **Body**: Comfortable line-height (1.7) for readability
- **Quotes**: Slightly larger (18px), italic feel, generous spacing
- **Chinese optimization**: Slightly wider letter-spacing (0.02em) for body text

## Spacing System

### Base Unit: 4px
| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Icon gaps |
| --space-2 | 8px | Tight padding |
| --space-3 | 12px | Default gaps |
| --space-4 | 16px | Card padding |
| --space-5 | 20px | Section gaps |
| --space-6 | 24px | Large sections |
| --space-8 | 32px | Hero spacing |
| --space-10 | 40px | Major sections |

### Layout
- **Max width**: 500px (mobile-first container)
- **Page padding**: 16px horizontal
- **Card padding**: 20px
- **Section gap**: 24px
- **Border radius**: 20px (cards), 16px (buttons), 12px (small elements)

## Components

### Cards
```css
.card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid var(--color-border-light);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
}
```

### Buttons
```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border-radius: 16px;
  padding: 14px 24px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(107, 144, 128, 0.3);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-primary-light);
  border-radius: 16px;
  padding: 12px 22px;
}
```

### Action Cards (Homepage Grid)
```css
.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 16px;
  background: var(--color-surface);
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid var(--color-border-light);
}

.action-card--primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
}

.action-card--accent {
  background: linear-gradient(135deg, var(--color-accent), #D4896A);
  color: white;
}
```

### Bottom Navigation
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  padding-bottom: env(safe-area-inset-bottom);
}

.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  color: var(--color-text-muted);
  font-size: 10px;
  font-weight: 500;
}

.bottom-nav-item.active {
  color: var(--color-primary);
}

.bottom-nav-item.active .bottom-nav-icon {
  transform: scale(1.1);
}
```

## Animation & Motion

### Principles
- **Purposeful**: Every animation serves a function
- **Subtle**: Never distracting, always enhancing
- **Fast**: 200-300ms for micro-interactions
- **Smooth**: Ease-out curves for natural feel

### Animation Tokens
```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-spring: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Key Animations

**Card Press**
```css
@keyframes cardPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.96); }
  100% { transform: scale(0.98); }
}
```

**Fade In Up**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Float**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

**Pulse Glow**
```css
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(107, 144, 128, 0.2); }
  50% { box-shadow: 0 0 0 8px rgba(107, 144, 128, 0); }
}
```

**Danmu Scroll**
```css
@keyframes danmuScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Scroll Behaviors
- **Guide sections**: Fade in + slide up on scroll (IntersectionObserver)
- **Stagger delay**: 0.05s between sibling elements
- **Threshold**: 15% visibility triggers animation

## Layout Patterns

### Mobile-First Grid
```css
/* Default: 2-column grid for action cards */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Last item spans full width */
.action-grid > *:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}
```

### Section Structure
```
.guide-section
  ├── .guide-section-header
  │     ├── .guide-step-number (circular badge)
  │     └── .guide-step-label
  └── .guide-section-content
```

### Safe Areas
```css
/* iPhone notch support */
--safe-top: env(safe-area-inset-top);
--safe-bottom: env(safe-area-inset-bottom);

body {
  padding-bottom: calc(80px + var(--safe-bottom));
}
```

## Interaction Design

### Touch Targets
- Minimum: 44px × 44px
- Buttons: Full-width on mobile, min-height 48px
- Cards: Entire card is tappable

### Feedback Patterns
- **Tap**: Scale to 0.98, subtle shadow reduction
- **Long press**: Haptic feedback (if available)
- **Swipe**: Smooth momentum scrolling
- **Pull to refresh**: Custom animation with brand color

### State Management
- **Loading**: Skeleton screens with shimmer effect
- **Empty**: Friendly illustration + actionable CTA
- **Error**: Soft error message, never blame user
- **Success**: Subtle checkmark animation

## Content Guidelines

### Tone of Voice
- **Direct**: "今天还好吗？" not "请问您今天感觉如何？"
- **Empathetic**: "撑不住就躺会儿" not "请保持积极心态"
- **Humorous**: "阴暗爬行也算移动" not "每一步都是进步"
- **Non-judgmental**: No "应该", no "必须"

### Emoji Usage
- **Purposeful**: Only when it adds meaning
- **Consistent**: Same emoji for same concept
- **Moderate**: Max 1-2 per sentence
- **Accessible**: Always with text label

### Crisis Language
- **Direct but gentle**: "检测到你可能处于危机中"
- **Actionable**: Provide immediate resources
- **Non-clinical**: Avoid medical jargon
- **Hopeful**: "你并不孤单"

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|-----------|-------|-------------|
| Mobile (default) | < 768px | Single column, full-width cards |
| Tablet | 768px+ | 2-column cards, wider padding |
| Desktop | 1024px+ | Centered container (600px max), side margins |

## Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1 ratio)
- Interactive elements meet WCAG AA (3:1 ratio)
- Never rely on color alone for information

### Motion
- Respect `prefers-reduced-motion`
- Essential animations only for users who prefer reduced motion
- No auto-playing animations that can't be paused

### Touch
- All interactive elements accessible via touch
- Sufficient spacing between touch targets (min 8px)
- No hover-only interactions

## Implementation Notes

### CSS Architecture
- CSS Custom Properties for all design tokens
- Mobile-first media queries
- BEM-like naming for component classes
- Utility classes for common patterns

### Performance
- Use `transform` and `opacity` for animations
- Lazy load images below the fold
- Minimize layout shifts with fixed aspect ratios
- Preload critical fonts

### Browser Support
- Modern browsers (last 2 versions)
- Graceful degradation for older browsers
- Progressive enhancement for new features
