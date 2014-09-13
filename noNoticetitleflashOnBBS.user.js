// ==UserScript==
// @id             noNoticeTitleFlash
// @name           No noticeTitleFlash on BBS
// @version        1.3
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @description    卡饭论坛去除标题栏闪烁提醒

// @include        http://bbs.kafan.cn/thread*
// @include        http://bbs.ruoren.com/*
// @include        http://u.kafan.cn/*
// @include        http://bbs.feng.com/*
// @include        http://game.ali213.net/*
// Discuz论坛列表
// @include       /^https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:2b\/)?(?:(?:forum)|(?:showforum)|(?:viewforum)|(?:forumdisplay))+/
// @include       /https?:\/\/(?:www\.[^\/]+\/|[^\/]+\/(?:bbs\/)?)(?:2b\/)?(?:(?:thread)|(?:viewthread)|(?:showtopic)|(?:viewtopic))+/

// @grant          none
// @run-at         document-start
// @noframes
// ==/UserScript==


wait(
    function(){ return 'noticeTitleFlash' in window; },
    function() {
        window.noticeTitleFlash = function(){};
    }
);

/*
    wait(
      function(){ return count==0; },
      function(){ alert('allfound'); }
    );
*/
function wait(check, callback){
    if (check()) callback()
    else window.setTimeout(wait, 300, check, callback);
}