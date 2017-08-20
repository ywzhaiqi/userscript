
module.exports = {
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
}