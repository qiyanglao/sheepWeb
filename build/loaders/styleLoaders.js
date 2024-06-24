const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { MODE } = require('../constants')

const isDev = process.env.NODE_ENV === MODE.DEV

module.exports = {
  include: [path.resolve(__dirname, '../../src')],
  test: /\.s[ac]ss$/i,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          namedExport: true,
          auto: resourcePath => resourcePath.endsWith('.module.scss'),
          localIdentName: 'css__module__[name]__[local][hash:base64:5]'
        }
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
}
