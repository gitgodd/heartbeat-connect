@echo off
chcp 65001 >nul
echo.
echo  ========================================
echo     💓 心跳互联 - Heartbeat Connect
echo  ========================================
echo.

echo [1/2] 检查 Node.js 环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

echo.
echo [2/2] 启动后端服务...
cd /d "%~dp0server"
echo    正在安装依赖...
npm install >nul 2>&1
if errorlevel 1 (
    echo ❌ 依赖安装失败，请检查网络连接
    pause
    exit /b 1
)
echo    依赖安装完成
echo.
echo 🚀 正在启动服务器...
echo    服务器地址: http://localhost:3000
echo    局域网地址: http://192.168.134.126:3000
echo.
echo ========================================
echo  提示: 
echo  1. 服务器启动后，保持此窗口打开
echo  2. 在浏览器中访问上面的地址
echo  3. 两台设备连接同一网络后使用
echo ========================================
echo.

npm start