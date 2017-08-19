const path = require('path')
const webpack = require('webpack')
const UserscriptMetaPlugin = require('./userscript-metadata-plugin')

// webpack 设置
const genConfig = (input, output) => ({
  entry: './' + input,
  output: {
    filename: output,
    path: path.resolve(__dirname, '..')
  },
  externals: {
    'zepto': 'Zepto',
    'jquery': 'jQuery',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['userscript-css-loader'] },
      // { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
    ]
  },
  plugins: [
    new UserscriptMetaPlugin(),
  ]
});

module.exports = genConfig