// ==UserScript==
// @name         Search Hepler
// @namespace    https://github.com/ywzhaiqi
// @author       ywzhaiqi
// @version      0.2
// @description  让一些特殊的搜索支持搜索串
// @include      http://kindleren.com/search.php?mod=forum&mq=*
// @include      http://shuzi.taobao.com/item/search---50094067.htm?q=*
// @include      http://www.xiaopian.com/?q=*
// @grant        GM_addStyle
// @require      http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// @run-at       document-start
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

function goSearch(param, input, submit) {
    $(function() {
        var search = getParam(param, location.href);
        if (search) {
            $(input).val(search);
            $(submit).click();
        }
    });
}

// 运行在 document-start，详见 taobao 函数
function goSearch2(url, param) {
    var search = getParam(param, location.href);
    if (search) {
        location.href = url.replace('%s', search);
    }
}


var ns = {
    kindleren: function() {
        goSearch('mq', '#scform_srchtxt', '#scform_submit');
    },
    taobao: function() {  // 解决乱码问题
        goSearch2('http://shuzi.taobao.com/item/search-.htm?q=%s&isbook=ebook', 'q');
    },
    xiaopian: function() {
        goSearch('q', 'input[name="keyboard"]', 'input[name="Submit"]')
    }
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
