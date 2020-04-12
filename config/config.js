const path = require('path');

module.exports = {
  PATHS: {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    global_styles: path.resolve(__dirname, '../src/assets/styles'),
    node_modules: path.resolve(__dirname, '../node_modules'),
    vendors: path.resolve(__dirname, '../dist/vendors'),
  },
};
