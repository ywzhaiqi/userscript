// ==UserScript==
// @name        Qidian Helper
// @namespace   https://github.com/ywzhaiqi
// @version     0.1
// @description 起点中文网的一些简化
// @include     http://www.qidian.com/Default.aspx
// @include     http://read.qidian.com/BookReader/*.aspx
// @grunt       GM_setClipboard
// @require     http://cdn.staticfile.org/zepto/1.1.4/zepto.min.js
// @noframes
// ==/UserScript==

var indexPage = {
    addCopyAllEpubBtn: function () {  // 首页复制全部 epub
        var container = $C('div', {
            style: 'position: fixed; top: 20%; left: 8px; z-index: 9999999999;'
        });

        var btn = $C('a', {
            'href': 'javascript:',
            onclick: function() {
                GM_setClipboard(indexPage.getLinkStr('epub'));
                alert('已成功复制到剪贴板');
            }
        }, '复制 epub');

        container.appendChild(btn);
        document.body.appendChild(container);
    },
    getLinkStr: function(format) {
        var info = {
            '本周强推': '#divStrongNew a.BD1',
            // '上周强推': '#divLastWStrongNewHead a.BD1',
            '月票PK榜': '#divMonthTicketPK a',
            '三江': '#divSJGRecomNew a.BD1'
        };

        var arr = [],
            cache = {};
        Object.keys(info).forEach(function(type) {
            var ret = indexPage.getLinksBySelector(info[type]);
            arr.push(type);
            ret.forEach(function(r) {
                if (cache[r.url]) return;
                cache[r.url] = true;

                arr.push(r.title + '    ' + r[format]);
            });
            arr.push('\n');
        });

        return arr.join('\n');
    },
    getLinksBySelector: function (selector) {
        var links = document.querySelectorAll(selector);

        var result = [];
        for (var i = 0, link, url; i < links.length; i++) {
            link = links[i];
            url = link.href;
            result.push({
                title: link.textContent.trim(),
                url: url,
                txt: url.replace('http://www.qidian.com/Book/', 'http://download.qidian.com/pda/').replace('.aspx', '.txt'),
                epub: url.replace('http://www.qidian.com/Book/', 'http://download.qidian.com/epub/').replace('.aspx', '.epub'),
            });
        }

        return result;
    }
};

var bookReaderPage = {
    clean: function() {  // 把原来需要点击几次下载 epub 改成直接链接形式
        var bookId = location.pathname.match(/\d+/)[0];

        $('a[onclick="ShowBook.ShowPoP.EBookDownloadNew(\'txt\');"]')
                .removeAttr('onclick')
                .attr('href', 'http://download.qidian.com/pda/' + bookId + '.txt');
        $('a[onclick="ShowBook.ShowPoP.EBookDownloadNew(\'epub\');"]')
                .removeAttr('onclick')
                .attr('href', 'http://download.qidian.com/epub/' + bookId + '.epub');
    }
};

function getSelectedLinks() {
    var sel_links = window.getSelection().getRangeAt(0).cloneContents().querySelectorAll('a');
}

function $C() {
    switch(arguments.length) {
        case 1:
            var el = document.createTextNode(arguments[0]);
            break;
        default:
            var el = document.createElement(arguments[0]),
                    args = arguments[1];
            for (var key in args) {
                if (key.indexOf("on") == 0)
                    el.addEventListener(key.substring(2).toLowerCase(), args[key], false);
                else if (",style,accesskey,id,name,src,href,which,for".indexOf("," +
                                 key.toLowerCase()) != -1)
                    el.setAttribute(key, args[key]);
                else if (typeof args[key] != 'undefined')
                    el[key] = args[key];
            }
            if (typeof arguments[2] == "string")
                el.innerHTML = arguments[2];
            else
                for (var i = 2, len = arguments.length; i < len; ++i)
                    el.appendChild(arguments[i]);
    }
    return el;
}

function init() {
    var url = location.href;
    switch(true) {
        case url.indexOf('/Default.aspx') != -1:
            // indexPage.addCopyAllEpubBtn();
            break;
        // case url.indexOf('/Book/') != -1:
        //     break;
        case url.indexOf('/BookReader/') != -1:
            bookReaderPage.clean();
            break;
    }
}

init();
