// ============================================================
// 100条新提案 - 幽默诙谐风格 + 光子工作室梗
// 分类：A组（有feedback 50条）| B组（无feedback 50条）
// ============================================================

const NEW_PROPOSALS = [

// ======================================================================
// A组：有即时反馈（feedback）—— 50条
// ======================================================================

// --- 技术（5条）---



{ title:'测试数据泄露到生产环境，回档补偿', desc:'全服玩家数据被清空，回档到三天前。源哥说他"只是手滑了一下"。', tag:'技术', dau:-10, rep:-12, grind:0, fund:-2000, rejectDau:0, rejectRep:-5, rejectGrind:0, rejectFund:-500,
  feedback:{ approve:'全服补偿发下去，玩家一边领补偿一边问"下次能不能直接发福利，别走流程了"。', reject:'冷处理的结果是玩家帮你上了热搜，话题叫#某游策划集体失联#' } },

{ title:'引入AI升级反外挂系统导致误封，人工排查', desc:'新的反外挂AI太智能了，把排行榜前100的大佬全封了，理由是"操作过于非人"', tag:'技术', dau:-6, rep:-10, grind:2, fund:-300, rejectDau:4, rejectRep:-4, rejectGrind:2, rejectFund:200,
  feedback:{ approve:'解封公告发出去，大佬们表示"被AI认定为非人，这波不亏"。', reject:'大佬们建了个"被外挂系统认证群"，人数比官方群还多。' } },

{ title:'美术要求更新4K材质大包体上线', desc:'美术组说"4K材质必须上"，程序说"谁管玩家手机内存"。', tag:'技术', dau:-4, rep:-6, grind:0, fund:-200, rejectDau:2, rejectRep:3, rejectGrind:0, rejectFund:0,
  feedback:{ approve:'更新后玩家发现画质提升约等于开了个滤镜，但手机发热可以煎鸡蛋了。', reject:'你拒绝了，美术总监在你办公室门口贴了个"扼杀艺术的凶手"。' } },

// --- 商业化（5条）---

{ title:'通行证涨价到198，奖励加个表情包', desc:'原本68的通行证涨价到198，新增"限定·策划狗头表情包"一套', tag:'商业化', dau:2, rep:-10, grind:0, fund:2500, rejectDau:-1, rejectRep:6, rejectGrind:0, rejectFund:-400,
  feedback:{ approve:'氪佬秒买，普通玩家："这个表情包真的在嘲讽我。"', reject:'你拒绝了，玩家在论坛发帖"感恩策划不杀之恩"，加精了。' } },

{ title:'上调保底并增加安慰奖动画', desc:'保底从50抽涨到120抽，中间每20抽给个"谢谢参与"的华丽动画特效', tag:'商业化', dau:3, rep:-8, grind:0, fund:3000, rejectDau:-1, rejectRep:6, rejectGrind:0, rejectFund:-600,
  feedback:{ approve:'玩家抽到第19抽时开始期待"谢谢参与"的特效，据说比出SSR还稀有。', reject:'你保住了保底，玩家感动哭了——字面意义上的。' } },

{ title:'新增自动续费订阅制——每月送"电子木鱼"', desc:'每月30元自动续费，送一个"电子木鱼"挂件，敲一下积功德+1', tag:'商业化', dau:4, rep:-6, grind:0, fund:2800, rejectDau:-2, rep:5, rejectGrind:0, rejectFund:-400,
  feedback:{ approve:'电子木鱼销量惊人，玩家凌晨三点在公屏敲木鱼求SSR。' } },

// --- 活动（6条）---
{ title:'联动保时捷·共享单车版', desc:'联动共享单车品牌，游戏内载具变成扫码解锁版，骑5分钟自动锁车', tag:'活动', dau:4, rep:-5, grind:3, fund:1500, rejectDau:2, rep:6, rejectGrind:-2, rejectFund:-300,
  feedback:{ approve:'玩家骑着共享单车在游戏里跑图，到副本边发现要付99元的"超区调度费"。'} },

{ title:'举办第一届"策划祭天"玩家联欢会', desc:'线上玩家见面会，直播策划在线接受玩家审判，附带抽奖环节', tag:'活动', dau:6, rep:10, grind:2, fund:-800, rejectDau:-2, rep:-5, rejectGrind:0, rejectFund:-200,
  feedback:{ approve:'策划在台上被玩家喷到自闭，但直播人数破了纪录，这个月的KPI保住了。弹幕狂刷："建议办成年度例行活动"。'} },

{ title:'推出365天连续签到活动', desc:'连续签到一年送金色称号，中断一天从头再来。产品经理："这叫用户粘性。"', tag:'活动', dau:8, rep:-3, grind:6, fund:-100, rejectDau:-2, rep:5, rejectGrind:-3, rejectFund:200,
  feedback:{ approve:'第364天断签的玩家在官群发了一篇小作文，比《红楼梦》还长。', reject:'你没有推出这个阴间活动，全年无休的痛苦你愿意一个人承担。' } },

{ title:'限时活动——在游戏里找BUG送皮肤', desc:'玩家每提交一个有效BUG奖励限定皮肤，QA团队表示要失业了', tag:'活动', dau:10, rep:12, grind:5, fund:-1500, rejectDau:3, rep:-3, rejectGrind:2, rejectFund:500,
  feedback:{ approve:'玩家比QA专业，一天提了3000个BUG。程序看了一眼工单，默默预约了植发医生。', reject:'你拒绝了，第二天竞品上线了这个活动。你的QA团队松了口气，市场部想杀人。' } },

{ title:'推出五一挂机送道具活动', desc:'在线挂满8小时送限定头像框，致敬"游戏上班族"', tag:'活动', dau:7, rep:2, grind:12, fund:-100, rejectDau:2, rep:6, rejectGrind:-4, rejectFund:200,
  feedback:{ approve:'玩家挂机挂出了工伤感，论坛热帖：《今天我在游戏里上了个班》。', reject:'你没搞挂机活动，玩家说"良心策划"，转头去了隔壁挂机。' } },

{ title:'双十一特惠——充值送"砍一刀"', desc:'充值后可以分享给好友"砍一刀"，但进度精确到小数点后10位', tag:'活动', dau:8, rep:-6, grind:4, fund:2000, rejectDau:3, rep:5, rejectGrind:-2, rejectFund:-500,
  feedback:{ approve:'砍一刀链接刷爆家族群，老妈给你的侄子砍完之后问"这游戏的策划真坏。"', reject:'你制止了这场社交灾难，玩家称你为"最后的良心"。' } },

// --- 体验（5条）---

{ title:'新增"防沉迷式"健康答题系统', desc:'连续游戏1小时后弹出高数题，答对继续玩，答错强制下线', tag:'体验', dau:-5, rep:-8, grind:-4, fund:100, rejectDau:4, rep:7, rejectGrind:0, rejectFund:-100,
  feedback:{ approve:'玩家为了继续游戏开始疯狂复习高数，论坛变成考研交流群。', reject:'你否决了这个提案，玩家表示"策划还是个人"，但你只是懒得写题目。' } },

{ title:'新增"策划给你点赞"系统', desc:'玩家达成特定成就时，屏幕弹出你的大头照并竖起大拇指', tag:'体验', dau:1, rep:6, grind:0, fund:-100, rejectDau:0, rep:-2, rejectGrind:0, rejectFund:0,
  feedback:{ approve:'玩家看到策划大头照的第一反应是截图做表情包。你的脸开始在各个群里流传。', reject:'你保护了自己的肖像权，但也失去了成为网红的唯一机会。（黑红也是红）' } },

// --- 内容（5条）---
{ title:'停更剧情一个月全力开发新皮肤', desc:'剧情哪有皮肤赚钱，停更剧情专心做皮肤', tag:'内容', dau:-4, rep:-10, grind:2, fund:1800, rejectDau:3, rep:8, rejectGrind:-1, rejectFund:-600,
  feedback:{ approve:'玩家在贴吧发帖：《文案不是被裁了？》。你不敢回。' } },

// --- 社区（5条）---
{ title:'用小号空降玩家群试探民情', desc:'用小号潜入玩家群，结果发现有人说制作人的大脑像清朝文物', tag:'社区', dau:5, rep:8, grind:1, fund:-100, rejectDau:1, rep:-2, rejectGrind:1, rejectFund:0,
  feedback:{ approve:'你在群里说"我觉得这个游戏挺好的"，被群友发了100个"？"。截图传遍全网。', reject:'你没去，但你的表情包已经在群里传了三个回合了。' } },

{ title:'开放"骂策划"专区', desc:'开设专区供玩家自由发挥，每条骂帖自动回复"收到，已转达策划"', tag:'社区', dau:4, rep:10, grind:0, fund:-100, rejectDau:-1, rep:-4, rejectGrind:0, rejectFund:0,
  feedback:{ approve:'专区开了一天，社区服务器崩了。运维："这流量比游戏本身还大。"但的的确确收获了很多宝贵的建议。', reject:'你没开专区，玩家表示很失望——他们本来准备了很多新词。' } },

{ title:'招募玩家当荣誉策划设计皮肤', desc:'每月选一个玩家来当一天策划，设计一款皮肤并上线', tag:'社区', dau:8, rep:12, grind:3, fund:-500, rejectDau:-2, rep:-5, rejectGrind:0, rejectFund:200,
  feedback:{ approve:'当选玩家设计了一款"五彩斑斓的黑"皮肤，销量创下新高。“丑得别具一格的真得买"'} },

// --- 系统（5条）---

{ title:'新增"策划的凝视"BUFF', desc:'玩家长时间在线时，屏幕边缘出现你的头像并弹出"该休息了"', tag:'系统', dau:2, rep:5, grind:-4, fund:-50, rejectDau:-1, rep:-2, rejectGrind:0, rejectFund:0,
  feedback:{ approve:'玩家反馈"本来不想下线的，看到策划的脸直接吓到退出游戏"。目的达到了。', reject:'你没做这个功能，因为你怕半夜看到自己的脸也被吓到。' } },

{ title:'赛后新增"复盘"环节', desc:'对局结束后可以不加好友直接给队友发消息，一条1元', tag:'系统', dau:3, rep:-5, grind:0, fund:1800, rejectDau:0, rep:0, rejectGrind:0, rejectFund:0,
  feedback:{ approve:'赛后问候环节比对局还激烈，团队赚翻了，但代价呢？' } },

{ title:'新增"寻策划启事"隐藏任务', desc:'地图中藏了100个策划手办，集齐可召唤策划挨打', tag:'系统', dau:6, rep:9, grind:5, fund:-200, rejectDau:1, rep:-3, rejectGrind:1, rejectFund:100,
  feedback:{ approve:'玩家为了集齐手办跑遍了整个地图，论坛攻略比毕业论文还详细。第100个手办藏在付费地图里，策划你赢了。', reject:'你没收了手办，保洁阿姨在会议室发现了它们，问"这堆垃圾还要不要？"' } },

// --- 市场（5条）---

{ title:'竞品炸服期间投放抢量广告', desc:'竞品维护期间全渠道投放"不炸服"广告，文案：稳如老狗', tag:'市场', dau:10, rep:6, grind:0, fund:-800, rejectDau:-3, rep:-3, rejectGrind:0, rejectFund:200,
  feedback:{ approve:'广告上线当天，自家服务器也跟着炸了。"', reject:'你没蹭这个热度，因为上次你刚说完"稳如老狗"就炸了，PTSD了属于是。' } },

// --- 运营（5条）---

{ title:'让全服公告随机整活', desc:'运营每天发一条整活公告，从冷笑话到策划八卦', tag:'运营', dau:4, rep:10, grind:0, fund:0, rejectDau:-1, rep:-3, rejectGrind:0, rejectFund:0,
  feedback:{ approve:'今天的公告写了"策划午饭吃了螺蛳粉，下午开会没人敢靠近"。玩家截图热传。', reject:'你要求公告正经一点，运营说"好的"然后发了"策划今天很正经，什么都没发生。"' } },

{ title:'每天弹窗5次活动提醒', desc:'每天弹窗5次，关闭按钮缩小到5×5像素', tag:'运营', dau:1, rep:-12, grind:0, fund:1200, rejectDau:2, rep:8, rejectGrind:0, rejectFund:-200,
  feedback:{ approve:'玩家为了找到关闭按钮发了"寻找关闭按钮"的吐槽视频，热度比官方更新正片高。' } },

// --- 公关（4条）---

{ title:'在见面会送策划同款泡面当伴手礼', desc:'伴手礼是策划同款泡面——据说是加班专属口味', tag:'公关', dau:3, rep:8, grind:0, fund:-300, rejectDau:1, rejectRep:-3, rejectGrind:0,
  feedback:{ approve:'泡面被挂上某鱼，标题："策划同款加班泡面，吃一口体验007"。还真卖出去了。', reject:'你没安排泡面，玩家自带了，在见面会现场泡了一碗递给你说"尝尝，比你的香"。' } },

// ======================================================================
// B组：无即时反馈（无feedback）—— 50条
// ======================================================================

// --- 商业化（5条）---
{ title:'开箱系统上线——钥匙单独购买', desc:'箱子免费送，开箱钥匙2元一把。致敬某枪战游戏，连玩家骂的话都一样', tag:'商业化', dau:1, rep:-7, grind:0, fund:2600, rejectDau:2, rejectRep:6, rejectGrind:0, rejectFund:-500 },
{ title:'抽卡增加"策划保佑"特效——加钱版', desc:'抽卡时付费2元触发"策划保佑"特效，出货率不变但动画更华丽', tag:'商业化', dau:2, rep:-6, grind:0, fund:2500, rejectDau:1, rejectRep:5, rejectGrind:0, rejectFund:-300 },

// --- 活动（8条）---
{ title:'举办"最菜玩家"评选', desc:'鼓励玩家发自己的下饭视频，发放"真·电子榨菜"限定称号', tag:'活动', dau:5, rep:5, grind:3, fund:-100, rejectDau:-1, rejectRep:-3, rejectGrind:1, rejectFund:100 },

// --- 体验（5条）---
{ title:'将背包容量砍半增加真实感', desc:'背包容量砍半，让玩家感受"真实末日生存"', tag:'体验', dau:-4, rep:-8, grind:6, fund:200, rejectDau:3, rejectRep:6, rejectGrind:-3, rejectFund:-100 },

// --- 内容（5条）---
{ title:'推出"程序员的头发"武器皮肤', desc:'换上后武器外观还是原皮', tag:'内容', dau:3, rep:6, grind:1, fund:600, rejectDau:1, rejectRep:-3, rejectGrind:0, rejectFund:-100 },

{ title:'在小蓝书投放BUG集锦宣传片', desc:'市场部把上线以来经典BUG做成集锦投放，播放量出奇地好', tag:'市场', dau:7, rep:4, grind:0, fund:-500, rejectDau:-1, rejectRep:-2, rejectGrind:0, rejectFund:200 },

];

console.log('✅ 总提案数:', NEW_PROPOSALS.length);
console.log('📋 有feedback:', NEW_PROPOSALS.filter(p => p.feedback).length);
console.log('📋 无feedback:', NEW_PROPOSALS.filter(p => !p.feedback).length);
