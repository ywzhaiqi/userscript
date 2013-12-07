// ==UserScript==
// @id             baidupan@ywzhaiqi@gmail.com
// @name           BaiduPanDownloadHelper
// @version        3.5.3
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi@gmail.com
// @description    批量导出百度盘的下载链接
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_setClipboard
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @homepageURL    http://userscripts.org/scripts/show/162138
// @updateURL      http://userscripts.org/scripts/source/162138.meta.js
// @downloadURL    https://userscripts.org/scripts/source/162138.user.js
// @include        *n.baidu.com/share/link*
// @include        *n.baidu.com/s/*
// @include        http*://yun.baidu.com/share/home*
// @include        http*://yun.baidu.com/pcloud/album/info*
// @include        http*://pan.baidu.com/disk/home*
// @exclude        http*://yun.baidu.com/share/home*&view=follow
// @run-at         document-end
// ==/UserScript==

// 参考 BaiduPanMD5Button http://userscripts.org/scripts/show/156906
/**
 * 百度盘代码解析，2013/07/22
 *   文件：yun_home_speed_all.js
 *   函数：performSelectionDownload
 */

var $ = unsafeWindow.jQuery;
var isChrome = !!this.chrome;

var Config = {
    trim_titles: [  // Share Home 标题移除的文字广告
        "[v.BDpan.COM]"
    ],
    aria2_jsonrpc: GM_getValue('aria2_jsonrpc') || 'http://localhost:6800/jsonrpc',
    lineBreak: isChrome ? '\r' : '\n',
    debug: false
};

var TPLS = {
    normal: '{server_filename}' + Config.lineBreak + '{dlink}',
    aria2c: 'aria2c -c -x 10 -s 10 --out "{server_filename}" "{dlink}"',
};

var debug = Config.debug ? console.debug.bind(console) : function() {};

var FileUtils = unsafeWindow.FileUtils,
    Utilities = unsafeWindow.Utilities,
    disk = unsafeWindow.disk,
    Page = unsafeWindow.Page;

var Utils = {
    r1: function(reg, str) {
        var m = str.match(reg);
        return m ? m[1] : null;
    }
};

var App = {
    fetchCount: 0,
    init: function() {
        this.allPageProcessor();

        var path = location.pathname;
        switch (path) {
            case '/share/home':
                // this.shareHomePageProcessor();
                break;
            case '/disk/home':
                this.diskHomePageProcessor();
                break;
            case '/pcloud/album/info':
                this.albumPageProcessor();
                break;
            default:
                if (path === '/share/link' || path.indexOf('/s/') !== -1) {
                    if (document.getElementById('barCmdTransfer')) {
                        // this.shareDirPageProcessor();
                    } else {
                        this.shareOnePageProcessor();
                        this.removeDialog();
                    }
                }
                break;
        }

    },
    allPageProcessor: function() {
        GM_addStyle(Res.panelCSS);

        // 注册菜单
        GM_registerMenuCommand('设置 Aria2 JSON-RPC Path', function(){
            var newPath = prompt('Aria2 JSON-RPC Path', Config.aria2_jsonrpc);
            if (newPath) {
                GM_setValue('aria2_jsonrpc', Config.aria2_jsonrpc = newPath);
            }
        });
    },
    removeDialog: function() {
        // 去掉云管家提示，来自 Crack Url Wait Code Login For Chrome
        unsafeWindow.navigator.__defineGetter__('platform', function(){ return '' });
    },
    shareOnePageProcessor: function() {
        var data = null;

        // 获取链接，文件 viewshare_all.js，函数 _checkDownloadFile，2013-12-2
        var url = disk.api.RestAPI.SHARE_GET_DLINK + "&uk=" + FileUtils.share_uk + "&shareid=" + FileUtils.share_id + "&timestamp=" + FileUtils.share_timestamp + "&sign=" + FileUtils.share_sign;
        var data = { fid_list: "[" + disk.util.ViewShareUtils.fsId + "]" };
        $.post(url, data, function(result) {
            if (result && result.errno == 0 && result.dlink) {
                $('#downFileButtom')
                    .attr({
                        "href": result.dlink
                    })
                    .find('b').css('color', 'red');
                data = result;
            } else {
                console.error(result);
                $('#downFileButtom').click();
            }
        });

        // 增加 YAAW 按钮
        $('<a class="new-dbtn" href="javascript:;" hidefocus="true">')
            .css('padding', '0px 5px')
            .html('YAAW')
            .click(function(){
                if (data) {
                    App.addToYAAW(data);
                } else {
                    App.useToast('正在获取链接，请等待');
                }
            })
            .insertAfter('#downFileButtom');
    },
    shareHomePageProcessor: function() {
        var self = this;

        $('section.flag10-fns').attr('title', '双击复制所有链接')
            [0].addEventListener('dblclick', function(){
                var urls = $.map($('.file-item, .sharegrid-des'), function(elem){
                    var url = $(elem).attr('_link') || $(elem).attr('_href'),
                        title = $(elem).find('div[title], .sharegrid-des-title').attr('title');

                    if (url) {
                        $.map(Config.trim_titles, function(s) { title = title.replace(s, ''); });
                    }

                    return title + Config.lineBreak + url;
                });

                App.copy(urls, false);
            }, false);

        return;

        // 批量保存
        // 分享页面：http://yun.baidu.com/s/1mqxnN，查找 doTransferVideo，doTransferFiles 函数

        var parseDirPath = function(path) {
            return path.substring(path.indexOf(":/") + 1);
        };

        var doTransferVideo = function(urls) {
            var url = urls.shift();
            if (!url) return;

            $.get(url, function(data) {
                var path = Utils.r1(/startTransferVideo\("(.*?)"\)/, data),
                    share_uk = Utils.r1(/FileUtils.share_uk="(.*?)"/, data),  // FileUtils.share_uk
                    share_id = Utils.r1(/FileUtils.share_id="(.*?)"/, data);  // FileUtils.share_id
                
                var postData = {
                    path: "",
                    filelist: $.stringify([parseDirPath(path)]),
                    type: 1
                };

                // disk.api.RestAPI.TRANSFER
                $.post("/share/transfer?channel=chunlei&clienttype=0&web=1" + "&from=" + encodeURIComponent(share_uk) + "&shareid=" + share_id, postData, function(data) {
                    var info = null;
                    try {
                        info = $.parseJSON(data);
                    } catch (C) {
                        info = null;
                    }

                    console.log(info);
                    doTransferVideo(urls);
                });
            });
        };

        setTimeout(function(){
            $('#top_menu_other')
                .attr('id', 'mTransferVideos')
                .html('批量保存')
                .click(function(){
                    var urls = $.map($('.file-item, .sharegrid-des'), function(elem){
                      return $(elem).attr('_link') || $(elem).attr('_href');
                    });
                    doTransferVideo(urls);
                    return false;
                });
        }, 1000); 
    },
    albumPageProcessor: function() {
        var self = this;
        var _mAlbumId, _mUk;

        _mAlbumId = (disk.ui.album.albuminfo && disk.ui.album.albuminfo.album_id) || disk.getParam("album_id");
        _mUk = (disk.ui.album.uinfo && disk.ui.album.uinfo.uk) || disk.getParam("uk") || disk.getParam("query_uk");
        this.API_URL = "/pcloud/album/listfile?album_id=" + _mAlbumId + "&query_uk=" + _mUk + "&start=0" + "&limit=100";

        // 内容由 js 生成
        var clicked = function(e){
            var $quickFileSave = $('#quickFileSave');
            if ($quickFileSave[0]) {
                $('<a class="bbutton" style="margin-left:10px;padding-left:5px;">\
                        <b style="padding-right: 5px;">批量下载</b></a>')
                    .insertAfter($quickFileSave)
                    [0].onclick = function(){
                        self.getList();
                    };
                $('body').unbind('click');
            }
        };
        $('body').bind('click', clicked);
    },
    shareDirPageProcessor: function() {
        var shareId, uk,
            self = this;

        // 添加批量下载按钮
        $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>')
            .appendTo('#file_action_buttons')
            [0].onclick = function(e) {
                self.downloadAll();
            };

        shareId = FileUtils.share_id || disk.getParam['shareid'];
        uk = FileUtils.sysUK || disk.getParam['uk'];
        this.API_URL = '/share/list?channel=chunlei&clienttype=0&web=1&page=1&shareid=' + shareId + '&uk=' + uk;

        // 添加右键 "复制" 菜单
        var observer = new MutationObserver(function(mutations){
           mutations.forEach(function(mutation){
               for (var i = mutation.addedNodes.length - 1; i >= 0; i--) {
                   if(mutation.addedNodes[i].id == "right-context-menu"){
                       self.addRightContextMenu();
                       observer.disconnect();
                   }
               }
           });
        });
        observer.observe(document.body, { childList: true });
    },
    diskHomePageProcessor: function() {  // 个人主页
        var self = this;
        this.API_URL = '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1';

        // 添加批量下载按钮
        $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>')
            .insertAfter('#barCmdDownload')
            [0].onclick = function(e) {
                self.downloadAll();
            };
    },
    downloadAll: function() {
        this.toast = App.useToast("正在获取中，请稍后...", true);
        
        this.getCheckedItems();
    },
    addRightContextMenu: function(){
        var self = this;

        // 右键复制
        $('<li><a href="javascript:;" style="padding-left: 17px; text-align: left; line-height: 22px;">复制</a></li>')
            .appendTo("#right-context-menu")
            .get(0).onclick = function(){
                self.copyDlinks(FileUtils.getListViewCheckedItems());
            };

        // 右键复制 aria2c
        $('<li><a href="javascript:;" style="padding-left: 17px; text-align: left; line-height: 22px;">复制 Aria2</a></li>')
            .appendTo("#right-context-menu")
            .get(0)
                .addEventListener("click", function(){
                    self.copyDlinks(FileUtils.getListViewCheckedItems(), 'aria2c');
                }, false);
    },
    getCheckedItems: function() {
        var fetchURL,
            self = this;

        if (!FileUtils.getListViewCheckedItems) {
            return;
        }

        this.checkedItems = FileUtils.getListViewCheckedItems();
        this.fetchCount = 0;
        this.checkedItems.forEach(function(item) {
            if (parseInt(item.isdir, 10) === 1) {
                self.fetchCount += 1;
                self.getList(item);
            }
        });

        // 没有文件夹的情况
        this.handleResult();
    },
    getList: function(item) {
        var dir, restUrl,
            self = this;

        dir = item && item.path || disk.getParam('dir/path');
        restUrl = this.API_URL + (dir ? '&dir=' + encodeURIComponent(dir) : '');

        debug('获取数据', restUrl);

        $.get(restUrl, function(result) {
            self.fetchCount -= 1;
            if (result && parseInt(result.errno) === 0 && result.list) {
                if (item) {
                    item.children = result.list;
                } else {  // 专辑获取到的结果为 checkedItems
                    self.checkedItems = result.list;
                }
                self.handleResult(result.list);
            } else {
                App.useToast("获取数据出错, " + restUrl);
            }
        });
    },
    handleResult: function(){
        // 全部获取完成
        if(this.fetchCount <= 0){
            debug("全部获取完成", this.checkedItems);
            this.showPanel();
            this.toast.setVisible(false);
        }
    },
    showPanel: function() {
        if (!this.panel) {
            this.panel = this.createPanel();
        } else {
            var linksHTML = this.createDLinksHtml();
            $("#mDownload-links").html(linksHTML);
            this.panel.style.display = "block";
        }
    },
    createPanel: function() {
        var self = this;

        var container = document.createElement("div");
        container.id = "mDownload-container";

        var links_div = document.createElement("div");
        links_div.id = "mDownload-links";
        links_div.innerHTML = this.createDLinksHtml();

        var closeButton = document.createElement("button");
        closeButton.id = "mDownload-close-button";
        closeButton.innerHTML = "关闭";
        closeButton.onclick = function() {
            container.style.display = "none";
        };

        var exportButton = document.createElement("button");
        exportButton.id = "mDownload-export-button";
        exportButton.innerHTML = "导出";
        exportButton.onclick = function() {
            GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(links_div.innerHTML));
        };

        var copyButton = document.createElement("button");
        copyButton.id = "mDownload-copy-button";
        copyButton.innerHTML = "复制";
        copyButton.onclick = function() {
            self.copyDlinks(null);
        };

        var copyAria2Button = document.createElement("button");
        copyAria2Button.id = "mDownload-copy-aria2-button";
        copyAria2Button.innerHTML = "复制 Aria2";
        copyAria2Button.onclick = function() {
            self.copyDlinks(null, 'aria2c');
        };

        var yaawButton = document.createElement("button");
        yaawButton.id = "mDownload-copy-yaaw-button";
        yaawButton.innerHTML = "YAAW";
        yaawButton.onclick = function() {
            self.addToYAAW(self.checkedItems);
        };

        container.appendChild(closeButton);
        container.appendChild(exportButton);
        container.appendChild(copyButton);
        container.appendChild(copyAria2Button);
        container.appendChild(yaawButton);
        container.appendChild(links_div);
        document.body.appendChild(container);

        return container;
    },

    dir_tpl: "<b style='padding-left:{padding_left}'>{server_filename}</b>",
    dlinks_tpl: "<a class='dlinks' href={dlink} style='padding-left:{padding_left}'>{server_filename}</a>",
    createDLinksHtml: function() {
        var self = this,
            htmls = [],
            isAdded = false;
        this.checkedItems.forEach(function(item) {
            item.padding_left = "0px";
            if (parseInt(item.isdir, 10) === 1) {
                htmls.push(template(self.dir_tpl, item));
                
                if (Array.isArray(item.children)) {
                    item.children.forEach(function(i) {
                        i.padding_left = "15px";
                        var tpl = i.dlink ? self.dlinks_tpl : self.dir_tpl;
                        htmls.push(template(tpl, i));
                    });
                }
            } else if (item.dlink) {
                if (!isAdded) {
                    htmls.push("<b>---------------</b>");
                    isAdded = true;
                }
                htmls.push(template(self.dlinks_tpl, item));
            }
        });
        return htmls.join("<br>");
    },
    copyDlinks: function(items, type) {
        items = items || this.checkedItems;

        var tpl = TPLS[type];
        if (!tpl) {
            tpl = TPLS['normal'];
        }

        var arr = [];
        items.forEach(function(item) {
            if (Array.isArray(item.children)) {
                item.children.forEach(function(i) {
                    arr.push(template(tpl, i));
                });
            } else {
                arr.push(template(tpl, item));
            }
        });

        this.copy(arr);
    },
    copy: function(arr, isDlink) {
        if (typeof isDlink == 'undefined') isDlink = true;

        GM_setClipboard(arr.join(Config.lineBreak), 'text');
        App.useToast('已经复制 <b>' + arr.length + '</b> 条' + (isDlink ? '下载' : '') + '链接到剪贴板')
    },
    addToYAAW: function(items){
        var aria2 = new ARIA2(Config.aria2_jsonrpc);

        if (!Array.isArray(items)) {
            items = [items];
        }

        items.forEach(function(item){
            if (!item.dlink && Array.isArray(item.children)) {
                item.children.forEach(function(i){
                    aria2.addUri(i.dlink, {out: i.server_filename});
                });
            } else {
                aria2.addUri(item.dlink, {out: item.server_filename});
            }
        });

        App.useToast('添加中...到YAAW界面查看是否添加成功');
    },
    useToast: function(msg, sticky){
        return Utilities.useToast({
            toastMode: disk.ui.Toast.MODE_CAUTION,
            msg: msg,
            sticky: sticky || false
        });
    }
};

var Res = {
    panelCSS: '\
        #mDownload-container{\
            position: fixed;\
            z-index: 1000;\
            left: 314px;\
            top: 120px;\
            background: white;\
            padding: 10px;\
            border: 1px solid rgb(153, 153, 153);\
            box-shadow: 0px 0px 9px rgb(153, 153, 153);\
        }\
        #mDownload-container button{\
            margin-right: 10px;\
        }\
        #mDownload-links{\
            margin-top: 10px;\
            max-height: 400px;\
            overflow: auto;\
        }\
        #mDownload-links b{\
            color: red;\
        }\
        ',
};

var ARIA2 = (function() {
    var jsonrpc_version = '2.0';

    function get_auth(url) {
        return url.match(/^(?:(?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?(?:\/\/)?(?:([^:@]*(?::[^:@]*)?)?@)?/)[1];
    };

    function request(jsonrpc_path, method, params) {
        var request_obj = {
            jsonrpc: jsonrpc_version,
            method: method,
            id: (new Date()).getTime().toString(),
        };
        if (params) request_obj['params'] = params;

        var auth = get_auth(jsonrpc_path);

        // 用 GM_xmlhttpRequest 防止 NoScript 拦截，用 setTimeout 防止外部无法调用
        setTimeout(function(){
            GM_xmlhttpRequest({
                method: 'POST',
                url: jsonrpc_path + '?tm=' + (new Date()).getTime().toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'Basic ' + btoa(auth)
                },
                data: JSON.stringify(request_obj)
            });
        }, 0);

        // var xhr = new XMLHttpRequest();
        
        // xhr.open("POST", , true);
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        // if (auth) xhr.setRequestHeader("Authorization", "Basic " + btoa(auth));
        // xhr.send(JSON.stringify(request_obj));
    };

    return function(jsonrpc_path) {
        this.jsonrpc_path = jsonrpc_path;
        this.addUri = function(uri, options) {
            request(this.jsonrpc_path, 'aria2.addUri', [
                [uri, ], options
            ]);
        };
        return this;
    }
})();

function template(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
        var keys = key.split('.'),
            value = data[keys.shift()];
        keys.forEach(function(key) {
            value = value[key];
        });
        return (value === null || value === undefined) ? '' : value;
    });
}

App.init();