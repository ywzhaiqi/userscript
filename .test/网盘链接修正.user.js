// ==UserScript==
// @name         网盘链接修正
// @namespace    https://github.com/ywzhaiqi/
// @version      0.1
// @description  替换贴吧的360云盘的链接
// @match        http://tieba.baidu.com/p/*
// @grant        none
// @copyright    2012+, You
// ==/UserScript==

switch(location.host) {
    case 'tieba.baidu.com':
        setTimeout(function() {
            yunpan('#j_p_postlist');

            addMutationObserver('#j_p_postlist', function(mutations) {
                console.log('111')
                for (var i = 0; i < mutations.length; i++) {
                    [].forEach.call(mutations[i].addedNodes, yunpan)
                }
            });
        }, 1000);
        break;
}

function yunpan(selector) {  // 360 云盘
    var elem = (typeof selector == 'string') ? document.querySelector(selector) : selector;
    if (!elem) return;

    var patt = /(?:https?:\/\/)?yunp?.*?p?an.*?\/([^\/]*?)\s*提取码[\s:：]*(\w{4})/ig;
    elem.innerHTML = elem.innerHTML.replace(patt, function(str, p1, p2) {
        p1= (p1.match(/\w+/) || [])[0];
        var url = "http://yunpan.cn/$1#$2"
                .replace('$1', p1)
                .replace('$2', p2)
                .replace(/<[^>]+>/g, '')
                .replace(/删/g, '');
        return str + '<br/><a href="' + url + '">' + url + '</a>';
    });
}

function copyLinks() {  // 复制链接，仅用于 chrome 命令行
    var urls = $('a[href^="http://yunpan.cn/"]').map(function(i, link) {
        return link.href;
    }).toArray();
    copy(urls.join('\n'));
}

function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(callback);
    observer.observe(watch, {childList: true, subtree: true});
}
