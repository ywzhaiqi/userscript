/**
 * This rollup plugin use to recovery Userscript Metadata Header.
 */

function getMetaHeader(code) {
    const startStr = '// ==UserScript=='
    const endStr = '// ==/UserScript=='

    const startPos = code.indexOf(startStr)
    const endPost = code.indexOf(endStr) + endStr.length + 1

    let partOne = code.substring(startPos, endPost)
    let partTwo = code.substring(endPost)
    return [partOne, partTwo]
}

export default function fix(options = {}) {
    let metaHeader;
    return {
        name: 'metadata',
        transform(code) {
            let restPart = code
            if (code.startsWith('// ==UserScript==')) {
                [metaHeader, restPart] = getMetaHeader(code)
            }

            return restPart
        },
        renderChunk(code) {
            if (metaHeader) {
                return metaHeader  + '\n\n' + code
            }
            return code
        }
    }
}