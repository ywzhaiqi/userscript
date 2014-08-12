// ==UserScript==
// @name           Youku RSS
// @version        2014.8.12
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

if (locationHref.match(/u\.youku\.com\/user_show\//)){
	document.getElementById("spaceUrl").insertAdjacentHTML('afterend',
        '<a class="pLinkCopy fPLink" href="http://www.youku.com/user/rss/id/' + window.userId + '")">订阅</a>');
} else if (locationHref.match(/i\.youku\.com\/u\//)){
	// http://i.youku.com/u/UNTEzNTY1OTgw
    document.querySelector(".share-list > ul").insertAdjacentHTML('afterbegin',
        '<li><a target="_blank" href="http://www.youku.com/user/rss/id/' + window.to_user_id + '">RSS订阅</a></li>');
} else if (locationHref.match(/www\.youku\.com\/playlist_show\//)){
	document.querySelector('.listsub .handle').insertAdjacentHTML('beforeend',
        '<a>&nbsp|&nbsp</a><a href="' + document.querySelector('link[rel="alternate"]').href + '">RSS订阅</a>');
}