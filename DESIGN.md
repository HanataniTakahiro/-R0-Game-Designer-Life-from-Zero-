# 重生之·我要当顶级策划 — 设计文档（从 index.html 还原）

## 概要
- 目标：将 `index.html` 中实现的单文件交互游戏拆解为一份可读、可实现的设计文档，便于开发、重构与扩展。
- 主要玩法：玩家在每一回合（共 40 轮）选择同意或拒绝运营提案；每 5 轮结算一次统计并更新指标；根据最终指标判定结局。
- 相关文件：`index.html`（页面 + 样式 + 逻辑）、`proposals_100.js`（可选的额外提案数据）。

## 设计目标
- 保持玩法简单直观，突出“运营决策”的后果延迟感。
- 支持移动端触控（滑动决策）与桌面端点击交互。
- 易于扩展提案池、链式事件（unlock）、隐藏事件与结局条件。

## 核心数据模型
- 全局状态对象：`G`（游戏运行时主状态）
  - `playerName`：玩家名
  - `round`：当前回合索引（0-based）
  - `totalRounds`：总回合数（40）
  - `phaseSize`：每个阶段回合数（5）
  - `dau`、`rep`、`grind`、`fund`：四个主要数值（DAU 日活、口碑、爆肝、资金）
  - `proposals`：长度为 40 的提案槽位数组（部分为 null 或锁定事件）
  - `_rejectPool`：备用提案池（用于某些触发拒绝时填充）
  - `_silverPotResolved`：标记某个联动事件是否已处理
  - `_pendingUnlocks`：批准后解锁的后续提案队列
  - `_pendingHiddenEvents`：批准后触发但只在结算时生效的隐藏事件数组
  - `currentDau/Rep/Grind/Fund`：本阶段（未结算前）累积的数值变更
  - `phaseDecisions`：本阶段收集的决策列表
  - `ended`、`showResult`、`endingId`：结局与 UI 状态

- 提案结构（示例字段）
  - `title`、`desc`、`tag`
  - `dau`, `rep`, `grind`, `fund`：批准时的直接影响（可为正/负）
  - `rejectDau`, `rejectRep`, `rejectGrind`, `rejectFund`：拒绝时的影响备选值
  - `feedback`：批准/拒绝时即时弹窗文案（可选）
  - `hiddenEvent`：批准后在结算时生效的事件（可改变 dau/rep/grind/fund，并带文本）
  - `unlocks`：批准后解锁的后续提案链（数组）

## 游戏流程（高层）
1. 开场打字特效（`OPENING_TEXT`），可跳过。
2. 标题页输入玩家名字，点击 `开始运营` 调用 `initState(name)`。
3. `initState`：合并基础提案池、随机洗牌、构建 40 个槽位（前 20 普通，第21 固定联动触发，22-25 预留，26-40 普通），初始化 `G`。
4. 每回合显示 `proposals[G.round]` 的内容，由玩家通过滑动或按钮 `accept/reject` 做出选择。
5. 记录决策并将对应效果累加入 `G.current*`，同时可能触发即时 `feedback` 弹窗或将 `unlocks` 推入 `_pendingUnlocks`。
6. 若回合为第 21（索引 20）且未处理联动，则根据选择把 22-25 槽位填充为联动链或替补池。
7. 每完成一回合 `G.round++`，若本阶段结束（G.round % phaseSize === 0），弹出结算 `showSettlement()`，计算并应用长期数值变更；否则继续下一提案。
8. 40 轮完成后调用 `determineEnding()`，根据最终 `dau/rep/grind/fund` 判定结局并展示。

## 结算规则（当前实现）
- 阶段长度：5 轮
- 基准增长：`baseGrowth = 20`（表示每 5 轮基盘增长百分比），最终增长率：
  - `growthRate = baseGrowth + G.currentDau`（当前实现把各提案的 `dau` 直接累加为百分比贡献）
  - 根据 `G.rep` 应用口碑修正：
    - rep >= 60 → repMod = 1.2
    - rep >= 40 → repMod = 1.0
    - rep >= 20 → repMod = 0.85
    - else → repMod = 0.5
  - `growthRate *= repMod`
  - 爆肝惩罚：若 `G.grind > 30`，则 `growthRate -= (G.grind - 30) * 0.5`
  - 限制：`growthRate = clamp(round(growthRate), -15, 80)`
- 应用：`G.dau = floor(G.dau * (1 + growthRate/100))`（最小为 1000）
- 口碑、爆肝、资金：`G.rep += G.currentRep`（取 0-100）、`G.grind += G.currentGrind`（取 0-100）、`G.fund += G.currentFund`（下限 0）
- 隐藏事件：`_pendingHiddenEvents` 在结算时逐个应用（可能再次改变指标并输出文字反馈）

## 结局判定（当前阈值）
按优先级判断：
- 高端胜利：`rep >= 60 && dau >= 45000 && grind <= 40` → 真·顶级制作人
- 次优：`rep >= 58 && dau >= 30000 && grind <= 45` → 第二故乡
- 可持续：`rep >= 55 && dau >= 25000 && grind <= 50` → 心流自愿
- 又爱又恨：`rep >= 55 && dau >= 25000` → 被绑架的热爱
- 小众口碑神作：`rep >= 55 && dau < 20000` → 曲高和寡
- 口碑崩盘/爆肝/资金断裂：分别判定 `rep <= 15`、`grind >= 80`、`fund <= 0`
- 其他：若 `dau >= 18000` → 平淡是真；否则 → 温水煮青蛙

> 注：此判定顺序和阈值可依据设计需要调整为更平滑或层级化的算法。

## UI 结构与交互要点
- 主要视图：`Opening` → `Title` → `Game`（含 `Dashboard`, `Phase Bar`, `Proposal Card`, `Swipe Buttons`）→ `Settlement` → `Ending`
- 触控支持：`touchstart/move/end`，水平滑动阈值 80px 判定有效；移动端显示 `swipe-hint-mobile`。
- 鼠标/键盘：当前仅支持按钮点击，建议增加键盘左右键与 Enter 触发。
- 状态同步：所有界面渲染以 `G` 为单一数据源；渲染函数 `renderDash()`、`renderPhaseBar()`、`showProposal()`、`showSettlement()`。

## 链式事件与联动机制
- `unlocks` 字段允许在批准某个提案后将其他提案注入后续槽位。注入逻辑：每回合最多注入一个 unlock 到下一个符合条件的槽位。
- `SILVER_POT_CHAIN`：一个固定的联动链，索引 20（第 21 轮）为触发节点，批准或拒绝会决定 22-25 的填充内容。
- `hiddenEvent`：批准后不会立刻影响数值，而是在结算时应用并显示额外文本。

## 边界情况与已知风险
- `proposals` 中存在 `null` 槽位时，`showProposal()` 会直接访问其属性导致错误。需增加存在性检查与占位呈现逻辑。
- `G.current*` 的累积逻辑假定所有提案都含数值字段，缺值时使用 `?? 0` 的保护更安全。
- `100dvh` 与 `overflow: hidden` 在部分移动浏览器存在兼容问题，可能导致滚动受限或视口高度计算错误。
- 全局变量与直接 DOM 操作不利于单元测试与模块化重构。

## 可扩展点与改进建议（快速清单）
- 基础修复（优先）
  - 在 `showProposal()`/`swipe()` 加入 `prop` 非空保护与容错提示。
  - 抽离常量（`DAU_SCALE`, `BASE_GROWTH`）并注释说明含义与单位。
- 功能增强（中期）
  - 添加 `localStorage` 存档与恢复（避免刷新丢失进度）。
  - 支持键盘快捷（左右键、空格、Enter）和无障碍（ARIA 标签）。
  - 将主逻辑拆分到模块文件：`game.logic.js`, `ui.render.js`, `data.proposals.js`。
- 架构改进（长期）
  - 用微状态机（例如 XState）建模回合与 UI 状态，简化复杂流程控制。
  - 提供外部数据接口（JSON）以便用脚本批量生成/编辑提案。

## 文件与资源清单
- 页面：`index.html`（主入口，内联 CSS + JS） → 见 [index.html](index.html)
- 提案数据：`proposals_100.js`（外部可选扩展） → 见 [proposals_100.js](proposals_100.js)
- 设计文档：本文件 `DESIGN.md`（位于仓库根目录）

## 测试清单（建议）
- 边界测试：`proposals` 含 `null`、`unlocks` 队列为空、`hiddenEvent` 为空数组。
- 行为测试：连续批准或拒绝相同类型的提案，观察 `G.current*` 累积与结算影响。
- 结局覆盖：构造不同 `G` 值组合以覆盖所有 `determineEnding()` 分支。
- 兼容测试：移动浏览器（iOS/Android）地址栏变化对 `100dvh` 的影响。

## 后续工作建议
- 由我来做：可以先应用最低风险修复（`prop` 空值检查 + 键盘支持 + localStorage 存档），并把大逻辑拆成 `game.js` 与 `ui.js` 两个文件，你要我现在动手吗？

---
文档由 `index.html` 内容拆解整理。如需我把文档写成更详细的 PR 模板或直接把代码拆分成模块并提交补丁，请告诉我你的优先项。