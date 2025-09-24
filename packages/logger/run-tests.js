#!/usr/bin/env node

/**
 * 简单的测试运行脚本
 * 用于验证 logger 模块的单元测试
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 开始运行 Logger 模块单元测试...\n');

try {
  // 运行 Jest 测试
  const testCommand = 'npx jest --config=jest.config.ts --testPathPattern="\\.spec\\.ts$" --verbose';
  
  console.log('📋 运行测试命令:', testCommand);
  console.log('📁 测试目录:', path.resolve(__dirname, 'src'));
  console.log('');

  execSync(testCommand, {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('\n✅ 所有测试通过！');
} catch (error) {
  console.error('\n❌ 测试失败:', error.message);
  process.exit(1);
}
