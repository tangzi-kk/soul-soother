// Soul Soother - 数据文件（全面升级版）

// 今日抽象文案库
var dailyQuotes = [
  "我的精神状态：一边想死，一边怕死，一边觉得自己不配死，最后决定先活着，因为死了就看不到这么抽象的自己了",
  "确诊了：我是'想死但不敢'综合征晚期患者，病程：从出生到现在",
  "别人：内卷；我：内耗；别人：躺平；我：躺尸；别人：发疯；我：稳定地发疯",
  "我想死，但我的快递还没到，我的剧还没追完，我的猫还没喂，所以我决定先活着",
  "我的优点：知错就改；我的缺点：改了再犯；我的精神状态：改不改都无所谓",
  "这世界总有人要当废物，那为什么不能是我？至少我当废物当得很专业",
  "别人出门：纯欲风，辣妹风，可爱风；我出门：发疯，梅超风，密不透风",
  "我的钱包比我的脸还干净，但我的精神状态比我的钱包还空",
  "白天是搞笑的废物，深夜是抑郁的怪物，凌晨是抽象的哲学家",
  "别人：事业有成；我：成业有事（成天有事）；别人：爱情甜蜜；我：爱卿免礼",
  "我的社交状态：有，但都是网友，而且我们互相不知道真名",
  "我想死我想死我想死但我的外卖还没到我的剧还没追完我的猫还没喂所以我决定先活着等这些都做完了再死结果发现永远做不完所以我永远死不了真抽象哈哈哈哈",
  "崩溃就崩溃吧，谁还没个发疯的时候，啊啊啊啊啊我精神状态很好啊哈哈哈哈哈哈",
  "累了，毁灭吧，但先让我躺会儿——躺了三年，还在躺",
  "我的能量状态：早上起不来，中午睡不醒，下午犯迷糊，晚上特精神，凌晨想死",
  "别人：脱单；我：脱发；别人：发财；我：发胖；别人：发光；我：发疯",
  "我于昨晚去世，走时心如止水；我于今早重生，来时心怀忐忑",
  "言未出，结局已演千百遍；身未动，心中已过万重山；行未果，假想苦难愁不展；事已闭，过往仍在脑中演",
  "谁的生活不是一地鸡毛，只是有的人选择歇斯底里，有人选择沉默不语，我选择发疯",
  "浪漫和悲观并不冲突，时常消极但又觉得生活很美好——这就是传说中的'又丧又燃'",
  "我的精神状态：稳定地不稳定，规律地不规律，正常地不正常",
  "以前太讲素质，处处委屈自己、迁就别人；自从素质选择性消失，我的人生一路开挂，顺畅太多",
  "生活就像我的待办清单——越拖越长，最后直接撕掉",
  "我的精神状态：一边发疯，一边觉得发疯也挺好",
  "摆烂是一种态度，而我，是态度的极致",
  "朋友：今天心情怎么样？我：今天的心情像一张加载失败的网页，一片空白但偶尔还会闪一下",
  "我的社交模式：已读乱回",
  "别人的人生是主线任务，我的人生是随机刷新的支线任务，而且没人给我发奖励",
  "我不是不想社交，我是社交恐惧症晚期，准确说是'社交恐惧症+社恐+社恐+社恐'叠加态",
];

// 深夜急救包文案
var nightRescue = [
  "凌晨3点还没睡？恭喜你，你正在经历'深夜哲学家'模式",
  "凌晨4点的想法不是真实的，是你的大脑在骗你",
  "再坚持3小时，太阳就出来了——虽然太阳出来也不一定能解决问题，但至少天亮了",
  "给凌晨的你：你现在想的'不想活了'，天亮后可能变成'不想上班'，虽然也很痛苦，但至少不致命",
  "凌晨的你不是一个人，还有我们这群夜猫子陪着你发疯",
  "睡不着就睡不着吧，反正明天也不用早起——因为明天也不想活",
  "噩梦醒了？没事，现实可能比噩梦还抽象",
  "凌晨5点，最难熬的时候，但也是最接近天亮的时候",
  "你现在觉得'活着没意思'，是因为你的大脑在凌晨会自动播放悲伤BGM",
  "再坚持一下，等早餐店开门，先吃个包子再说",
];

// 互动工具数据
var tools = {
  // 发疯文学生成模板
  fengwenTemplates: [
    { template: "啊啊啊啊啊我{e}啊{e}啊{e}啊但我的快递还没到我的剧还没追完我的猫还没喂所以我决定先活着等这些都做完了再死结果发现永远做不完所以我永远死不了真抽象哈哈哈哈", weight: 3 },
    { template: "我{e}了但我的外卖还没到所以先活着结果发现外卖永远吃不完所以我永远死不了纯纯大冤种就是我", weight: 2 },
    { template: "{e}就{e}吧谁还没个发疯的时候啊啊啊啊啊我精神状态很好啊哈哈哈哈哈哈世界毁灭吧但先让我躺会儿", weight: 2 },
    { template: "我想{e}但我的花呗还没还完所以我决定先活着等还完花呗再死结果发现永远还不完栓Q", weight: 2 },
    { template: "别人：{e}了但还能坚持；我：{e}了直接发疯；结论：我比别人效率高", weight: 1 },
    { template: "今天的我：{e}了，但没关系，因为明天的我可能更{e}。总结：我每天都在{e}的路上越走越远", weight: 2 },
    { template: "我{e}的样子一定很狼狈，但没关系，因为我不在乎了——因为我{e}到已经不在乎{e}这件事了", weight: 1 },
  ],

  // "想死"替代方案
  alternativesToDeath: [
    { text: "先吃完这顿外卖再死", type: "食物" },
    { text: "等这部剧更新完再死", type: "追剧" },
    { text: "先把花呗还完再死", type: "现实" },
    { text: "等猫找到新主人再死", type: "牵挂" },
    { text: "先看完明天的日出再死——然后发现每天都能看到日出，所以每天都不能死", type: "诗意" },
    { text: "等快递到了再死", type: "日常" },
    { text: "先把冰箱里的东西吃完再死，不能浪费", type: "食物" },
    { text: "等这个月的工资发了再死", type: "现实" },
    { text: "先把游戏通关再死", type: "游戏" },
    { text: "等喜欢的人回复消息再死——然后发现永远等不到，所以永远死不了", type: "情感" },
    { text: "先把作业写完再死——然后发现永远写不完", type: "现实" },
    { text: "等天气好了再死——然后发现天气永远不会好", type: "自然" },
    { text: "先把存款花完再死——然后发现存款永远花不完（因为根本没有）", type: "扎心" },
    { text: "等头发长出来再死——然后发现永远长不出来", type: "自嘲" },
    { text: "先把体重减到100斤再死——然后发现永远减不到", type: "自嘲" },
    { text: "等喜欢的UP主更新再死", type: "追更" },
    { text: "先把购物车清空再死——然后发现永远清不完", type: "消费" },
    { text: "等春天来了再死——然后发现冬天还没过完", type: "自然" },
    { text: "先把想骂的人骂完再死——然后发现骂不完", type: "发泄" },
    { text: "先把今天熬过去再死——然后发现明天更难熬，所以明天也不能死", type: "循环" },
  ],

  // 互助卡
  helpCards: [
    { icon: "🤗", text: "给今天的你一个抱抱" },
    { icon: "💚", text: "你不用马上好起来" },
    { icon: "", text: "先喝水，别跟人生硬刚" },
    { icon: "🆘", text: "如果你现在很危险，请立刻联系现实中的人" },
    { icon: "😴", text: "允许自己今天不营业" },
    { icon: "⭐", text: "你已经做得很好了" },
    { icon: "️", text: "累了就歇，困了就睡" },
    { icon: "✨", text: "你的存在本身就是意义" },
    { icon: "🛋️", text: "撑不住就躺会儿，不丢人" },
    { icon: "🔇", text: "世界很吵，你可以先静音" },
    { icon: "🐛", text: "阴暗爬行也算移动" },
    { icon: "🌟", text: "没有发光也没事，萤火虫也不是天天营业" },
    { icon: "✓", text: "今日份活着已打卡" },
    { icon: "💪", text: "人生先别优化，先保活" },
    { icon: "🔄", text: "你不用重启人生，先重启浏览器" },
    { icon: "", text: "今天只要没爆炸，就算系统稳定运行" },
    { icon: "", text: "先这样也可以" },
    { icon: "💧", text: "哭完记得喝水" },
    { icon: "", text: "你不是废物，你是加载中" },
    { icon: "🎯", text: "你的问题不是废，是启动成本高" },
  ],

  // 情绪颜色测试数据
  emotionColors: {
    questions: [
      { text: "你最喜欢哪个颜色？", options: [{ text: "蓝色", color: "#4a90d9" }, { text: "绿色", color: "#7ed321" }, { text: "紫色", color: "#9013fe" }, { text: "橙色", color: "#f5a623" }] },
      { text: "你现在的心情更接近？", options: [{ text: "阴天", color: "#8e8e93" }, { text: "雨天", color: "#5ac8fa" }, { text: "晴天", color: "#ffcc00" }, { text: "雾天", color: "#d1d1d6" }] },
      { text: "如果用一个词形容今天？", options: [{ text: "平静", color: "#34c759" }, { text: "疲惫", color: "#ff3b30" }, { text: "迷茫", color: "#af52de" }, { text: "还行", color: "#ff9500" }] },
    ],
    results: [
      { name: "深海蓝", desc: "你的情绪像深海，表面平静，底下暗流涌动。你不是不难过，你只是习惯了把难过藏在别人看不到的地方。", color: "#4a90d9" },
      { name: "迷雾灰", desc: "你的情绪像一场大雾，看不清方向，也不想看清。你不是没有目标，你是觉得目标太远了，不如原地待着。", color: "#8e8e93" },
      { name: "余烬橙", desc: "你的情绪像快要熄灭的火，偶尔还会闪一下。你不是没有热情，你是把热情藏在了一个很深的地方，只有特别的时候才会拿出来。", color: "#f5a623" },
      { name: "暗夜紫", desc: "你的情绪像深夜的天空，看起来很暗，但其实藏着无数星星。你不是没有希望，你是把希望藏在了夜里，等一个愿意抬头看天的人。", color: "#9013fe" },
    ]
  }
};

// 趣味测评数据 - SBTI 抽象风格
var quizzes = [
  {
    id: "mental-state",
    name: "测测你的精神状态有多美丽",
    description: "用荒诞的题目检测你的精神状态，结果可能让你笑出声",
    icon: "🧠",
    duration: "2分钟",
    questions: [
      {
        id: 1,
        text: "你走在街上，一位萌萌的小女孩递给你一根棒棒糖，此时你作何感想？",
        options: [
          { text: "呜呜她真好真可爱！居然给我棒棒糖！", value: 1 },
          { text: "一脸懵逼，作挠头状", value: 2 },
          { text: "这也许是一种新型诈骗？还是走开为好", value: 3 },
        ],
      },
      {
        id: 2,
        text: "你因便秘坐在马桶上（已长达 30 分钟），拉不出很难受。此时你更像？",
        options: [
          { text: "再坐三十分钟看看，说不定就有了", value: 1 },
          { text: "用力拍打自己的屁股并说：'死屁股，快拉啊！'", value: 2 },
          { text: "使用开塞露，快点拉出来才好", value: 3 },
        ],
      },
      {
        id: 3,
        text: "我和人相处主打一个电子围栏，靠太近会自动报警",
        options: [
          { text: "认同（疯狂点头）", value: 3 },
          { text: "中立（看情况）", value: 2 },
          { text: "不认同（我社牛）", value: 1 },
        ],
      },
      {
        id: 4,
        text: "我是一只阴暗的老鼠，一只爬行的蟑螂，这辈子没谈过恋爱，胆怯又自卑……",
        options: [
          { text: "我哭了……", value: 3 },
          { text: "这是什么……", value: 2 },
          { text: "这不是我！", value: 1 },
        ],
      },
      {
        id: 5,
        text: "此题没有题目，请盲选",
        options: [
          { text: "反复思考后感觉应该选 A？", value: 3 },
          { text: "啊，要不选 B？", value: 2 },
          { text: "不会就选 C？", value: 1 },
        ],
      },
      {
        id: 6,
        text: "对象超过 5 小时没回消息，说自己窜稀了，你会怎么想？",
        options: [
          { text: "拉稀不可能 5 小时，也许 ta 隐瞒了我", value: 3 },
          { text: "在信任和怀疑之间摇摆", value: 2 },
          { text: "也许今天 ta 真的不太舒服", value: 1 },
        ],
      },
      {
        id: 7,
        text: "快考试了学校规定必须上晚自习，但今晚你约了男女神一起打游戏，你怎么办？",
        options: [
          { text: "翘了！反正就一次！", value: 3 },
          { text: "干脆请个假吧", value: 2 },
          { text: "都快考试了还去啥", value: 1 },
        ],
      },
      {
        id: 8,
        text: "我不够好，周围的人都比我优秀",
        options: [
          { text: "确实（真诚脸）", value: 3 },
          { text: "有时", value: 2 },
          { text: "不是（自信放光芒）", value: 1 },
        ],
      },
    ],
    results: [
      {
        id: "atmer",
        name: "ATM-er（提款机型）",
        tagline: "燃烧自己，照亮别人的钱包；持续性输出资源，间歇性怀疑人生",
        description: "你不是没有自我，你只是把自我当成了提款机。你总在付出，总在照顾别人，但没人问过你累不累。你的善良是一种病——一种很贵的病。",
        advice: "今天试试把\"好\"字从字典里删掉。别人找你帮忙，先说\"让我想想\"——想三天也行。你不是提款机，你是人。",
        minScore: 8,
        maxScore: 12,
        type: "付出型",
      },
      {
        id: "zzzz",
        name: "ZZZZ（装死者）",
        tagline: "DDL 前的顶级潜水员。不到死线不呼吸，一到死线变战斗机",
        description: "你不是没有执行力，你只是需要世界先把刀架到你脖子上。平时像一张正在加载失败的网页，DDL 前突然变成军用服务器。你的问题不是废，是启动成本高。",
        advice: "别重启人生，先重启浏览器。你的能力一直都在，只是它需要一个极端场景才能被激活。建议在非 DDL 时间也偶尔吓唬一下自己。",
        minScore: 13,
        maxScore: 17,
        type: "延迟启动型",
      },
      {
        id: "malo",
        name: "MALO（吗喽型）",
        tagline: "奉行'猿力觉醒'。主打一个低欲望参与，只要我够废，生活就卷不到我",
        description: "你不是不努力，你是努力了发现没什么用。所以你选择了一种更高级的生存策略——降低预期。这不是摆烂，这是进化。当别人还在内卷，你已经完成了从灵长类到躺平类的跨越。",
        advice: "吗喽的快乐是真实的，吗喽的自由是真实的。但记得偶尔站起来走走，毕竟吗喽也是要走路的。",
        minScore: 18,
        maxScore: 21,
        type: "低耗能型",
      },
      {
        id: "shadow-roach",
        name: "阴暗爬行型",
        tagline: "白天是搞笑废物，深夜是抑郁怪物，凌晨是抽象哲学家",
        description: "你的精神状态已经不能用'好'或'坏'来描述。你是一台 24 小时不间断运转的情绪永动机，白天笑嘻嘻，深夜哭唧唧，凌晨思考宇宙的终极意义。你的能量不是没了，是分配得太均匀了——均匀地分布在了每一个崩溃的时刻。",
        advice: "爬行也是一种前进方式。不用和别人比速度，你只需要比昨天的自己多爬一寸。对了，凌晨3点的想法不真实，等天亮了再说。",
        minScore: 22,
        maxScore: 24,
        type: "全天候波动型",
      },
    ],
  },
  {
    id: "social-mask",
    name: "你的社交面具是什么？",
    description: "了解你在不同人面前戴的哪副面具，以及面具下的真实模样",
    icon: "🎭",
    duration: "2分钟",
    questions: [
      {
        id: 1,
        text: "你最近一次崩溃是因为？",
        options: [
          { text: "外卖迟到了", value: 1 },
          { text: "发现自己还活着", value: 2 },
          { text: "以上都是", value: 3 },
          { text: "我不崩溃，我直接发疯", value: 4 },
        ],
      },
      {
        id: 2,
        text: "朋友带了 ta 的朋友一起来玩，你最可能的状态是？",
        options: [
          { text: "对'朋友的朋友'天然有点距离感", value: 4 },
          { text: "看对方，能玩就玩", value: 2 },
          { text: "朋友的朋友应该也算朋友！要热情聊天", value: 1 },
        ],
      },
      {
        id: 3,
        text: "我在不同人面前会表现出不一样的自己",
        options: [
          { text: "认同（我是变色龙）", value: 4 },
          { text: "中立（看情况）", value: 2 },
          { text: "不认同（我就是我）", value: 1 },
        ],
      },
      {
        id: 4,
        text: "有时候你对一件事有不同的、负面的看法，但最后没说出来。多数情况下原因是？",
        options: [
          { text: "这种情况较少", value: 1 },
          { text: "可能碍于情面或者关系", value: 2 },
          { text: "不想让别人知道自己是个阴暗的人", value: 3 },
        ],
      },
      {
        id: 5,
        text: "我在感情里经常担心被对方抛弃",
        options: [
          { text: "是的（焦虑型依恋）", value: 4 },
          { text: "偶尔", value: 2 },
          { text: "不是（我很独立）", value: 1 },
        ],
      },
      {
        id: 6,
        text: "大多数人是善良的",
        options: [
          { text: "其实邪恶的人心比世界上的痔疮更多", value: 4 },
          { text: "也许吧", value: 2 },
          { text: "是的，我愿相信好人更多", value: 1 },
        ],
      },
    ],
    results: [
      {
        id: "hedgehog",
        name: "电子刺猬型",
        tagline: "我和人相处主打一个电子围栏，靠太近会自动报警",
        description: "你不是不想被爱，你是怕被爱之后再失去。你的社交策略是先拒绝，再慢慢接受。像一只刺猬，远看可爱，近看全是刺。但那些刺不是用来伤人的，是用来保护自己的。",
        advice: "刺猬的刺可以收起来。试试在安全的人面前，把刺收一根。不用全部收，一根就行。",
        minScore: 6,
        maxScore: 10,
        type: "防御型",
      },
      {
        id: "chameleon",
        name: "变色龙型",
        tagline: "我在每个人面前都是不同的我，但到底哪个才是真正的我？",
        description: "你的社交能力很强，强到你自己都不知道哪个是真实的你。你会根据场合、对象、氛围自动切换人设。这不是虚伪，这是生存技能。但偶尔，你也会觉得累——因为你一直在演，而且没有剧本。",
        advice: "不用急着找\"真正的自己\"。你可能就是由无数个面具组成的，而这也是真实的你。今天试着做一件事：对一个人说一句你真实想说的话。",
        minScore: 11,
        maxScore: 15,
        type: "适应型",
      },
      {
        id: "ghost",
        name: "透明人型",
        tagline: "我就像一张加载失败的网页——一片空白，但偶尔还会闪一下",
        description: "你习惯在人群中隐身。你不主动说话，不主动做事，不主动存在。你不是没有想法，你是觉得自己的想法不重要。你的存在感被你自己按了静音键。",
        advice: "透明人也可以有颜色。今天试试发出一点声音——哪怕只是在群里发一个表情包。你的存在本身就是有意义的，不需要任何人来证明。",
        minScore: 16,
        maxScore: 19,
        type: "隐身型",
      },
      {
        id: "blackhole",
        name: "黑洞型",
        tagline: "我的情绪是一个黑洞，靠近的人都会被吸进去",
        description: "你不是没有朋友，你是有朋友但觉得他们迟早会离开。你渴望亲密，但又害怕亲密。你把每个人都推开，然后说\"看吧，果然没人爱我\"。这不是你的错，是你的心太怕受伤了。",
        advice: "黑洞也可以是温暖的。你不需要变得完美才值得被爱。你可以带着你的黑洞，找到一个愿意被吸引的人。在此之前，先学会和自己待在一起。",
        minScore: 20,
        maxScore: 24,
        type: "矛盾型",
      },
    ],
  },
];

// 治愈合集数据 - 增加测评维度
var collections = [
  {
    id: "pixel-thoughts",
    name: "Pixel Thoughts",
    description: "60秒冥想，把烦恼放进星星里。对着大海发呆，看着星星消失，你会觉得自己的烦恼也挺小的",
    url: "https://www.pixelthoughts.co/",
    category: "tools",
    tags: ["放松", "专注", "深夜"],
    icon: "✨",
    ratings: { fun: 3, ease: 5, relief: 5, safety: 5, lowEnergy: 5 },
    mood: "适合想哭的时候",
    review: "像有人安静地陪你坐了60秒，什么都不说，但什么都懂",
  },
  {
    id: "fluid-simulation",
    name: "流体模拟",
    description: "鼠标划过产生美丽的色彩流动，像把颜料倒进水里。不需要任何技巧，随便划拉都好看",
    url: "https://paveldogreat.github.io/WebGL-Fluid-Simulation/",
    category: "games",
    tags: ["放松", "解压", "无聊"],
    icon: "",
    ratings: { fun: 5, ease: 5, relief: 4, safety: 5, lowEnergy: 5 },
    mood: "适合无聊+烦躁的时候",
    review: "划了半小时，感觉自己像个不会画画的画家——但画出来的东西比画家还好看",
  },
  {
    id: "weave-silk",
    name: "Weave Silk",
    description: "对称绘画工具，画出美丽的光影图案。不需要艺术天赋，鼠标随便动都能出大片",
    url: "http://weavesilk.com/",
    category: "games",
    tags: ["放松", "专注", "无聊"],
    icon: "🎨",
    ratings: { fun: 4, ease: 5, relief: 4, safety: 5, lowEnergy: 4 },
    mood: "适合需要一点成就感的时候",
    review: "我以为我是个废物，但用它画出来的东西让我觉得我可能是个天才废物",
  },
  {
    id: "window-swap",
    name: "Window Swap",
    description: "看世界各地陌生人窗外的风景。上一秒在伦敦下雨，下一秒在东京看夜景",
    url: "https://window-swap.com/",
    category: "websites",
    tags: ["放松", "开心", "失眠"],
    icon: "🪟",
    ratings: { fun: 4, ease: 5, relief: 3, safety: 5, lowEnergy: 5 },
    mood: "适合想逃离现在的地方",
    review: "看了10个窗口后我觉得世界还挺大的，我的房间虽然小但至少是个窗口",
  },
  {
    id: "rainy-mood",
    name: "Rainy Mood",
    description: "经典雨声背景音。打开就是一扇窗+一场雨，配合深呼吸效果拔群",
    url: "https://rainymood.com/",
    category: "websites",
    tags: ["放松", "睡眠", "深夜"],
    icon: "️",
    ratings: { fun: 2, ease: 5, relief: 4, safety: 5, lowEnergy: 5 },
    mood: "适合睡不着的时候",
    review: "听着雨声感觉自己住在一个不会漏雨的房子里，外面下多大雨都无所谓",
  },
  {
    id: "soft-murmur",
    name: "A Soft Murmur",
    description: "自定义环境音，雨声、雷声、鸟鸣、咖啡店的噪音……想听什么调什么",
    url: "https://asoftmurmur.com/",
    category: "websites",
    tags: ["放松", "睡眠", "专注"],
    icon: "🎵",
    ratings: { fun: 3, ease: 4, relief: 4, safety: 5, lowEnergy: 4 },
    mood: "适合需要白噪音的时候",
    review: "调了一个雨天+咖啡店的组合，感觉自己是个在咖啡馆躲雨的孤独作家",
  },
  {
    id: "little-alchemy",
    name: "Little Alchemy 2",
    description: "组合元素创造新物品。水+火=蒸汽，土+火=岩浆……像在玩一个没有终点的化学游戏",
    url: "https://littlealchemy2.com/",
    category: "games",
    tags: ["放松", "专注", "无聊"],
    icon: "⚗️",
    ratings: { fun: 4, ease: 4, relief: 3, safety: 5, lowEnergy: 3 },
    mood: "适合需要一点\"小成就感\"的时候",
    review: "本来只想玩5分钟，结果合出了\"生命\"——感觉自己像上帝，但只是一个很废的上帝",
  },
  {
    id: "my-noise",
    name: "My Noise",
    description: "高质量白噪音生成器。从雨声到咖啡馆，从森林到海边，声音质量极高",
    url: "https://mynoise.net/",
    category: "tools",
    tags: ["放松", "睡眠", "专注"],
    icon: "🔊",
    ratings: { fun: 3, ease: 4, relief: 4, safety: 5, lowEnergy: 4 },
    mood: "适合需要背景音的人",
    review: "比YouTube上的白噪音好用一万倍，因为没有广告突然跳出来吓你一跳",
  },
  {
    id: "thisissand",
    name: "thisissand",
    description: "在屏幕上倒沙子，堆积成你想要的样子。没有目标，没有规则，就是倒沙子",
    url: "https://thisissand.com/",
    category: "games",
    tags: ["放松", "专注", "无聊"],
    icon: "⏳",
    ratings: { fun: 3, ease: 5, relief: 4, safety: 5, lowEnergy: 5 },
    mood: "适合大脑不想转的时候",
    review: "倒了20分钟沙子，感觉自己像个很佛的园丁，种的不是花，是沙",
  },
  {
    id: "pointer-pointer",
    name: "Pointer Pointer",
    description: "把鼠标放在屏幕上任意位置，网站会找出一张手指指向你鼠标位置的照片。纯抽象",
    url: "https://pointerpointer.com/",
    category: "games",
    tags: ["开心", "无聊", "解压"],
    icon: "👆",
    ratings: { fun: 5, ease: 5, relief: 3, safety: 5, lowEnergy: 5 },
    mood: "适合想笑一下的时候",
    review: "玩了半小时，笑出了声，然后意识到我在对着一个指我鼠标的网页笑——更抽象了",
  },
  {
    id: "neave-tv",
    name: "Neave TV",
    description: "随机播放有趣的视觉体验。每次点击都是一个新世界，从万花筒到抽象动画",
    url: "https://neave.tv/",
    category: "websites",
    tags: ["开心", "无聊", "放松"],
    icon: "",
    ratings: { fun: 5, ease: 5, relief: 3, safety: 5, lowEnergy: 5 },
    mood: "适合无聊但不想动脑的时候",
    review: "点了一个又一个，像是在拆一个永远拆不完的盲盒",
  },
  {
    id: "drum-machine",
    name: "EmuDrums",
    description: "在线打鼓机。不需要音乐基础，随便敲都有节奏感。声音很好听",
    url: "https://emudrums.com/",
    category: "tools",
    tags: ["开心", "解压", "无聊"],
    icon: "🥁",
    ratings: { fun: 4, ease: 4, relief: 4, safety: 5, lowEnergy: 4 },
    mood: "适合想发泄的时候",
    review: "乱敲了一通居然还挺好听，感觉自己是个隐藏的音乐天才——虽然是自封的",
  },
];

// 弹幕数据
var danmuList = [
  "今日份活着已打卡 ✓",
  "你不是废物，你是加载中",
  "人生先别优化，先保活",
  "阴暗爬行也算移动",
  "没有发光也没事，萤火虫也不是天天营业",
  "世界很吵，你可以先静音",
  "今天只要没爆炸，就算系统稳定运行",
  "先喝水，别跟人生硬刚",
  "你不用马上好起来",
  "给今天的你一个抱抱",
  "撑不住就躺会儿，不丢人",
  "你已经做得很好了",
  "允许自己今天不营业",
  "累了就歇，困了就睡",
  "你的存在本身就是意义",
  "不用重启人生，先重启浏览器",
  "DDL前你会变成军用服务器",
  "你不是没执行力，是启动成本高",
  "被窝潜水也是潜水",
  "电子围栏不是病，是自我保护",
  "哭完记得喝水",
  "先这样也可以",
  "今天没死，明天再说",
  "活着本身就是KPI",
  "别内卷了，先保活",
];

// 获取今日文案
function getDailyQuote() {
  var today = new Date();
  var index = today.getDate() % dailyQuotes.length;
  return dailyQuotes[index];
}

// 获取随机文案
function getRandomQuote() {
  return dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
}

// 生成发疯文学（升级版）- 使用 split/join 替代 replaceAll 提高兼容性
function generateFengwen(emotion) {
  var totalWeight = tools.fengwenTemplates.reduce(function(sum, t) { return sum + t.weight; }, 0);
  var random = Math.random() * totalWeight;
  var selected = tools.fengwenTemplates[0];
  for (var i = 0; i < tools.fengwenTemplates.length; i++) {
    random -= tools.fengwenTemplates[i].weight;
    if (random <= 0) { selected = tools.fengwenTemplates[i]; break; }
  }
  // 使用 split/join 替代 replaceAll，兼容性更好
  return selected.template.split('{e}').join(emotion);
}

// 获取替代方案
function getAlternative() {
  return tools.alternativesToDeath[Math.floor(Math.random() * tools.alternativesToDeath.length)];
}

// 获取深夜文案
function getNightRescue() {
  var hour = new Date().getHours();
  if (hour >= 1 && hour <= 5) {
    return nightRescue[Math.floor(Math.random() * nightRescue.length)];
  }
  return "深夜急救包只在凌晨1-5点开启，现在先好好活着吧~";
}

// 检查是否是深夜
function isNightTime() {
  var hour = new Date().getHours();
  return hour >= 1 && hour <= 5;
}

// 渲染星级
function renderStars(count) {
  var stars = '';
  for (var i = 0; i < count; i++) stars += '⭐';
  for (var j = count; j < 5; j++) stars += '☆';
  return stars;
}
