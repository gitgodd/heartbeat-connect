# 心跳互联 - Railway 部署指南

## 🌐 一键部署到 Railway（免费）

### 前置准备：

1. **注册 GitHub 账号**（如果还没有）
2. **注册 Railway 账号**：https://railway.app
3. **安装 Git**：https://git-scm.com/downloads

---

## 📝 部署步骤

### 步骤一：上传项目到 GitHub

1. **在 GitHub 创建新仓库**
   - 访问：https://github.com/new
   - 仓库名：`heartbeat-connect`
   - 设置为 Public 或 Private 都可以

2. **初始化本地 Git 仓库**
   ```bash
   cd d:\trae solo\01\heartbeat-connect
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/您的用户名/heartbeat-connect.git
   git push -u origin main
   ```

### 步骤二：在 Railway 部署

1. **访问 Railway**：https://railway.app
2. **点击「New Project」**
3. **选择「Deploy from GitHub repo」**
4. **选择您的仓库**：`heartbeat-connect`
5. **点击「Deploy Now」**

### 步骤三：获取公网域名

1. **等待部署完成**（约 2-3 分钟）
2. **在项目页面，点击「Settings」→「Domains」**
3. **点击「Generate Domain」**
4. **复制生成的域名**（类似：`https://heartbeat-connect.up.railway.app`）

---

## 🎉 部署完成！

用您的域名访问，就可以直接使用了，无需任何确认！

---

## 📋 项目结构

```
heartbeat-connect/
├── app/
│   └── index.html          # 前端应用
├── server/
│   ├── src/
│   │   └── server.js       # 后端服务
│   └── package.json
└── package.json            # 入口配置
```

---

## 💡 提示

- **免费额度**：Railway 每月有 $5 免费额度，足够使用
- **自动重启**：代码更新后自动重新部署
- **HTTPS**：自动配置 HTTPS 证书
