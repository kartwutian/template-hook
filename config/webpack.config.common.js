const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const Happypack = require('happypack');
const { PATHS } = require('./config');

module.exports = function () {
  return {
    entry: './src/index.js',
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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: PATHS.src,
          use: 'Happypack/loader?id=js',
        },
        // {
        //   test: /\.json$/,
        //   use: [
        //     {
        //       loader: 'json-loader',
        //     },
        //   ],
        // },
        {
          test: /\.(png|gif|jpg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
                name: path.normalize('assets/[name].[ext]'),
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
                name: path.normalize('assets/[name].[ext]'),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Happypack({
        id: 'js',
        threads: 4,
        use: ['babel-loader'],
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ],
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
