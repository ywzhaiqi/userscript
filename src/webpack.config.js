const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const UserscriptMetaPlugin = require('../build/userscript-metadata-plugin')
const SimpleStripPlugin = require('../build/simple-strip-plugin')

function getInputScript() {
  let argv = process.argv.slice(2)
  for (let arg of argv) {
    if (fs.existsSync(arg)) {
      return arg
    }
  }

  throw('遗失文件名，Usage: build booklinkme.js')
}

function getOutputScript(inputScript) {
  if (!inputScript.endsWith('.user.js')) {
    return inputScript.replace('.js', '.user.js')
  }

  return inputScript
}

let inputScript = getInputScript()
let outputScript = getOutputScript(inputScript)

module.exports = {
  entry: './' + inputScript,
  output: {
    filename: outputScript,
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
    // 移动 metadata 到顶部，配合 UglifyJSPlugin
    new UserscriptMetaPlugin(),

    // 参考 https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          // uglify-es\lib\compress.js 源码修改过，新增了下面几行
          // add by yyy
          // var optionsDefault = false;
          // false_by_default = !optionsDefault
          dead_code: true,
          unused: true,
        },
        mangle: false,  // 不混淆
        // // 无效
        // mangle: {
        //   keep_classnames: true,
        //   keep_fnames: true,
        //   properties: true,
        //   // properties: {
        //   // }
        // },
        output: {
          beautify: true,
          // 保留 meta
          comments: / ==\/?UserScript|^ @/,
        }
      }
    }),
  ]
}
