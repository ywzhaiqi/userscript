import path from 'path'
import fs from 'fs'
import minimist from 'minimist'
import stringPlugin from 'rollup-plugin-string'
// import typescript from 'rollup-plugin-typescript2'
import typescript from 'rollup-plugin-typescript'
import vue from 'rollup-plugin-vue2'
import userScriptCss from 'rollup-plugin-userscript-css'

// config
const indexFiles = ['index.js', 'index.user.js', 'index.ts', 'index.user.ts']
const OUT_DIR = 'scripts'
// TODO: 还没生效
const configName = 'rollup.config.js'

const command = minimist(process.argv.slice(2))
const rootDir = path.join(__dirname, '.')

function getInput(input) {
  let args = {
    file: '',
    dir: '',
    outfile: '',
    rollupConfig: '',
    watch: false,
  }

  // fix PowserShell yarn 下传入最后会多一个" '.\\src\\MyNovelReader"'
  input = input.replace(/"$/, '')

  if (!input || !fs.existsSync(input)) {
    return args
  }

  let stats = fs.lstatSync(input)
  if (stats.isFile() && input.match(/\.jsx?$/)) {
    args.file = input
  } else if (stats.isDirectory()) {
    args.dir = input
    args.file = 'index.js'
    
    for (let f of indexFiles) {
      if (fs.existsSync(path.join(args.dir, f))) {
        args.file = f
        break
      }
    }

    // 判断是否存在配置
    let configFile = path.join(rootDir, 'src', args.dir, configName)
    if (fs.existsSync(configFile)) {
      console.log('使用配置文件：', configFile)
      args.rollupConfig = require(configFile)
    }
  }

  if (args.file) {
    args.outfile = args.dir ?
      (path.basename(args.dir) + '.user.js') :
      args.file
        .replace(/src[\/\\]/, '')
        .replace(/\.[jt]sx?$/, '.user.js')
        .replace('.user.user.js', '.user.js')
  }

  return args
}

const args = getInput(command.myinput)
if (!args.file) {
  console.error(`参数错误，文件不存在。
Usage:
  npm run build src/MyNovelReader [-w]
             或 src\\MyNovelReader`)
  process.exit()
}

let inputScript = path.join('.', args.dir, args.file)
let outputScript = path.join(rootDir, OUT_DIR, args.outfile)

let config = {
  input: inputScript,
  output: {
    file: outputScript,
    format: 'iife',
    globals: {
      'jquery': 'jQuery',
      'zepto': 'Zepto',
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  },
  banner: '/* This script build by rollup. */',
  plugins: [
    vue(),
    // 为了支持 vue 的样式
    userScriptCss({
      include: ['**/*.css'],
      exclude: [
        'src/MyNovelReader/**/*.css',  // 特殊的
      ],
      insert: true,
    }),
    stringPlugin({
      include: [
        '**/*.html',
        'src/MyNovelReader/**/*.css',  // 特殊的
      ],
    }),
    typescript({
      // https://github.com/ezolenko/rollup-plugin-typescript2
      // cacheRoot: path.join(rootDir, '.rts2_cache'),
      include: [
        "*.ts+(|x)", "**/*.ts+(|x)",
        "*.js+(|x)", "**/*.js+(|x)",
      ]
    }),
  ]
};

if (args.rollupConfig) {
  config = args.rollupConfig
}

export default config