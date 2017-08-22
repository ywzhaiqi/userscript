const fs = require('fs')
const path = require('path')

exports.getInput = function(input) {
  let args = {
    file: '',
    dir: '',
    outfile: '',
    rollupConfig: '',
    watch: false,
  }

  if (!input || !fs.existsSync(input)) {
    return args
  }

  let stats = fs.lstatSync(input)
  if (stats.isFile() && input.endsWith('.js')) {
    args.file = input
  } else if (stats.isDirectory()) {
    args.dir = input
    args.file = 'index.js'
    // 判断是否存在配置
    let configFile = path.join(args.dir, 'rollup.config.js')
    if (fs.existsSync(configFile)) {
      args.rollupConfig = require(configFile)
    }
  }

  if (args.file) {
    args.outfile = args.dir ?
      (args.dir + '.user.js') :
      args.file.replace(/\.js$/, '.user.js').replace('.user.user.js', '.user.js')
  }

  return args
}