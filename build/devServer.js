const path = require('path')

const { BASE_API, ENV } = require('./constants')
const { urlMap } = require('./config')

module.exports = {
  port: 7744, // 服务端口号
  compress: false, // gzip压缩,开发环境不开启,提升热更新速度
  hot: true, // 开启热更新，后面会讲react模块热替换具体配置
  historyApiFallback: true, // 解决history路由404问题
  static: {
    directory: path.join(__dirname, '../public') //托管静态资源public文件夹
  },
  client: {
    logging: 'error',
    overlay: true
  },
  proxy: [
    {
      context: [BASE_API],
      changeOrigin: true,
      target: urlMap[ENV],
      pathRewrite: { [`^${BASE_API}`]: '' }
    }
  ]
}
