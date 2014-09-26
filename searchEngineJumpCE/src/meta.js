(function(){
// ==UserScript==
// @name           searchEngineJump 简化改进版
// @author         NLF && ywzhaiqi
// @contributor    ted423
// @description    方便的在各个引擎之间跳转。NLF 修改版，仅适用于 Greasemonkey 或 Tampermonkey 或暴力猴。
// @version        <%= version %>
// version        4.0.1.0
// @created        2011-7-2
// @namespace      http://userscripts.org/users/NLF
// @homepage       https://github.com/ywzhaiqi/userscript
// homepage       http://userscripts.org/scripts/show/84970
// downloadURL    https://userscripts.org/scripts/source/84970.user.js
// updateURL      https://userscripts.org/scripts/source/84970.meta.js
// include        *
// match          *://*/*

// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @noframes

<%= includes %>

// ==/UserScript==


'use strict';

var prefs = {
    openInNewTab: false,  // 是否在新页面打开.
    hideEnglineLabel: 2,  // 是否隐藏前几个搜索的文字部分。0：不隐藏，1：根据高度自行判断，2：隐藏

    debug: false,
};