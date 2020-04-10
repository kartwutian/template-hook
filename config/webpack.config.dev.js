const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { PATHS } = require('./config');

module.exports = function () {
  return {
    mode: 'development',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /(\.css$)|(\.less$)/,
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
        {
          test: /\.js$/,
          use: ['babel-loader'],
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
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(PATHS.src),
        assets: path.resolve(PATHS.src, 'assets'),
        layouts: path.resolve(PATHS.src, 'layouts'),
        components: path.resolve(PATHS.src, 'components'),
        pages: path.resolve(PATHS.src, 'pages'),
        models: path.resolve(PATHS.src, 'models'),
        utils: path.resolve(PATHS.src, 'utils'),
        store: path.resolve(PATHS.src, 'store'),
      },
    },
  };
};
