// ==UserScript==
// @name         Soku No Redirect
// @namespace    https://github.com/ywzhaiqi/
// @version      0.1
// @description  重定向搜库搜索的网址到最终地址
// @match        http://www.soku.com/search/redirect.html?playSite=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var match = location.href.match(/url=(.*?)&/);
if (match) {
	location.href = match[1];
}