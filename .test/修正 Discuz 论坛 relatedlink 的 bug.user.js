// ==UserScript==
// @name        修正 Discuz 论坛 relatedlink 的 bug
// @namespace   http://www.google.com
// @include     *forum.php?mod=viewthread&tid=*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

function run() {
    Object.defineProperty(window, 'relatedlink', {
        get: function() { return []; },
        set: function() {}
    });
}

var script = document.createElement('script');
script.textContent = '(' + run.toString() + ')();';
document.head.appendChild(script);
document.head.removeChild(script);