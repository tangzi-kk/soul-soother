/**
 * Soul Soother - 文字引力场核心引擎
 * 贯穿全站的交互系统
 */

(function() {
  'use strict';

  // 引力场配置
  var CONFIG = {
    dot: {
      color: '#738ae5',
      size: 6,
      lineLength: 60,
      lineColor: '#e8e8e8',
      lineThickness: 1.5
    },
    attraction: {
      radius: 150,
      strength: 0.03,
      returnSpeed: 0.02
    },
    text: {
      maxOffset: 30,
      scaleRange: [0.95, 1.05],
      colorShift: true
    }
  };

  // 引力点列表
  var dots = [];
  var textElements = [];
  var isActive = false;
  var animationId = null;

  /**
   * 初始化引力场
   * @param {string} selector - 要监听的容器选择器
   */
  function initGravityField(selector) {
    var container = document.querySelector(selector);
    if (!container) return;

    // 收集所有文字元素
    collectTextElements(container);

    // 绑定点击事件
    container.addEventListener('click', onContainerClick);
    container.addEventListener('touchstart', onContainerTouch, { passive: true });

    // 开始动画循环
    isActive = true;
    startAnimationLoop();

    console.log('[Gravity] 引力场已激活，收集到 ' + textElements.length + ' 个文字元素');
  }

  /**
   * 收集文字元素
   */
  function collectTextElements(container) {
    textElements = [];
    var walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    var node;
    while (node = walker.nextNode()) {
      var parent = node.parentElement;
      if (!parent) continue;

      // 跳过脚本和样式
      var tag = parent.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'noscript') continue;

      // 跳过已经处理的
      if (parent.hasAttribute('data-gravity')) continue;

      // 只收集可见的、有意义的文字
      var text = node.textContent.trim();
      if (text.length < 2 || text.length > 50) continue;

      // 检查元素是否可见
      var style = window.getComputedStyle(parent);
      if (style.display === 'none' || style.visibility === 'hidden') continue;

      markElementForGravity(parent, text);
    }
  }

  /**
   * 标记元素为引力场元素
   */
  function markElementForGravity(el, text) {
    el.setAttribute('data-gravity', 'true');
    el.style.display = 'inline-block';
    el.style.transition = 'none';

    var rect = el.getBoundingClientRect();
    textElements.push({
      element: el,
      text: text,
      originX: 0,
      originY: 0,
      currentX: 0,
      currentY: 0,
      currentScale: 1,
      currentRotate: 0,
      targetX: 0,
      targetY: 0,
      targetScale: 1,
      targetRotate: 0,
      attractedBy: -1,
      velocityX: 0,
      velocityY: 0
    });
  }

  /**
   * 点击容器生成引力点
   */
  function onContainerClick(e) {
    // 忽略按钮和链接点击
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
        e.target.closest('a') || e.target.closest('button')) return;

    createDot(e.clientX, e.clientY);
  }

  /**
   * 触摸生成引力点
   */
  function onContainerTouch(e) {
    if (e.touches.length > 0) {
      var touch = e.touches[0];
      createDot(touch.clientX, touch.clientY);
    }
  }

  /**
   * 创建引力点
   */
  function createDot(x, y) {
    var dot = document.createElement('div');
    dot.className = 'gravity-dot';
    dot.style.cssText = [
      'position: fixed',
      'left: ' + (x - CONFIG.dot.size / 2) + 'px',
      'top: ' + (y - CONFIG.dot.size / 2) + 'px',
      'width: ' + CONFIG.dot.size + 'px',
      'height: ' + CONFIG.dot.size + 'px',
      'background: ' + CONFIG.dot.color,
      'border-radius: 50%',
      'pointer-events: none',
      'z-index: 9999',
      'opacity: 0',
      'transform: scale(0)',
      'transition: opacity 0.3s ease, transform 0.3s ease'
    ].join(';');

    // 垂直线
    var line = document.createElement('div');
    line.style.cssText = [
      'position: absolute',
      'left: 50%',
      'top: ' + CONFIG.dot.size + 'px',
      'width: ' + CONFIG.dot.lineThickness + 'px',
      'height: ' + CONFIG.dot.lineLength + 'px',
      'background: ' + CONFIG.dot.lineColor,
      'transform: translateX(-50%)',
      'transform-origin: top center'
    ].join(';');
    dot.appendChild(line);

    document.body.appendChild(dot);

    // 动画出现
    requestAnimationFrame(function() {
      dot.style.opacity = '1';
      dot.style.transform = 'scale(1)';
    });

    dots.push({
      element: dot,
      x: x,
      y: y,
      birthTime: Date.now(),
      lifeTime: 5000 + Math.random() * 3000
    });

    // 限制引力点数量
    if (dots.length > 5) {
      removeOldestDot();
    }
  }

  /**
   * 移除最老的引力点
   */
  function removeOldestDot() {
    var oldest = dots.shift();
    if (oldest && oldest.element) {
      oldest.element.style.opacity = '0';
      oldest.element.style.transform = 'scale(0)';
      setTimeout(function() {
        if (oldest.element.parentNode) {
          oldest.element.parentNode.removeChild(oldest.element);
        }
      }, 300);
    }
  }

  /**
   * 动画循环
   */
  function startAnimationLoop() {
    function loop() {
      if (!isActive) return;

      updateDots();
      updateTextElements();

      animationId = requestAnimationFrame(loop);
    }
    loop();
  }

  /**
   * 更新引力点状态
   */
  function updateDots() {
    var now = Date.now();
    for (var i = dots.length - 1; i >= 0; i--) {
      var dot = dots[i];
      var age = now - dot.birthTime;

      // 生命周期结束
      if (age > dot.lifeTime) {
        dot.element.style.opacity = '0';
        dot.element.style.transform = 'scale(0)';
        setTimeout((function(d) {
          return function() {
            if (d.element && d.element.parentNode) {
              d.element.parentNode.removeChild(d.element);
            }
          };
        })(dot), 300);
        dots.splice(i, 1);
        continue;
      }

      // 脉冲效果
      var pulse = 1 + Math.sin(age * 0.003) * 0.2;
      dot.element.style.transform = 'scale(' + pulse + ')';
    }
  }

  /**
   * 更新文字元素（核心引力计算）
   */
  function updateTextElements() {
    for (var i = 0; i < textElements.length; i++) {
      var te = textElements[i];
      var el = te.element;

      // 获取当前位置
      var rect = el.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;

      // 计算引力影响
      var totalForceX = 0;
      var totalForceY = 0;
      var isAttracted = false;

      for (var j = 0; j < dots.length; j++) {
        var dot = dots[j];
        var dx = dot.x - centerX;
        var dy = dot.y - centerY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONFIG.attraction.radius && distance > 10) {
          var force = (1 - distance / CONFIG.attraction.radius) * CONFIG.attraction.strength;
          totalForceX += (dx / distance) * force * 100;
          totalForceY += (dy / distance) * force * 100;
          isAttracted = true;
        }
      }

      // 更新目标位置
      if (isAttracted) {
        te.targetX = totalForceX;
        te.targetY = totalForceY;
        te.targetScale = CONFIG.text.scaleRange[0] + Math.random() * (CONFIG.text.scaleRange[1] - CONFIG.text.scaleRange[0]);
        te.targetRotate = (Math.random() - 0.5) * 6;
        te.attractedBy = 1;
      } else {
        // 回归原位
        te.targetX = 0;
        te.targetY = 0;
        te.targetScale = 1;
        te.targetRotate = 0;
        te.attractedBy = -1;
      }

      // 平滑插值
      te.currentX += (te.targetX - te.currentX) * CONFIG.attraction.returnSpeed;
      te.currentY += (te.targetY - te.currentY) * CONFIG.attraction.returnSpeed;
      te.currentScale += (te.targetScale - te.currentScale) * CONFIG.attraction.returnSpeed;
      te.currentRotate += (te.targetRotate - te.currentRotate) * CONFIG.attraction.returnSpeed;

      // 应用变换
      var transform = 'translate(' + te.currentX.toFixed(2) + 'px, ' + te.currentY.toFixed(2) + 'px) ' +
                      'scale(' + te.currentScale.toFixed(3) + ') ' +
                      'rotate(' + te.currentRotate.toFixed(2) + 'deg)';
      el.style.transform = transform;

      // 颜色变化
      if (CONFIG.text.colorShift && isAttracted) {
        var intensity = Math.min(1, Math.abs(te.currentX) / 20);
        if (intensity > 0.3) {
          el.style.color = '#738ae5';
        } else {
          el.style.color = '';
        }
      } else {
        el.style.color = '';
      }
    }
  }

  /**
   * 销毁引力场
   */
  function destroyGravityField() {
    isActive = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    // 清理引力点
    for (var i = 0; i < dots.length; i++) {
      if (dots[i].element && dots[i].element.parentNode) {
        dots[i].element.parentNode.removeChild(dots[i].element);
      }
    }
    dots = [];

    // 重置文字元素
    for (var j = 0; j < textElements.length; j++) {
      var te = textElements[j];
      te.element.style.transform = '';
      te.element.style.color = '';
      te.element.removeAttribute('data-gravity');
    }
    textElements = [];
  }

  // 暴露全局 API
  window.GravityField = {
    init: initGravityField,
    destroy: destroyGravityField,
    createDot: createDot,
    config: CONFIG
  };

})();
