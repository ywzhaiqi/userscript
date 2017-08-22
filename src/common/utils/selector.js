
/**
 * 根据 xpath 查找元素
 *
 * @export
 * @param {string} aXPath
 * @param {Node} aContext
 * @returns
 */
export function $x(aXPath, aContext) {
    var nodes = [];
    var doc = document;
    var aContext = aContext || doc;

    try {
        var results = doc.evaluate(aXPath, aContext, null,
            XPathResult.ANY_TYPE, null);
        var node;
        while (node = results.iterateNext()) {
            nodes.push(node);
        }
    } catch (ex) { }

    return nodes;
}