// ==UserScript==
// @name         More RSS
// @namespace    https://github.com/ywzhaiqi/
// @version      0.1
// @description  给优酷专辑新增 RSS 让其可订阅。chrome 用户需要安装 rss 检测扩展：RSS Subscription Extension。
// @include      http://i.youku.com/u/*
// @grant        none
// @noframes
// @run-at       document-start
// ==/UserScript==

function $C(name, attr) {
    var el = document.createElement(name);
    if (attr) {
        Object.keys(attr).forEach(function(n) {
            el.setAttribute(n, attr[n]);
        });
    }
    return el;
}

function addRss(url, title) {
	var link = $C('link', {
		rel: "alternate",
		type: "application/rss+xml",
		title: title || 'More RSS',
		href: url
	});

	document.head.appendChild(link);
}

/**
 * 由于运行在 document-start，无法访问完整的 DOM
 */
function init() {
	var url = location.href.replace(/^https?:\/\//, ''),
		host = location.host,
		rss;

	switch(true) {
		case !!url.match(/i\.youku\.com\/u\/(\w+)/):  // http://i.youku.com/u/UNTEzNTY1OTgw
			rss = 'http://www.youku.com/user/rss/id/' + RegExp.$1;
			addRss(rss, document.title);
			break;
	}
}

init();
