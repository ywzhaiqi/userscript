// ==UserScript==
// @name         kindle人自动下载
// @namespace    https://github.com/ywzhaiqi
// @author       ywzhaiqi
// @version      0.2
// @description  kindleren 帖子增加 "下载" 按钮，点击后自动回复或购买，然后下载
// @include      http://kindleren.com/forum.php?mod=viewthread&tid=*
// @include      http://kandouren.com/forum.php?mod=viewthread&tid=*
// @include      http://kandouren.com/thread-*-1-1.html
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @noframes
// ==/UserScript==

if (typeof unsafeWindow !== 'undefined') {
    var $ = jQuery = unsafeWindow.jQuery;
}

function waitFor(testFx, callback) {
    var timeId = setInterval(function() {
        if (testFx()) {
            clearInterval(timeId);
            callback();
        }
    }, 500);
}

function waitForSelector(selector, then) {
    waitFor(function _check() {
        return document.querySelector(selector);
    }, then);
}

function getParam(name, url) {
    var regexp = new RegExp("(?:^|\\?|#|&)" + name + "=([^&#]*)(?:$|&|#)", "i"),
        matches = regexp.exec(url || location.href);
    return matches ? decodeURIComponent(matches[1]) : ""
}

function parseHTML(html) {
    var doc;
    try {
        // firefox and chrome 30+，Opera 12 会报错
        doc = new DOMParser().parseFromString(html, 'text/html');
    } catch (ex) {}
    if (!doc) {
        doc = document.implementation.createHTMLDocument("");
        doc.querySelector('html').innerHTML = html;
    }
    return doc;
}

function checkNodeIsAzw3(selector) {
    var div = jQuery(this).closest(selector);
    if (div.prev().text().indexOf('.azw3') != -1)
        return true;
    if (div[0] && div[0].previousSibling.textContent.indexOf('.azw3') != -1)
        return true;

    var node = div.prev()[0] && div.prev()[0].previousSibling;
    if (node)
        return node.textContent.indexOf('.azw3') > 0;
}

var ns = {
    get buyBtn() {
        var btns = jQuery('.viewpay');
        if (btns.size() == 1)
            return btns[0];

        var buyAzw3 = btns.filter(function() { return checkNodeIsAzw3.call(this, '.locked'); })[0];
        return buyAzw3;
    },
    getDownBtn: function () {  // 点击查看按钮，点击后弹出许多盘下载界面
        var link = jQuery('.showhide a').filter(function() { return jQuery(this).text().match(/\.azw3$/) });
        if (link.size()) {
            ns.autoDownload(link.href);
            return;
        }

        var btns = jQuery('.xuduoshu_ajaxview');
        if (btns.size() == 1)
            return btns[0];

        return btns.filter(function() {
                    return checkNodeIsAzw3.call(this, '.showhide');
                })[0];
    },
    getXuDownBtn: function() {  // 许多书下载界面按钮
        return jQuery('a[href^="/download/"]')[0];
    },

    init: function() {
        if (location.href.indexOf('autosave') > 0) {
            switch(location.host) {
                case 'kindleren.com':
                case 'kandouren.com':
                    ns.autoBuy();
                    break;
            }
        } else {
            this.addDownBtn();
        }
    },
    addDownBtn: function() {
        $('<button>')
            .text('下载')
            .css('cssText', 'position: fixed; right: 50%; top: 52%; margin-right: -365px; z-index: 200;')
            .insertAfter('#side_reply')
            .click(function() {
                ns.autoBuy();
            });
    },
    autoBuy: function () {
        if (ns.getDownBtn()) {
            ns.autoDownload();
            return;
        }

        // 检查是否有回复
        var lockedReply = jQuery('.locked a:contains(回复)');
        if (lockedReply.size()) {
            lockedReply.click();
            waitForSelector('#postmessage', function() {
                jQuery('#postmessage').val('感谢分享，谢谢！！！');
                jQuery('#postsubmit').click();

                waitFor(ns.getDownBtn, ns.autoDownload)
            });
        } else {
            ns.buyBtn.click();
            var paySubmit = '#payform #paysubmit';
            waitForSelector(paySubmit, function() {
                jQuery(paySubmit).click();

                waitFor(ns.getDownBtn, ns.autoDownload);
            })
        }
    },
    autoDownload: function (downUrl) {  // 自动点击许多书按钮下载
        if (downUrl) {
            ns.download(downUrl);
        } else {
            var xuduoshuViewBtn = ns.getDownBtn();
            var viewUrl = xuduoshuViewBtn.getAttribute('url').replace("view","ajax_view");
            ns.downFromXuDuoShu(viewUrl);
        }
    },
    downFromXuDuoShu: function(viewUrl) {
        console.log('GM_xmlhttpRequest ', viewUrl)
        GM_xmlhttpRequest({
            method: "GET",
            url: viewUrl,
            onload: function(response) {
                var doc = parseHTML(response.responseText);
                var link = doc.getElementById('download_file_link');
                var dUrl = 'http://xuduoshu.com' + link.getAttribute('href');
                ns.download(dUrl);
            }
        });
    },
    download: function(downUrl) {
        location.href = downUrl;
        document.title = '【已下载】' + document.title
    }
};

ns.init();
