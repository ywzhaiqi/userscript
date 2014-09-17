// ==UserScript==
// @name         No Lazy Image load
// @namespace    https://github.com/ywzhaiqi/
// @version      0.1
// @description  取消图片的延迟加载
// @include      http*
// @grant        none
// ==/UserScript==

var lazyAttributes = [
    "zoomfile", "file", "original", "load-src", "_src", "imgsrc", "real_src", "src2", "origin-src",
    "data-lazyload", "data-lazyload-src", "data-lazy-load-src",
    "data-ks-lazyload", "data-ks-lazyload-custom",
    "data-src", "data-defer-src", "data-actualsrc",
    "data-cover", "data-original", "data-thumb", "data-imageurl",  "data-placeholder",
];

function noLazyNode(node) {
    if (node.localName != 'img') return;

    lazyAttributes.some(function(attr) {
        if (!node.hasAttribute(attr)) return;

        var newSrc = node.getAttribute(attr);
        if (node.src != newSrc) {
            node.src = newSrc;
        }
        return true;
    });
}

function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(x) {
            if (x.addedNodes.length) {
                callback(x.addedNodes);
            }
        });
    });
    observer.observe(watch, {childList: true, subtree: true});
}

function run() {
    [].map.call(document.images, noLazyNode);

    addMutationObserver('body', function(addedNodes) {
        [].map.call(addedNodes, noLazyNode)
    });
}

run();