// ==UserScript==
// @name        No Auto open ed2k
// @description 在 simplecd 下载页面停止自动弹出 ed2k 下载窗口
// @namespace   https://github.com/ywzhaiqi
// @include     http://simplecd.me/download/*
// @version     1
// @grant       none
// @run-at      document-start
// @note        only firefox
// ==/UserScript==

// Mozilla Firefox
if ('onbeforescriptexecute' in window) {
    window.addEventListener('beforescriptexecute', stopScript, false);
}

function stopScript(e) {
    if (e.target.innerHTML.contains('setTimeout("location.href=')) {
        e.preventDefault();
        e.stopPropagation();
        window.removeEventListener('beforescriptexecute', stopScript, false);
    }
}