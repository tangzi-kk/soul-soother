/**
 * Soul Soother - Semantic Gravity 文字引力场
 * 基于 algorithmic-philosophy.md 的全屏背景动效
 * 
 * 哲学：文字是承载文化重量的粒子，在用户创造的引力井中重新排列组合
 * 实现：多层噪声驱动的流场 + 引力井 + 轨道力学 + 语义星座
 */

// ========================================
// 全局配置参数
// ========================================
var GRAVITY_CONFIG = {
  canvas: {
    width: 393,
    height: 852,
    backgroundColor: "#f9f8f4"
  },
  text: {
    content: "用抽象接住崩溃用玩笑降低痛感你不是一个人每个崩溃的瞬间都值得被温柔对待允许自己今天不营业累了就歇困了就睡你的存在本身就是意义撑不住就躺会儿不丢人世界很吵你可以先静音阴暗爬行也算移动没有发光也没事萤火虫也不是天天营业今日份活着已打卡人生先别优化先保活你不用重启人生先重启浏览器今天只要没爆炸就算系统稳定运行先这样也可以哭完记得喝水你不是废物你是加载中你的问题不是废是启动成本高再坚持一下等早餐店开门先吃个包子再说",
    fontSize: 11,
    color: "#333333",
    strokeColor: "#000000",
    strokeWeight: 0,
    letterSpacing: 0,
    lineSpacing: 8,
    margin: 10
  },
  dot: {
    color: "#80705f",
    size: 4,
    positionRange: {
      x: [50, 343],
      y: [50, 750]
    },
    generationInterval: 5
  },
  attraction: {
    countRange: [30, 55],
    safeDistance: 24,
    speed: 0.06,
    targetFontSize: 24,
    targetColors: [
      "#63a648",
      "#8ec492",
      "#e6efb3"
    ],
    orbitRadius: 30,
    orbitSpeed: 0.02
  },
  line: {
    color: "#978674",
    thickness: 2,
    lengthRange: [70, 100]
  }
};

// ========================================
// 全局变量
// ========================================
var gravitySketch = null;
var chars = [];
var dots = [];
var frameCounter = 0;
var canvasContainer = null;

// 噪声参数
var noiseScale = 0.01;
var noiseSpeed = 0.01;

/**
 * 初始化引力场
 * @param {string} containerId - 容器元素ID
 */
function initGravityField(containerId) {
  canvasContainer = document.getElementById(containerId);
  if (!canvasContainer) {
    console.error('[Gravity] 容器未找到:', containerId);
    return;
  }

  // 如果已存在，先移除
  if (gravitySketch) {
    gravitySketch.remove();
  }

  // 清空容器
  canvasContainer.innerHTML = '';

  // 创建 p5 实例
  gravitySketch = new p5(function(p) {

    p.setup = function() {
      var canvas = p.createCanvas(
        GRAVITY_CONFIG.canvas.width,
        GRAVITY_CONFIG.canvas.height
      );
      canvas.parent(containerId);
      p.noSmooth();

      // 设置文字属性
      p.textFont('Arial, Helvetica, sans-serif');
      p.textSize(GRAVITY_CONFIG.text.fontSize);

      // 初始化文字
      initChars(p);
    };

    p.draw = function() {
      p.background(GRAVITY_CONFIG.canvas.backgroundColor);

      // 绘制顺序（从下到上）：
      // 1. 直线（在文字和圆点下方）
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        p.stroke(GRAVITY_CONFIG.line.color);
        p.strokeWeight(GRAVITY_CONFIG.line.thickness);
        p.line(d.x, d.y, d.x, d.y + d.lineLength);
      }

      // 2. 圆点（在文字下方）
      for (var j = 0; j < dots.length; j++) {
        var d2 = dots[j];
        p.noStroke();
        p.fill(d2.color);
        p.ellipse(d2.x, d2.y, d2.size, d2.size);
      }

      // 3. 文字（在最上层）
      for (var k = 0; k < chars.length; k++) {
        var c = chars[k];

        // 应用背景流场（多层噪声驱动）
        if (!c.attracted) {
          var noiseValX = p.noise(c.x * noiseScale, c.y * noiseScale, p.frameCount * noiseSpeed) - 0.5;
          var noiseValY = p.noise(c.x * noiseScale, c.y * noiseScale, (p.frameCount + 1000) * noiseSpeed) - 0.5;
          
          c.x += noiseValX * 0.5;
          c.y += noiseValY * 0.5;

          // 边界约束
          c.x = p.constrain(c.x, 0, p.width);
          c.y = p.constrain(c.y, 0, p.height);
        } else {
          // 被吸引的文字绕引力中心旋转（轨道力学）
          var dot = dots[c.dotIndex];
          if (dot) {
            // 计算相对于引力中心的角度
            var angle = p.frameCount * GRAVITY_CONFIG.attraction.orbitSpeed + c.orbitAngle;
            
            // 添加轨道运动
            c.targetX = dot.x + Math.cos(angle) * c.orbitRadius;
            c.targetY = dot.y + Math.sin(angle) * c.orbitRadius;
          }
        }

        // 平滑移动
        c.x += (c.targetX - c.x) * GRAVITY_CONFIG.attraction.speed;
        c.y += (c.targetY - c.y) * GRAVITY_CONFIG.attraction.speed;

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

      // 吸引文字
      for (var m = 0; m < dots.length; m++) {
        attractChars(dots[m], m);
      }

      // 自动生成圆点
      frameCounter++;
      if (frameCounter % GRAVITY_CONFIG.dot.generationInterval === 0) {
        var hasUnattracted = false;
        for (var n = 0; n < chars.length; n++) {
          if (!chars[n].attracted) {
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
    if (ch === '\n' || x + chWidth > p.width - GRAVITY_CONFIG.text.margin) {
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
      color: GRAVITY_CONFIG.text.color,
      orbitAngle: Math.random() * Math.PI * 2, // 随机轨道角度
      orbitRadius: 10 + Math.random() * 15 // 随机轨道半径
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
    )),
    birthTime: Date.now()
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
      // 每个被吸引的文字随机匹配一个颜色
      chars[ci].color = randomChoice(GRAVITY_CONFIG.attraction.targetColors);
      dot.attractedChars.push(ci);
    }
  }
}

// ========================================
// 工具函数
// ========================================
function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
