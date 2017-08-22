const fs = require('fs')
const path = require('path')

const rootPath = path.join(__dirname, '..')

exports.getInput = function(input, configName='rollup.config.js') {
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
    let configFile = path.join(rootPath, 'src', args.dir, configName)
    if (fs.existsSync(configFile)) {
      console.log('使用配置文件：', configFile)
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