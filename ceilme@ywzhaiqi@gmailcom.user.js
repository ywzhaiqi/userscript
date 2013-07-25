// ==UserScript==
// @id             ceil.me@ywzhaiqi@gmail.com
// @name           ceil.me辅助下载
// @version        1.2
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi@gmail.com
// @description    ceil.me PDF杂志直接下载，不再需要点击多次
// @include        http://www.ceil.me/*
// @exclude        http://www.ceil.me/
// @exclude        http://www.ceil.me/category/*
// @exclude        http://www.ceil.me/download/*
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery;

function getDoc(url, callback){
    console.log('GM_xmlhttpRequest: ' + url);
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(responseDetail){
            doc = new DOMParser().parseFromString(responseDetail.responseText, 'text/html');
            callback(doc);
        }
    });
}

var UIL = {
    init: function(){
        var $link = $('a[href^="http://www.ceil.me/download/?p="]');
        var url = $link.attr('href');
        if(url){
            getDoc(url, function(doc){
                var $dlink = $('a[href^="http://pan.baidu"], a[href^="http://dl.vmall"]', doc);
                if($dlink.length == 0){
                    console.log("没有找到下载链接", url);
                }else{
                    $link.after($dlink.parent());
                }
            });
        }
    }
};

UIL.init();

