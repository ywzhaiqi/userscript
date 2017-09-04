// ==UserScript==
// @id             baidupan@ywzhaiqi@gmail.com
// @name           BaiduPanDownloadHelper
// @version        3.4
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
// @include        http://yun.baidu.com/share/home*
// @include        http://yun.baidu.com/pcloud/album/info*
// @include        http://pan.baidu.com/disk/home*
// @exclude        http://yun.baidu.com/share/home*&view=follow
// @run-at         document-end
// ==/UserScript==

/**
 * 测试连接： http://yun.baidu.com/share/home?uk=53993635&view=share#category/type=0
 * 
 * 百度盘代码解析，2013/07/22
 *   文件：yun_home_speed_all.js
 *   函数：performSelectionDownload
 */

var $ = unsafeWindow.jQuery;
var isChrome = !!this.chrome;
var lineBreak = isChrome ? '\r' : '\n';

var Config = {
    aria2_jsonrpc: GM_getValue('aria2_jsonrpc') || 'http://localhost:6800/jsonrpc',
    tpl: {
        normal: '{server_filename}' + lineBreak + '{dlink}',
        aria2c: 'aria2c -c -x 10 -s 10 --out "{server_filename}" "{dlink}"',
        wget: 'wget -c -O "{server_filename}" "{dlink}"',
        idm: 'IDMan /a /f "{server_filename}" /d "{dlink}"',
        aria2_export: '{dlink}\n  out={server_filename}\n  continue=true\n  max-connection-per-server=5\n  split=10\n  parameterized-uri=true\n',
        IDM_export: '<\n{dlink}\n>',
        orbit_export: '{dlink}|{server_filename}',
        eagleget_export: '{\n"fname": "{server_filename}",\n"url": "{dlink}"\n}'
    },
    trim_titles: [  // Share Home 标题移除的文字广告
        "[v.BDpan.COM]"
    ],
    debug: false
};


/* 文件夹结构
参考 http://baike.baidu.com/view/6525582.htm#4_1

<div>
    <dl style="width:175px;zoom:1">
        <dd id="sideToolbar-item-0-1" class="sideCatalog-item1">
            <span></span>
            <a onclick="return false;" href="#1">节目历史</a>
        </dd>
        <dd id="sideToolbar-item-0-2" class="sideCatalog-item1">
        <dd id="sideToolbar-item-0-2_1" class="sideCatalog-item2">
    </dl>
</div>
*/


var copyDlinks = function(items, tpl) {
    var handle = function(i) {
        return template(tpl, i);
    };

    var result = [];
    items.forEach(function(item){
        if (item.dlink) {
            result.push(handle(item));
        } else if (item.children){
            item.children.forEach(function(i){
                result.push(handle(i));
            });
        }
    });

    console.log('-------------------', result);
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
    },
    useToast: function(msg, sticky){  // 百度盘内置函数
        return Utilities.useToast({
            toastMode: disk.ui.Toast.MODE_CAUTION,
            msg: msg,
            sticky: sticky || false
        });
    },
};

var Pan = {
    init: function() {
        this.allPageProcessor();

        var path = location.pathname;
        switch(path) {
            case '/disk/home':           // 个人主页
                diskHomePageProcessor();
                break;
            case '/pcloud/album/info':   // 专辑
                albumPageProcessor();
                break;
            case '/share/home':          // 分享主页
                // shareHomePageProcessor();
                break;
            default:
                if (path === '/share/link' || path.indexOf('/s/') !== -1) {
                    // if (document.getElementById('barCmdTransfer')) {
                    //     shareDirPageProcessor();
                    // } else {
                    //     shareOnePageProcessor();
                    // }
                }
                break;
        }
    },
    allPageProcessor: function() {
        GM_addStyle(Res.panelCSS);

        // 去掉云管家提示，来自 Crack Url Wait Code Login For Chrome
        // unsafeWindow.navigator.__defineGetter__('platform', function(){ return '' });

        // 注册菜单
        GM_registerMenuCommand('设置 Aria2 JSON-RPC Path', function(){
            var newPath = prompt('Aria2 JSON-RPC Path', Config.aria2_jsonrpc);
            if (newPath) {
                GM_setValue('aria2_jsonrpc', Config.aria2_jsonrpc = newPath);
            }
        });
    },
    diskHomePageProcessor: function() {
        var self = this;
        this.API_URL = '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1';

        // 添加批量下载按钮
        $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>')
            .insertAfter('#barCmdDownload')
            [0].onclick = function(e) {
                self.batchDown();
            };
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
                $('body').unbind('click', clicked);
            }
        };
        $('body').bind('click', clicked);
    },
    fetchCount: 0,
    batchDown: function() {
        var self = this;
        var toast = Utils.useToast("正在获取中，请稍后...", true);

        var list = []
        if (FileUtils.getListViewCheckedItems) {
            list = FileUtils.getListViewCheckedItems();
        }
        
        list.forEach(function(item) {
            if (parseInt(item.isdir, 10) === 1) {
                self.fetchCount += 1;
                self.getList(item.path, item);
            }
        });
    },
    getList: function(dir, item) {
        var restUrl,
            self = this;

        dir = dir || disk.getParam('dir/path');
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
                Utils.useToast("获取数据出错, " + restUrl);
            }
        });
    },
    
}

var Pan = {
    fetchCount: 0,


    shareHomePageProcessor: function() {
        return;

        var self = this;

        $('section.flag10-fns').attr('title', '双击复制所有链接')
            [0].addEventListener('dblclick', function(){
                var urls = $.map($('.file-item, .sharegrid-des'), function(elem){
                    var url = $(elem).attr('_link') || $(elem).attr('_href'),
                        title = $(elem).find('div[title], .sharegrid-des-title').attr('title');

                    if (url) {
                        $.map(Config.trim_titles, function(s) { title = title.replace(s, ''); });
                    }

                    return title + lineBreak + url;
                });

                Pan.copy(urls, false);
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
    shareOnePageProcessor: function() {
        var data = null;

        // 获取链接，文件 viewshare_all.js，函数 checkDownloadFile
        var G = {uk: FileUtils.share_uk,shareid: FileUtils.share_id,fid_list: "[" + disk.util.ViewShareUtils.fsId + "]"};
        $.getJSON(disk.api.RestAPI.normalize(disk.api.RestAPI.SHARE_GET_DLINK, FileUtils.bdstoken), G, function(result) {
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
                    Pan.addToYAAW(data);
                } else {
                    Pan.useToast('正在获取链接，请等待');
                }
            })
            .insertAfter('#downFileButtom');

        return;

        var $button = $('#downFileButtom');
        $button.clone()
            .attr({ id: 'batchDownButton', href: 'javascript:;' })
            .insertAfter($button)
            .find('b')
                .html('批量下载');

        $('<div id="m_batch_getbtn">')
            .css('cssText', 'position: absolute; top:24px; left:0; border:1px #6FB2F3 solid; background:#fff; width:115px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:2px 2px 3px #ddd;-webkit-box-shadow:2px 2px 3px #ddd;')
            .html('<a id="m_batch_copy" href="javascript:;">复制</a>' +
                '<a id="m_batch_copyAria2" href="javascript:;">复制 Aria2</a>' +
                '<a id="m_batch_yaaw" href="javascript:;">YAAW</a>')
            .appendTo($button.parent())
            .get(0).addEventListener('click', function(e){
                console.debug('------', e.target.id)
                // switch(e.target.id){

                // }
            }, false);
    },
    shareDirPageProcessor: function() {
        var shareId, uk,
            self = this;

        var clicked = function(){
            var fid_list = [];
            var checkedItems = FileUtils.getListViewCheckedItems();
            checkedItems.forEach(function(item){
                if (parseInt(item.isdir, 10) != 1) {
                    fid_list.push(item.fs_id);
                }
            });

            self.getDlink(fid_list[0], function(result){
                console.log(result);
            });
        };

        // 添加批量下载按钮
        $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>')
            .appendTo('#file_action_buttons')
            [0].onclick = clicked;

        // // 添加右键 "复制" 菜单
        // var observer = new MutationObserver(function(mutations){
        //    mutations.forEach(function(mutation){
        //        for (var i = mutation.addedNodes.length - 1; i >= 0; i--) {
        //            if(mutation.addedNodes[i].id == "right-context-menu"){
        //                self.addRightContextMenu();
        //                observer.disconnect();
        //            }
        //        }
        //    });
        // });
        // observer.observe(document.body, { childList: true });
    },
    getDlink: function(fs_id, callback){
        var data = {
            shareId: FileUtils.share_id || disk.getParam['shareid'],
            uk: FileUtils.sysUK || disk.getParam['uk'],
            fid_list: [fs_id],
            nozip: 1
        };

        var F = function(C, A) {
            D._showDownloadVCodeDialog(_, K, C, A, B, E);
        };
        var netError = function(){
            var t = disk.Context.getService(disk.Context.SERVICE_TOAST);
            t.setMessage(disk.ui.Toast.MODE_FAILURE, "网络错误");
            t.setVisible(true, false);
        };

        $.getJSON('/share/download', data, function(_) {
            console.log('---------', _);
            return;
            if (_) {
                if (_.errno == 0) {
                    if (_.dlink) {
                        callback(_.dlink);
                    } else {
                        if (_.list)
                            callback(_.list);
                        else
                            netError();
                    }
                } else {
                    if (_.errno == -19 && _.img && _.vcode) {
                        F(_.img, _.vcode);
                    } else {
                        netError();
                    }
                }
            } else {
                netError();
            }
        });
    },
    downloadAll: function() {
        this.toast = Pan.useToast("正在获取中，请稍后...", true);
        
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
        copyAria2Button.innerHTML = "复制 Aria2c";
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

        var tpl = Config['tpl_' + type];
        if (!tpl) {
            tpl = Config.tpl_normal;
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

        GM_setClipboard(arr.join(lineBreak), 'text');
        Pan.useToast('已经复制 <b>' + arr.length + '</b> 条' + (isDlink ? '下载' : '') + '链接到剪贴板')
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

        Pan.useToast('添加中...到YAAW界面查看是否添加成功');
    },
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
    exportor: {
        '复制链接': function(items){
            copyDlinks(items, Config.tpl.normal);
        },
        'Aria2': function(items) {
            copyDlinks(items, Config.tpl.aria2c);
        },
        'wget': function(items) {
        },
        'IDM': function(items) {

        },
        'YAAW': function(items) {

        },
        'Aria2导出': function(items) {

        },
        'IDM导出': function(items) {

        },
        'Orbit导出': function(items) {

        },
    }
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

Pan.init();