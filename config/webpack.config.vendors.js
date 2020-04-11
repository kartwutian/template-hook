const path = require('path')
const {PATHS} = require('./config')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vender: ['react', 'react-dom', 'axios', 'mobx', 'mobx-react', 'moment']
  },
  output: {
    filename: '__dll__vendors.js',
    path: PATHS.dist,
    library: '__dll__vendors'
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.DllPlugin({
      name: '__dll__vendors',
      path: path.resolve(PATHS.dist, 'manifest.json')
    })
  ]
}
