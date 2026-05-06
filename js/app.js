/**
 * Soul Soother App - SPA Controller
 * 单页应用控制器，处理页面切换和交互
 */

(function() {
  'use strict';

  var currentPage = 0;
  var totalPages = 5;
  var container = null;
  var isScrolling = false;

  // 页面名称
  var pageNames = ['首页', '测评', '合集', '工具', '关于'];

  document.addEventListener('DOMContentLoaded', function() {
    container = document.getElementById('pagesContainer');

    // 初始化首页内容
    initHomePage();

    // 监听滚动事件更新指示器
    container.addEventListener('scroll', updatePageIndicator, { passive: true });

    // 初始化引力场
    setTimeout(function() {
      if (window.GravityField) {
        window.GravityField.init('#gravityContainer');
      }
    }, 500);
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
        initQuizPage();
        break;
      case 2:
        initCollectionPage();
        break;
      case 3:
        initToolsPage();
        break;
      case 4:
        initAboutPage();
        break;
    }
  }

  /**
   * 初始化首页
   */
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

    // 初始化弹幕
    initDanmu();
  }

  /**
   * 初始化测评页
   */
  function initQuizPage() {
    if (typeof quizzes === 'undefined') return;

    var cardsContainer = document.getElementById('quizCards');
    if (!cardsContainer || cardsContainer.children.length > 0) return;

    var html = '';
    for (var i = 0; i < quizzes.length; i++) {
      var q = quizzes[i];
      html += '<div class="quiz-card" onclick="startQuiz(\'' + q.id + '\')">' +
        '<div class="quiz-card-header">' +
          '<svg class="quiz-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
            '<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>' +
          '</svg>' +
          '<div class="quiz-card-title">' + q.name + '</div>' +
        '</div>' +
        '<div class="quiz-card-desc">' + q.description + '</div>' +
        '<div class="quiz-card-meta">' +
          '<span class="quiz-card-time">' + q.duration + '</span>' +
          '<span style="font-size: 12px; color: var(--text-tertiary);">' + q.questions.length + '题</span>' +
        '</div>' +
      '</div>';
    }
    cardsContainer.innerHTML = html;
  }

  /**
   * 初始化合集页
   */
  function initCollectionPage() {
    if (typeof collections === 'undefined') return;

    var grid = document.getElementById('collectionGrid');
    if (!grid || grid.children.length > 0) return;

    renderCollections();
  }

  /**
   * 初始化工具页
   */
  function initToolsPage() {
    // 工具页内容已内联在HTML中
  }

  /**
   * 初始化关于页
   */
  function initAboutPage() {
    // 关于页内容已内联在HTML中
  }

  /**
   * 检查深夜时间
   */
  function checkNightTime() {
    if (typeof isNightTime !== 'function' || typeof getNightRescue !== 'function') return;

    var nightRescue = document.getElementById('nightRescue');
    if (isNightTime() && nightRescue) {
      nightRescue.classList.remove('hidden');
      document.getElementById('nightRescueText').textContent = getNightRescue();
    }
  }

  /**
   * 初始化弹幕
   */
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

  /**
   * 刷新引言
   */
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

  /**
   * 抽取互助卡
   */
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

  /**
   * 发布互助
   */
  window.postHelp = function() {
    var content = document.getElementById('helpPost').value.trim();
    if (!content) {
      alert('写点什么吧，哪怕只有一个字');
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
      alert('检测到你可能处于危机中。\n\n请立即联系：\n全国心理援助热线：400-161-9995\n北京回龙观医院危机干预：010-82951332\n生命热线：400-821-1215\n\n你并不孤单，帮助是可获得的。');
      return;
    }

    var postsContainer = document.getElementById('helpPosts');
    var newPost = document.createElement('div');
    newPost.className = 'help-post fade-in';
    newPost.innerHTML = '<div class="help-post-text">' + content + '</div><div class="help-post-footer"><span class="help-post-time">刚刚</span><button class="hug-btn" onclick="sendHug(this)">抱抱</button></div>';
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
    document.getElementById('helpPost').value = '';

    // 保存到本地
    var posts = JSON.parse(localStorage.getItem('helpPosts') || '[]');
    posts.unshift({ content: content, time: new Date().toISOString() });
    if (posts.length > 50) posts = posts.slice(0, 50);
    localStorage.setItem('helpPosts', JSON.stringify(posts));
  };

  /**
   * 发送抱抱
   */
  window.sendHug = function(btn) {
    btn.classList.add('hugged');
    btn.textContent = '已抱抱';
    btn.disabled = true;
  };

  /**
   * 跳转到测评
   */
  window.scrollToQuiz = function() {
    goToPage(1);
  };

  // ========================================
  // QUIZ LOGIC
  // ========================================

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
      alert('选一个吧，反正没有标准答案');
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

    var resultEmojis = {
      'atmer': '💸',
      'zzzz': '💤',
      'malo': '🐒',
      'shadow-roach': '🪳'
    };

    document.getElementById('resultEmoji').textContent = resultEmojis[result.id] || '🎭';
    document.getElementById('resultType').textContent = result.type || '';
    document.getElementById('resultTitle').textContent = result.name;
    document.getElementById('resultTagline').textContent = result.tagline;
    document.getElementById('resultDesc').textContent = result.description;
    document.getElementById('resultAdvice').textContent = result.advice;

    var recHtml = '';
    var recommendations = [
      { name: 'Pixel Thoughts', desc: '60秒冥想，把烦恼放进星星里', icon: '✨' },
      { name: '流体模拟', desc: '鼠标划过产生美丽的色彩流动', icon: '🌊' },
      { name: '发疯文学生成器', desc: '输入情绪，生成发疯文学', icon: '📝' }
    ];
    for (var k = 0; k < recommendations.length; k++) {
      var r = recommendations[k];
      recHtml += '<div class="collection-item" onclick="goToPage(2)" style="cursor: pointer;">' +
        '<div style="font-size: 24px; margin-right: var(--space-sm);">' + r.icon + '</div>' +
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
        alert('结果已复制到剪贴板');
      });
    } else {
      alert(text);
    }
  };

  window.restartQuiz = function() {
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('quizList').classList.remove('hidden');
  };

  // ========================================
  // COLLECTION LOGIC
  // ========================================

  var currentCategory = 'all';

  window.filterCategory = function(category, el) {
    currentCategory = category;
    var tabs = document.querySelectorAll('.category-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }
    el.classList.add('active');
    renderCollections();
  };

  function renderCollections() {
    if (typeof collections === 'undefined') return;

    var grid = document.getElementById('collectionGrid');
    var filtered = [];
    if (currentCategory === 'all') {
      filtered = collections;
    } else {
      for (var i = 0; i < collections.length; i++) {
        if (collections[i].category === currentCategory) {
          filtered.push(collections[i]);
        }
      }
    }

    var html = '';
    for (var j = 0; j < filtered.length; j++) {
      var item = filtered[j];
      var tagsHtml = '';
      for (var t = 0; t < item.tags.length; t++) {
        tagsHtml += '<span class="tag">' + item.tags[t] + '</span>';
      }
      html += '<a href="' + item.url + '" target="_blank" rel="noopener" class="collection-item">' +
        '<svg class="collection-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>' +
        '<div class="collection-item-content">' +
          '<div class="collection-item-title">' + item.name + '</div>' +
          '<div class="collection-item-desc">' + item.description + '</div>' +
          '<div class="collection-item-tags">' + tagsHtml + '</div>' +
          (item.mood ? '<div class="collection-item-mood">' + item.mood + '</div>' : '') +
        '</div>' +
      '</a>';
    }
    grid.innerHTML = html;
  }

  // ========================================
  // TOOLS LOGIC
  // ========================================

  window.generateFengwen = function() {
    if (typeof tools === 'undefined') return;

    var input = document.getElementById('fengwenInput').value.trim();
    if (!input) {
      alert('输入一个情绪关键词，比如"加班"、"失恋"');
      return;
    }

    var templates = tools.fengwenTemplates;
    var template = templates[Math.floor(Math.random() * templates.length)];
    var result = template.template.replace(/\{keyword\}/g, input);

    var output = document.getElementById('fengwenOutput');
    output.textContent = result;
    output.classList.add('show');
  };

  window.generateAltPlan = function() {
    if (typeof tools === 'undefined') return;

    var plans = tools.alternativePlans;
    var plan = plans[Math.floor(Math.random() * plans.length)];

    var output = document.getElementById('altPlanOutput');
    output.innerHTML = '<strong style="color: var(--text-primary);">' + plan.type + '</strong><br><br>' + plan.plan.join('<br>');
    output.classList.add('show');
  };

  window.drawToolHelpCard = function() {
    if (typeof tools === 'undefined') return;

    var cards = tools.helpCards;
    var card = cards[Math.floor(Math.random() * cards.length)];
    var textEl = document.getElementById('toolHelpCardText');
    textEl.style.opacity = '0';
    setTimeout(function() {
      textEl.textContent = card.text;
      textEl.style.opacity = '1';
    }, 300);
  };

  window.checkEnergy = function() {
    var levels = [
      { level: '满格', desc: '今天状态不错，继续保持' },
      { level: '半格', desc: '有点累了，记得休息' },
      { level: '低电量', desc: '需要充电，早点睡吧' },
      { level: '关机边缘', desc: '立刻去休息，什么都别想了' }
    ];
    var energy = levels[Math.floor(Math.random() * levels.length)];

    var output = document.getElementById('energyOutput');
    output.innerHTML = '<strong>今日能量：' + energy.level + '</strong><br>' + energy.desc;
    output.classList.add('show');
  };

})();
