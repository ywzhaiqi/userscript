// ==UserScript==
// @name         kindle人自动下载
// @namespace    https://github.com/ywzhaiqi
// @author       ywzhaiqi
// @version      0.1
// @description  kindleren 帖子增加 "下载" 按钮，点击后自动回复或购买，然后下载
// @include      http://kindleren.com/forum.php?mod=viewthread&tid=*
// @include      http://kandouren.com/forum.php?mod=viewthread&tid=*
// @include      http://kandouren.com/thread-*-1-1.html
// @grant        GM_addStyle
// @grant        GM_download
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

        var buyAzw3 = btns.filter(function() {
                return checkNodeIsAzw3.call(this, '.locked');
            })[0];

        // if (!buyAzw3)
        //     alert('不存在 azw3');

        return buyAzw3;
    },
    getDownBtn: function () {  // 点击查看按钮，点击后弹出许多盘下载界面
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
            .css('cssText', 'position: fixed; right: 50%; top: 58%; margin-right: -365px; z-index: 200;')
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
                jQuery('#postmessage').val('感谢分享');
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
    autoDownload: function () {  // 自动点击许多书按钮下载
        var xuduoshuViewBtn = ns.getDownBtn();
        // xuduoshuViewBtn.removeAttribute('onclick');

        var downUrl = xuduoshuViewBtn.getAttribute('url').replace('/view/', '/download/');
        // location.href = downUrl.replace('http://', 'idm://');
        // window.close();
        location.href = downUrl;
        document.title = '【已下载】' + document.title
        // alert('已下载')

        // xuduoshuViewBtn.click();

        // // 找到 azw3 的条目
        // .click();

        // waitForSelector('iframe[src^="http://xuduoshu.com/ajax_view"]', function() {
        //     // 在 iframe 里面，跨域无权访问 document
        //     console.log('下载面板已经弹出');
        // });
    }
};

ns.init();
