// ==UserScript==
// @name         Baidu 百度搜索反跳转（修改版）
// @namespace    noe132
// @modified     ywzhaiqi
// @include      http://www.baidu.com/*
// updateURL     https://userscripts.org/scripts/source/161812.meta.js
// downloadURL   https://userscripts.org/scripts/source/161812.user.js
// @icon	     http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version      1.2.1
// @run-at       document-start
// @note         2014-5-24，添加支持翻页脚本
// ==/UserScript==

// 下一页的支持有2种方式
//     0 对 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize、 BaiduMonkeyW 脚本的支，准确、资源消耗相对更小
//     1 对所有脚本都适用，但不准确、消耗相对较大。如果非上面的几个脚本，建议用这个。
var checkNextPageMethod = 0;

function decode(url,target){
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://noe132.duapp.com/baidu2.php?url=' + url,
		onload: function(response){
			var newUrl = response.responseText;
			if (!newUrl || newUrl.indexOf('http') != 0) {
				return;
			}
			// console.log(newUrl)
			target.setAttribute('href', newUrl);
		}
	});
}

function checkDocument(doc) {
	if (!doc) doc = document;
	var links = doc.querySelectorAll('a[href^="http://www.baidu.com/link?url="]');
	if (!links) return;
	[].forEach.call(links, function(link){
		// console.log('decode url: ', link.href)
		decode(link.href, link);
	});
}

function nextPageLoaded() {
	// AutoPagerizeの最後の区切り以降のRangeを取得
	var sep = document.querySelectorAll('.autopagerize_page_separator, .autopagerize_page_info' + ', .sp-separator'
		+ ', p[id="page"]');
	sep = sep[sep.length-1];
	if (!sep) return;
	var range = document.createRange();
	if (sep.parentNode.localName == 'td') {
	    range.setStartAfter(sep.parentNode.parentNode);
	    range.setEndAfter(sep.parentNode.parentNode.parentNode);
	} else {
	    range.setStartAfter(sep);
	    range.setEndAfter(sep.parentNode.lastChild);
	}

	checkDocument(range.commonAncestorContainer);
}

function addObserver() {
	// 创建观察者对象
	var observer = new MutationObserver(function(mutations){
		var needAdd = false;
		for (var i = mutations.length - 1; i >= 0; i--) {
			if (mutations[i].addedNodes.length) {
				needAdd = true;
				break;
			}
		}

	    if (needAdd) {
	        checkDocument();
	    }
	});
	observer.observe(document.body, {childList: true, subtree: true});
}

function onHashchange() {
	window.removeEventListener('hashchange', onHashchange, false);

	var url = window.location.href;
	if (url.indexOf("http://www.baidu.com/#") >= 0) {
		console.log("redirect to s?");
		window.location.href = url.replace("http://www.baidu.com/#", "http://www.baidu.com/s?");
		return;
	}
}

function run() {
	// 百度搜索 /#wd= 页面重定向到baidu?
	var url = window.location.href;
	if (url.indexOf("http://www.baidu.com/#") >= 0) {
		console.log("redirect to s?");
		window.location.href = url.replace("http://www.baidu.com/#", "http://www.baidu.com/s?");
		return;
	} else if (url == 'http://www.baidu.com/') {
		console.log('add hashchange Event');
		window.addEventListener('hashchange', onHashchange, false);
		return;
	}

	addEventListener('DOMContentLoaded', function(){
		checkDocument();

		if (!checkNextPageMethod) {
			document.addEventListener("GM_AutoPagerizeNextPageLoaded", nextPageLoaded, false);
			document.addEventListener("Super_preloaderPageLoaded", nextPageLoaded, false);
			document.addEventListener("bm_NextPageLoaded", nextPageLoaded, false);
		} else {
			addObserver();
		}
	}, false);
}

run()
