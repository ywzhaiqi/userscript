(function(){
// ==UserScript==
// @name           searchEngineJump 简化改进版
// @author         NLF && ywzhaiqi
// @contributor    ted423
// @description    <%= description %>
// @version        <%= version %>
// @namespace      http://userscripts.org/users/NLF
// @homepage       https://github.com/ywzhaiqi/userscript
// homepage       http://userscripts.org/scripts/show/84970

// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @run-at         document-end
// @resource MAIN_CSS        https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/src/res/main.css
// @resource siteData_my     https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/src/res/siteData_my.js
// @resource siteData_simple https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/src/res/siteData_simple.js
// @resource siteData_wenke  https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/src/res/siteData_wenke.js
// @resource ICON_DATA       https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/src/res/iconData.json

<%= includes %>

// ==/UserScript==


'use strict';

var prefs = {
    openInNewTab: false,  // 是否在新页面打开.
    hideEnglineLabel: 2,  // 是否隐藏前几个搜索的文字部分。0：不隐藏，1：根据高度自行判断，2：隐藏
    engineListDataType: 'my',  // 搜索列表的默认类型
    debug: false,
};
