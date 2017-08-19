/**
 * 置顶 UserScript 的 metadata
 */
const { RawSource } = require('webpack-sources');
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

/**
 * 移动 // ==UserScript== 到最顶部
 *
 * @param {string} code
 * @returns {string}
 */
function moveUserscriptMark(code) {
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
        // 筛选并修改
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

    let code = moveUserscriptMark(input);
    let outputSource = new RawSource(code);

    compilation.assets[file] = outputSource
  }
}

module.exports = UserscriptMetadataPlugin