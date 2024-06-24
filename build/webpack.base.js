const path = require('path')

const plugins = require('./plugins/base.js')
const jsLoaders = require('./loaders/jsLoaders.js')
const styleLoaders = require('./loaders/styleLoaders.js')
const assetsLoaders = require('./loaders/assetsLoaders.js')
const { ENV, MODE } = require('./constants.js')

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  cache: {
    type: 'filesystem'
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [jsLoaders, styleLoaders, ...assetsLoaders]
  },
  plugins,
  stats: ENV === MODE.PROD ? 'normal' : 'errors-only',
  performance: {
    maxEntrypointSize: 50000000,
    maxAssetSize: 30000000
  }
}
