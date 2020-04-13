const path = require('path');
const {webpack: webpackConfig} = require('../src/pages.js');

const publicPath = (webpackConfig && webpackConfig.publicPath) || '/'; // 只用在生产环境，开发环境统一'/'

module.exports = {
  publicPath,
  PATHS: {
    src: path.resolve(__dirname, '../src'),
    public: path.resolve(__dirname, '../src/public'),
    dist: path.resolve(__dirname, `../dist${publicPath}`),
    distDev: path.resolve(__dirname, `../dist`),
    global_styles: path.resolve(__dirname, '../src/assets/styles'),
    node_modules: path.resolve(__dirname, '../node_modules'),
    dll: path.resolve(__dirname, '../__DLL__'),
  },
};
