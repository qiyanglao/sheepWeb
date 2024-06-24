const path = require('path')
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../../public/index.html'),
    inject: true
  }),
  new webpack.DefinePlugin({
    'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
  }),
  new NodePolyfillPlugin()
]
