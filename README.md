# 💓 心跳互联 Heartbeat Connect

一个浪漫的双人心率监测与情感交互系统，专为异地情侣设计

## ✨ 功能特点

- **实时心率监测** - 同步显示双方的心率数据
- **心动互动** - 点击心形按钮，传递心动与思念
- **实时位置共享** - 查看与对方的实时距离
- **即时聊天** - 实时文字消息传递
- **震动反馈** - 收到消息和互动时的震动提醒
- **纪念日记录** - 记录重要日期和倒计时
- **精美UI设计** - 浪漫星空主题，玻璃拟态效果

## 🚀 快速开始

### 方式一：本地运行

1. **启动后端服务**
```bash
cd heartbeat-connect/server
npm install
npm start
```

服务将在 `http://localhost:3000` 启动

2. **浏览器访问**
打开浏览器访问 `http://localhost:3000`

### 方式二：部署到云端

参考 [RAILWAY_DEPLOY.md](RAILWAY_DEPLOY.md) 部署到 Railway 获得永久链接

## 📱 使用方法

1. **配对连接**
   - 用户A：输入昵称 → 生成配对码 → 分享给用户B
   - 用户B：输入昵称 → 输入配对码 → 加入

2. **开始互动**
   - ❤️ 实时心率同步
   - 💘 点击发送心动
   - 📍 查看实时距离
   - 💬 发送消息

## 🎨 技术栈

- **前端**：HTML5, CSS3, JavaScript, Socket.io
- **后端**：Node.js, Express, Socket.io
- **实时通信**：WebSocket
- **部署**：支持 Railway, Render, Heroku 等云平台

## 📄 许可证

MIT License

## 💕 让爱无距离

无论相隔多远，心跳始终相连 ❤️
