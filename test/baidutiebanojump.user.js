// ==UserScript==
// @id             BaiduTiebaNoJump
// @name           去除百度贴吧链接的跳转
// @version        1.0
// @namespace      
// @author         ywzhaiqi
// @description    去除百度贴吧链接的跳转，支持 Super_preloaderPlus_one、AutoPagerize、uAutoPagerize
// @include        http://tieba.baidu.com/p/*
// @run-at         document-end
// ==/UserScript==

function removeLinks(doc) {
	var links = doc.querySelectorAll('a[href^="http://jump.bdimg.com/safecheck/"]');
	if (!links) return;
	[].forEach.call(links, function(link){
	    link.setAttribute('href', link.textContent);
	});
}

function nextPageLoaded() {
	// AutoPagerizeの最後の区切り以降のRangeを取得
	var sep = document.querySelectorAll('.autopagerize_page_separator, .autopagerize_page_info, .sp-separator');
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

	removeLinks(range.commonAncestorContainer);
}


removeLinks(document);

document.addEventListener("GM_AutoPagerizeNextPageLoaded", nextPageLoaded, false);
document.addEventListener("Super_preloaderPageLoaded", nextPageLoaded, false);