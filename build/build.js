// https://doc.webpack-china.org/api/node/
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const yargs = require('yargs')
  .usage('Usage: $0 foo.js [options]')
  .example('$0 foo.js', 'build foo.user.js script')
  .example('$0 foo.js -w', 'build foo.user.js script by watching')
  .option('watch', {
    alias: 'w',
    describe: 'build by watch',
    default: false
  })
  .help('h')
  .alias('h', 'help')

const genConfig = require('./webpack.config')


function outputResult(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.log(stats.toString({
    chunks: false,  // 使构建过程更静默无输出
    colors: true    // 在控制台展示颜色
  }));
}

function run() {
  const argv = yargs.argv

  let inputScript = argv._[0]
  if (!inputScript || !fs.existsSync(inputScript)) {
    yargs.showHelp()
    return
  }

  let outputScript = !inputScript.endsWith('.user.js') ?
    inputScript.replace('.js', '.user.js') :
    inputScript;

  const compiler = webpack(genConfig(inputScript, outputScript));

  if (argv.w) {
    const watching = compiler.watch({
      ignored: /node_modules/,
    }, outputResult);
    // watching.close(() => {})
  } else {
    compiler.run(outputResult);
  }
}

run()
