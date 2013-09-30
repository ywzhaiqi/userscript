// ==UserScript==
// @id             smzdm@ywzhaiqi@gmail.com
// @name           smzdm 去除返利链接
// @version        1.4
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @grant          none
// @include        http://www.smzdm.com/*
// @updateURL      https://userscripts.org/scripts/source/177969.meta.js
// @downloadURL    https://userscripts.org/scripts/source/177969.user.js
// @run-at         document-end
// ==/UserScript==

(function (){
    var win = this["unsafeWindow"] || window;
    var $ = win.jQuery;

    checkLinks(document);

    fixAutoPager();

    function checkLinks(context){
        var links = $("div[id^='buy_url_'] a", context);
        if(!links.length) return;

        links.each(function(i, link){
            var url = link.href;
            if(url.indexOf("www.smzdm.com/go") == -1){
                return;
            }

            $.get(url, function(data){
                var m = data.match(/href\s*=\s*'(.*)'/);
                if(m){
                    var realUrl = m[1];
                    // 取得后面一个链接
                    m = realUrl.match(/http.*(http.*?)$/);
                    if(m && m[1]){
                        realUrl = decodeURIComponent(decodeURIComponent(m[1]));
                    }

                    $(link).attr({
                        "href": handleUrl(realUrl),
                        "old-href": url
                    });
                }
            });
        });
    }

    function fixAutoPager(){
        var target = document.querySelector("#content");
        if(!target) return;

        var observer = new MutationObserver(function(mutations){
            mutations.forEach(function(mutation){
                $.each(mutation.addedNodes, function(){
                    checkLinks(this);
                });
            });
        });

        observer.observe(target, { childList: true });
    }

    function handleUrl(url) {
        if(url.indexOf("http://item.yixun.com") != -1){
            return url.split("&")[0];
        }else if(url.indexOf("http://www.amazon") != -1){
            // 匹配 /dp/b003uscj1c/ 和 /dp/B002NTMHU2? 和 /gp/product/B004INIS7C/
            var newUrl = url.match(/.*\/(?:dp|gp\/product)\/[^\/]+[\/?]/);
            if(newUrl){
                newUrl = newUrl[0];
            }else{
                newUrl = url.match(/^(.*www\.amazon\.[^\/]+)\/.*&asin=([^&]+)/);
                if(newUrl){
                    newUrl = newUrl[1] + "/dp/" + newUrl[2];
                }
            }

            if(!newUrl){
                newUrl = url.replace(/&m=[^&]+/, "");
            }

            return newUrl;
        }

        return url;
    }

    function test_amazon(){
        var urls = [
            "http://www.amazon.cn/mn/detailApp/ref=as_li_ss_tl?t=joyo01y-23&_encoding=UTF8&linkCode=as2&asin=B004OBZFF6&camp=536&creative=3132&creativeASIN=B004OBZFF6&tag=joyo01y-23",

            "http://www.amazon.com/gp/product/B004INIS7C/ref=as_li_ss_tl?t=joyo01y-20&ie=UTF8&linkCode=as2&camp=217145&creative=399369&creativeASIN=B004INIS7C&tag=joyo01y-20",
            "http://www.amazon.cn/Wilson-%E5%A8%81%E5%B0%94%E8%83%9C-BLX-Force-%E7%BE%BD%E6%AF%9B%E7%90%83%E6%8B%8D-WRT8001102-%E4%B8%AD%E6%80%A7-%E7%BA%A2-%E7%99%BD-%E9%BB%91/dp/B00DSFT9JW/ref=wl_it_dp_o_pd_nS_nC?t=joyo01y-23&ie=UTF8&colid=3FQ4JMFNPRKEK&coliid=I394NEJYT1ZB41&tag=joyo01y-23",
            "http://www.amazon.cn/AKG-K44-V2-%E5%A4%B4%E6%88%B4%E5%BC%8F%E8%80%B3%E6%9C%BA-%E5%A3%B0%E9%9F%B3%E5%AE%9A%E4%BD%8D%E5%87%86%E7%A1%AE-%E8%88%92%E5%B1%95%E5%BE%97%E4%BD%93-%E9%AB%98%E8%A7%A3%E6%9E%90%E5%BA%A6-%E6%97%A0%E9%9F%B3%E6%9F%93-%E4%BD%8E%E9%A2%91%E9%9C%87%E6%92%BC%E5%BC%BA%E5%8A%B2/dp/B007CFRONW/ref=sr_1_2?t=joyo01y-23&ie=UTF8&qid=1380283033&sr=8-2&keywords=AKG+K44&tag=joyo01y-23",
            "http://www.amazon.cn/dp/b003uscj1c/?t=joyo01y-23&tag=joyo01y-23",
            "http://www.amazon.com/dp/B002NTMHU2?t=joyo01y-20&tag=joyo01y-20",
            "http://www.amazon.co.jp/dp/B0058G3WGK/?t=joyo010b-22&tag=joyo010b-22",
            "http://www.amazon.com/ECCO-Clayton-Plain-Toe-Tie/dp/B008MC0K1W/ref=sr_1_1?t=joyo01y-20&s=shoes&ie=UTF8&qid=1380273126&sr=1-1&tag=joyo01y-20"
        ];

        urls.forEach(function(url){
            console.log(handleUrl(url));
        });
    }
})();