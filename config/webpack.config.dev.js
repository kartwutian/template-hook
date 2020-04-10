const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common')();
const { PATHS } = require('./config');

module.exports = function () {
  return merge(commonConfig, {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.less$/,
          include: path.resolve(PATHS.src, 'assets/styles'), // 全局样式
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.css$/, // css 没有模块化处理
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.less$/, // less 模块化处理
          exclude: path.resolve(PATHS.src, 'assets/styles'),
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  mode: 'local',
                  exportGlobals: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 version')],
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
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
