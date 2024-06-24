const { merge } = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const prodConfig = require('./webpack.prod.js')
const { ENV, MODE } = require('./constants.js')

const smp = new SpeedMeasurePlugin()
const wrapConfig = ENV === MODE.DEV ? smp.wrap : config => config

module.exports = wrapConfig(
  merge(prodConfig, {
    plugins: [new BundleAnalyzerPlugin()]
  })
)
