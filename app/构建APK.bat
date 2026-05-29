@echo off
chcp 65001 >nul
setlocal

echo.
echo  ========================================
echo     💓 心跳互联 - Android APK 构建工具
echo  ========================================
echo.

REM 检查 Java
echo [1/4] 检查 Java 环境...
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到 Java JDK
    echo.
    echo 请先安装 JDK 11 或更高版本:
    echo   - OpenJDK (免费): https://adoptium.net/
    echo   - Oracle JDK: https://www.oracle.com/java/technologies/downloads/
    echo.
    echo 安装后请重启此脚本
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('java -version 2^>^&1 ^| findstr "version"') do (
    echo    检测到: %%i
)

REM 检查 JAVA_HOME
echo.
echo [2/4] 检查 JAVA_HOME 环境变量...
if not defined JAVA_HOME (
    echo ⚠️  未设置 JAVA_HOME，尝试自动查找...
    
    REM 尝试常见路径
    if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.5.8-hotspot" (
        set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.5.8-hotspot"
    ) else if exist "C:\Program Files\Java\jdk-17" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-17"
    ) else if exist "C:\Program Files\Java\jdk-11" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-11"
    ) else (
        echo ❌ 无法自动找到 Java 安装路径
        echo 请手动设置 JAVA_HOME 环境变量
        echo.
        echo 设置方法:
        echo   1. 右键"此电脑" -^> 属性 -^> 高级系统设置
        echo   2. 点击"环境变量"
        echo   3. 在"系统变量"中新建:
        echo      变量名: JAVA_HOME
        echo      变量值: C:\Program Files\Java\jdk-17 (根据您的实际路径)
        echo   4. 确定保存后，重新运行此脚本
        pause
        exit /b 1
    )
)

echo    JAVA_HOME: %JAVA_HOME%

REM 设置 PATH
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM 切换到项目目录
cd /d "%~dp0"

echo.
echo [3/4] 构建 Web 应用...
call npm run build
if errorlevel 1 (
    echo ❌ Web 应用构建失败
    pause
    exit /b 1
)

echo.
echo 正在同步到 Android 项目...
call npx cap sync android
if errorlevel 1 (
    echo ❌ 同步失败
    pause
    exit /b 1
)

echo.
echo [4/4] 构建 Android APK...
cd android
echo    这可能需要几分钟，请耐心等待...
echo.

call gradlew.bat assembleDebug
if errorlevel 1 (
    echo ❌ APK 构建失败
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo  ✅ 构建成功！
echo ========================================
echo.
echo 📦 APK 文件位置:
echo    %~dp0android\app\build\outputs\apk\debug\app-debug.apk
echo.

REM 复制 APK 到项目根目录
copy "%~dp0android\app\build\outputs\apk\debug\app-debug.apk" "%~dp0HeartbeatConnect.apk" >nul 2>&1
if not errorlevel 1 (
    echo 📋 已复制到:
    echo    %~dp0HeartbeatConnect.apk
    echo.
)

echo 安装方法:
echo   1. 将 APK 文件复制到手机
echo   2. 在手机上点击安装
echo   3. 如果提示"禁止安装未知来源应用"
echo      请在设置中开启权限
echo.
echo ========================================
echo.

REM 打开 APK 所在目录
explorer "%~dp0android\app\build\outputs\apk\debug"

pause
