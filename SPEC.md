# Heartbeat Connect - 心率互联系统

## 系统概述

这是一个双向心率监测与情感交互系统，允许两个用户实时共享心率数据，并通过闪电触觉反馈传递情感。

## 核心功能

### 1. 心率监测
- 实时采集用户心率数据
- 双向同步显示双方心率
- 心率异常提醒

### 2. 闪电触觉反馈
- 点击闪电按钮发送震动信号
- 对方手表/手机接收震动反馈
- 即时触觉响应（< 100ms延迟）

### 3. 互动统计
- 记录双方互相点击次数
- 显示点击时间线
- 每日/每周统计

### 4. 视觉效果反馈
- 星星闪烁动画：每次点击触发动画效果
- 呼吸灯效果：与心率同步
- 星空背景：营造浪漫氛围

### 5. 雷达触感反馈
- 模拟雷达扫描的触感模式
- 持续按压触发不同频率震动
- 增强交互体验

## 技术架构

```
┌─────────────┐    WebSocket    ┌─────────────┐
│   用户 A    │ ◄─────────────► │   后端服务   │
│  (手机/手表) │                 │   (Node.js) │
└─────────────┘                 └─────────────┘
      │                               │
      │ WebSocket                     │
      ▼                               ▼
┌─────────────┐                 ┌─────────────┐
│   用户 B    │ ◄─────────────► │  数据库     │
│  (手机/手表) │                 │ (Redis)     │
└─────────────┘                 └─────────────┘
```

## 技术栈

### 后端
- **运行时**: Node.js 18+
- **实时通信**: Socket.IO
- **数据库**: Redis (实时数据) + SQLite (持久化)
- **心率处理**: 滑动窗口算法

### 移动端
- **框架**: React Native + Expo
- **状态管理**: Zustand
- **实时通信**: Socket.IO Client
- **震动API**: expo-haptics
- **动画**: react-native-reanimated

### 手表端 (可选)
- **Apple Watch**: Swift + WatchConnectivity
- **Android Watch**: Wear OS + MessageApi

## API 设计

### WebSocket 事件

#### 客户端 → 服务器
```javascript
// 连接配对
{ type: 'pair', code: 'ABC123' }

// 发送心率
{ type: 'heartbeat', bpm: 72, timestamp: 1699999999999 }

// 发送闪电
{ type: 'lightning', targetId: 'user_xxx' }
```

#### 服务器 → 客户端
```javascript
// 配对成功
{ type: 'paired', partner: { id, name, avatar } }

// 收到心率
{ type: 'partner_heartbeat', bpm: 68, timestamp: 1699999999999 }

// 收到闪电
{ type: 'lightning_received', from: 'user_xxx', feedback: 'vibration' }

// 统计更新
{ type: 'stats_update', sent: 5, received: 3 }
```

## 数据模型

### User
```
{
  id: string,
  name: string,
  avatar: string,
  pairCode: string,
  partnerId: string | null,
  createdAt: timestamp
}
```

### HeartbeatLog
```
{
  id: string,
  userId: string,
  bpm: number,
  timestamp: timestamp
}
```

### LightningLog
```
{
  id: string,
  senderId: string,
  receiverId: string,
  timestamp: timestamp
}
```

## 组件设计

### 1. 心率显示组件
- 圆形心形动画
- BPM 数字显示
- 呼吸灯效果
- 状态：正常(60-100)、偏高(>100)、偏低(<60)

### 2. 闪电按钮组件
- 闪电图标
- 按压动画（放大+发光）
- 点击涟漪效果
- 禁用状态（未配对时）

### 3. 星星反馈组件
- Canvas 粒子系统
- 每次点击触发星星爆炸
- 渐隐动画
- 颜色：金色/蓝色

### 4. 统计面板组件
- 发送次数 / 接收次数
- 最后互动时间
- 历史记录列表

### 5. 雷达震动组件
- 长按触发
- 震动频率：0.5s → 0.3s → 0.1s（递进）
- 释放时完成最后一轮震动

## 部署架构

### 开发环境
- 后端：localhost:3000
- 前端：localhost:19000

### 生产环境
- 后端：Railway / Render
- 数据库：Redis Cloud
- CDN：Cloudflare

## 安全考虑

1. **配对码安全**: 6位随机码，5分钟过期
2. **数据加密**: TLS 1.3
3. **隐私保护**: 心率数据仅在配对双方间传输
4. **速率限制**: 每秒最多5次闪电请求

## 扩展计划

### Phase 1: MVP
- 基础心率同步
- 闪电震动
- 点击统计

### Phase 2: 增强
- 星星动画
- 雷达触感
- 历史记录

### Phase 3: 手表支持
- Apple Watch App
- Android Wear App
- 独立震动通知
