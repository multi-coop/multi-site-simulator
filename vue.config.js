const webpack = require('webpack')
module.exports = {
  // externals: {
  //   vue: 'Vue'
  // },
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
  //   }
  // },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  filenameHashing: false,
  productionSourceMap: false,
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    }
}
