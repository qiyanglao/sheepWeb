const os = require('os');
const swcConfig = require('../../.swcrc');
const { ENV, MODE } = require('../constants');

const workerNum = os.availableParallelism();

module.exports = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'thread-loader'
      // options: {
      //   workers: workerNum - 1 // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
      // }
    },
    // 'babel-loader'
    {
      loader: 'swc-loader',
      options: swcConfig(ENV === MODE.DEV)
    }
  ]
};
