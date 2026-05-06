/**
 * Soul Soother - Version Switcher
 * 版本切换器：实时对比不同设计版本
 */

(function() {
  'use strict';

  // 版本配置
  var VERSIONS = {
    v1: {
      id: 'v1',
      name: 'Warm Ink & Paper',
      desc: '温暖墨水与纸张 · 手写体 + 纸质感阴影 + 12套动画',
      badge: 'current',
      badgeClass: 'badge-current',
      commit: '190da2f',
      date: '最新版'
    },
    v2: {
      id: 'v2',
      name: 'Cocoa Ink 暖色',
      desc: '可可棕配色体系 · 系统字体 + 基础圆角 + 简单动效',
      badge: 'stable',
      badgeClass: 'badge-latest',
      commit: 'ad6cb04',
      date: '前版'
    },
    v3: {
      id: 'v3',
      name: 'Original 冷白',
      desc: '原始冷白风格 · 黑白对比 + 锐利圆角 + 无动画',
      badge: 'classic',
      badgeClass: 'badge-classic',
      commit: 'baebb68',
      date: '初版'
    }
  };

  // 各版本的 CSS 变量覆盖
  var VERSION_STYLES = {
    v1: null, // 使用默认（当前）样式
    
    v2: {
      '--color-ink': '#472425',
      '--color-charcoal': '#472425',
      '--color-canvas': '#fdfaf3',
      '--color-canvas-warm': '#f5f0e8',
      '--color-border': '#e8e0d4',
      '--color-border-subtle': '#f0ebe3',
      '--font-display': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--font-body': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--radius-sm': '16px',
      '--radius-md': '22px',
      '--radius-lg': '28px',
      '--radius-xl': '36px',
      '--shadow-paper': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
      '--shadow-card': '0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)',
      '--gradient-page': '#fdfaf3'
    },
    
    v3: {
      '--color-ink': '#000000',
      '--color-charcoal': '#2d2d2d',
      '--color-canvas': '#ffffff',
      '--color-canvas-warm': '#fafafa',
      '--color-border': '#e8e8e8',
      '--color-border-subtle': '#f0f0f0',
      '--font-display': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--font-body': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      '--radius-sm': '8px',
      '--radius-md': '12px',
      '--radius-lg': '16px',
      '--radius-xl': '20px',
      '--shadow-paper': '0 1px 3px rgba(0,0,0,0.08)',
      '--shadow-card': '0 4px 12px rgba(0,0,0,0.06)',
      '--gradient-page': '#ffffff'
    }
  };

  var currentVersion = 'v1';
  var panel = null;
  var toggle = null;
  var isPanelOpen = false;

  function init() {
    createSwitcher();
    loadSavedVersion();
    bindEvents();
  }

  function createSwitcher() {
    var container = document.createElement('div');
    container.className = 'version-switcher';
    container.id = 'versionSwitcher';
    container.innerHTML = 
      '<button class="version-toggle" id="versionToggle" title="切换设计版本" aria-label="切换设计版本">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>' +
          '<path d="M17 4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4z"/>' +
          '<path d="M12 9v6"/>' +
        '</svg>' +
      '</button>' +
      '<div class="version-panel" id="versionPanel">' +
        '<div class="version-panel-header">' +
          '<span class="version-panel-title">设计版本</span>' +
          '<button class="version-panel-close" id="versionClose" aria-label="关闭">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<line x1="18" y1="6" x2="6" y2="18"/>' +
              '<line x1="6" y1="6" x2="18" y2="18"/>' +
            '</svg>' +
          '</button>' +
        '</div>' +
        '<div class="version-options" id="versionOptions"></div>' +
        '<div class="version-divider"></div>' +
        '<div class="version-hint">点击版本可即时预览效果<br>选择后自动保存</div>' +
      '</div>';
    
    document.body.appendChild(container);
    
    toggle = document.getElementById('versionToggle');
    panel = document.getElementById('versionPanel');
    
    renderOptions();
  }

  function renderOptions() {
    var optionsContainer = document.getElementById('versionOptions');
    var html = '';
    
    for (var key in VERSIONS) {
      if (VERSIONS.hasOwnProperty(key)) {
        var v = VERSIONS[key];
        var isActive = key === currentVersion ? ' active' : '';
        
        html += 
          '<div class="version-option ' + key + isActive + '" data-version="' + key + '">' +
            '<div class="version-dot"></div>' +
            '<div class="version-info">' +
              '<div class="version-name">' + v.name + '</div>' +
              '<div class="version-desc">' + v.desc + '</div>' +
            '</div>' +
            '<span class="version-badge ' + v.badgeClass + '">' + v.badge + '</span>' +
          '</div>';
      }
    }
    
    optionsContainer.innerHTML = html;
  }

  function bindEvents() {
    toggle.addEventListener('click', togglePanel);
    
    document.getElementById('versionClose').addEventListener('click', closePanel);
    
    document.getElementById('versionOptions').addEventListener('click', function(e) {
      var option = e.target.closest('.version-option');
      if (option) {
        var version = option.getAttribute('data-version');
        switchTo(version);
      }
    });

    document.addEventListener('click', function(e) {
      if (isPanelOpen && !containerContains(e.target)) {
        closePanel();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isPanelOpen) {
        closePanel();
      }
    });
  }

  function containerContains(target) {
    var switcher = document.getElementById('versionSwitcher');
    return switcher && switcher.contains(target);
  }

  function togglePanel() {
    if (isPanelOpen) {
      closePanel();
    } else {
      openPanel();
    }
  }

  function openPanel() {
    isPanelOpen = true;
    panel.classList.add('open');
  }

  function closePanel() {
    isPanelOpen = false;
    panel.classList.remove('open');
  }

  function switchTo(versionId) {
    if (!VERSIONS[versionId]) return;
    
    currentVersion = versionId;
    
    applyVersionStyles(versionId);
    updateActiveState(versionId);
    saveVersion(versionId);
    
    showToast(VERSIONS[versionId].name);
  }

  function applyVersionStyles(versionId) {
    var root = document.documentElement;
    var styles = VERSION_STYLES[versionId];
    
    if (styles === null) {
      root.removeAttribute('data-version');
      root.style.removeProperty('--custom-font-display');
      root.style.removeProperty('--custom-font-body');
      
      for (var key in VERSION_STYLES.v2) {
        if (VERSION_STYLES.v2.hasOwnProperty(key)) {
          root.style.removeProperty(key);
        }
      }
    } else {
      root.setAttribute('data-version', versionId);
      
      for (var prop in styles) {
        if (styles.hasOwnProperty(prop)) {
          root.style.setProperty(prop, styles[prop]);
        }
      }
    }
  }

  function updateActiveState(versionId) {
    var options = document.querySelectorAll('.version-option');
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      if (opt.getAttribute('data-version') === versionId) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    }
  }

  function saveVersion(versionId) {
    try {
      localStorage.setItem('soul-soother-version', versionId);
    } catch (e) {
      console.warn('无法保存版本偏好:', e);
    }
  }

  function loadSavedVersion() {
    try {
      var saved = localStorage.getItem('soul-soother-version');
      if (saved && VERSIONS[saved]) {
        currentVersion = saved;
        applyVersionStyles(saved);
        updateActiveState(saved);
      }
    } catch (e) {
      console.warn('无法加载版本偏好:', e);
    }
  }

  function showToast(name) {
    var existing = document.querySelector('.version-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'version-toast';
    toast.textContent = '已切换至：' + name;
    toast.style.cssText =
      'position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(10px);' +
      'background: #472425; color: #fff; padding: 10px 20px; border-radius: 10px;' +
      'font-size: 13px; font-weight: 500; z-index: 10000; opacity: 0;' +
      'transition: all 0.3s ease; pointer-events: none; font-family: -apple-system, sans-serif;';
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(function() {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.VersionSwitcher = {
    getCurrentVersion: function() { return currentVersion; },
    switchTo: switchTo,
    getVersions: function() { return VERSIONS; }
  };
})();
