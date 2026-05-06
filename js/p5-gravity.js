/**
 * Soul Soother - Semantic Gravity 文字引力场
 * Algorithmic Art: 将文字解构为粒子，在引力场中重组诗意
 *
 * 哲学: Semantic Gravity - 文字具有质量、惯性和情感引力
 * 每个汉字是一个粒子，用户交互创造引力井，文字在引力作用下形成轨道运动
 */

(function() {
  'use strict';

  // ========================================
  // 配置参数
  // ========================================
  var CONFIG = {
    text: {
      content: '用抽象接住崩溃用玩笑降低痛感你不是一个人每个崩溃的瞬间都值得被温柔对待',
      fontSize: 13,
      color: '#b8b4a8',
      activeColor: '#738ae5',
      glowColor: 'rgba(115, 138, 229, 0.3)',
      letterSpacing: 2,
      lineSpacing: 28,
      margin: 16
    },
    physics: {
      gravityStrength: 0.8,
      gravityRadius: 120,
      orbitSpeed: 0.03,
      damping: 0.92,
      returnSpeed: 0.04,
      maxVelocity: 8,
      noiseScale: 0.008,
      noiseSpeed: 0.0005,
      flowStrength: 0.3
    },
    gravityWell: {
      maxCount: 6,
      birthDuration: 30,
      lifeDuration: 300,
      decayDuration: 60,
      pulseSpeed: 0.05,
      ringCount: 3
    },
    visual: {
      trailLength: 8,
      trailAlpha: 15,
      bgColor: '#f9f8f4',
      dotColor: '#80705f',
      dotSize: 5,
      lineColor: '#c4bfb3',
      lineLength: 80,
      glowIntensity: 0.6
    }
  };

  // ========================================
  // 全局状态
  // ========================================
  var sketch = null;
  var chars = [];
  var gravityWells = [];
  var flowField = [];
  var cols, rows;
  var scl = 20;
  var zOff = 0;
  var frameCount = 0;
  var canvasContainer = null;

  // ========================================
  // 初始化
  // ========================================
  function initGravityField(containerId) {
    canvasContainer = document.getElementById(containerId);
    if (!canvasContainer) {
      console.error('[Gravity] 容器未找到:', containerId);
      return;
    }

    if (sketch) {
      sketch.remove();
    }

    sketch = new p5(function(p) {
      p.setup = function() {
        var w = canvasContainer.offsetWidth || 393;
        var h = canvasContainer.offsetHeight || 200;
        var canvas = p.createCanvas(w, h);
        canvas.parent(containerId);

        p.textFont('-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
        p.textSize(CONFIG.text.fontSize);
        p.textAlign(p.CENTER, p.CENTER);

        initFlowField(p);
        initChars(p);
      };

      p.draw = function() {
        p.background(CONFIG.visual.bgColor);

        // 更新流场
        updateFlowField(p);

        // 绘制引力井连线
        drawGravityLines(p);

        // 绘制引力井
        drawGravityWells(p);

        // 更新和绘制文字粒子
        updateAndDrawChars(p);

        // 更新引力井生命周期
        updateGravityWells();

        frameCount++;
        zOff += CONFIG.physics.noiseSpeed;
      };

      p.mousePressed = function() {
        if (p.mouseX > 0 && p.mouseX < p.width &&
            p.mouseY > 0 && p.mouseY < p.height) {
          createGravityWell(p.mouseX, p.mouseY);
          return false;
        }
      };

      p.touchStarted = function() {
        if (p.touches.length > 0) {
          var touch = p.touches[0];
          if (touch.x > 0 && touch.x < p.width &&
              touch.y > 0 && touch.y < p.height) {
            createGravityWell(touch.x, touch.y);
          }
        }
        return false;
      };

      p.windowResized = function() {
        var w = canvasContainer.offsetWidth || 393;
        var h = canvasContainer.offsetHeight || 200;
        p.resizeCanvas(w, h);
        initFlowField(p);
        initChars(p);
      };
    });
  }

  // ========================================
  // 流场初始化与更新
  // ========================================
  function initFlowField(p) {
    cols = Math.floor(p.width / scl);
    rows = Math.floor(p.height / scl);
    flowField = new Array(cols * rows);
  }

  function updateFlowField(p) {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p.noise(xoff, yoff, zOff) * p.TWO_PI * 2;
        flowField[index] = p5.Vector.fromAngle(angle);
        flowField[index].setMag(CONFIG.physics.flowStrength);
        xoff += CONFIG.physics.noiseScale * scl;
      }
      yoff += CONFIG.physics.noiseScale * scl;
    }
  }

  function getFlowVector(p, x, y) {
    var col = Math.floor(p.constrain(x / scl, 0, cols - 1));
    var row = Math.floor(p.constrain(y / scl, 0, rows - 1));
    var index = col + row * cols;
    return flowField[index] || p.createVector(0, 0);
  }

  // ========================================
  // 文字粒子初始化
  // ========================================
  function initChars(p) {
    chars = [];
    var content = CONFIG.text.content;
    var x = CONFIG.text.margin;
    var y = CONFIG.text.margin + 20;

    for (var i = 0; i < content.length; i++) {
      var ch = content[i];
      var chWidth = p.textWidth(ch) + CONFIG.text.letterSpacing;

      if (x + chWidth > p.width - CONFIG.text.margin) {
        x = CONFIG.text.margin;
        y += CONFIG.text.lineSpacing;
      }

      if (y > p.height - CONFIG.text.margin) break;

      chars.push({
        char: ch,
        originX: x + chWidth / 2,
        originY: y,
        x: x + chWidth / 2,
        y: y,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        targetX: x + chWidth / 2,
        targetY: y,
        fontSize: CONFIG.text.fontSize,
        baseColor: CONFIG.text.color,
        currentColor: CONFIG.text.color,
        alpha: 255,
        attracted: false,
        orbitAngle: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        wellIndex: -1,
        trail: [],
        phase: Math.random() * Math.PI * 2,
        floatOffset: Math.random() * 0.5
      });

      x += chWidth;
    }
  }

  // ========================================
  // 引力井管理
  // ========================================
  function createGravityWell(x, y) {
    if (gravityWells.length >= CONFIG.gravityWell.maxCount) {
      gravityWells.shift();
    }

    gravityWells.push({
      x: x,
      y: y,
      birthTime: frameCount,
      lifeTime: CONFIG.gravityWell.lifeDuration,
      decayTime: CONFIG.gravityWell.decayDuration,
      birthDuration: CONFIG.gravityWell.birthDuration,
      phase: 0,
      intensity: 0,
      maxIntensity: 1,
      attractedChars: [],
      rings: []
    });
  }

  function updateGravityWells() {
    for (var i = gravityWells.length - 1; i >= 0; i--) {
      var well = gravityWells[i];
      var age = frameCount - well.birthTime;

      // 生命周期阶段
      if (age < well.birthDuration) {
        // 出生阶段 - 强度从0增长到最大
        well.intensity = (age / well.birthDuration) * well.maxIntensity;
      } else if (age < well.birthDuration + well.lifeTime) {
        // 成熟阶段 - 强度保持最大，带脉冲
        var pulse = Math.sin(age * CONFIG.gravityWell.pulseSpeed) * 0.1;
        well.intensity = well.maxIntensity + pulse;
      } else if (age < well.birthDuration + well.lifeTime + well.decayTime) {
        // 衰减阶段
        var decayProgress = (age - well.birthDuration - well.lifeTime) / well.decayTime;
        well.intensity = well.maxIntensity * (1 - decayProgress);
      } else {
        // 死亡
        gravityWells.splice(i, 1);
        continue;
      }

      well.phase += CONFIG.gravityWell.pulseSpeed;
    }
  }

  function drawGravityWells(p) {
    for (var i = 0; i < gravityWells.length; i++) {
      var well = gravityWells[i];
      var intensity = well.intensity;

      if (intensity <= 0) continue;

      // 绘制引力井光环
      for (var r = 0; r < CONFIG.gravityWell.ringCount; r++) {
        var ringRadius = 15 + r * 12 + Math.sin(well.phase + r * 0.5) * 3;
        var ringAlpha = (80 - r * 20) * intensity;

        p.noFill();
        p.stroke(115, 138, 229, ringAlpha);
        p.strokeWeight(1.5 - r * 0.3);
        p.ellipse(well.x, well.y, ringRadius * 2, ringRadius * 2);
      }

      // 绘制中心点
      var pulseSize = CONFIG.visual.dotSize + Math.sin(well.phase * 2) * 2;
      p.noStroke();
      p.fill(115, 138, 229, 200 * intensity);
      p.ellipse(well.x, well.y, pulseSize * 2, pulseSize * 2);

      // 中心光晕
      var glowSize = pulseSize * 3;
      var glowAlpha = 40 * intensity;
      p.fill(115, 138, 229, glowAlpha);
      p.ellipse(well.x, well.y, glowSize * 2, glowSize * 2);
    }
  }

  function drawGravityLines(p) {
    for (var i = 0; i < gravityWells.length; i++) {
      var well = gravityWells[i];
      if (well.intensity <= 0.3) continue;

      var lineLength = CONFIG.visual.lineLength * well.intensity;
      p.stroke(CONFIG.visual.lineColor);
      p.strokeWeight(1.5);
      p.line(well.x, well.y, well.x, well.y + lineLength);
    }
  }

  // ========================================
  // 文字粒子更新与绘制
  // ========================================
  function updateAndDrawChars(p) {
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];

      // 计算受力
      var fx = 0, fy = 0;
      var isAttracted = false;
      var nearestWell = null;
      var nearestDist = Infinity;

      // 流场力
      var flow = getFlowVector(p, c.x, c.y);
      fx += flow.x;
      fy += flow.y;

      // 引力井力
      for (var j = 0; j < gravityWells.length; j++) {
        var well = gravityWells[j];
        if (well.intensity <= 0) continue;

        var dx = well.x - c.x;
        var dy = well.y - c.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.physics.gravityRadius && dist > 5) {
          var force = (1 - dist / CONFIG.physics.gravityRadius) * CONFIG.physics.gravityStrength * well.intensity;
          var angle = Math.atan2(dy, dx);

          // 引力 + 切向力（产生轨道运动）
          fx += Math.cos(angle) * force;
          fy += Math.sin(angle) * force;

          // 切向力（轨道运动）
          var tangentAngle = angle + Math.PI / 2;
          var tangentForce = force * 0.3;
          fx += Math.cos(tangentAngle) * tangentForce;
          fy += Math.sin(tangentAngle) * tangentForce;

          if (dist < nearestDist) {
            nearestDist = dist;
            nearestWell = well;
          }

          isAttracted = true;
        }
      }

      // 回归原位的力
      var returnDx = c.originX - c.x;
      var returnDy = c.originY - c.y;
      var returnDist = Math.sqrt(returnDx * returnDx + returnDy * returnDy);

      if (!isAttracted && returnDist > 0.5) {
        fx += returnDx * CONFIG.physics.returnSpeed;
        fy += returnDy * CONFIG.physics.returnSpeed;
      }

      // 微浮动（呼吸效果）
      fx += Math.sin(frameCount * 0.02 + c.phase) * 0.02;
      fy += Math.cos(frameCount * 0.015 + c.phase) * 0.02;

      // 应用加速度
      c.ax = fx;
      c.ay = fy;
      c.vx += c.ax;
      c.vy += c.ay;

      // 阻尼
      c.vx *= CONFIG.physics.damping;
      c.vy *= CONFIG.physics.damping;

      // 速度限制
      var speed = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
      if (speed > CONFIG.physics.maxVelocity) {
        c.vx = (c.vx / speed) * CONFIG.physics.maxVelocity;
        c.vy = (c.vy / speed) * CONFIG.physics.maxVelocity;
      }

      // 更新位置
      c.x += c.vx;
      c.y += c.vy;

      // 边界约束
      c.x = p.constrain(c.x, 5, p.width - 5);
      c.y = p.constrain(c.y, 5, p.height - 5);

      // 更新颜色
      if (isAttracted) {
        var attractionStrength = Math.min(1, (CONFIG.physics.gravityRadius - nearestDist) / CONFIG.physics.gravityRadius);
        c.currentColor = interpolateColor(CONFIG.text.color, CONFIG.text.activeColor, attractionStrength * 0.8);
        c.fontSize = CONFIG.text.fontSize + attractionStrength * 4;
      } else {
        c.currentColor = interpolateColor(c.currentColor, CONFIG.text.color, 0.08);
        c.fontSize += (CONFIG.text.fontSize - c.fontSize) * 0.08;
      }

      // 记录轨迹
      if (speed > 0.5) {
        c.trail.push({ x: c.x, y: c.y, alpha: CONFIG.visual.trailAlpha });
        if (c.trail.length > CONFIG.visual.trailLength) {
          c.trail.shift();
        }
      }

      // 绘制轨迹
      if (c.trail.length > 1) {
        p.noFill();
        for (var t = 1; t < c.trail.length; t++) {
          var trailAlpha = (t / c.trail.length) * CONFIG.visual.trailAlpha;
          p.stroke(115, 138, 229, trailAlpha);
          p.strokeWeight(0.5);
          p.line(c.trail[t - 1].x, c.trail[t - 1].y, c.trail[t].x, c.trail[t].y);
        }
      }

      // 绘制文字
      p.push();
      p.translate(c.x, c.y);

      // 发光效果
      if (isAttracted) {
        p.drawingContext.shadowColor = CONFIG.text.glowColor;
        p.drawingContext.shadowBlur = 8;
      }

      p.noStroke();
      p.fill(c.currentColor);
      p.textSize(c.fontSize);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(c.char, 0, 0);

      p.drawingContext.shadowBlur = 0;
      p.pop();
    }
  }

  // ========================================
  // 工具函数
  // ========================================
  function interpolateColor(color1, color2, factor) {
    var c1 = hexToRgb(color1);
    var c2 = hexToRgb(color2);

    if (!c1 || !c2) return color1;

    var r = Math.round(c1.r + (c2.r - c1.r) * factor);
    var g = Math.round(c1.g + (c2.g - c1.g) * factor);
    var b = Math.round(c1.b + (c2.b - c1.b) * factor);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function destroyGravityField() {
    if (sketch) {
      sketch.remove();
      sketch = null;
    }
    chars = [];
    gravityWells = [];
    flowField = [];
    frameCount = 0;
    zOff = 0;
  }

  // ========================================
  // 暴露全局 API
  // ========================================
  window.GravityP5 = {
    init: initGravityField,
    destroy: destroyGravityField,
    config: CONFIG
  };

})();
