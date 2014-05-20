// ==UserScript==
// @id             noNoticeTitleFlash
// @name           No noticeTitleFlash on BBS
// @version        1.0
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @description    卡饭论坛去除标题栏闪烁提醒
// @include        http://bbs.kafan.cn/forum*
// @include        http://bbs.kafan.cn/thread*
// @include        http://bbs.ruoren.com/forum*
// @include        http://u.kafan.cn/*
// @include        http://bbs.feng.com/*
// @include        http://game.ali213.net/forum*
// @grant          none
// @run-at         document-end
// ==/UserScript==

(unsafeWindow || window).noticeTitleFlash = function() {};