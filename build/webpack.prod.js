const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base.js')
const plugins = require('./plugins/prod.js')
const optimization = require('./optimization.js')
const { MODE } = require('./constants.js')

module.exports = merge(baseConfig, {
  mode: MODE.PROD, // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins,
  optimization
})
