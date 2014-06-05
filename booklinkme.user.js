// ==UserScript==
// @id             booklinkme@ywzhaiqi@gmail.com
// @name           booklink.me 增强
// @version        1.9
// @author         ywzhaiqi@gmail.com
// @description    首页一键打开所有未读链接
// @updataURL      https://userscripts.org/scripts/source/165572.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165572.user.js
// @include        http://booklink.me/*
// @include        http://m.booklink.me/*
// @include        http://gate.baidu.com/tc?from=opentc&src=*
// @grant          GM_openInTab
// @run-at         document-end
// ==/UserScript==

var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

(function(){

    var Config = {
        clickedColor: "666666",
    };

    var CSS = ".mclicked {color: #666666} ";

    var pc = {
        init: function(){
            addStyle(CSS);

            this.addUnreadButton();

            if(location.pathname == "/charpter.php"){
                // 隐藏js、排版较差的站点
                // hideChapterLink(
                //  "div table tbody tr td table tbody tr td a",
                //  // /淘梅儿|读读看/
                // );
            }
        },
        // 添加一键打开所有未读链接
        addUnreadButton: function(){
            var appendElem = $x("//td[text()='未读']")[0];
            if(!appendElem) return;

            var linkBtn = document.createElement("a");
            linkBtn.href = "javascript:void(0)";
            linkBtn.title = "一键打开所有未读链接";
            linkBtn.addEventListener("click", this.openAllUnreadLinks, false);

            var imgBtn = document.createElement("img");
            imgBtn.src = "me.png";
            imgBtn.style.maxWidth = "20px";

            linkBtn.appendChild(imgBtn);
            appendElem.appendChild(linkBtn);
            appendElem.style.width = "auto";
        },
        openAllUnreadLinks: function(event){
            event.preventDefault();

            var links = $x('./ancestor::table[@width="100%"]/descendant::a[img[@alt="未读"]]', event.target);
            links.forEach(function(link){
                // 忽略没有盗版的
                var chapterLink = link.parentNode.nextSibling.nextSibling.querySelector('a');
                if (chapterLink.querySelector('font[color="800000"]')) {
                    return;
                }

                if(isFirefox)
                    link.click();
                else
                    GM_openInTab(link.href);

                // 设置点击后的样式
                // 未读左边的 1x 链接
                link.parentNode.previousSibling.querySelector('font').setAttribute('color', Config.clickedColor);
                chapterLink.classList.add('mclicked');
            });
        }
    };

    var mobile = {

        init: function(){
            addStyle(CSS);

            this.setClickColor();

            this.addUnreadButton();

            if(location.pathname === "/charpter.php"){
                /**
                 * 手机端隐藏图片、排版较差的站点
                 *     1、图片章节：书迷楼、啃书(图)、来书屋、浩奇
                 *     2、暂时没法加载下一页：读读看、哈哈、92to
                 */
                hideChapterLink(
                    ".hla a",
                    /来书屋|浩奇|奇书屋|啃书\(图\)|淘梅儿|读读看|哈哈|92to/
                );
            }
        },
        setClickColor: function(){
            var links = $x("//span[contains(text(), '未读')]");
            links.forEach(function(link){
                link.addEventListener("click", function(){
                    link.className = "mclicked";
                }, false);
            });
        },
        addUnreadButton: function(){
            var mainElem = $x('//li[text()="主书架"]')[0];
            if(!mainElem) return;

            var unReadLinks = $x('id("m_main")/ul[1]//span[contains(text(), "未读")]');
            if(unReadLinks.length == 0) return;

            var openAllBtn = document.createElement("a");
            openAllBtn.href = "javascript:void(0)"
            openAllBtn.style.color = "red";
            openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
            var openOneLink = function(){
                var link = unReadLinks.pop().parentNode;
                link.setAttribute("target", "_blank");
                link.click()
                link.className = "mclicked";
                if(unReadLinks.length == 0){
                    openAllBtn.parentNode.removeChild(openAllBtn)
                }else{
                    openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)"
                }
            };
            openAllBtn.addEventListener("click", function(){
                for (var i = 0; i < 4; i++) {
                    openOneLink()
                }

                // openAllBtn.style.color = "#666666";
            }, false);

            mainElem.appendChild(openAllBtn);
        }
    };


    switch(location.hostname){
        case "booklink.me":
            pc.init();
            break;
        case "m.booklink.me":
            mobile.init();
            break;
        case "gate.baidu.com":
            // 隐藏百度转码底部的广告
            addStyle('\
                #footer div[style] {\
                    display:none !important;\
                }'
            );
            break;
    }



    // booklink.me 隐藏符合文字的链接
    function hideChapterLink(selector, textReg) {
        var links = document.querySelectorAll(selector),
            link;
        for (var i = links.length - 1; i >= 0; i--) {
            link = links[i];
            if(textReg.test(link.innerHTML)){
                link.style.display = "none";
            }
        }
    }

    function $x(aXPath, aContext) {
        var nodes = [];
        var doc = document;
        var aContext = aContext || doc;

        try {
            var results = doc.evaluate(aXPath, aContext, null,
                XPathResult.ANY_TYPE, null);
            var node;
            while (node = results.iterateNext()) {
                nodes.push(node);
            }
        } catch (ex) {}

        return nodes;
    }

    function addStyle(css) {
        var heads = document.getElementsByTagName('head');
        if (heads.length > 0) {
            var node = document.createElement('style');
            node.type = 'text/css';
            node.innerHTML = css;
            heads[0].appendChild(node);
        }
    }

})();



