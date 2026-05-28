# 游戏实时监测系统 - 部署说明

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                      前端游戏 (index.html)                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  玩家操作 → 决策上报 → 事件上报 → 结局上报         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │ HTTP API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      后端服务 (Node.js)                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Express Server → API Endpoints → PostgreSQL        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL 数据库                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  players | endings | event_tracking | decisions    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 部署步骤

### 1. 环境要求

- Node.js >= 16.x
- PostgreSQL >= 13.x
- npm 或 yarn

### 2. 数据库配置

#### 2.1 创建数据库

```sql
CREATE DATABASE game_monitor;
CREATE USER game_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE game_monitor TO game_user;
```

#### 2.2 初始化表结构

```bash
psql -U game_user -d game_monitor -f schema.sql
```

### 3. 后端服务配置

#### 3.1 安装依赖

```bash
cd server
npm install
```

#### 3.2 配置环境变量

编辑 `.env` 文件：

```env
# 服务器配置
PORT=3001

# PostgreSQL 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=game_monitor
DB_USER=game_user
DB_PASSWORD=your_secure_password

# CORS 配置（生产环境请限制具体域名）
CORS_ORIGIN=*

# 日志级别
LOG_LEVEL=info
```

#### 3.3 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 4. 前端配置

修改 `index.html` 中的 API 地址：

```javascript
const MONITOR_API = 'http://your-server-ip:3001/api';
```

### 5. 监测面板

启动服务后，访问以下地址查看实时监测面板：

```
http://your-server-ip:3001/monitor.html
```

## API 接口说明

### 玩家管理

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/player | 创建玩家会话 |

### 数据上报

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/ending | 上报结局数据 |
| POST | /api/event | 上报事件链数据 |
| POST | /api/decision | 上报决策数据 |

### 数据统计

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/stats/endings | 获取结局统计 |
| GET | /api/stats/events | 获取事件统计 |
| GET | /api/stats/daily-players | 获取每日新增玩家 |
| GET | /api/stats/overview | 获取总体概览 |
| GET | /api/health | 健康检查 |

## 事件编号说明

### 银锅锅事件链

| 事件编号 | 事件名称 |
|----------|----------|
| SILVER_POT_0 | 与银锅锅之战联名提案（触发） |
| SILVER_POT_1 | 免费福利核心道具7天任务 |
| SILVER_POT_2 | 联名宣传PV全平台投流 |
| SILVER_POT_3 | 主题线下快闪店 |
| SILVER_POT_4 | 限定道具高价抽奖 |
| SILVER_POT_5 | 限定语音包 |
| SILVER_POT_6 | 服务器扩容 |
| SILVER_POT_7 | 限定通行证 |

### 扶持新团队提案

| 事件编号 | 事件名称 |
|----------|----------|
| NEW_TEAM_SUPPORT | 扶持新团队做游戏提案 |

## 数据库表结构

### players（玩家表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| player_name | VARCHAR(50) | 玩家名称 |
| session_id | VARCHAR(64) | 会话ID |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### endings（结局表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| player_id | INTEGER | 玩家ID |
| ending_id | VARCHAR(32) | 结局编号 |
| ending_title | VARCHAR(100) | 结局标题 |
| final_dau | INTEGER | 最终日活 |
| final_rep | INTEGER | 最终口碑 |
| final_grind | INTEGER | 最终爆肝度 |
| final_fund | INTEGER | 最终资金 |
| round_count | INTEGER | 完成回合数 |
| created_at | TIMESTAMP | 创建时间 |

### event_tracking（事件追踪表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| player_id | INTEGER | 玩家ID |
| event_code | VARCHAR(50) | 事件编号 |
| event_title | VARCHAR(200) | 事件标题 |
| choice | VARCHAR(10) | 选择（approve/reject） |
| round_number | INTEGER | 发生回合 |
| created_at | TIMESTAMP | 创建时间 |

### decisions（决策记录表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | SERIAL | 主键 |
| player_id | INTEGER | 玩家ID |
| round_number | INTEGER | 回合数 |
| proposal_title | VARCHAR(200) | 提案标题 |
| proposal_tag | VARCHAR(50) | 提案标签 |
| choice | VARCHAR(10) | 选择 |
| dau_change | INTEGER | 日活变化 |
| rep_change | INTEGER | 口碑变化 |
| grind_change | INTEGER | 爆肝变化 |
| fund_change | INTEGER | 资金变化 |
| created_at | TIMESTAMP | 创建时间 |

## 生产环境部署建议

### 1. 使用 PM2 管理进程

```bash
npm install -g pm2
pm2 start server.js --name game-monitor
pm2 save
pm2 startup
```

### 2. 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api {
        proxy_pass http://localhost:3001/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 3. 配置 HTTPS（推荐）

使用 Let's Encrypt 配置 SSL：

```bash
certbot --nginx -d your-domain.com
```

## 安全注意事项

1. **数据库密码**：不要使用弱密码，定期更换
2. **CORS 配置**：生产环境限制具体域名，不要使用 `*`
3. **API 限流**：考虑添加请求频率限制
4. **日志监控**：配置日志记录和监控告警
5. **数据备份**：定期备份数据库

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 `.env` 配置是否正确
   - 确认 PostgreSQL 服务已启动
   - 检查数据库用户权限

2. **CORS 错误**
   - 检查 `CORS_ORIGIN` 配置
   - 确保前端域名在允许列表中

3. **服务启动失败**
   - 检查端口是否被占用
   - 检查依赖是否安装完整

### 日志查看

```bash
# 查看服务日志
pm2 logs game-monitor

# 查看 PostgreSQL 日志
tail -f /var/log/postgresql/postgresql-13-main.log
```