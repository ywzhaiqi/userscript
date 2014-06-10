// ==UserScript==
// @name           RedirectBaidu
// @version        2014.06.08
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @description    百度搜索重定向到 s?wd=
// @include        http://www.baidu.com/*
// ==/UserScript==


// 百度搜索 /#wd= 页面重定向到baidu?
 var url = window.location.href;

 if (url.indexOf('#wd=')) {
    redirect();
} else if (url == 'http://www.baidu.com/') {
    console.log('add hashchange Event');
    window.addEventListener('hashchange', function(){
        // window.removeEventListener('hashchange', onHashchange, false);
        redirect();
    }, false);
}

function redirect() {
    if (url.indexOf('#wd=')) {
        console.log('redirect to s?');
        window.location.href = url.replace(/^(https?):\/\/www.baidu.com\/[^#]*#wd=/, '$1://www.baidu.com/s?wd=');
    }
}