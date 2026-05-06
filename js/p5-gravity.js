/**
 * Soul Soother - p5.js 文字引力场
 * 每个页面的背景交互效果
 */

// ========================================
// 全局配置参数
// ========================================
var GRAVITY_CONFIG = {
  // 画布设置
  canvas: {
    width: 393,           // 画布宽度（iPhone 逻辑像素）
    height: 852,          // 画布高度
    backgroundColor: '#fdfaf3'  // 背景色：Canvas Parchment
  },

  // 文字设置
  text: {
    content: '用抽象接住崩溃用玩笑降低痛感你不是一个人每个崩溃的瞬间都值得被温柔对待',  // 显示文本内容
    fontSize: 13,         // 初始文字字号（像素）
    color: '#e8e0d4',     // 初始文字颜色（HEX）- 比背景稍深的暖色
    strokeColor: '#000000', // 文字描边颜色（HEX）
    strokeWeight: 0,      // 文字描边粗细（0为无描边）
    letterSpacing: 4,     // 字距（像素）
    lineSpacing: 28,      // 行距（像素）
    margin: 20            // 四边页边距（像素）
  },

  // 圆点设置
  dot: {
    color: '#e73737',     // 圆点颜色（HEX）：Alert Crimson
    size: 5,              // 圆点直径（像素）
    positionRange: {      // 圆点生成位置范围（像素）
      x: [30, 363],
      y: [80, 750]
    },
    generationInterval: 8  // 每隔多少帧生成一个新圆点
  },

  // 吸引力设置
  attraction: {
    countRange: [10, 25], // 每个圆点吸引字符的数量范围
    safeDistance: 18,     // 被吸引字符之间的最小间距（像素）
    speed: 0.05,          // 吸引移动速度（插值系数）
    targetFontSize: 20,   // 被吸引字符的目标字号
    targetColors: [        // 被吸引字符可选目标颜色（HEX）
      '#472425',          // Cocoa Ink
      '#e73737',          // Alert Crimson
      '#121212'           // Deep Charcoal
    ]
  },

  // 直线设置
  line: {
    color: '#e8e0d4',     // 圆点下方直线颜色（HEX）
    thickness: 1,         // 直线粗细（像素）
    lengthRange: [40, 80] // 直线长度范围（像素）
  }
};

// ========================================
// 全局变量
// ========================================
var gravitySketch = null;
var chars = [];
var dots = [];
var frameCounter = 0;

/**
 * 初始化引力场
 * @param {string} containerId - 容器元素ID
 * @param {Object} customConfig - 自定义配置（可选）
 */
function initGravityField(containerId, customConfig) {
  // 合并自定义配置
  if (customConfig) {
    deepMerge(GRAVITY_CONFIG, customConfig);
  }

  var container = document.getElementById(containerId);
  if (!container) {
    console.error('[Gravity] 容器未找到:', containerId);
    return;
  }

  // 如果已存在，先移除
  if (gravitySketch) {
    gravitySketch.remove();
  }

  // 创建 p5 实例
  gravitySketch = new p5(function(p) {
    // ========================================
    // p5.js 生命周期函数
    // ========================================

    p.setup = function() {
      var canvas = p.createCanvas(
        GRAVITY_CONFIG.canvas.width,
        GRAVITY_CONFIG.canvas.height
      );
      canvas.parent(containerId);

      // 设置文字属性
      p.textFont('Arial, Helvetica, sans-serif');
      p.textSize(GRAVITY_CONFIG.text.fontSize);

      // 初始化文字
      initChars(p);
    };

    p.draw = function() {
      p.background(GRAVITY_CONFIG.canvas.backgroundColor);

      // 绘制圆点和直线
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];

        // 绘制直线
        p.stroke(GRAVITY_CONFIG.line.color);
        p.strokeWeight(GRAVITY_CONFIG.line.thickness);
        p.line(d.x, d.y, d.x, d.y + d.lineLength);

        // 绘制圆点
        p.noStroke();
        p.fill(d.color);
        p.ellipse(d.x, d.y, d.size, d.size);

        // 吸引文字
        attractChars(d, i);
      }

      // 绘制文字
      for (var j = 0; j < chars.length; j++) {
        var c = chars[j];

        // 平滑移动
        c.x += (c.targetX - c.x) * GRAVITY_CONFIG.attraction.speed;
        c.y += (c.targetY - c.y) * GRAVITY_CONFIG.attraction.speed;

        // 绘制文字
        p.push();
        p.translate(c.x, c.y);

        // 描边
        if (GRAVITY_CONFIG.text.strokeWeight > 0) {
          p.stroke(GRAVITY_CONFIG.text.strokeColor);
          p.strokeWeight(GRAVITY_CONFIG.text.strokeWeight);
        } else {
          p.noStroke();
        }

        p.fill(c.color);
        p.textSize(c.fontSize);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(c.char, 0, 0);
        p.pop();
      }

      // 自动生成圆点
      frameCounter++;
      if (frameCounter % GRAVITY_CONFIG.dot.generationInterval === 0) {
        var hasUnattracted = false;
        for (var k = 0; k < chars.length; k++) {
          if (!chars[k].attracted) {
            hasUnattracted = true;
            break;
          }
        }
        if (hasUnattracted && dots.length < 8) {
          generateDot(p);
        }
      }
    };

    p.mousePressed = function() {
      // 检查点击是否在画布内
      if (p.mouseX > 0 && p.mouseX < p.width &&
          p.mouseY > 0 && p.mouseY < p.height) {
        createGravityDot(p.mouseX, p.mouseY);
      }
    };

    p.touchStarted = function() {
      if (p.touches.length > 0) {
        var touch = p.touches[0];
        if (touch.x > 0 && touch.x < p.width &&
            touch.y > 0 && touch.y < p.height) {
          createGravityDot(touch.x, touch.y);
        }
      }
      return false;
    };

  });
}

// ========================================
// 文字初始化
// ========================================
function initChars(p) {
  chars = [];
  var x = GRAVITY_CONFIG.text.margin;
  var y = GRAVITY_CONFIG.text.margin + 60;
  var content = GRAVITY_CONFIG.text.content;

  for (var i = 0; i < content.length; i++) {
    var ch = content[i];
    var chWidth = p.textWidth(ch) + GRAVITY_CONFIG.text.letterSpacing;

    // 自动换行
    if (ch === '\n' || x + chWidth > GRAVITY_CONFIG.canvas.width - GRAVITY_CONFIG.text.margin) {
      x = GRAVITY_CONFIG.text.margin;
      y += GRAVITY_CONFIG.text.lineSpacing;
      if (ch === '\n') continue;
    }

    chars.push({
      char: ch,
      originX: x,
      originY: y,
      x: x,
      y: y,
      targetX: x,
      targetY: y,
      attracted: false,
      dotIndex: -1,
      fontSize: GRAVITY_CONFIG.text.fontSize,
      color: GRAVITY_CONFIG.text.color
    });

    x += chWidth;
  }
}

// ========================================
// 生成圆点
// ========================================
function generateDot(p) {
  var x = p.random(
    GRAVITY_CONFIG.dot.positionRange.x[0],
    GRAVITY_CONFIG.dot.positionRange.x[1]
  );
  var y = p.random(
    GRAVITY_CONFIG.dot.positionRange.y[0],
    GRAVITY_CONFIG.dot.positionRange.y[1]
  );

  createGravityDot(x, y);
}

function createGravityDot(x, y) {
  dots.push({
    x: x,
    y: y,
    color: GRAVITY_CONFIG.dot.color,
    size: GRAVITY_CONFIG.dot.size,
    lineLength: randomRange(
      GRAVITY_CONFIG.line.lengthRange[0],
      GRAVITY_CONFIG.line.lengthRange[1]
    ),
    attractedChars: [],
    targetCount: Math.floor(randomRange(
      GRAVITY_CONFIG.attraction.countRange[0],
      GRAVITY_CONFIG.attraction.countRange[1]
    ))
  });
}

// ========================================
// 吸引文字
// ========================================
function attractChars(dot, dotIndex) {
  if (dot.attractedChars.length >= dot.targetCount) return;

  // 找到最近的未被吸引的文字
  var candidates = [];
  for (var i = 0; i < chars.length; i++) {
    if (!chars[i].attracted) {
      var dx = chars[i].x - dot.x;
      var dy = chars[i].y - dot.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      candidates.push({ index: i, distance: distance });
    }
  }

  // 按距离排序
  candidates.sort(function(a, b) {
    return a.distance - b.distance;
  });

  // 吸引最近的几个
  var toAttract = Math.min(2, dot.targetCount - dot.attractedChars.length);
  for (var i = 0; i < toAttract && i < candidates.length; i++) {
    var ci = candidates[i].index;

    // 检查安全距离
    var tooClose = false;
    for (var j = 0; j < dot.attractedChars.length; j++) {
      var aj = dot.attractedChars[j];
      var ddx = chars[ci].x - chars[aj].x;
      var ddy = chars[ci].y - chars[aj].y;
      var d = Math.sqrt(ddx * ddx + ddy * ddy);
      if (d < GRAVITY_CONFIG.attraction.safeDistance) {
        tooClose = true;
        break;
      }
    }

    if (!tooClose) {
      chars[ci].attracted = true;
      chars[ci].dotIndex = dotIndex;
      chars[ci].targetX = dot.x + randomRange(-25, 25);
      chars[ci].targetY = dot.y - randomRange(12, 40);
      chars[ci].fontSize = GRAVITY_CONFIG.attraction.targetFontSize;
      chars[ci].color = randomChoice(GRAVITY_CONFIG.attraction.targetColors);
      dot.attractedChars.push(ci);
    }
  }
}

// ========================================
// 工具函数
// ========================================

/**
 * 随机范围
 */
function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * 随机选择
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 深度合并对象
 */
function deepMerge(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null &&
          typeof target[key] === 'object' && target[key] !== null) {
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
}

/**
 * 销毁引力场
 */
function destroyGravityField() {
  if (gravitySketch) {
    gravitySketch.remove();
    gravitySketch = null;
  }
  chars = [];
  dots = [];
  frameCounter = 0;
}

// 暴露全局 API
window.GravityP5 = {
  init: initGravityField,
  destroy: destroyGravityField,
  config: GRAVITY_CONFIG
};
