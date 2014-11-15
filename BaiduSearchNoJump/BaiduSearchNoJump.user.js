// ==UserScript==
// @name         BaiduSearchNoJump
// @namespace    https://github.com/ywzhaiqi
// @authuer      ywzhaiqi
// @description  百度搜索反跳转，增加了翻页脚本的支持、不刷新页面的支持。
// @include      http://www.baidu.com/*
// @include      https://www.baidu.com/*
// @homepageURL  https://greasyfork.org/scripts/1771/
// @updateURL    https://greasyfork.org/scripts/1771/code.meta.js
// @downloadURL  https://greasyfork.org/scripts/1771/code.user.js

// updateURL     https://userscripts.org/scripts/source/161812.meta.js
// downloadURL   https://userscripts.org/scripts/source/161812.user.js
// @icon         http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version      2014.11.19
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @note         2014-08-19，小幅调整
// @note         2014-07-23，增加新的链接选择器 a[href^="//www.baidu.com/link?url="]
// @note         2014-06-10，放弃原服务器解析的方法，改用 HEAD 方式。
// @note         2014-05-28，增加对百度不刷新页面的支持
// @note         2014-05-24，增加对翻页脚本的支持
// ==/UserScript==


var locationHref = location.href;


function decode(url, target){
    //  原方法，已失效
    // GM_xmlhttpRequest({
    //     method: "GET",
    //     url: 'http://noe132.duapp.com/baidu2.php?url=' + url,
    //     onload: function(response){
    //         var newUrl = response.responseText;
    //         if (!newUrl || newUrl.indexOf('http') != 0) {
    //             return;
    //         }
    //         // console.log('get', newUrl)
    //         target.setAttribute('href', newUrl);
    //     }
    // });

    GM_xmlhttpRequest({
        method: 'HEAD',
        url: url,
        headers: {
            "Referer": locationHref,
        },
        onload: function(response) {
            var newUrl = response.finalUrl;
            // console.log('111', url, newUrl);
            target.setAttribute('href', newUrl);
        }
    });
}

function checkDocument(doc) {
    if (!doc) doc = document;
    var links = doc.querySelectorAll('a[href*="www.baidu.com/link?url="]');
    if (!links) return;

    [].forEach.call(links, function(link){
        // console.log('decode url: ', link.href)
        decode(link.href, link);
    });
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
    observer.observe(watch, {childList: true, subtree: true });
}


checkDocument();

// 添加下一页和不刷新页面的支持
addMutationObserver('#wrapper_wrapper', function(){
    // console.log('元素被添加')
    checkDocument();
});



// 下一页的支持有2种方式（已不准确）
//     0 对 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize、 BaiduMonkeyW 脚本的支，准确、资源消耗相对更小
//     1 对所有脚本都适用，但不准确、消耗相对较大。如果非上面的几个脚本，建议用这个。

// var checkNextPageMethod = 0;

// // 添加下一页的支持
// if (!checkNextPageMethod) {
//  document.addEventListener("GM_AutoPagerizeNextPageLoaded", nextPageLoaded, false);
//  document.addEventListener("Super_preloaderPageLoaded", nextPageLoaded, false);
//  document.addEventListener("bm_NextPageLoaded", nextPageLoaded, false);
// } else {
//  addNextPageObserver();
// }

// var url = location.href;
//
// // 添加不刷新页面的支持
// if (url.match(/^https?:\/\/www\.baidu\.com\/[^#]*($|#wd=)/)) {
//  addMutationObserver('#wrapper_wrapper', function(){
//      // console.log('元素被添加')
//      checkDocument();
//  });
// }

// function onHashchange() {
//  window.removeEventListener('hashchange', onHashchange, false);

//  var url = window.location.href;
//  if (url.indexOf("http://www.baidu.com/#") >= 0) {
//      console.log("redirect to s?");
//      window.location.href = url.replace("http://www.baidu.com/#", "http://www.baidu.com/s?");
//      return;
//  }
// }

// function run() {
//  // 百度搜索 /#wd= 页面重定向到baidu?
//  var url = window.location.href;
//  if (url.indexOf("http://www.baidu.com/#") >= 0) {
//      console.log("redirect to s?");
//      window.location.href = url.replace("http://www.baidu.com/#", "http://www.baidu.com/s?");
//      return;
//  } else if (url == 'http://www.baidu.com/') {
//      console.log('add hashchange Event');
//      window.addEventListener('hashchange', onHashchange, false);
//      return;
//  }

//  addEventListener('DOMContentLoaded', function(){
//      checkDocument();


//  }, false);
// }

// run()


// function nextPageLoaded() {
//     // AutoPagerizeの最後の区切り以降のRangeを取得
//     var sep = document.querySelectorAll('.autopagerize_page_separator, .autopagerize_page_info' + ', .sp-separator'
//         + ', p[id="page"]');
//     sep = sep[sep.length-1];
//     if (!sep) return;
//     var range = document.createRange();
//     if (sep.parentNode.localName == 'td') {
//         range.setStartAfter(sep.parentNode.parentNode);
//         range.setEndAfter(sep.parentNode.parentNode.parentNode);
//     } else {
//         range.setStartAfter(sep);
//         range.setEndAfter(sep.parentNode.lastChild);
//     }

//     checkDocument(range.commonAncestorContainer);
// }

// function addNextPageObserver() {
//     // 创建观察者对象
//     var observer = new MutationObserver(function(mutations){
//         var needAdd = false;
//         for (var i = mutations.length - 1; i >= 0; i--) {
//             if (mutations[i].addedNodes.length) {
//                 needAdd = true;
//                 break;
//             }
//         }

//         if (needAdd) {
//             checkDocument();
//         }
//     });
//     observer.observe(document.body, {childList: true, subtree: true});
// }
