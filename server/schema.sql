-- ============================================================
-- 玩家游戏数据监测系统 - PostgreSQL 数据库结构
-- ============================================================

-- 1. 玩家表 - 记录每位玩家的游戏会话
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    session_id VARCHAR(64) UNIQUE NOT NULL,  -- 会话唯一标识
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 结局记录表 - 记录玩家达成的结局
CREATE TABLE IF NOT EXISTS endings (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    ending_id VARCHAR(32) NOT NULL,      -- 结局编号 END_HIDDEN, END_HOME 等
    ending_title VARCHAR(100) NOT NULL,  -- 结局标题
    final_dau INTEGER NOT NULL,          -- 最终日活
    final_rep INTEGER NOT NULL,          -- 最终口碑
    final_grind INTEGER NOT NULL,        -- 最终爆肝度
    final_fund INTEGER NOT NULL,         -- 最终资金
    round_count INTEGER NOT NULL,        -- 完成回合数
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 事件链记录表 - 记录事件触发情况（银锅锅事件链 + 扶持新团队提案）
-- 事件编号规则：
-- SILVER_POT_0: 银锅锅联动触发提案
-- SILVER_POT_1: 免费福利核心道具任务
-- SILVER_POT_2: 联名宣传PV投流
-- SILVER_POT_3: 主题线下快闪店
-- SILVER_POT_4: 限定道具高价抽奖
-- SILVER_POT_5: 限定语音包
-- SILVER_POT_6: 服务器扩容
-- SILVER_POT_7: 限定通行证
-- NEW_TEAM_SUPPORT: 扶持新团队提案
CREATE TABLE IF NOT EXISTS event_tracking (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    event_code VARCHAR(50) NOT NULL,     -- 事件编号
    event_title VARCHAR(200) NOT NULL,   -- 事件标题
    choice VARCHAR(10) NOT NULL,         -- 玩家选择: approve(同意) / reject(拒绝)
    round_number INTEGER NOT NULL,       -- 发生回合
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 游戏决策记录表 - 记录玩家每轮决策（用于分析）
CREATE TABLE IF NOT EXISTS decisions (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    round_number INTEGER NOT NULL,
    proposal_title VARCHAR(200) NOT NULL,
    proposal_tag VARCHAR(50),
    choice VARCHAR(10) NOT NULL,         -- approve / reject
    dau_change INTEGER DEFAULT 0,
    rep_change INTEGER DEFAULT 0,
    grind_change INTEGER DEFAULT 0,
    fund_change INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_players_session_id ON players(session_id);
CREATE INDEX idx_endings_player_id ON endings(player_id);
CREATE INDEX idx_endings_ending_id ON endings(ending_id);
CREATE INDEX idx_event_tracking_player_id ON event_tracking(player_id);
CREATE INDEX idx_event_tracking_event_code ON event_tracking(event_code);
CREATE INDEX idx_decisions_player_id ON decisions(player_id);

-- 创建视图：事件统计汇总
CREATE VIEW IF NOT EXISTS event_stats AS
SELECT 
    event_code,
    event_title,
    COUNT(*) AS total_triggers,
    SUM(CASE WHEN choice = 'approve' THEN 1 ELSE 0 END) AS approve_count,
    SUM(CASE WHEN choice = 'reject' THEN 1 ELSE 0 END) AS reject_count,
    ROUND(SUM(CASE WHEN choice = 'approve' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS approve_rate
FROM event_tracking
GROUP BY event_code, event_title
ORDER BY total_triggers DESC;

-- 创建视图：结局统计汇总
CREATE VIEW IF NOT EXISTS ending_stats AS
SELECT 
    ending_id,
    ending_title,
    COUNT(*) AS total_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM endings), 2) AS percentage,
    AVG(final_dau) AS avg_dau,
    AVG(final_rep) AS avg_rep,
    AVG(final_grind) AS avg_grind,
    AVG(final_fund) AS avg_fund
FROM endings
GROUP BY ending_id, ending_title
ORDER BY total_count DESC;

-- 创建视图：每日新增玩家统计
CREATE VIEW IF NOT EXISTS daily_new_players AS
SELECT 
    DATE(created_at) AS date,
    COUNT(*) AS new_player_count
FROM players
GROUP BY DATE(created_at)
ORDER BY date DESC;