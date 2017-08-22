import path from 'path'
import minimist from 'minimist'
import stringPlugin from 'rollup-plugin-string'
import typescript from 'rollup-plugin-typescript2'
const { getInput } = require('./utils')

const command = minimist(process.argv.slice(2))

const args = getInput(command.myinput)
if (!args.file) {
  console.error('参数错误，文件不存在。Usage: build MyNovelReader 或 build booklinkme.js')
  process.exit(-1)
}

let inputScript = path.join('.', args.dir, args.file)
let outputScript = path.join(__dirname, '../dist/', args.outfile)

let config = {
  input: inputScript,
  output: {
    file: outputScript,
    format: 'cjs'
  },
  plugins: [
    stringPlugin({
      include: ['**/*.html', '**/*.css'],
      // exclude: ['**/index.html'],
    }),
    typescript({
      cacheRoot: path.join(__dirname, '../.rts2_cache')
    }),
  ]
};

if (args.rollupConfig) {
  config = args.rollupConfig
  config.input = inputScript
  config.outfile.file = outputScript
}

export default config