// ==UserScript==
// @id             ceil.me@ywzhaiqi@gmail.com
// @name           ceil.me辅助下载
// @version        1.4
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi@gmail.com
// @description    ceil.me PDF杂志直接下载，不再需要点击多次
// @include        http://www.ceil.me/*
// @exclude        http://www.ceil.me/
// @exclude        http://www.ceil.me/category/*
// @exclude        http://www.ceil.me/download/*
// @run-at         document-end
// ==/UserScript==

(function (){
    var $ = unsafeWindow.jQuery;

    var ins = $('a[href^="http://www.ceil.me/download/?p="]');
    if(ins.length == 0)
        return;

    GM_addStyle('.ext-link { background: none repeat scroll 0% 0% rgb(238, 238, 238) !important; }');

    ins.load(ins[0].href + " .part", null, function(){
        ins.html(ins.html().replace("下载地址：", ""));
    });
})();
