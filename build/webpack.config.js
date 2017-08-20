const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const UserscriptMetaPlugin = require('./userscript-metadata-plugin')
// config
const uglifyJSConfig = require('./uglifyJSPlugin.config')

function getInputScript() {
  let argv = process.argv.slice(2)
  for (let file of argv) {
    if (file.includes('webpack')) continue

    if (file.endsWith('.js') && fs.existsSync(file)) {
      return file
    }
  }

  throw('参数错误，文件不存在或非 .js 文件。Usage: build booklinkme.js')
}

function getOutputScript(inputScript) {
  let outfile = inputScript

  if (!outfile.endsWith('.user.js')) {
    outfile = outfile.replace('.js', '.user.js')
  }

  if (fs.existsSync(outfile)) {
    console.log(`覆盖文件 ${outfile}`)
  }

  return outfile
}

let inputScript = getInputScript()
let outputScript = getOutputScript(inputScript)


module.exports = {
  entry: './' + inputScript,
  output: {
    filename: outputScript,
    path: path.resolve(__dirname, '..')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
      { test: /\.css$/, use: ['userscript-css-loader'] },
      // { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
    ]
  },
  externals: {
    'zepto': 'Zepto',
    'jquery': 'jQuery',
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  // devtool: 'sourcemap',
  plugins: [
    // 移动 metadata 到顶部，配合 UglifyJSPlugin
    new UserscriptMetaPlugin(),

    // 参考 https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
    new UglifyJSPlugin(uglifyJSConfig),
  ]
}
