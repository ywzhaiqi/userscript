// ==UserScript==
// @name        TiebaNojump
// @namespace   https://github.com/ywzhaiqi
// @include     http://tieba.baidu.com/p/*
// @version     1.1
// @grant       none
// ==/UserScript==


function run() {
    var urls = document.querySelectorAll('a[href^="http://jump.bdimg.com/safecheck"]');
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i].textContent;
        if (url.indexOf("http") == -1)
            url = "http://" + url;
        urls[i].setAttribute("href", url);
    }
}

function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(function(mutations){
        var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
        if (nodeAdded) {
            // observer.disconnect();
            callback();
        }
    });
    observer.observe(watch, {childList: true, subtree: true});
}


run();

addMutationObserver('#j_p_postlist', run);
