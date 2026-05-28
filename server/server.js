const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// 数据库连接配置
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// 中间件配置
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('public'));

// ============================================================
// API 端点
// ============================================================

/**
 * 创建玩家会话
 * POST /api/player
 * 请求体: { "playerName": "玩家名称" }
 * 返回: { "sessionId": "会话ID", "playerId": 玩家ID }
 */
app.post('/api/player', async (req, res) => {
  try {
    const { playerName } = req.body;
    const sessionId = uuidv4();
    
    const result = await pool.query(
      'INSERT INTO players (player_name, session_id) VALUES ($1, $2) RETURNING id, session_id',
      [playerName || '匿名玩家', sessionId]
    );
    
    res.status(201).json({
      success: true,
      playerId: result.rows[0].id,
      sessionId: result.rows[0].session_id
    });
  } catch (error) {
    console.error('创建玩家失败:', error);
    res.status(500).json({ success: false, error: '创建玩家失败' });
  }
});

/**
 * 上报结局数据
 * POST /api/ending
 * 请求体: { "sessionId": "会话ID", "endingId": "结局ID", "endingTitle": "结局标题", "finalDau": 数值, "finalRep": 数值, "finalGrind": 数值, "finalFund": 数值, "roundCount": 回合数 }
 */
app.post('/api/ending', async (req, res) => {
  try {
    const { sessionId, endingId, endingTitle, finalDau, finalRep, finalGrind, finalFund, roundCount } = req.body;
    
    // 先获取玩家ID
    const playerResult = await pool.query(
      'SELECT id FROM players WHERE session_id = $1',
      [sessionId]
    );
    
    if (playerResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: '玩家不存在' });
    }
    
    const playerId = playerResult.rows[0].id;
    
    // 插入结局记录
    await pool.query(
      'INSERT INTO endings (player_id, ending_id, ending_title, final_dau, final_rep, final_grind, final_fund, round_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [playerId, endingId, endingTitle, finalDau, finalRep, finalGrind, finalFund, roundCount]
    );
    
    res.status(201).json({ success: true, message: '结局数据上报成功' });
  } catch (error) {
    console.error('上报结局失败:', error);
    res.status(500).json({ success: false, error: '上报结局失败' });
  }
});

/**
 * 上报事件链数据
 * POST /api/event
 * 请求体: { "sessionId": "会话ID", "eventCode": "事件编号", "eventTitle": "事件标题", "choice": "approve/reject", "roundNumber": 回合数 }
 */
app.post('/api/event', async (req, res) => {
  try {
    const { sessionId, eventCode, eventTitle, choice, roundNumber } = req.body;
    
    // 验证选择
    if (!['approve', 'reject'].includes(choice)) {
      return res.status(400).json({ success: false, error: '无效的选择值' });
    }
    
    // 先获取玩家ID
    const playerResult = await pool.query(
      'SELECT id FROM players WHERE session_id = $1',
      [sessionId]
    );
    
    if (playerResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: '玩家不存在' });
    }
    
    const playerId = playerResult.rows[0].id;
    
    // 插入事件记录
    await pool.query(
      'INSERT INTO event_tracking (player_id, event_code, event_title, choice, round_number) VALUES ($1, $2, $3, $4, $5)',
      [playerId, eventCode, eventTitle, choice, roundNumber]
    );
    
    res.status(201).json({ success: true, message: '事件数据上报成功' });
  } catch (error) {
    console.error('上报事件失败:', error);
    res.status(500).json({ success: false, error: '上报事件失败' });
  }
});

/**
 * 上报决策数据
 * POST /api/decision
 * 请求体: { "sessionId": "会话ID", "roundNumber": 回合数, "proposalTitle": "提案标题", "proposalTag": "提案标签", "choice": "approve/reject", "dauChange": 数值, "repChange": 数值, "grindChange": 数值, "fundChange": 数值 }
 */
app.post('/api/decision', async (req, res) => {
  try {
    const { sessionId, roundNumber, proposalTitle, proposalTag, choice, dauChange, repChange, grindChange, fundChange } = req.body;
    
    // 验证选择
    if (!['approve', 'reject'].includes(choice)) {
      return res.status(400).json({ success: false, error: '无效的选择值' });
    }
    
    // 先获取玩家ID
    const playerResult = await pool.query(
      'SELECT id FROM players WHERE session_id = $1',
      [sessionId]
    );
    
    if (playerResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: '玩家不存在' });
    }
    
    const playerId = playerResult.rows[0].id;
    
    // 插入决策记录
    await pool.query(
      'INSERT INTO decisions (player_id, round_number, proposal_title, proposal_tag, choice, dau_change, rep_change, grind_change, fund_change) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [playerId, roundNumber, proposalTitle, proposalTag, choice, dauChange || 0, repChange || 0, grindChange || 0, fundChange || 0]
    );
    
    res.status(201).json({ success: true, message: '决策数据上报成功' });
  } catch (error) {
    console.error('上报决策失败:', error);
    res.status(500).json({ success: false, error: '上报决策失败' });
  }
});

/**
 * 获取结局统计数据
 * GET /api/stats/endings
 */
app.get('/api/stats/endings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ending_stats');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('获取结局统计失败:', error);
    res.status(500).json({ success: false, error: '获取统计数据失败' });
  }
});

/**
 * 获取事件统计数据
 * GET /api/stats/events
 */
app.get('/api/stats/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM event_stats');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('获取事件统计失败:', error);
    res.status(500).json({ success: false, error: '获取统计数据失败' });
  }
});

/**
 * 获取每日新增玩家统计
 * GET /api/stats/daily-players
 */
app.get('/api/stats/daily-players', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM daily_new_players LIMIT 30');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('获取每日玩家统计失败:', error);
    res.status(500).json({ success: false, error: '获取统计数据失败' });
  }
});

/**
 * 获取总体统计概览
 * GET /api/stats/overview
 */
app.get('/api/stats/overview', async (req, res) => {
  try {
    const [playerCount, endingCount, eventCount, decisionCount] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM players'),
      pool.query('SELECT COUNT(*) as count FROM endings'),
      pool.query('SELECT COUNT(*) as count FROM event_tracking'),
      pool.query('SELECT COUNT(*) as count FROM decisions')
    ]);
    
    res.json({
      success: true,
      data: {
        totalPlayers: parseInt(playerCount.rows[0].count),
        totalEndings: parseInt(endingCount.rows[0].count),
        totalEvents: parseInt(eventCount.rows[0].count),
        totalDecisions: parseInt(decisionCount.rows[0].count)
      }
    });
  } catch (error) {
    console.error('获取概览统计失败:', error);
    res.status(500).json({ success: false, error: '获取统计数据失败' });
  }
});

/**
 * 健康检查
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(port, () => {
  console.log(`游戏监测系统服务已启动，运行在 http://localhost:${port}`);
});