// ==UserScript==
// @name         <%= pkg.name %>
// @namespace    https://github.com/ywzhaiqi
// @description  预读+翻页..全加速你的浏览体验...
// @author       ywzhaiqi && NLF(原作者)
// @version      <%= pkg.version %>
// @homepageURL  https://greasyfork.org/scripts/293-super-preloaderplus-one

// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
//  Tampermonkey 下有时候会运行在 document-start ???
// @run-at       document-end

// @include      http://*
// @include      https://*
// @exclude      http*://mail.google.com/*
// @exclude      http*://maps.google*
// @exclude      http*://www.google.com/reader*
// @exclude      http*://www.google.com/calendar*
// @exclude      https://docs.google.com/*
// @exclude      http*://app.yinxiang.com/*
// @exclude      http*://www.dropbox.com/*
// @exclude      http*://www.toodledo.com/*
// @exclude      http://cloud.feedly.com/*
// @exclude      http*://www.inoreader.com/*
// @exclude      http://weibo.com/*
// @exclude      http://w.qq.com/*
// @exclude      http://web2.qq.com/*
// @exclude      http://openapi.qzone.qq.com/*
// @exclude      http://*cloud.vip.xunlei.com/*
// @exclude      http*://www.wumii.com/*
// @exclude      http://pan.baidu.com/*
// @exclude      http://yun.baidu.com/*
// @exclude      http://www.cnbeta.com/*
// @exclude      http://www.youku.com/
// @exclude      http://v.youku.com/*
// @exclude      http://www.iqiyi.com/*

// 在 iframe 中禁用
// @exclude     https://cn.bing.com/rms/*
// ==/UserScript==
