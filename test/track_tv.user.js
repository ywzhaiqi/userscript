// ==UserScript==
// @name        track tv
// @namespace   https://github.com/ywzhaiqi
// @include     http://www.yyets.com/*
// @include     http://my.tv.sohu.com/user/subscribe/list.do
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==


(function(){

    var TV_ALIAS = {
        "打工姐妹花": "破产姐妹",
        "罪恶黑名单": "黑名单",
        "福尔摩斯：演绎法": "福尔摩斯：基本演绎法",
    };

    underscroe();

    var locationHref = location.href;
    switch(true){
        // 更改链接为 美剧频道 链接
        case locationHref == "http://my.tv.sohu.com/user/subscribe/list.do":
            $("#_gnav > li").eq(1).find("a").html("美剧频道").attr("href", "http://tv.sohu.com/drama/us/");
            break;
        case location.hostname == "www.yyets.com":
            GM_addStyle('\
                #hxhd_taobao { display:none; }\
                .newToWatch strong{ color: red; }');
            yyets();
            // if (locationHref.indexOf('http://www.yyets.com/user/fav') != -1) {

            // }
            if (location.pathname.indexOf('/resource/') != -1) {
                // 资源页面增加百度盘搜索
                $('.download').each(function(){
                    var $this = $(this);
                    if ($this.find('a:contains("百度")').length == 0) {
                        var title = $this.find('a[thunderrestitle]').attr('thunderrestitle');
                        title = title.replace('.x264-YYeTs人人影视', '');
                        var searchUrl = 'http://www.baidu.com/s?wd=site:pan.baidu.com+' + title;
                        $('<a target="_blank">').html('百度盘').attr('href', searchUrl).appendTo($this);
                    }
                });
            }
            break;
    }

    function yyets(){
        var oldList = GM_getValue("yyets");
        oldList = oldList ? JSON.parse(oldList) : [];

        var newList = parseInfo(document),
            changedCount = 0,
            $listParentNode = $(".u_d_list");

        oldList.forEach(function(item){
            var changedItem = _.find(newList, function(newItem){
                return newItem.title == item.title && newItem.section != item.section;
            });

            if(changedItem){
                changedItem.state = "new";
                changedCount += 1;

                $(changedItem.target)
                    .addClass("newToWatch")
                    .parent()
                        .prependTo($listParentNode);
            }
        });


        var tempList = newList.length ? newList : oldList,
            updateHTML = changedCount ? "更新" + changedCount + "部" : "无更新";
        $(".top_log_news")
            .html("共" + tempList.length + "部，<span style='color:red'>" + updateHTML + "</span>")
            .attr('title', '左键复制，右键更新数据')
            .mousedown(function(e){
                e.preventDefault();
                switch (e.button) {
                    case 0:
                        GM_setClipboard(JSON.stringify(tempList));
                        alert("复制数据成功");
                        break;
                    case 2:
                        GM_setValue("yyets", JSON.stringify(newList));
                        $(this).find('span').removeAttr('style').html('');
                        return false;
                        break;
                }
            });

        // save value
        if (newList.length) {
            newList.forEach(function(i){ delete i.target; });
        }

        // $.get("http://www.yyets.com/user/fav?type=tv", function(data) {

        // });

        function parseInfo(doc){
            var list = [];
            var nodes = doc.querySelectorAll(".resourcelist");
            var desc, m;
            for (var i = 0; i < nodes.length; i++) {
                desc = nodes[i].querySelector(".desc").textContent;
                m = desc.match(/S\d{2}E\d{2}|第.{1,2}季(?:更新)?第.{1,2}集/);

                if (m) {
                    list.push({
                        target: nodes[i],
                        title: nodes[i].querySelector("h2 strong").textContent.replace(/【.剧】/, ""),
                        url: nodes[i].querySelector("h2 a").href,
                        section: m[0].replace('更新', '')
                    });
                }
            }
            return list;
        }
    }

    // 自造简化版 underscroe 库，仅 ECMAScript 5
    function underscroe(){
        var root = window;

        // Create a safe reference to the Underscore object for use below.
        var _ = function(obj){
            if(obj instanceof _) return obj;
            if(!(this instanceof _)) return new _(obj);
            this._wrapped = obj;
        };

        root._ = _;

        // Return the first value which passes a truth test. Aliased as `detect`.
        _.find = function(obj, iterator, context){
            var result;
            obj.some(function(value, index, array){
                if(iterator.call(context, value, index, array)){
                    result = value;
                    return true;
                }
            });
            return result;
        };
    }

    function parseHTML(responseText) {
        var doc = new DOMParser().parseFromString(responseText, "text/html");
        if (!doc) {
            doc = document.implementation.createHTMLDocument("");
            doc.querySelector("html").innerHTML = responseText;
        }
        return doc;
    }

})()




var siteInfos = [
    {name: "人人影视",
        enable: true,
        url: "http://www.yyets.com/*",
        insertIntoDoc: {
            target: ".top_log_news",
            where: "replace"
        },
        checkUpdate: function(){

        }
    }
];


// init();


function init(){

    underscroe();

    var C = console,
        locationHref = location.href;

    // 判断站点
    var matchedRule = _.find(siteInfos, function(i){
        if(toRE(i.url).test(locationHref))
            return true;
    });

    if(!matchedRule) {
        C.error('没有找到匹配的规则，退出。');
        return;
    }

    if(!matchedRule.enable){
        C.error('规则被禁用了', matchedRule);
        return;
    }

    C.log('找到规则:', matchedRule);

    matchedRule.checkUpdate();
}


function toRE(obj) {
    if (obj instanceof RegExp) {
        return obj;
    } else if (obj instanceof Array) {
        return new RegExp(obj[0], obj[1]);
    } else {
        obj = wildcardToRegExpStr(obj);
        return new RegExp(obj);
    }
}

function wildcardToRegExpStr(urlstr) {
    if (urlstr.source) return urlstr.source;
    var reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
        return str === "*" ? ".*" : "[^/]*";
    });
    return "^" + reg + "$";
}