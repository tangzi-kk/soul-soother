/**
 * Soul Soother App - SPA Controller
 * 状态导向的单页应用控制器
 */

(function() {
  'use strict';

  var currentPage = 0;
  var totalPages = 5;
  var container = null;
  var isScrolling = false;

  // 页面名称
  var pageNames = ['首页', '开心', '测评', '互助', '急救'];

  // Toast 提示
  function showToast(message) {
    var existing = document.querySelector('.app-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function() {
      toast.classList.add('show');
    });

    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2500);
  }

  window.showToast = showToast;

  document.addEventListener('DOMContentLoaded', function() {
    container = document.getElementById('pagesContainer');

    // 初始化首页内容
    initHomePage();

    // 监听滚动事件更新指示器
    container.addEventListener('scroll', updatePageIndicator, { passive: true });

    // 初始化引力场
    setTimeout(function() {
      if (window.GravityP5) {
        window.GravityP5.init('gravityBg');
      }
    }, 300);
  });

  /**
   * 跳转到指定页面
   */
  window.goToPage = function(index) {
    if (index < 0 || index >= totalPages) return;
    if (isScrolling) return;

    isScrolling = true;
    currentPage = index;

    var pageWidth = container.offsetWidth;
    container.scrollTo({
      left: pageWidth * index,
      behavior: 'smooth'
    });

    // 更新指示器
    updateIndicatorDots(index);

    // 初始化对应页面内容
    initPageContent(index);

    setTimeout(function() {
      isScrolling = false;
    }, 500);
  };

  /**
   * 更新页面指示器
   */
  function updatePageIndicator() {
    var pageWidth = container.offsetWidth;
    var scrollLeft = container.scrollLeft;
    var newPage = Math.round(scrollLeft / pageWidth);

    if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
      currentPage = newPage;
      updateIndicatorDots(newPage);
      initPageContent(newPage);
    }
  }

  /**
   * 更新指示器圆点
   */
  function updateIndicatorDots(activeIndex) {
    var dots = document.querySelectorAll('.page-indicator-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === activeIndex);
    }
  }

  /**
   * 初始化页面内容
   */
  function initPageContent(index) {
    switch(index) {
      case 0:
        initHomePage();
        break;
      case 1:
        initPlayPage();
        break;
      case 2:
        initQuizPage();
        break;
      case 3:
        initMutualPage();
        break;
      case 4:
        initKitPage();
        break;
    }
  }

  // ========================================
  // 首页
  // ========================================

  function initHomePage() {
    // 加载每日引言
    if (typeof getDailyQuote === 'function') {
      var quote = getDailyQuote();
      var quoteEl = document.getElementById('dailyQuote');
      if (quoteEl && quoteEl.textContent === '加载中...') {
        quoteEl.textContent = quote;
      }
    }

    // 设置日期
    var dateEl = document.getElementById('dailyDate');
    if (dateEl && !dateEl.textContent) {
      dateEl.textContent = new Date().toLocaleDateString('zh-CN', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    }

    // 检查深夜模式
    checkNightTime();

    // 初始化精神天气
    initWeather();
  }

  function initWeather() {
    var weatherIcon = document.getElementById('weatherEmoji');
    var weatherLabel = document.getElementById('weatherLabel');
    var weatherDesc = document.getElementById('weatherDesc');

    if (weatherIcon && !weatherIcon.innerHTML) {
      var weather = getWeather();
      var icons = {
        'sun': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
        'cloud': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"></path></svg>',
        'rain': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 13v8"></path><path d="M8 13v8"></path><path d="M12 15v8"></path><path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"></path></svg>',
        'storm': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
        'fog': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 15h16"></path><path d="M4 9h16"></path><path d="M4 12h16"></path></svg>',
        'volcano': '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 22h20L12 2z"></path><path d="M12 10v6"></path><path d="M12 18v.01"></path></svg>'
      };
      weatherIcon.innerHTML = icons[weather.icon] || icons['cloud'];
      weatherLabel.textContent = weather.label;
      weatherDesc.textContent = weather.desc;
    }
  }

  window.showWeatherDetail = function() {
    var weather = getWeather();
    showToast('今日精神天气：' + weather.label + ' — ' + weather.desc);
  };

  function checkNightTime() {
    if (typeof isNightTime !== 'function' || typeof getNightRescue !== 'function') return;

    var nightRescue = document.getElementById('nightRescue');
    if (isNightTime() && nightRescue) {
      nightRescue.classList.remove('hidden');
      document.getElementById('nightRescueText').textContent = getNightRescue();
    }
  }

  window.refreshQuote = function() {
    if (typeof getRandomQuote !== 'function') return;

    var quote = getRandomQuote();
    var el = document.getElementById('dailyQuote');
    el.style.opacity = '0';
    setTimeout(function() {
      el.textContent = quote;
      el.style.opacity = '1';
    }, 250);
  };

  // ========================================
  // 开心一秒
  // ========================================

  function initPlayPage() {
    // 渲染治愈网页
    renderPlayCollections();
  }

  window.randomFeed = function() {
    if (typeof getRandomFeed !== 'function') return;

    var feed = getRandomFeed();
    var contentEl = document.getElementById('feedContent');
    contentEl.style.opacity = '0';
    setTimeout(function() {
      contentEl.textContent = feed.content;
      contentEl.style.opacity = '1';
    }, 250);
  };

  window.playGame = function(game) {
    var messages = {
      'blanket': '你给小狗盖好了被子！小狗说：谢谢你，我很暖和。',
      'trash': '你把坏念头拖进了垃圾桶！垃圾桶说：又满了，但我还能装。',
      'light': '你给脑子关了一盏灯！脑子说：终于可以休息一下了。',
      'settle': '今日活着结算：今天还活着、今天喝了水、今天呼吸了、今天没爆炸。总计：+100 生存分'
    };
    showToast(messages[game] || '操作完成');
  };

  window.generateFengwen = function() {
    if (typeof generateFengwen !== 'function') return;

    var input = document.getElementById('fengwenInput').value.trim();
    if (!input) {
      showToast('输入一个情绪关键词，比如"加班"、"失恋"');
      return;
    }

    var result = generateFengwen(input);
    var output = document.getElementById('fengwenOutput');
    output.textContent = result;
    output.classList.add('show');
  };

  window.translateThought = function() {
    if (typeof translateBadThought !== 'function') return;

    var input = document.getElementById('thoughtInput').value.trim();
    if (!input) {
      showToast('输入你脑子里的坏念头');
      return;
    }

    var result = translateBadThought(input);
    var output = document.getElementById('thoughtOutput');
    output.innerHTML = '<strong>翻译结果：</strong><br>' + result;
    output.classList.add('show');
  };

  function renderPlayCollections() {
    if (typeof collections === 'undefined') return;

    var grid = document.getElementById('playCollectionGrid');
    if (!grid || grid.children.length > 0) return;

    var html = '';
    for (var i = 0; i < collections.length; i++) {
      var item = collections[i];
      var collectionIcons = {
        'star': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',
        'droplet': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path></svg>',
        'pen': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',
        'window': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>',
        'rain': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 13v8"></path><path d="M8 13v8"></path><path d="M12 15v8"></path><path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"></path></svg>',
        'music': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
        'pointer': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path></svg>',
        'sand': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
      };
      html += '<a href="' + item.url + '" target="_blank" rel="noopener" class="collection-item">' +
        '<div style="width: 20px; height: 20px; margin-right: var(--space-2); color: var(--color-accent);">' + (collectionIcons[item.icon] || '') + '</div>' +
        '<div class="collection-item-content">' +
          '<div class="collection-item-title">' + item.name + '</div>' +
          '<div class="collection-item-desc">' + item.description + '</div>' +
        '</div>' +
      '</a>';
    }
    grid.innerHTML = html;
  }

  // ========================================
  // 测评
  // ========================================

  function initQuizPage() {
    if (typeof quizzes === 'undefined') return;

    var cardsContainer = document.getElementById('quizCards');
    if (!cardsContainer || cardsContainer.children.length > 0) return;

    var html = '';
    for (var i = 0; i < quizzes.length; i++) {
      var q = quizzes[i];
      var quizIcons = {
        'brain': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',
        'shield': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
      };
      html += '<div class="quiz-card" onclick="startQuiz(\'' + q.id + '\')">' +
        '<div class="quiz-card-header">' +
          '<div class="quiz-card-icon">' + (quizIcons[q.icon] || '') + '</div>' +
          '<div class="quiz-card-title">' + q.name + '</div>' +
        '</div>' +
        '<div class="quiz-card-desc">' + q.description + '</div>' +
        '<div class="quiz-card-meta">' +
          '<span class="quiz-card-time">' + q.duration + '</span>' +
          '<span style="font-size: 12px; color: var(--color-slate);">' + q.questions.length + '题</span>' +
        '</div>' +
      '</div>';
    }
    cardsContainer.innerHTML = html;
  }

  var currentQuiz = null;
  var currentQuestion = 0;
  var answers = [];

  window.startQuiz = function(quizId) {
    if (typeof quizzes === 'undefined') return;

    for (var i = 0; i < quizzes.length; i++) {
      if (quizzes[i].id === quizId) {
        currentQuiz = quizzes[i];
        break;
      }
    }
    currentQuestion = 0;
    answers = [];

    document.getElementById('quizList').classList.add('hidden');
    document.getElementById('quizPage').classList.remove('hidden');
    document.getElementById('resultPage').classList.add('hidden');

    renderQuestion();
  };

  function renderQuestion() {
    var question = currentQuiz.questions[currentQuestion];
    document.getElementById('questionText').textContent = question.text;

    var optionsHtml = '';
    for (var i = 0; i < question.options.length; i++) {
      var selectedClass = answers[currentQuestion] === i ? 'selected' : '';
      optionsHtml += '<div class="quiz-option ' + selectedClass + '" onclick="selectOption(' + i + ')">' +
        question.options[i].text + '</div>';
    }
    document.getElementById('optionsContainer').innerHTML = optionsHtml;

    var progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = (currentQuestion + 1) + '/' + currentQuiz.questions.length;

    document.getElementById('prevBtn').style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').textContent = currentQuestion === currentQuiz.questions.length - 1 ? '查看结果' : '下一题';
  }

  window.selectOption = function(index) {
    answers[currentQuestion] = index;
    renderQuestion();
  };

  window.nextQuestion = function() {
    if (answers[currentQuestion] === undefined) {
      showToast('选一个吧，反正没有标准答案');
      return;
    }

    if (currentQuestion < currentQuiz.questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showResult();
    }
  };

  window.prevQuestion = function() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  };

  function showResult() {
    var score = 0;
    for (var i = 0; i < answers.length; i++) {
      score += currentQuiz.questions[i].options[answers[i]].value;
    }

    var result = null;
    for (var j = 0; j < currentQuiz.results.length; j++) {
      if (score >= currentQuiz.results[j].minScore && score <= currentQuiz.results[j].maxScore) {
        result = currentQuiz.results[j];
        break;
      }
    }
    if (!result) result = currentQuiz.results[currentQuiz.results.length - 1];

    var resultIcons = {
      'atmer': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
      'zzzz': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707"></path><circle cx="12" cy="12" r="4"></circle></svg>',
      'malo': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
      'shadow-roach': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',
      'safe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',
      'warning': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      'crisis': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
    };

    document.getElementById('resultIcon').innerHTML = resultIcons[result.id] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>';
    document.getElementById('resultType').textContent = result.type || '';
    document.getElementById('resultTitle').textContent = result.name;
    document.getElementById('resultTagline').textContent = result.tagline;
    document.getElementById('resultDesc').textContent = result.description;
    document.getElementById('resultAdvice').textContent = result.advice;

    var recHtml = '';
    var recommendationMap = {
      'atmer': [
        { name: '抽一张互助卡', desc: '今天也有人陪你', page: 3 },
        { name: '30秒缓冲', desc: '给自己30秒独处时间', page: 4 },
        { name: '发疯文学生成器', desc: '输入情绪，生成发疯文学', page: 1 }
      ],
      'zzzz': [
        { name: '流体模拟', desc: '鼠标划过产生美丽的色彩流动', page: 1 },
        { name: 'Weave Silk', desc: '对称绘画，画出美丽的光影图案', page: 1 },
        { name: '给脑子关灯', desc: '点击关闭所有灯光', page: 1 }
      ],
      'malo': [
        { name: 'Pixel Thoughts', desc: '60秒冥想，把烦恼放进星星里', page: 1 },
        { name: 'Rainy Mood', desc: '经典雨声背景音', page: 1 },
        { name: '今日活着结算', desc: '看看今天完成了什么', page: 1 }
      ],
      'shadow-roach': [
        { name: '互助卡', desc: '今天也有人陪你', page: 3 },
        { name: '深夜弹幕墙', desc: '看看陌生人在说什么', page: 3 },
        { name: '求救卡', desc: '需要帮助时可以复制', page: 4 }
      ],
      'safe': [
        { name: '随机开心一秒', desc: '随机投喂快乐', page: 1 },
        { name: '互助卡', desc: '抽一张互助卡', page: 3 },
        { name: '治愈网页', desc: '低能量小游戏', page: 1 }
      ],
      'warning': [
        { name: '30秒缓冲', desc: '深呼吸，跟着数字倒数', page: 4 },
        { name: '求救卡（轻度）', desc: '轻度情绪急救', page: 4 },
        { name: '互助卡', desc: '今天也有人陪你', page: 3 }
      ],
      'crisis': [
        { name: '紧急资源', desc: '心理援助热线', page: 4 },
        { name: '求救卡（高危）', desc: '高危情绪急救', page: 4 },
        { name: '30秒缓冲', desc: '先撑过30秒', page: 4 }
      ]
    };

    var recommendations = recommendationMap[result.id] || recommendationMap['safe'];
    for (var k = 0; k < recommendations.length; k++) {
      var r = recommendations[k];
      recHtml += '<div class="collection-item" onclick="goToPage(' + r.page + ')" style="cursor: pointer;">' +
        '<div class="collection-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg></div>' +
        '<div class="collection-item-content">' +
          '<div class="collection-item-title">' + r.name + '</div>' +
          '<div class="collection-item-desc">' + r.desc + '</div>' +
        '</div>' +
      '</div>';
    }
    document.getElementById('recommendations').innerHTML = recHtml;

    document.getElementById('quizPage').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');
  }

  window.shareResult = function() {
    var title = document.getElementById('resultTitle').textContent;
    var text = '我在 Soul Soother 测出来是「' + title + '」，快来测测你的精神状态！';

    if (navigator.share) {
      navigator.share({ title: 'Soul Soother 测评结果', text: text });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('结果已复制到剪贴板');
      });
    } else {
      showToast(text);
    }
  };

  window.restartQuiz = function() {
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('quizList').classList.remove('hidden');
  };

  // ========================================
  // 互助
  // ========================================

  function initMutualPage() {
    // 初始化弹幕
    initDanmu();
  }

  function initDanmu() {
    if (typeof danmuList === 'undefined') return;

    var track = document.getElementById('danmuTrack');
    if (!track || track.children.length > 0) return;

    var html = '';
    var allDanmu = danmuList.concat(danmuList);
    for (var i = 0; i < allDanmu.length; i++) {
      html += '<span class="danmu-item">' + allDanmu[i] + '</span>';
    }
    track.innerHTML = html;
  }

  window.drawHelpCard = function() {
    if (typeof tools === 'undefined') return;

    var cards = tools.helpCards;
    var card = cards[Math.floor(Math.random() * cards.length)];
    var textEl = document.getElementById('helpCardText');
    textEl.style.opacity = '0';
    setTimeout(function() {
      textEl.textContent = card.text;
      textEl.style.opacity = '1';
    }, 300);
  };

  window.postHelp = function() {
    var content = document.getElementById('helpPost').value.trim();
    if (!content) {
      showToast('写点什么吧，哪怕只有一个字');
      return;
    }

    var crisisWords = ['自杀', '想死', '自残', '跳楼', '割腕', '上吊', '毒药'];
    var hasCrisis = false;
    for (var i = 0; i < crisisWords.length; i++) {
      if (content.indexOf(crisisWords[i]) !== -1) {
        hasCrisis = true;
        break;
      }
    }

    if (hasCrisis) {
      showToast('检测到你可能处于危机中。请立即联系：全国心理援助热线 400-161-9995');
      return;
    }

    var postsContainer = document.getElementById('helpPosts');
    var newPost = document.createElement('div');
    newPost.className = 'help-post fade-in';
    newPost.innerHTML = '<div class="help-post-text">' + content + '</div><div class="help-post-footer"><span class="help-post-time">刚刚</span><button class="hug-btn" onclick="sendHug(this)">抱抱</button></div>';
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
    document.getElementById('helpPost').value = '';

    // 保存到本地
    try {
      var posts = JSON.parse(localStorage.getItem('helpPosts') || '[]');
      posts.unshift({ content: content, time: new Date().toISOString() });
      if (posts.length > 50) posts = posts.slice(0, 50);
      localStorage.setItem('helpPosts', JSON.stringify(posts));
    } catch (e) {
      // localStorage 不可用或已满，静默处理
    }
  };

  window.sendHug = function(btn) {
    btn.classList.add('hugged');
    btn.textContent = '已抱抱';
    btn.disabled = true;
  };

  // ========================================
  // 急救包
  // ========================================

  function initKitPage() {
    // 初始化求救卡
    renderSosCard('mild');
  }

  var currentSosLevel = 'mild';

  window.switchSos = function(level, el) {
    currentSosLevel = level;
    var tabs = document.querySelectorAll('.sos-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }
    el.classList.add('active');
    renderSosCard(level);
  };

  function renderSosCard(level) {
    if (typeof getSosCard !== 'function') return;

    var card = getSosCard(level);
    var contentHtml = '<div class="sos-title">' + card.title + '</div>' +
      '<div class="sos-actions">';
    for (var i = 0; i < card.actions.length; i++) {
      contentHtml += '<div class="sos-action">' + card.actions[i] + '</div>';
    }
    contentHtml += '</div>';
    document.getElementById('sosContent').innerHTML = contentHtml;
  }

  window.copySos = function() {
    if (typeof getSosCard !== 'function') return;

    var card = getSosCard(currentSosLevel);
    var text = card.title + '\n' + card.actions.join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('求救卡已复制到剪贴板');
      });
    } else {
      showToast(text);
    }
  };

  var bufferInterval = null;

  window.startBuffer = function() {
    var timerEl = document.getElementById('bufferTimer');
    var textEl = document.getElementById('bufferText');
    var btnEl = document.getElementById('bufferBtn');

    if (bufferInterval) {
      clearInterval(bufferInterval);
      bufferInterval = null;
    }

    var count = 30;
    btnEl.textContent = '缓冲中...';
    btnEl.disabled = true;

    bufferInterval = setInterval(function() {
      count--;
      timerEl.textContent = count;

      if (count <= 0) {
        clearInterval(bufferInterval);
        bufferInterval = null;
        timerEl.textContent = '✓';
        textEl.textContent = '你撑过了30秒，已经很厉害了';
        btnEl.textContent = '再缓冲一次';
        btnEl.disabled = false;
      }
    }, 1000);
  };

})();
