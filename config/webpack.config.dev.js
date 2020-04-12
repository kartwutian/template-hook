const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
// const webpack = require('webpack')
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common')();
const { PATHS } = require('./config');

module.exports = function () {
  return merge(commonConfig, {
    mode: 'development',
    module: {
      rules: [],
    },
    plugins: [
      new ErrorOverlayPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/assets/template/index.html',
      }),
    ],
    devtool: 'cheap-module-source-map',
  });
};
