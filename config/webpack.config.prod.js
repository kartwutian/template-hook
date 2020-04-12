const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.common')();
const { PATHS } = require('./config');

module.exports = function () {
  return merge(commonConfig, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.less$/,
          include: path.resolve(PATHS.src, 'assets/styles'), // 全局样式
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
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
              loader: MiniCssExtractPlugin.loader,
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
              loader: MiniCssExtractPlugin.loader,
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
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new HtmlWebpackPlugin({
        template: 'src/assets/template/index.html',
      }),
      new webpack.DllReferencePlugin({
        //引用动态链接库
        manifest: path.resolve(PATHS.vendors, 'manifest.react.json'),
      }),
      new webpack.DllReferencePlugin({
        //引用动态链接库
        manifest: path.resolve(PATHS.vendors, 'manifest.mobx.json'),
      }),
      new webpack.DllReferencePlugin({
        //引用动态链接库
        manifest: path.resolve(PATHS.vendors, 'manifest.moment_axios.json'),
      }),
    ],
    devtool: 'cheap-module-source-map',
  });
};
