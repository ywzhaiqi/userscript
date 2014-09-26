// ==UserScript==
// @name         No Lazy Image load
// @namespace    https://github.com/ywzhaiqi/
// @version      1.1
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

// 转为 Object
var lazyAttributesMap = {};
lazyAttributes.forEach(function(name){
    lazyAttributesMap[name] = true;
});

function noLazyNode(node) {
    any(node.attributes, function(attr) {
        if (attr.name in lazyAttributesMap) {
            var newSrc = attr.value;
            if (node.src != newSrc) {
                // console.log('%s 被替换为 %s', node.src, newSrc);
                node.src = newSrc;
            }
            return true;
        }
    });
}

function any(c, fn) {
    if (c.some) {
        return c.some(fn);
    }
    if (typeof c.length === 'number') {
        return Array.prototype.some.call(c, fn);
    }
    return Object.keys(c).some(function(k) {
        return fn(c[k], k, c);
    });
}

function map(c, fn) {
    if (c.map) {
        return c.map(fn);
    }
    if (typeof c.length === 'number') {
        return Array.prototype.map.call(c, fn);
    }
    return Object.keys(c).map(function(k) {
        return fn(c[k], k, c);
    });
}

function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(m) {
            map(m.addedNodes, function(node) {
                if (node.nodeType == Node.ELEMENT_NODE) {
                    callback(node);
                }
            });
        });
    });
    observer.observe(watch, {childList: true, subtree: true});
}

function run() {
    map(document.images, noLazyNode);

    addMutationObserver('body', function(parent) {
        var images = parent.querySelectorAll('img');
        if (images) {
        	map(images, noLazyNode);
        }
    });
}

run();