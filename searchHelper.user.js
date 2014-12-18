// ==UserScript==
// @name         Search Hepler
// @namespace    https://github.com/ywzhaiqi
// @author       ywzhaiqi
// @version      0.1
// @description  让一些特殊的搜索支持搜索串
// @include      http://kindleren.com/search.php?mod=forum&mq=*
// @grant        GM_addStyle
// @require      http://cdn.staticfile.org/zepto/1.1.4/zepto.min.js
// @run-at       document-end
// @noframes
// ==/UserScript==

if (typeof String.prototype.contains != 'function') {
    String.prototype.contains = function(str) {
        return this.indexOf(str) != -1;
    };
}

function getParam(name, url) {
    var regexp = new RegExp("(?:^|\\?|#|&)" + name + "=([^&#]*)(?:$|&|#)", "i"),
        matches = regexp.exec(url || location.href);
    return matches ? decodeURIComponent(matches[1]) : ""
}


var ns = {
    kindleren: function() {
        var search = getParam('mq', location.href);

        $('#scform_srchtxt').val(search);
        $('#scform_submit').click();
    },
};


function run() {  // 自动运行符合 host 的函数
    var host = location.host;

    Object.keys(ns).some(function(key) {
        if (host.contains(key)) {
            ns[key]();
            return true;
        }
    });
}


run();
