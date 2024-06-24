const path = require('path')

module.exports = {
  include: [path.resolve(__dirname, '../../src')],
  test: /.(ts|tsx)$/,
  use: [
    {
      loader: 'thread-loader',
      options: {
        workers: 3 // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
      }
    },
    'babel-loader'
  ]
}
