import path from 'path'
import fs from 'fs'
import minimist from 'minimist'
import stringPlugin from 'rollup-plugin-string'
// import typescript from 'rollup-plugin-typescript2'
import typescript from 'rollup-plugin-typescript'

const command = minimist(process.argv.slice(2))
const configName = 'rollup.config.js'
const rootDir = path.join(__dirname, '..')

function getInput(input) {
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
    let configFile = path.join(rootDir, 'src', args.dir, configName)
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

const args = getInput(command.myinput)
if (!args.file) {
  console.error('参数错误，文件不存在。Usage: build MyNovelReader 或 build booklinkme.js')
  process.exit(-1)
}

let inputScript = path.join('.', args.dir, args.file)
let outputScript = path.join(rootDir, 'dist', args.outfile)

let config = {
  input: inputScript,
  output: {
    file: outputScript,
    format: 'iife'
  },
  plugins: [
    stringPlugin({
      include: ['**/*.html', '**/*.css'],
    }),
    typescript({
      // https://github.com/ezolenko/rollup-plugin-typescript2
      // cacheRoot: path.join(rootDir, '.rts2_cache'),
      // include: [
      //   "*.ts+(|x)", "**/*.ts+(|x)",
      //   // "*.js+(|x)", "**/*.js+(|x)",
      // ]
    }),
  ]
};

if (args.rollupConfig) {
  config = args.rollupConfig
}

export default config