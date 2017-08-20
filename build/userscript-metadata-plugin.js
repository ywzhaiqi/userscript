/**
 * 置顶 UserScript 的 metadata 部分，配合 uglifyjs-webpack-plugin 使用
 * 参考：[uglifyjs-webpack-plugin/index.js](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/blob/master/src/index.js)
 */
const { RawSource } = require('webpack-sources');
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

/**
 * 移动 // ==UserScript== 到最顶部
 *
 * @param {string} code
 * @returns {string}
 */
function moveMarkToTop(code) {
  const startStr = '// ==UserScript=='
  const endStr = '// ==/UserScript=='

  let startPos = code.indexOf(startStr)
  let endPost = code.indexOf(endStr) + endStr.length + 1

  return code.substring(startPos, endPost) + '\n\n' +
    code.substring(0, startPos) +
    code.substring(endPost + 1);
}


class UserscriptMetadataPlugin {
  constructor(options={}) {
    this.options = Object.assign({
      test: /\.user\.js$/i,
    }, options);
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        // 筛选出符合设置的文件修改
        chunks.reduce((acc, chunk) => acc.concat(chunk.files || []), [])
          .concat(compilation.additionalChunkAssets || [])
          .filter(ModuleFilenameHelpers.matchObject.bind(null, this.options))
          .forEach((file) => {
            this.handleOneChunk(compilation, file)
          });

        callback()
      });
    });
  }

  handleOneChunk(compilation, file) {
    const asset = compilation.assets[file];
    let input = asset.source();

    compilation.assets[file] = new RawSource(this.handleFileCode(input));
  }

  handleFileCode(input) {
    return moveMarkToTop(input);
  }
}

module.exports = UserscriptMetadataPlugin