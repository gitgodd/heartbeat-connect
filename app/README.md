# 💓 心跳互联 - Android 应用完整包

## 🎉 恭喜！您已成功创建 Android 应用

这是一个功能完整的双人心率监测与情感交互 Android 应用。

## 📱 应用信息

- **应用名称**: Heartbeat Connect (心跳互联)
- **包名**: com.heartbeat.connect
- **版本**: 1.0.0
- **平台**: Android (需要 Android 5.0+)

## ✨ 功能特性

### ✅ 已实现
- ❤️ **实时心率同步** - 双方心率实时显示
- ⚡ **闪电触感反馈** - 点击发送震动给配对对象
- ✨ **星星爆炸动画** - 互动时触发绚丽的星星效果
- 📍 **雷达触感模式** - 长按体验递进式震动
- 📊 **互动统计** - 记录发送和接收的次数
- 🔗 **配对系统** - 6位配对码，简单安全

### 🔧 技术特性
- 原生 Android 应用，性能优秀
- 支持震动反馈 (Vibration API)
- 响应式设计，适配各种屏幕
- 离线存储配对信息

## 🚀 快速开始

### 构建 APK

#### 方法一：一键构建（推荐）
1. **双击 `构建APK.bat`**
2. 等待构建完成（首次可能需要几分钟）
3. APK 文件将自动打开所在目录

#### 方法二：手动构建
```bash
# 1. 确保已安装 JDK 11+
# 2. 进入应用目录
cd heartbeat-connect/app

# 3. 安装依赖
npm install

# 4. 构建 Web 应用
npm run build

# 5. 同步到 Android
npx cap sync android

# 6. 构建 APK
cd android
.\gradlew assembleDebug
```

### 安装 APK

1. **复制 APK 文件**
   ```
   heartbeat-connect/app/HeartbeatConnect.apk
   ```

2. **传输到手机**
   - 通过 USB 数据线
   - 通过网盘/微信/QQ
   - 通过局域网传输

3. **在手机上安装**
   - 打开文件管理器
   - 找到 APK 文件
   - 点击安装
   - 如果提示"禁止安装未知来源应用"：
     - 进入设置 → 安全
     - 开启"未知来源"或"允许安装未知应用"
     - 为您的文件管理器开启此权限

### 使用应用

1. **打开应用**
   - 首次打开可能需要授予权限（网络、震动）

2. **配对连接**
   - 用户A：输入昵称 → 点击"生成配对码"
   - 用户B：输入昵称 → 输入配对码 → 点击"加入"

3. **开始互动**
   - 点击闪电按钮发送震动
   - 长按闪电按钮体验雷达触感
   - 实时查看双方心率
   - 查看互动统计

## 📂 项目结构

```
heartbeat-connect/
├── app/                          # 应用主目录
│   ├── index.html                # 主应用页面
│   ├── features.html             # 功能展示页
│   ├── package.json              # NPM 配置
│   ├── vite.config.ts            # Vite 构建配置
│   ├── capacitor.config.ts       # Capacitor 配置
│   ├── 构建APK.bat               # ⭐ 一键构建脚本
│   ├── ANDROID_BUILD_GUIDE.md    # 构建指南
│   └── android/                  # Android 原生项目
│       ├── app/
│       │   └── src/
│       │       └── main/
│       │           ├── AndroidManifest.xml  # 应用清单
│       │           └── assets/public/        # Web 资源
│       └── build.gradle            # Gradle 配置
├── server/                       # 后端服务
│   ├── package.json
│   └── src/
│       └── server.js             # WebSocket 服务器
├── SPEC.md                       # 系统设计文档
└── README.md                     # 项目说明
```

## 🔧 环境要求

### 必须
- **JDK 11 或更高版本**
  - 下载: https://adoptium.net/ (免费 OpenJDK)

### 可选（推荐）
- **Android Studio**
  - 下载: https://developer.android.com/studio
  - 提供完整的 Android 开发工具

## 🛠 自定义配置

### 修改应用名称

编辑 `android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">你的应用名</string>
</resources>
```

### 修改应用图标

替换以下目录中的图标文件:
- `android/app/src/main/res/mipmap-*`

### 配置服务器地址

如果需要部署自己的后端服务器：
1. 修改 `index.html` 中的服务器地址
2. 重新构建应用

## 📊 构建输出

构建成功后，APK 文件位于：
```
app/android/app/build/outputs/apk/debug/app-debug.apk
```

同时会复制到项目根目录：
```
app/HeartbeatConnect.apk
```

## 🌐 后端服务

应用需要后端服务器才能实现配对和实时通信。

### 快速启动
1. 进入服务器目录：
   ```bash
   cd heartbeat-connect/server
   ```

2. 安装并启动：
   ```bash
   npm install
   npm start
   ```

3. 服务器地址: `http://localhost:3000`

### 生产部署
可以将服务器部署到：
- Railway (免费)
- Render (免费)
- Heroku (免费)
- 阿里云/腾讯云

## 🎨 界面预览

应用界面包含：
- 🌟 星空背景动画
- ❤️ 心跳动画效果
- ⚡ 闪电按钮（带涟漪效果）
- ✨ 星星爆炸动画
- 📊 统计面板

## ⚠️ 注意事项

1. **网络要求**: 两台设备需要在同一网络或都能访问服务器
2. **权限**: 应用需要网络和震动权限
3. **兼容性**: 需要 Android 5.0+ (API 21+)
4. **安全**: 配对码仅在生成后5分钟内有效

## 🔄 更新应用

更新应用只需：
1. 修改代码
2. 重新运行 `构建APK.bat`
3. 安装新的 APK 文件

## 📞 技术支持

如遇问题：
1. 查看 `ANDROID_BUILD_GUIDE.md`
2. 检查 Java 环境配置
3. 查看终端错误信息

## 🎯 下一步

- [ ] 测试应用功能
- [ ] 部署后端服务器
- [ ] 分享给朋友使用
- [ ] 根据需求自定义界面
- [ ] 添加更多功能

---

**版本**: 1.0.0  
**构建日期**: 2024年  
**技术支持**: SOLO

---

💓 *用心跳连接彼此*
