const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.config.common')();
const { PATHS, publicPath } = require('./config');

// 设置环境变量
process.env.NODE_ENV = 'production';

module.exports = function () {
  return merge(commonConfig, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /(\.css$)|\.less$/, // 用happypack打包会报错，先不用了
          include: [PATHS.node_modules, PATHS.global_styles], // 全局样式
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
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
        {
          test: /(\.css$)|\.less$/, // less 模块化处理
          exclude: [PATHS.node_modules, PATHS.global_styles],
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '万博后台管理模板',
        template: 'src/assets/template/index.html',
        filename: path.resolve(PATHS.dist, 'index.html'),
        dll: {
          react: `${publicPath}vendors/__dll__react.js`,
          mobx: `${publicPath}vendors/__dll__mobx.js`,
          moment_axios: `${publicPath}vendors/__dll__moment_axios.js`,
        },
      }),
      new CopyPlugin([
        {
          from: PATHS.dll,
          to: path.resolve(PATHS.dist, 'vendors'),
        },
      ]),
      new CopyPlugin([
        {
          from: PATHS.public,
          to: path.resolve(PATHS.dist),
        },
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __PUBLIC_PATH__: JSON.stringify(publicPath), // publicPath 注入
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new webpack.DllReferencePlugin({
        //引用动态链接库
        manifest: path.resolve(PATHS.dll, 'manifest.react.json'),
      }),
      new webpack.DllReferencePlugin({
        //引用动态链接库
        manifest: path.resolve(PATHS.dll, 'manifest.mobx.json'),
      }),
      new webpack.DllReferencePlugin({
        //引用动态链接库
        manifest: path.resolve(PATHS.dll, 'manifest.moment_axios.json'),
      }),
    ],
    devtool: 'cheap-module-source-map',
  });
};
