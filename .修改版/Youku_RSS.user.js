// ==UserScript==
// @name           Youku RSS
// @version        2014.8.14
// version        0.2.2
// @namespace      https://userscripts.org/users/256199
// @author         NightsoN
// @description    在视频空间和专辑页面添加RSS订阅链接
// @include        http://u.youku.com/user_show/*
// @include        http://i.youku.com/u/*
// @include        http://www.youku.com/playlist_show/*
// @icon           http://youku.com/favicon.ico
// @grant          none
// ==/UserScript==

/*
    http://www.youku.com/show_page/id_z6939e1f4c08611e38b3f.html
    这个网址怎么得到 RSS 订阅地址？
 */

var locationHref = location.host + location.pathname;
var rssImg = 'data:image/png;base64,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';

if (locationHref.match(/u\.youku\.com\/user_show\//)){
	document.getElementById("spaceUrl").insertAdjacentHTML('afterend',
        '<a class="pLinkCopy fPLink" href="http://www.youku.com/user/rss/id/' + window.userId + '")">订阅</a>');
} else if (locationHref.match(/i\.youku\.com\/u\//)){
	// http://i.youku.com/u/UNTEzNTY1OTgw
    var html = '<li>' +
        '<a target="_blank" href="http://www.youku.com/user/rss/id/' + (window.to_user_id || window.ownerEncodeid) + '">' +
            '<img class="ico" src="' + rssImg + '" />' +
        '</a></li>';
    document.querySelector(".share-list > ul").insertAdjacentHTML('afterbegin', html);
} else if (locationHref.match(/www\.youku\.com\/playlist_show\//)){
	document.querySelector('.listsub .handle').insertAdjacentHTML('beforeend',
        '<a>&nbsp|&nbsp</a><a href="' + document.querySelector('link[rel="alternate"]').href + '">RSS订阅</a>');
}