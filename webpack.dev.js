const merge = require('webpack-merge');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    main: './public/src/js/app.js',
    router: './public/src/js/router.js',
    store: './public/src/js/store.js',
    vuetify: './public/src/js/vuetify.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
      hot: true,
      watchOptions: {
        poll: true,
        ignore: 'node_modules'
      }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    })
  ],
  optimization: {
      splitChunks: {
          chunks: 'all'
      }
  }
});