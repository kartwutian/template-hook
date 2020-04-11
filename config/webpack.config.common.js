const path = require('path');
const { PATHS } = require('./config');

module.exports = function () {
  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
        },
        {
          test: /\.json$/,
          use: [
            {
              loader: 'json-loader',
            },
          ],
        },
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
    plugins: [],
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
