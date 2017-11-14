// ==UserScript==
// @name        My GM_xhr 外置
// @namespace   ywzhaiqi@gmail.com
// @version     0.4
// @description  暴露 GM_xmlhttpRequest 给外部用
// @include      *://y.guten.me/*
// @include      *://ywzhaiqi.gitee.io/*
// @include      *://localhost*
// @include      *://192.168.1.*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @connect      *
// @note         Greasemonkey 下无效
// ==/UserScript==

unsafeWindow.GM_xmlhttpRequest = GM_xmlhttpRequest
console.log('已暴露 GM_xmlhttpRequest')