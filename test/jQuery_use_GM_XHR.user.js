// ==UserScript==
// @name         让 jQuery 使用 GM_xmlhttpRequest XHR
// @filename     jQuery_use_GM_XHR.user.js
// @namespace    https://github.com/ywzhaiqi
// @version      0.1
// @description  支持 jQuery 版本 1.5 - 3.2（目前最新）
// @author       yyy
// @include      http://y.guten.me/
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

// allows using all Jquery AJAX methods in Greasemonkey
// inspired from http://ryangreenberg.com/archives/2010/03/greasemonkey_jquery.php
// (c) 2011 Martin Monperrus
// (c) 2010 Ryan Greenberg
//
// Usage:
//   $.ajax({
//     url: '/p/',
//     xhr: function(){return new GM_XHR();},
//     type: 'POST',
//     success: function(val){
//        ....
//     }
//   });

function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;

    this.abort = function () {
        this.readyState = 0;
    };
}

GM_XHR.prototype.getAllResponseHeaders = function (name) {
    if (this.readyState != 4) return "";
    return this.responseHeaders;
};

GM_XHR.prototype.getResponseHeader = function (name) {
    var regexp = new RegExp('^' + name + ': (.*)$', 'im');
    var match = regexp.exec(this.responseHeaders);
    if (match) { return match[1]; }
    return '';
};

GM_XHR.prototype.open = function (type, url, async, username, password) {
    this.type = type ? type : null;
    this.url = url ? url : null;
    this.async = async ? async : null;
    this.username = username ? username : null;
    this.password = password ? password : null;
    this.readyState = 1;
};

GM_XHR.prototype.setRequestHeader = function (name, value) {
    this.headers[name] = value;
};

GM_XHR.prototype.send = function (data) {
    this.data = data;
    var that = this;
    // http://wiki.greasespot.net/GM_xmlhttpRequest
    GM_xmlhttpRequest({
        method: this.type,
        url: this.url,
        headers: this.headers,
        data: this.data,
        onload: function (rsp) {
            // Populate wrapper object with returned data
            // including the Greasemonkey specific "responseHeaders"
            for (var k in rsp) {
                that[k] = rsp[k];
            }

            if (that.onload) that.onload(); else that.onreadystatechange();
        },
        onerror: function (rsp) {
            for (var k in rsp) {
                that[k] = rsp[k];
            }
        }
    });
};


// examples
$.ajax({
    type: 'get',
    url: 'https://www.baidu.com',
    xhr: function () { return new GM_XHR(); },
    success: function (val) {
        console.log(val)
    }
});