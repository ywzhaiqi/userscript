// ==UserScript==
// @id             itpub.net@ywzhaiqi@gmail.com
// @name           itpub.net下载助手
// @version        1.1
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi@gmail.com
// @description    ITPUB论坛 - 电子图书与IT文档资料无需登入直接下载
// @include        http://www.itpub.net/thread*
// @include        http://www.itpub.net/forum.php*
// @run-at         document-end
// ==/UserScript==

var links = document.querySelectorAll('a[href^="attachment.php?aid="]');

for(var i=0, l=links.length; i < l; i++){
    var link = links[i];
    link.href = link.href.replace('attachment.php?', 'forum.php?mod=attachment&');
    link.target = "";
}