const path = require('path')
const globAll = require('glob-all')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')

module.exports = [
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称
  }),
  // 复制文件插件
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../public'), // 复制public下文件
        to: path.resolve(__dirname, '../../dist'), // 复制到dist目录中
        filter: source => {
          return !source.includes('index.html') // 忽略index.html
        }
      }
    ]
  }),
  // 清理无用css
  new PurgeCSSPlugin({
    // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
    // 只打包这些文件中用到的样式
    paths: globAll.sync([
      `${path.join(__dirname, '../../src')}/**/*.tsx`,
      path.join(__dirname, '../../public/index.html')
    ]),
    safelist: {
      standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      deep: [/css__module__/]
    }
  }),
  new CompressionPlugin({
    test: /.(js|css)$/, // 只生成css,js压缩文件
    filename: '[path][base].gz', // 文件命名
    algorithm: 'gzip', // 压缩格式,默认是gzip
    threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
    minRatio: 0.8 // 压缩率,默认值是 0.8
  }),
  new ProgressBarWebpackPlugin()
]
