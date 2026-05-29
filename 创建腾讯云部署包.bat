@echo off
chcp 65001 >nul
echo ========================================
echo    腾讯云部署包准备工具
echo ========================================
echo.

echo 正在创建部署包...
powershell -Command "Compress-Archive -Path 'd:\trae solo\01\heartbeat-connect\*' -DestinationPath 'd:\trae solo\01\heartbeat-connect-deploy.zip' -Force"

echo.
echo 部署包已创建: d:\trae solo\01\heartbeat-connect-deploy.zip
echo.
echo ========================================
echo    部署步骤
echo ========================================
echo.
echo 1. 打开腾讯云控制台：https://console.cloud.tencent.com/scf
echo.
echo 2. 点击「新建函数」
echo.
echo 3. 选择「从头开始」
echo.
echo 4. 配置函数：
echo    - 函数名称：heartbeat-connect
echo    - 运行环境：Node.js 18.x
echo.
echo 5. 上传部署包
echo.
echo 6. 配置触发器：API 网关触发器
echo.
echo 7. 等待部署完成，获取访问地址
echo.
echo ========================================
echo.
pause
