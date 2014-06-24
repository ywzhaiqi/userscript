// ==UserScript==
// @name        Blacklist Blocker Rule
// @description blacklist blocker 规则
// @grant       none
// @require     https://raw.githubusercontent.com/muzuiget/greasemonkey-scripts/master/blacklist_blocker.user.js
// @include     hhttp://www.smzdm.com/*
// @include     hhttp://fx.smzdm.com/*
// @include     http://www.v2ex.com/*
// ==/UserScript==

let rules = [
{
    urls: ['http://www.smzdm.com/', 'http://fx.smzdm.com/'],
    test: false,
    node: '.leftWrap .list[articleid]',
    hide: function(node) {
        // let keywords = ['女', '童'];
        // return node.xcontains('.itemName', keywords);

        // 只看商城
        let mallKeywords = ['亚马逊中国', '京东', '易讯', '苏宁易购'];
        if (!node.xcontains('.mall', mallKeywords)) {
            return true;
        }

        // 过滤物品
        let itemKeywords = [
            // 标签
            '限华东', '限华北', '每日更新', '凑单品','白菜', 
            // 不看
            '洗衣', '洗发', '沐浴', '牙膏', '牙刷', '狗粮', '猫粮',
            // 各种化妆品、洗护、母婴，丧心病狂的多，自己补充吧
        ];
        return node.xcontains('.itemName', itemKeywords);
    }
},
{
    urls: 'http://www.v2ex.com/',
    test: true,
    node: '.cell.item',
    hide: function(node) {
        let keywords = [
            '二手交易', '小米', '红米',
            '如何评价', '如何看待', '怎么评价', '怎么看',
        ];
        return node.xcontains('table', keywords);
    }
},
];

let blocker = BlacklistBlocker(rules);
blocker.run();


// window.addEventListener('scroll', blocker.run);

// add to support AutoPager
addMutationObserver('body', blocker.run);

function addMutationObserver(selector, callback) {
    var watch = document.querySelector(selector);
    if (!watch) return;

    var observer = new MutationObserver(function(mutations){
        var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
        if (nodeAdded) {
            // observer.disconnect();
            // console.log('1111')
            callback();
        }
    });
    observer.observe(watch, {childList: true, subtree: true});
}