const path = require('path');
const { PATHS } = require('./config');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    mobx: ['mobx'],
    react: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-css-modules',
      'mobx-react',
    ],
    moment_axios: ['axios', 'moment'],
  },
  output: {
    filename: '__dll__[name].js',
    path: PATHS.dll,
    library: '__dll__[name]',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DllPlugin({
      name: '__dll__[name]',
      path: path.resolve(PATHS.dll, 'manifest.[name].json'),
    }),
  ],
};
