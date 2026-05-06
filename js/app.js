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

  document.addEventListener('DOMContentLoaded', function() {
    container = document.getElementById('pagesContainer');

    // 初始化首页内容
    initHomePage();

    // 监听滚动事件更新指示器
    container.addEventListener('scroll', updatePageIndicator, { passive: true });

    // 初始化引力场
    setTimeout(function() {
      if (window.GravityP5) {
        window.GravityP5.init('gravityCanvas');
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
    var weatherEmoji = document.getElementById('weatherEmoji');
    var weatherLabel = document.getElementById('weatherLabel');
    var weatherDesc = document.getElementById('weatherDesc');

    if (weatherEmoji && !weatherEmoji.textContent) {
      var weather = getWeather();
      weatherEmoji.textContent = weather.emoji;
      weatherLabel.textContent = weather.label;
      weatherDesc.textContent = weather.desc;
    }
  }

  window.showWeatherDetail = function() {
    var weather = getWeather();
    alert('今日精神天气：' + weather.label + '\n' + weather.desc + '\n\n点击"开心一秒"获取对应推荐');
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
    switch(game) {
      case 'blanket':
        alert('🐕 你给小狗盖好了被子！\n\n小狗说：谢谢你，我很暖和。');
        break;
      case 'trash':
        alert('🗑️ 你把坏念头拖进了垃圾桶！\n\n垃圾桶说：又满了，但我还能装。');
        break;
      case 'light':
        alert('💡 你给脑子关了一盏灯！\n\n脑子说：终于可以休息一下了。');
        break;
      case 'settle':
        var achievements = [
          '✅ 今天还活着',
          '✅ 今天喝了水',
          '✅ 今天呼吸了',
          '✅ 今天没爆炸'
        ];
        alert('📊 今日活着结算：\n\n' + achievements.join('\n') + '\n\n总计：+100 生存分');
        break;
    }
  };

  window.generateFengwen = function() {
    if (typeof generateFengwen !== 'function') return;

    var input = document.getElementById('fengwenInput').value.trim();
    if (!input) {
      alert('输入一个情绪关键词，比如"加班"、"失恋"');
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
      alert('输入你脑子里的坏念头');
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
      html += '<a href="' + item.url + '" target="_blank" rel="noopener" class="collection-item">' +
        '<div style="font-size: 20px; margin-right: var(--space-2);">' + item.icon + '</div>' +
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
      html += '<div class="quiz-card" onclick="startQuiz(\'' + q.id + '\')">' +
        '<div class="quiz-card-header">' +
          '<div class="quiz-card-icon">' + q.icon + '</div>' +
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
      'shadow-roach': '🪳',
      'safe': '🔋',
      'warning': '🌡️',
      'crisis': '🚨'
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
      recHtml += '<div class="collection-item" onclick="goToPage(1)" style="cursor: pointer;">' +
        '<div style="font-size: 20px; margin-right: var(--space-2);">' + r.icon + '</div>' +
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
        alert('求救卡已复制到剪贴板');
      });
    } else {
      alert(text);
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
