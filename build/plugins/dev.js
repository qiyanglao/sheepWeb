const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = [
  new ReactRefreshWebpackPlugin(), // 添加热更新插件
  // 进度条
  new WebpackBar({
    // name: 'webpack5-ts-react18',
    // react 蓝
    color: '#61dafb',
    basic: false, // 默认true，启用一个简单的日志报告器
    profile: false // 默认false，启用探查器。
  })
]
