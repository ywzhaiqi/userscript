// ==UserScript==
// @id             noNoticeTitleFlash
// @name           No noticeTitleFlash on BBS
// @version        1.0
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @description    卡饭论坛去除标题栏闪烁提醒
// @include        http://bbs.kafan.cn/forum*
// @include        http://bbs.ruoren.com/forum*
// @include        http://bbs.kafan.cn/thread*
// @grant          none
// @run-at         document-end
// ==/UserScript==

unsafeWindow.noticeTitleFlash = function() {};