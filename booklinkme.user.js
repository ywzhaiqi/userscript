// ==UserScript==
// @id             booklinkme@ywzhaiqi@gmail.com
// @name           My booklink.me 增强
// @version        2.0
// @author         ywzhaiqi@gmail.com
// @description    首页一键打开所有未读链接
// @include        *://booklink.me/*
// @include        *://m.booklink.me/*
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @connect        www.lwxs520.com
// @run-at         document-end
// ==/UserScript==

var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

function addStyle(css) {
    var heads = document.getElementsByTagName('head');
    if (heads.length > 0) {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.innerHTML = css;
        heads[0].appendChild(node);
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
    } catch (ex) { }

    return nodes;
}

function GM_request(url, opt = {}) {
    return new Promise((resolve, reject) => {
        opt = Object.assign(opt, {
            method: "GET",
            url,
            onload: function (response) {
                resolve(response.responseText)
            }
        });

        GM_xmlhttpRequest(opt);
    })
}

var Config = {
    clickedColor: "666666",
};

var CSS = ".mclicked {color: #666666} ";

// booklink.me 隐藏符合文字的链接
function hideChapterLink(selector, textReg) {
    var links = document.querySelectorAll(selector),
        link;
    for (var i = links.length - 1; i >= 0; i--) {
        link = links[i];
        if (textReg.test(link.innerHTML)) {
            link.style.color = "rgba(128, 128, 128, 0.54)";
        }
    }
}

var pc = {
    init: function () {
        addStyle(CSS);

        // this.addUnreadButton();

        // if (location.pathname == "/charpter.php") {
        //     // 隐藏排版较差的站点
        //     hideChapterLink(
        //         "body > div > table > tbody > tr > td > table > tbody > tr > td > a > font",
        //         new RegExp([
        //             '读读看',  // 比较差
        //         ].join('|')),
        //     );
        // }
    },
    // 添加一键打开所有未读链接
    addUnreadButton: function () {
        var appendElem = $x("//td[text()='未读']")[0];
        if (!appendElem) return;

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
    openAllUnreadLinks: function (event) {
        event.preventDefault();

        var links = $x('./ancestor::table[@width="100%"]/descendant::a[img[@alt="未读"]]', event.target);
        links.forEach(function (link) {
            // 忽略没有盗版的
            var chapterLink = link.parentNode.nextSibling.nextSibling.querySelector('a');
            if (chapterLink.querySelector('font[color="800000"]')) {
                return;
            }

            if (isFirefox)
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
    init: function () {
        addStyle(CSS);

        this.setClickColor();

        this.addUnreadButton();

        // if (location.pathname === "/charpter.php") {
        //     /**
        //      * 手机端隐藏图片、排版较差的站点
        //      */
        //     hideChapterLink(
        //         ".hla a font",
        //         new RegExp([
        //             '啃书\(图\)', '来书屋', '浩奇',  // 可能为图片章节
        //             '读读看', '哈哈', '92to',  // 下一页有问题的
        //         ].join('|')),
        //     );
        // }
    },
    setClickColor: function () {
        var links = $x("//span[contains(text(), '未读')]");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                link.className = "mclicked";
            }, false);
        });
    },
    addUnreadButton: function () {
        var mainElem = $x('//li[text()="主书架"]')[0];
        if (!mainElem) return;

        var unReadLinks = $x('id("m_main")/ul[1]//span[contains(text(), "未读")]');
        if (unReadLinks.length == 0) return;

        var openAllBtn = document.createElement("a");
        openAllBtn.href = "javascript:void(0)"
        openAllBtn.style.color = "red";
        openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)";
        var openOneLink = function () {
            var link = unReadLinks.pop().parentNode;
            link.setAttribute("target", "_blank");
            link.click()
            link.className = "mclicked";
            if (unReadLinks.length == 0) {
                openAllBtn.parentNode.removeChild(openAllBtn)
            } else {
                openAllBtn.innerHTML = "(" + unReadLinks.length + "未读)"
            }
        };
        openAllBtn.addEventListener("click", function () {
            for (var i = 0; i < 4; i++) {
                openOneLink()
            }

            // openAllBtn.style.color = "#666666";
        }, false);

        mainElem.appendChild(openAllBtn);
    }
};

class BookPage {
    init() {
        switch (location.pathname) {
            case '/book-1-1009272444.html':  // 维秘女模的经纪人：内容错误
                // const newUrl = 'http://www.wangshuge.com/books/109/109265/';
                let newUrl = 'http://www.wutuxs.com/html/7/7221/'

                this.insertToFirst(newUrl, '我的补充')
                break;
            case '/book-10-3146622.html':  // 重生在跑道上：内容只有乐文是正确的
                let newIndexUrl = 'http://www.lwxs520.com/books/74/74985/index.html'

                // insertToFirst(newIndexUrl, '乐文目录')
                this.getAndInsertFirst(newIndexUrl)
                break;
        }
    }

    insertToFirst(newUrl, text) {
        var firstLink = $x('//font[text()="补充链接"]/..')[0];
        firstLink.insertAdjacentHTML('beforebegin', `
        <a href="${newUrl}" target="_blank" style="margin-right: 3px;">
            <font color="red">${text}</font>
        </a>`)
        return firstLink
    }

    async getAndInsertFirst(url) {
        let html = await GM_request(url);
        var doc = new DOMParser().parseFromString(html, 'text/html')

        if (url.includes('www.lwxs520.com')) {
            var chapters = $x('//div[@class="dccss"]/a', doc);
            var lastChapter = chapters[chapters.length - 1];

            this.insertToFirst(url, lastChapter.textContent)
        }
    }
}

function run() {
    switch (location.hostname) {
        case "booklink.me":
            pc.init();

            new BookPage().init()
            break;
        case "m.booklink.me":
            // mobile.init();
            break;
    }
}

run()
