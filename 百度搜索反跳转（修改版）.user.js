// ==UserScript==
// @name        Baidu 百度搜索反跳转（修改版）
// @namespace   noe132
// @include     http://www.baidu.com/*
// updateURL      https://userscripts.org/scripts/source/161812.meta.js
// downloadURL    https://userscripts.org/scripts/source/161812.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version     1.2.1
// @note        2014-5-24，添加支持翻页脚本
// ==/UserScript==

function decode(url,target){
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://noe132.duapp.com/baidu2.php?url=' + url,
		onload: function(response){
			target.href = response.responseText;
		}
	});
}

function checkDocument() {
	var links = document.querySelectorAll('a[href^="http://www.baidu.com/link?url="]');
	if (!links) return;
	[].forEach.call(links, function(link){
		decode(link.href, link);
	});
}


checkDocument();

// 创建观察者对象
var observer = new MutationObserver(function(mutations){
	var needAdd = false;
	for (var i = mutations.length - 1; i >= 0; i--) {
		if (mutations[i].addedNodes.length) {
			needAdd = true;
		}
	}

    if (needAdd) {
        checkDocument();
    }
});
observer.observe(document.body, {childList: true, subtree: true});