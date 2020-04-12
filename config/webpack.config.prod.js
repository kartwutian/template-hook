const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.common')();
const { PATHS } = require('./config');

module.exports = function () {
  return merge(commonConfig, {
    mode: 'production',
    module: {
      rules: [],
    },
    plugins: [
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
