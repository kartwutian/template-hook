const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common')();
const { PATHS } = require('./config');

// 设置环境变量
process.env.NODE_ENV = 'development';

module.exports = function () {
  return merge(commonConfig, {
    mode: 'development',
    module: {
      rules: [
        {
          // 使用MiniCssExtractPlugin样式无法热更新，所以开发用style-loader，注意样式打包逻辑一致
          test: /\.less$/,
          include: [PATHS.global_styles, PATHS.node_modules], // 全局样式
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
          include: [PATHS.global_styles, PATHS.node_modules],
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
          test: /(\.css$)|(\.less$)/, // less 模块化处理
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new HtmlWebpackPlugin({
        template: 'src/assets/template/index.html',
      }),
    ],
    devtool: 'cheap-module-source-map',
  });
};
