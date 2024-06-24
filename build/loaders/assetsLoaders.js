module.exports = [
  {
    test: /.(png|jpg|jpeg|gif|svg)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024
      }
    },
    generator: {
      filename: 'static/images/[name].[contenthash:8][ext]'
    }
  },
  {
    test: /.(woff2?|eot|ttf|otf)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024
      }
    },
    generator: {
      filename: 'static/fonts/[name].[contenthash:8][ext]'
    }
  },
  {
    test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024
      }
    },
    generator: {
      filename: 'static/media/[name].[contenthash:8][ext]'
    }
  }
]
