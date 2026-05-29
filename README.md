# 💓 心跳互联 Heartbeat Connect

一个浪漫的双人心率监测与情感交互系统

## ✨ 功能特点

- **实时心率监测** - 同步显示双方的心率数据
- **闪电触感反馈** - 点击闪电按钮，对方设备将收到震动反馈
- **星星爆炸动画** - 每次互动触发绚丽的星星效果
- **雷达触感模式** - 长按闪电按钮体验递进式震动
- **互动统计** - 记录互相发送的闪电次数
- **星空背景** - 浪漫的视觉效果

## 🚀 快速开始

### 1. 启动后端服务

```bash
cd heartbeat-connect/server
npm install
npm start
```

服务将在 `http://localhost:3000` 启动

### 2. 启动前端应用

```bash
cd heartbeat-connect/app
```

直接用浏览器打开 `index.html` 文件即可

或在手机浏览器中访问电脑IP地址（确保在同一网络）

## 📱 使用方法

### 连接配对

1. **用户A**: 输入昵称 → 点击"生成配对码" → 将配对码分享给用户B
2. **用户B**: 输入昵称 → 在下方输入配对码 → 点击"加入"

### 发送闪电

- **点击闪电按钮**: 发送一次震动反馈给配对对象
- **长按闪电按钮**: 体验雷达触感模式（持续震动1秒后发送闪电）

### 查看统计

主界面底部显示双方的互动统计：
- 已发送次数
- 已接收次数

## 🛠 技术架构

### 后端 (Node.js)
- Express 服务器
- Socket.IO 实时通信
- WebSocket 长连接

### 前端 (Web)
- 原生 HTML5 + CSS3 + JavaScript
- Canvas 粒子动画
- Vibration API 震动反馈
- Socket.IO Client

## 📐 项目结构

```
heartbeat-connect/
├── SPEC.md                 # 系统设计规格文档
├── server/                 # 后端服务
│   ├── package.json
│   └── src/
│       └── server.js       # 主服务器文件
└── app/                    # 前端应用
    └── index.html          # 单页应用
```

## 🔧 WebSocket 事件

### 客户端发送
- `register` - 注册用户
- `generate_code` - 生成配对码
- `join_code` - 加入配对
- `heartbeat` - 发送心率
- `lightning` - 发送闪电

### 服务器推送
- `registered` - 注册成功
- `code_generated` - 配对码生成
- `paired` - 配对成功
- `partner_heartbeat` - 收到对方心率
- `lightning_received` - 收到闪电
- `stats_update` - 统计更新

## 🎨 视觉效果

- ✨ 星星闪烁动画 (Canvas)
- 💫 星星爆炸效果 (粒子系统)
- ❤️ 心跳动画 (CSS)
- 📳 雷达震动 (递进式反馈)

## 🔒 安全特性

- 配对码 5 分钟过期
- 实时数据加密传输
- 速率限制保护

## 📋 待实现功能

- [ ] Apple Watch 原生应用
- [ ] Android Wear 应用
- [ ] 真实心率传感器集成
- [ ] 历史记录持久化
- [ ] 推送通知支持

## 💡 使用提示

1. **桌面浏览器**: 打开开发者工具 → Console 查看连接状态
2. **移动浏览器**: 确保网站有震动权限
3. **手表设备**: 后续版本将支持独立震动通知

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

Made with ❤️ by SOLO
