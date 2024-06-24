const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base.js')
const devServer = require('./devServer.js')
const plugins = require('./plugins/dev.js')
const { MODE } = require('./constants.js')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: MODE.DEV, // 开发模式,打包更加快速
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer,
  plugins
})
