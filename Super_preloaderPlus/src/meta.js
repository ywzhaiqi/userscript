// ==UserScript==
// @name         Super_preloaderPlus_one
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

// @include      http*
// @exclude      http*://mail.google.com/*
// @exclude      http*://maps.google*   
// @exclude      http*://www.google.com/reader*
// @exclude      http*://www.google.com/calendar*
// @exclude      https://docs.google.com/*
// @exclude      http*://app.yinxiang.com/*
// @exclude      http*://www.dropbox.com/*
// @exclude      http*://www.toodledo.com/*
// @exclude      http://cloud.feedly.com/*
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
// ==/UserScript==


// 主要用于 chrome 原生下检查更新，也可用于手动检查更新
var scriptInfo = {
    version: '<%= pkg.version %>',
    updateTime: '<%= grunt.template.today("yyyy/m/d") %>',
    homepageURL: 'https://greasyfork.org/scripts/293-super-preloaderplus-one',
    downloadUrl: 'https://greasyfork.org/scripts/293-super-preloaderplus-one/code/Super_preloaderPlus_one.user.js',
    metaUrl: 'https://greasyfork.org/scripts/293-super-preloaderplus-one/code/Super_preloaderPlus_one.meta.js',
};