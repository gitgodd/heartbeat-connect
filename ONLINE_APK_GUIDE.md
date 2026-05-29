# 🚀 在线生成 APK 指南（最简单！）

**恭喜！** 不需要配置任何开发环境，用浏览器即可生成 APK！

## 📋 准备工作

您需要以下两个文件，已在您的项目中：

1. `d:\trae solo\01\heartbeat-connect\app\index.html` (主应用)
2. `d:\trae solo\01\heartbeat-connect\app\features.html` (功能展示)

---

## 🎯 方法一：使用 AppsGeyser（推荐！）

### 第1步：打开 AppsGeyser

访问：**https://next.appsgeyser.com/create-app**

### 第2步：选择 Web 应用模板

点击 **"Website"** 或 **"HTML"** 模板

### 第3步：打包文件为 ZIP

1. 打开文件夹：`d:\trae solo\01\heartbeat-connect\app\`
2. 选中这两个文件：
   - `index.html`
   - `features.html`
3. 右键 → 发送到 → 压缩(zipped)文件夹
4. 命名为：`HeartbeatConnect.zip`

### 第4步：上传 ZIP 文件

在 AppsGeyser 页面上传刚才创建的 ZIP 文件

### 第5步：配置应用

- **应用名称**: `心跳互联` 或 `Heartbeat Connect`
- **包名**: `com.heartbeat.connect`
- **版本**: `1.0.0`

### 第6步：生成 APK

点击 **"Create App"** 或 **"Generate APK"**

等待 1-2 分钟，下载您的 APK 文件！

---

## 🎯 方法二：使用 Appy Pie

### 访问：https://www.appypie.com/apk-app-maker

### 步骤：
1. 点击 **"Try for Free"**
2. 选择 **"Website"** 选项
3. 输入本地服务器地址（或使用方法一）
4. 配置应用并生成 APK

---

## 🎯 方法三：使用 Newly

### 访问：https://newly.app/apk-maker

### 步骤：
1. 注册账号（免费）
2. 使用 AI 助手或选择模板
3. 配置应用
4. 生成 APK（需要 5-15 分钟）

---

## 📱 安装 APK

下载 APK 后：

1. **复制到手机**
   - 用 USB 数据线
   - 或通过微信/QQ 发送
   - 或用网盘分享

2. **在手机上安装**
   - 打开文件管理器
   - 找到 APK 文件
   - 点击安装
   - 如果提示"禁止安装未知来源应用"：
     - 进入设置 → 安全
     - 开启"未知来源"

3. **启动后端服务器**
   - 打开终端
   - 进入：`d:\trae solo\01\heartbeat-connect\server`
   - 运行：`npm install && npm start`
   - 确保服务器在 `http://localhost:3000` 运行

4. **开始使用！**

---

## ⚠️ 重要提示

### 本地网络问题

如果您想在两台手机上使用，需要：

**方案一：局域网**
- 两台手机连接到同一 WiFi
- 将后端服务器地址改为电脑的局域网 IP
- 修改 `index.html` 中的连接地址

**方案二：公网服务器**
- 将后端部署到公网（如 Railway、Render 等）
- 修改应用中的服务器地址

---

## 🎉 完成！

现在您已经拥有了一个完整的 Android 应用！

### 快速回顾：
1. ✅ Web 应用已创建
2. ✅ 功能已实现
3. ✅ 后端服务已准备
4. ✅ 在线 APK 生成方案已提供

### 下一步：
1. 访问 AppsGeyser 打包 APK
2. 安装到手机
3. 启动后端服务
4. 和朋友配对使用！

---

## 💡 提示

- 如果 AppsGeyser 无法访问，可以尝试其他工具
- 国内用户也可以搜索"网页转 APK"找到更多工具
- APK 可以直接分享给朋友安装

---

**祝使用愉快！💓**
