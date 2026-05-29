#!/usr/bin/env node

// ZIP 文件打包脚本 - 为 AppsGeyser 准备

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('正在准备 Web 应用文件...');

// 检查是否有打包工具
try {
  execSync('npx --version');
} catch (e) {
  console.log('请确保已安装 Node.js');
  process.exit(1);
}

const appDir = __dirname;

// 复制必要文件到临时目录
const tempDir = path.join(appDir, 'temp_apk');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir);

// 复制文件
const files = ['index.html', 'features.html'];
files.forEach(file => {
  const src = path.join(appDir, file);
  const dest = path.join(tempDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ 复制: ${file}`);
  }
});

// 创建 README
const readme = `# 心跳互联 - Heartbeat Connect

## 使用说明

此文件夹包含用于打包 APK 的 Web 应用文件。

## 打包步骤

1. 访问: https://next.appsgeyser.com/
2. 点击 "Create App"
3. 选择 "Website" 或 "HTML" 模板
4. 将此文件夹内容打包为 ZIP
5. 上传 ZIP 文件
6. 设置应用名称: "心跳互联"
7. 下载 APK 并安装到手机

## 功能

- 实时心率同步
- 闪电触感反馈
- 星星爆炸动画
- 雷达触感模式
- 互动统计

## 注意

使用时需要先启动后端服务器:

cd ../server
npm install
npm start
`;

fs.writeFileSync(path.join(tempDir, 'README.md'), readme);

console.log('\n✓ 文件准备完成！');
console.log('\n📦 现在请手动执行以下步骤:');
console.log('   1. 打开文件夹: ' + tempDir);
console.log('   2. 将文件夹中所有内容选中，右键 -> 发送到 -> 压缩(zipped)文件夹');
console.log('   3. 访问: https://next.appsgeyser.com/create-app');
console.log('   4. 选择 \"HTML\" 或 \"Website\" 模板');
console.log('   5. 上传刚才创建的 ZIP 文件');
console.log('   6. 按照向导完成 APK 生成！\n');
