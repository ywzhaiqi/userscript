// ==UserScript==
// @name         Kindle人助手
// @namespace    https://github.com/ywzhaiqi
// @version      2015.2.15
// @description  kindle人论坛增加排序功能，自动给查看的帖子链接着色
// @include      http://kindleren.com/*
// @include      http://kandouren.com/forum.php*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// @require  http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// ==/UserScript==

var tidLinkSelector = [
    '#portal_block_51_content a',  // 首页的本日最热
    '#threadlist a.xst',  // 精品区、分享区的条目
    '.fl_by a.xi2',  // 这个页面的最新回帖 http://kandouren.com/forum.php?gid=49
].join(', ');

var ns = {
    init: function() {
        // if (location.search.indexOf('mod=forumdisplay') == -1) return;

        this.tidHash = this.getTidHash();

        GM_addStyle('.gm-exists { color: green !important; }');

        this.hightlight();
        document.addEventListener('Super_preloaderPageLoaded', this.hightlight.bind(this), false);

        $('body').on('mousedown', tidLinkSelector, function(event) {
            var $this = $(this);
            if ($this.hasClass('gm-exists')) return;

            $this.addClass('gm-exists');
            ns.addTid($this.attr('href'));
        });

        ns.addSortButton();

        if (location.search.indexOf('mod=viewthread&tid=') != -1) {
            ns.addTid(location.href);
        }

        GM_registerMenuCommand('导入kindle人tid', ns.importTids);
    },
    hightlight: function () {
        $(tidLinkSelector).each(function() {
            var $this = $(this);
            if ($this.hasClass('gm-exists')) return;

            var tid = ns.getTidFromUrl($this.attr('href'));
            if (tid in ns.tidHash) {
                $this.addClass('gm-exists');
            }
        })
    },
    addSortButton: function() {
        if (location.search.indexOf('fid=50') !== -1) {
            $('<li></li>')
                .html('分类: <a class="creator">自制/自购</a>' + '<span class="pipe">|</span>' +
                    '<a class="bookType">内容分类</a>')
                .appendTo('.pop_moremenu')
                .click(ns.sortByType)

        } else if (location.search.indexOf('fid=54') !== -1) {  // 求书版块
            $('<span>')
                .css('cursor', 'pointer')
                .text('按悬赏金额排序')
                .click(ns.sortByMonkey)
                .insertAfter('#filter_dateline')
        }
    },
    importTids: function() {
        while(true) {
            var data = prompt('请输入要导入的 json 数据');

            var arr;
            try {
                // arr = JSON.parse(data);
                arr = eval(data);
            } catch(ex) {}

            if (!Array.isArray(arr)) {
                alert('导入的数据有误，请重新导入');
                continue;
            }

            ns.addTid(arr);

            alert('已导入 ' + arr.length + ' 条数据');
            break;
        }
    },
    exportTids: function() {
        var tidHash = ns.getTidHash();
        var tids = Object.keys(tidHash);
        saveAs(tids, 'kindleren_tids.json');
    },
    exportUnDownBooks: function() {
        var books = {};
        jQuery('.bn50book_ds_item').each(function() {
            var $this = jQuery(this);
            if ($this.find('.gm-exists').size()) return;

            var link = $this.find('.xst'),
                linkTitle = link.text(),
                url = link.attr('href');

            var creatInfo = $this.find('.booklistinfo > em:first()').text();
            if (!(creatInfo in books))
                books[creatInfo] = [];

            books[creatInfo].push({
                title: ns.getBookTitle(linkTitle),
                oTitle: linkTitle,
                url: url,
                tid: ns.getTidFromUrl(url),
                type: $this.find('.booklistinfo > em:last()').text().replace(/\[|\]/g, '')
            });
        });

        if (Object.keys(books).length) {
            saveAs(JSON.stringify(books, null, 4), 'kindlerenToDownload.json');
            console.log('已成功复制');
        } else {
            console.log('没有需要下载的');
        }
    },

    // 功能区
    sortByType: function(event) {   // 把表格按照类型排序
        if (event.target.nodeName !== 'A') return;
        event.stopPropagation();
        event.preventDefault();

        var sortType = event.target.className;
        var getBookType = function(tbody) {
            if (sortType == 'creator')
                return $(tbody).find('.common em:first() > a').text();

            if (sortType == 'bookType') {
                // 排除 azw 等类别
                var links = jQuery(tbody).find('.common em > a').toArray();
                for (var i = links.length - 1, text; i >= 0; i--) {
                    text = $(links[i]).text();
                    if (!text.match(/\w/)) {
                        return text;
                    }
                }
            }
        };

        var tbodyHash = { header: [] };

        // 不和下面的合并，是因为这样支持多个，让翻页脚本可用
        jQuery('#threadlisttableid > tbody[id^="normalthread_"]').each(function() {
            var type = getBookType(this);
            if (!type) {
                tbodyHash.header.push(this);
                return;
            }

            if (!(type in tbodyHash)) {
                tbodyHash[type] = [];
            }
            tbodyHash[type].push(this);
        });

        // 重新排列
        var $table = jQuery('#threadlisttableid');
        jQuery.each(tbodyHash, function(type, tbodyArr) {
            tbodyArr.forEach(function(el) {
                $table.append(el);
            });
        });
    },
    sortByMonkey: function() {
        var tbodyHash = { header: [] };

        // 这样支持多个，让翻页脚本可用
        jQuery('#threadlisttableid > tbody').each(function() {
            var monkey = jQuery(this).find('.xw1').text();
            if (!monkey) {
                tbodyHash.header.push(this);
                return;
            }

            if (!(monkey in tbodyHash)) {
                tbodyHash[monkey] = [];
            }
            tbodyHash[monkey].push(this);
        });

        // 插入
        var $table = jQuery('#threadlisttableid');
        Object.keys(tbodyHash).reverse().forEach(function(monkey) {
            tbodyHash[monkey].forEach(function(el) {
                $table.append(el);
            });
        });
    },

    // tid 区
    addTid: function(urlOrArr) {
        if (!Array.isArray(urlOrArr))
            urlOrArr = [urlOrArr];

        // 先判断是否已经存在
        var tids = [];
        urlOrArr.forEach(function(url) {
            if (isObject(url))
                url = url.url;

            var tid = ns.getTidFromUrl(url);
            if (!(tid in ns.tidHash))
                tids.push(tid);
        });

        if (tids.length) {
            // 获取最新的
            var tidHash = ns.getTidHash();
            tids.forEach(function(tid) {
                tidHash[tid] = true;
            });

            ns.saveTidHash(tidHash);
        }
    },
    getTidHash: function() {
        return JSON.parse(GM_getValue('tidHash', '[]'))
    },
    saveTidHash: function(tidHash) {
        tidHash = tidHash || ns.tidHash;
        GM_setValue('tidHash', JSON.stringify(tidHash));
    },

    // 工具区
    getTidFromUrl: function (url) {
        var m = url.match(/&tid=(\d+)/i);
        return m ? m[1] : url;
    },
    getBookTitle: function(str) {  // 从论坛列表中获取简短的标题
        var match = str.match(/《(.*?)》/);
        if (match) {
            return match[1];
        } else {
            return str.replace(/(作者：|\(|（|。|\[Kindle电子书\]).*$/, '').trim()
        }
    }
};

function isObject(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
}

function saveAs(data, filename) {
    if(!filename) filename = 'console.json'

    if (typeof data == 'object') {
        data = JSON.stringify(data);
    }

    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    var saveas = document.createElement('a');
    saveas.href = url;
    saveas.style.display = 'none';
    document.body.appendChild(saveas);
    saveas.download = filename;
    saveas.click();
    setTimeout(function() {
        saveas.parentNode.removeChild(saveas);
    }, 1000)
    document.addEventListener('unload', function() {
        window.URL.revokeObjectURL(url);
    });
}


ns.init();
