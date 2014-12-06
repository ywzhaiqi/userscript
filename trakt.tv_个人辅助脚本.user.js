// ==UserScript==
// @name        trakt.tv 个人辅助脚本
// @namespace   https://github.com/ywzhaiqi
// @include     http://trakt.tv/calendar/my-shows*
// @include     https://trakt.tv/calendar/my-shows*
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://cdn.staticfile.org/zepto/1.1.4/zepto.min.js
// ==/UserScript==

// 优先的类别
var enableType = 'yyxz';

// 无法在线播放的规则
var rules = {
    'criminal minds': {
        name: '犯罪心理',
        // 存在在线播放的地址
        yyets: 'http://www.yyets.com/resource/11003',
        yyxz: 'http://www.yayaxz.com/resource/11003'
    },
    'hawaii five0': {
        name: '天堂执法者',
        yyets: 'http://www.yyets.com/resource/10998',
        yyxz: 'http://www.yayaxz.com/resource/10998'
    },
    'castle 2009': {
        name: '灵书妙探',
        yyets: 'http://www.yyets.com/resource/10996',
        yyxz: 'http://www.yayaxz.com/resource/10996',
    },
    'the big bang theory': {
        name: '生活大爆炸',
        yyets: 'http://www.yyets.com/resource/11005',
        yyxz: 'http://www.yayaxz.com/resource/11005'
    },
    'the voice us': {
        name: '美国之声',
    },
    'marvels agents of shield': {
        name: '神盾局特工',
    },
    'arrow': {
        name: '绿箭侠'
    },
    'the amazing race': {
        name: '极速前进',
        sohu: 'http://tv.sohu.com/item/MTE5NDU1NA==.html',
    },
    'ncis': {
        name: '海军罪案调查处',
        yyets: 'http://www.yyets.com/resource/11001',
        yyxz: 'http://www.yayaxz.com/resource/11001'
    },
    '2 broke girls': {
        name: '破产姐妹'
    },
    'elementary': {
        name: '基本演绎法'
    },
    'white collar': {
        name: '妙警贼探',
    },
    'one piece': {
        name: '海贼王',
    }
};

var ns = {
    init: function() {
        ns.run();
    },
    run: function() {
        $('a[href^="/show/"]').each(ns.addLink);
    },
    addLink: function(i, link) {
        var $link = $(link);
            url = $link.attr('href');

        var match = url.match(/\/show\/(.*?)\/season/);
        if (!match) {
            console.error('无法从链接中找到电视剧的名称：%s', url);
            return;
        }

        var name = match[1].replace(/-/g, ' ');
        var info = ns.getInfo(name);

        $('<a>').attr({
            href: info.url,
            title: info.title,
            target: '_blank'
        }).text(info.text).appendTo($link.prev());
    },
    getInfo: function(name) {
        var url, text, title;
        var rule = rules[name];
        if (rule) {
            name = rule.name;

            // 如果有优先的先选择优先的，否则选择第一个
            var keys = Object.keys(rule);
            keys.splice(keys.indexOf('name'), 1);
            var key = (keys.indexOf(enableType) != -1) ? enableType : keys[0];

            url = rule[key];
            text = key;
            title = url;
        }

        if (!url) {
            url = 'http://www.soku.com/v?keyword=' + name;
        }

        return {
            url: url,
            text: text || 'sk',
            title: title || '搜库'
        };
    }
};

ns.init();
