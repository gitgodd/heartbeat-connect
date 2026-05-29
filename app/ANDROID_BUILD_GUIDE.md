# Android APK 构建指南

## 环境要求

构建 Android APK 需要以下环境：

### 1. Java Development Kit (JDK)

**最低版本**: JDK 11 或更高

**下载地址**:
- Oracle JDK: https://www.oracle.com/java/technologies/downloads/
- OpenJDK (免费): https://adoptium.net/

**安装后配置**:
```powershell
# 设置 JAVA_HOME (根据您的安装路径调整)
[Environment]::SetEnvironmentVariable(
    "JAVA_HOME",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.5.8-hotspot",
    "User"
)

# 将 JAVA_HOME 添加到 PATH
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

### 2. Android SDK (可选，但推荐)

如果您已安装 Android Studio，SDK 应该已包含。

**下载地址**: https://developer.android.com/studio

**安装后配置**:
```powershell
[Environment]::SetEnvironmentVariable(
    "ANDROID_HOME",
    "C:\Users\您的用户名\AppData\Local\Android\Sdk",
    "User"
)
```

## 快速构建步骤

### 方法一：使用构建脚本（推荐）

1. **双击运行 `构建APK.bat`**

系统将自动检查环境并构建 APK。

### 方法二：手动构建

1. **打开终端，进入项目目录**
```bash
cd d:\trae solo\01\heartbeat-connect\app
```

2. **构建 Web 应用**
```bash
npm run build
```

3. **同步到 Android**
```bash
npx cap sync android
```

4. **构建 APK**
```bash
cd android
.\gradlew assembleDebug
```

## APK 文件位置

构建成功后，APK 文件位于:
```
d:\trae solo\01\heartbeat-connect\app\android\app\build\outputs\apk\debug\app-debug.apk
```

## 安装 APK

### 方法一：复制到手机
1. 将 APK 文件复制到手机
2. 在手机上打开文件管理器
3. 点击 APK 文件开始安装
4. 如果提示"禁止安装未知来源应用"，请在设置中开启

### 方法二：使用 ADB 安装
```bash
adb install app-debug.apk
```

## 调试模式

如果需要调试：
1. 在手机上开启"开发者选项"
2. 启用"USB 调试"
3. 连接手机到电脑
4. 运行:
```bash
adb install -r app-debug.apk
```

## 常见问题

### Q: 构建失败，提示 JAVA_HOME 未设置
**A**: 请确保已安装 JDK 并正确配置环境变量。重启终端后生效。

### Q: 提示 Gradle 版本不兼容
**A**: 在 `android/gradle/wrapper/gradle-wrapper.properties` 中修改 `distributionUrl` 的 Gradle 版本。

### Q: 手机上无法震动
**A**: 确保在安装时授予了震动权限。可以在手机设置的应用管理中找到该应用，手动开启权限。

## 打包为发布版 APK

构建正式版 APK:
```bash
cd android
.\gradlew assembleRelease
```

> 注意：发布版 APK 需要签名密钥。

## 技术栈

- **Web 框架**: Vite
- **移动端打包**: Capacitor 6
- **原生功能**: @capacitor/haptics (震动)
- **构建工具**: Gradle

## 下一步

1. 安装 JDK
2. 运行构建脚本
3. 安装 APK 到手机
4. 享受心跳互联！

---

如遇问题，请检查环境变量配置或重新启动终端。
