// ==UserScript==
// @Name  配合网盘密码自动提取，融合链接与提取码
// @namespace  panlink.jasonshaw
// @version    0.1
// @description  自动处理网盘链接及其提取码变成支持自动填充密码的方式的链接（百度云、360pan等）
// @include      *
// @Note         支持百度网盘
// @run-at       document-end
// @Copyright  2014+, jasonshaw
// ==/UserScript==
(function(){
    var prefs = {
        pan:['http://pan.baidu.com/s/',/\s*(提取密碼|提取密码|提取码|提取碼|提取|密碼|密码)[:：]?\s*([0-9a-zA-Z]{4,})\s*/],//第一个参数定义链接类型，后续紧跟着的提取码之类的前缀提示符
        yunpan:['http://yunpan.cn/',/\s*(提取密碼|提取密码|提取码|提取碼|提取|密碼|密码)[:：]?\s*([0-9a-zA-Z]{4,})\s*/],
    };
    var panlinks,r = null,i,pN;
    for (var key in prefs) {
        panlinks = document.querySelectorAll('a[href^="'+prefs[key][0]+'"]'),i=0;
        while(panlinks[i]){
            pN = panlinks[i].parentNode.innerHTML;
            r = pN.match(prefs[key][1]);
            if(r!=null) panlinks[i].href += '#'+r[2];
            else {
                pN = panlinks[i].parentNode.parentNode.innerHTML;
                r = pN.match(prefs[key][1]);
                if(r!=null) panlinks[i].href += '#'+r[2];
            }
            i++;
        }
    }
})();