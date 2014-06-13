// ==UserScript==
// @id             baidupan@ywzhaiqi@gmail.com
// @name           BaiduPanDownloadHelper
// @version        3.6.5
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
// @grant          GM_deleteValue
// homepageURL     http://userscripts.org/scripts/show/162138
// updateURL       http://userscripts.org/scripts/source/162138.meta.js
// downloadURL     http://userscripts.org/scripts/source/162138.user.js

// @homepageURL    https://greasyfork.org/scripts/294/
// @updateURL      https://greasyfork.org/scripts/294/code.meta.js
// @downloadURL    https://greasyfork.org/scripts/294/code.user.js
// @require        http://code.jquery.com/jquery-2.1.1.min.js

// @include        http*://yun.baidu.com/share/link*
// @include        http*://pan.baidu.com/share/link*
// @include        http*://yun.baidu.com/s/*
// @include        http*://pan.baidu.com/s/*
// @include        http*://yun.baidu.com/share/home*
// @include        http*://yun.baidu.com/pcloud/album/info*
// @include        http*://yun.baidu.com/pcloud/album/file*
// @include        http*://pan.baidu.com/disk/home*
// @include        http*://yun.baidu.com/share/init?*
// @include        http*://pan.baidu.com/share/init?*
// @exclude        http*://yun.baidu.com/share/home*&view=follow
// @run-at         document-end
// ==/UserScript==

// 参考 BaiduPanMD5Button http://userscripts.org/scripts/show/156906
/**
 * 百度盘代码解析，2013/07/22
 *   文件：yun_home_speed_all.js
 *   函数：performSelectionDownload
 */


var isChrome = !!this.chrome;

var Config = {  // 默认的设置
    debug: false,

    trim_titles: [  // Share Home 标题移除的文字广告
        "[v.BDpan.COM]"
    ],
    YAAW_UA: "user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.73.11 (KHTML, like Gecko) Version/7.0.1 Safari/537.73.11",
    YAAW_REF: "Referer:http://pan.baidu.com/disk/home",
    lineBreak: isChrome ? '\r' : '\n',
};

var TPLS = {
    normal: '{dlink}',
    aria2c: 'aria2c -c -x 10 -s 10 --out "{server_filename}" "{dlink}" --user-agent="netdisk" --header "Referer:http://pan.baidu.com/disk/home"',
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
        var pageType = this.determineCurrentPageType();
        if (pageType !== null) {
            this.pageType = pageType;
            this.processPage(pageType);
        }
    },
    determineCurrentPageType: function() {
        var pageType = null;
        var loc = window.location.href.toLowerCase();
        if (loc.indexOf('/disk/home') != -1) 
        {
            pageType = 'diskHome';
        }
        else if (loc.indexOf('/share/link') != -1 || loc.indexOf('/s/') != -1) 
        {
            pageType = document.getElementById('barCmdTransfer') ? 'shareDir' : 'shareOne';
        } 
        else if (loc.indexOf('/share/home') != -1) 
        {
            pageType = 'shareHome';
        } 
        else if (loc.indexOf('/pcloud/album/info') != -1) 
        {
            pageType = 'albumInfo';
        } 
        else if (loc.indexOf('/pcloud/album/file') != -1) 
        {
            pageType = 'albumFile';
        } else if (loc.indexOf('/share/init?') != -1) {  // 分享的初始页面，用于输入密码等
            pageType = 'shareInit';
        }
        return pageType;
    },
    processPage: function(pageType) {
        if (pageType !== null) {
            var pageProcessor = pageType + 'PageProcessor';

            this.pageType = pageType;

            if (typeof(this[pageProcessor]) == 'function') {
                
                this.allPageProcessor();

                this[pageProcessor]();
            }
        }
    },
    allPageProcessor: function() {
        GM_addStyle(Res.panelCSS);

        this.registerControls();

        // 下面的去除云管家，会对上传插件无法显示上传文件夹
        // 故对此进行修正
        if (typeof GM_getValue("removeYunGuanjia") != 'undefined') {
            Utilities.useToast({
                toastMode: disk.ui.Toast.MODE_CAUTION,
                msg: '<b>全局去除云管家</b>会造成主页的上传文件夹功能失效，故默认禁用。',
                sticky: true
            });

            GM_deleteValue("removeYunGuanjia");
        }

        // 去掉云管家提示，来自 Crack Url Wait Code Login For Chrome
        if (prefs.getRemoveYunGuanjia()) {
            unsafeWindow.navigator.__defineGetter__('platform', function(){ return ''; });
        }
    },
    diskHomePageProcessor: function() {  // 个人主页
        /*
            设置 disk.DEBUG = true
        关键函数
            移动：FileUtils.sendMoveCopyFileMessage
            FileUtils.switchToDir(PATH)  主界面切换到某个文件夹
         */
        var self = this;
        this.API_URL = '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1';

        // 添加批量下载按钮
        $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>')
            .insertAfter('#barCmdDownload')
            .click(function(){
                self.downloadAll();
            });

        // 设置页面标题，根据 hash 变化而变化，方便历史记录检索
        var setDocumentTitle = function() {
            var path = decodeURIComponent(disk.getParam('dir/path'));
            if (path === "") {
                var m = location.hash.match(/#s\/key=(.*)/);
                if (m)
                    path = "搜索：" + m[1];
            }
            document.title = '百度云 网盘-' + path;
        };
        setDocumentTitle();
        window.addEventListener('hashchange', setDocumentTitle, false);

        UI.addQuickLinks();
        // 修正添加后出现滚动条的情况
        GM_addStyle('.side-options { margin: auto; }');
    },
    shareDirPageProcessor: function() {
        //  已失效。
        //  写于 2014-5-12
        //  只能一个个链接的获取下载地址
        return;

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
    shareOnePageProcessor: function() {
        if ($('#share_nofound_des').size() > 0) {  // 文件不存在
            // 失效页面添加分享主页链接
            var m = document.location.href.match(/uk=(\d+)/);
            if (m) {
                var homeUrl = "home?uk=" + m[1] + "#category/type=0";
                $('<a>')
                    .attr('href', homeUrl)
                    .attr('style', 'margin-left: 10px;')
                    .text('个人主页')
                    .appendTo('#share_nofound_des');
            }
            return;
        }

        var cacheResult = null;

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
                cacheResult = result;
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
                    Utilities.useToast({
                        toastMode: disk.ui.Toast.MODE_LOADING,
                        msg: "正在获取链接，请等待",
                        sticky: false
                    });
                }
            })
            .insertAfter('#downFileButtom');
    },
    shareHomePageProcessor: function() {
        // http://yun.baidu.com/share/home?uk=53993635&view=share#category/type=0
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
    albumInfoPageProcessor: function() {
        var self = this;
        var _mAlbumId, _mUk, _mPage;

        _mAlbumId = (disk.ui.album.albuminfo && disk.ui.album.albuminfo.album_id) || disk.getParam("album_id");
        _mUk = (disk.ui.album.uinfo && disk.ui.album.uinfo.uk) || disk.getParam("uk") || disk.getParam("query_uk");
        _mPage = {count: 0,totalPage: 0,nowPage: 1,limit: 60, handle: false};

        var getList = function() {
            var nowPage = $('#albumPage .page-input-wrap > input').val();
                _mPage.nowPage = parseInt(nowPage);
            var restUrl = "/pcloud/album/listfile?album_id=" + _mAlbumId + "&query_uk=" + _mUk + 
                "&start=" + (_mPage.nowPage - 1) * 60 + "&limit=" + _mPage.limit;

            $.get(restUrl, function(result){
                if (result && result.errno == 0 && result.list) {
                    App.showPanel(result.list);
                    App.toast.setVisible(false);
                } else {
                    App.useToast("获取数据出错, " + restUrl);
                }
            });
        };

        // 内容由 js 生成
        var clicked = function(e){
            var $quickFileSave = $('#quickFileSave');
            if ($quickFileSave[0]) {
                $('<a class="bbutton" style="margin-left:10px;padding-left:5px;">\
                        <b style="padding-right: 5px;">批量下载</b></a>')
                    .insertAfter($quickFileSave)
                    [0].onclick = getList;

                $('body').unbind('click');
            }
        };
        $('body').bind('click', clicked);
    },
    albumFilePageProcessor: function() {
        var data = { fid_list: "[" + disk.util.ViewShareUtils.fsId + "]" };
        // 增加 YAAW 按钮
        $('<a class="new-dbtn" href="javascript:;" hidefocus="true">')
            .css('padding', '0px 5px')
            .html('YAAW')
            .click(function(){
                if (data) {
                    App.addToYAAW(data);
                } else {
                    Utilities.useToast({
                        toastMode: disk.ui.Toast.MODE_LOADING,
                        msg: "正在获取链接，请等待",
                        sticky: false
                    });
                }
            })
            .insertAfter('#downFileButtom');
    },
    shareInitPageProcessor: function() {
        // 来自 https://greasyfork.org/scripts/1002-网盘自动填写提取密码
        // 因为 Scriptish 0.1.11 的 bug，同一个作者的2个脚本只能安装一个
        
        var sCode = location.hash.slice(1).trim();  // 抓取提取码
        if (!/^[a-z0-9]{4}$/.test(sCode))  // 检查是否为合法格式 
            return;
        // console.log('抓取到的提取码: ', sCode);
        setTimeout(function() {
            $('#accessCode').val(sCode);
            $('#submitBtn').click();
        }, 10);
    },

    // -------------------------
    registerControls: function() {
        debug('registerControls');

        if (this.pageType == 'diskHome') {
            // 右上角的更多菜单中添加设置按钮
            $('<span class="li"><a href="javascript:;">设置</a></span>')
                .click(UI.preferencesShow.bind(UI))
                .appendTo('.pulldown.more-info .content');
            // 扩展菜单的高度
            GM_addStyle('.module-header .info .more-info .content { height: 310px; }');
        }


        if (typeof GM_registerMenuCommand != 'undefined') {
            GM_registerMenuCommand('BaiduPanDownloadHelper 设置', UI.preferencesShow.bind(UI));
        }
    },

    // --------------------
    downloadAll: function() {
        this.toast = Utilities.useToast({
            toastMode: disk.ui.Toast.MODE_LOADING,
            msg: "正在获取中，请稍后...",
            sticky: true
        });
        
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
            if (result && result.errno == 0 && result.list) {
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
    handleResult: function(){  // 全部获取完成
        if (this.fetchCount > 0) return;

        var self = this;

        debug('得到选择的数据', this.checkedItems);

        // 2014-5-11， 百度盘改成 post 方式获取下载链接
        // 筛选出没有 dlink 的 fs_id
        var filelist = [];
        var filter = function(items) {
            items.forEach(function(item) {
                if (item.children) {
                    filter(item.children);
                } else {
                    if (!item.dlink && item.isdir != 1) {
                        filelist.push(item.fs_id);
                    }
                }
            });
        };
        filter(this.checkedItems);
        debug('筛选出需要再次用 POST 获取的', filelist);

        // 不需要再次获取的直接显示
        if (filelist.length == 0) {
            self.showPanel(self.checkedItems);
            self.toast.setVisible(false);
            return;
        }

        var restUrl = 'http://pan.baidu.com/api/download?channel=chunlei&clienttype=0&web=1&bdstoken=' + FileUtils.bdstoken,
            data = {
                sign: FileUtils.base64Encode(FileUtils.sign2(FileUtils.sign3, FileUtils.sign1)), 
                fidlist: "[" + filelist.join(',') + "]",
                type: 'dlink',
                timestamp: FileUtils.timestamp
            };

        $.post(restUrl, data, function(result){
            if (result.errno == 0) {
                var dlinkMap = {};
                result.dlink.forEach(function(i){
                    dlinkMap[i.fs_id] = i.dlink;
                });

                debug("全部获取完成, result=", result, ", dlinkMap=", dlinkMap, ", checkedItems=", self.checkedItems);
                self.showPanel(self.checkedItems, dlinkMap);
                self.toast.setVisible(false);
            } else {
                console.error('POST 方式获取错误', result);
                Utilities.useToast({
                    toastMode: disk.ui.Toast.MODE_CAUTION,
                    msg: disk.util.shareErrorMessage[result.errno],
                    sticky: false
                });
            }
        });
    },
    showPanel: function(checkedItems, dlinkMap) {
        if (!this.panel) {
            this.panel = this.createPanel();
        }

        var linksHTML = this.createDLinksHtml(checkedItems, dlinkMap);
        $("#mDownload-links").html(linksHTML);
        this.panel.style.display = "block";
    },
    createPanel: function() {
        var self = this;

        var container = document.createElement("div");
        container.id = "mDownload-container";

        var links_div = document.createElement("div");
        links_div.id = "mDownload-links";

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
    createDLinksHtml: function(checkedItems, dlinkMap) {
        var self = this,
            htmls = [],
            isAdded = false;

        checkedItems.forEach(function(item) {
            item.padding_left = "0px";

            if (item.isdir == 1) {
                htmls.push(template(self.dir_tpl, item));
                
                if (Array.isArray(item.children)) {
                    item.children.forEach(function(i) {
                        i.padding_left = "15px";
                        if (dlinkMap) {
                            i.dlink = dlinkMap[i.fs_id];
                        }
                        var tpl = i.dlink ? self.dlinks_tpl : self.dir_tpl;
                        htmls.push(template(tpl, i));
                    });
                }
            } else {
                if (!isAdded) {
                    htmls.push("<b>---------------</b>");
                    isAdded = true;
                }
                if (dlinkMap) {
                    item.dlink = dlinkMap[item.fs_id];
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
        App.useToast('已经复制 <b>' + arr.length + '</b> 条' + (isDlink ? '下载' : '') + '链接到剪贴板');
    },
    addToYAAW: function(items){
        var aria2 = new ARIA2(prefs.getAria2RPC());

        if (!Array.isArray(items)) {
            items = [items];
        }

        items.forEach(function(item){
            if (!item.dlink && Array.isArray(item.children)) {
                item.children.forEach(function(i){
                    aria2.addUri(i.dlink, {out: i.server_filename, header: [Config.YAAW_UA, Config.YAAW_REF] });
                });
            } else {
                aria2.addUri(item.dlink, {out: item.server_filename, header: [Config.YAAW_UA, Config.YAAW_REF] });
            }
        });

        App.useToast('添加中...到YAAW界面查看是否添加成功');
    },
    useToast: function(msg, sticky){
        // disk.ui.Toast.MODE_FAILURE    错误
        // disk.ui.Toast.MODE_CAUTION    警告
        // disk.ui.Toast.MODE_LOADING    载入
        // disk.ui.Toast.MODE_SUCCESS    正常
        return Utilities.useToast({
            toastMode: disk.ui.Toast.MODE_CAUTION,
            msg: msg,
            sticky: sticky || false
        });
    }
};

var prefs = {
    getRemoveYunGuanjia: function() { // 是否去掉云管家提示
        return this._getBooleanConfig('removeYunGuanjiaFix', false);
    },
    setRmoveYunGuanjia: function(bool) {
        GM_setValue('removeYunGuanjiaFix', bool);
    },

    getAria2RPC: function() {
        return GM_getValue('aria2_jsonrpc') || 'http://localhost:6800/jsonrpc';
    },
    setAria2RPC: function(val) {
        GM_setValue('aria2_jsonrpc', val);
    },

    getQuickLinks: function() {
        return GM_getValue('quickLinks') || 'Books=/Books/网络小说\n小说=/Books/小说\n网络小说=/Books/网络小说';
    },
    setQuickLinks: function(val) {
        GM_setValue('quickLinks', val);
    },

    _getBooleanConfig : function(configName, defaultValue) {
        var config = GM_getValue(configName);
        if (config === undefined) {
            GM_setValue(configName, defaultValue);
            config = defaultValue;
        }
        return config;
    }
};

var UI = {
    preferencesShow: function() {
        if (this.$prefs) {
            this.$prefs.show();
            return;
        }

        this.$style = $('<style>').text(Res.preferencesCSS).appendTo('head');
        this.$prefs = $(Res.preferencesHTML).appendTo('body');

        this.preferencesLoadHandler();
    },
    preferencesHide: function() {
        if (this.$prefs) this.$prefs.remove();
        if (this.$style) this.$style.remove();
        this.$prefs = null;
        this.$style = null;
    },
    preferencesLoadHandler: function() {
        this.$prefs.find('.cancel').click(this.preferencesHide.bind(UI));

        this.$prefs.find('.okay').click(this.preferencesSaveHandler.bind(UI));

        this.$prefs.find('#removeYunGuanjia').attr('checked', prefs.getRemoveYunGuanjia());
        this.$prefs.find('#aria2RPC').val(prefs.getAria2RPC());
        this.$prefs.find('#quickLinks').val(prefs.getQuickLinks());
    },
    preferencesSaveHandler: function() {
        prefs.setRmoveYunGuanjia(this.$prefs.find('#removeYunGuanjia')[0].checked);
        prefs.setAria2RPC(this.$prefs.find('#aria2RPC').val());
        // quick links
        prefs.setQuickLinks(this.$prefs.find('#quickLinks').val());
        this.addQuickLinks();

        this.preferencesHide();
    },
    // 个人主页增加自定义快捷目录
    addQuickLinks: function() {
        if (location.pathname != '/disk/home') return;

        $('#aside-menu > .quickLink').remove();

        var html = '';
        var lines = prefs.getQuickLinks().split('\n');
        lines.forEach(function(line){
            var offset = line.indexOf('=');
            if (offset > 0) {
                var name = line.substr(0, offset).trim(),
                    url = line.substr(offset + 1).trim();
                html += '<li class="quickLink b-list-item"><a href="#dir/path=' + url + '" unselectable="on" hidefocus="true" class="sprite2">' +
                    '<span class="text1 drop-list-trigger">' + name + '</span></a></li>';
            }
        });
        $('#aside-menu > li:first').after(html);
    },
};

var Res = getMStr(function(){
    var panelCSS;
    /*
        #mDownload-container{
          position: fixed;
          z-index: 1000;
          left: 314px;
          top: 120px;
          background: white;
          padding: 10px;
          border: 1px solid rgb(153, 153, 153);
          box-shadow: 0px 0px 9px rgb(153, 153, 153);
        }
        #mDownload-container button{
          margin-right: 10px;
        }
        #mDownload-links{
          margin-top: 10px;
          max-height: 400px;
          width: 400px;
          overflow: auto;
        }
        #mDownload-links b{
          color: red;
        }
     */
    var panelHTML;
    /*
        <div class="b-panel b-dialog common-dialog" style="display: none; left: 249px; top: 105px;width: 625px;height: auto;">
            <div class="dlg-hd b-rlv">
                <span class="dlg-cnr dlg-cnr-l"></span>
                <a href="javascript:;" title="关闭" class="dlg-cnr dlg-cnr-r .close"></a>
                <h3><em></em>下载链接</h3>
            </div>
            <div class="dlg-bd">
            </div>
        </div>
     */
    var preferencesHTML;
    /*
        <div id="bdh-preferences" class="b-panel download-mgr-dialog">
            <div class="dlg-hd b-rlv">
                <span title="关闭" class="dlg-cnr dlg-cnr-r cancel"></span>
                <h3>BaiduPanDownloadHelper 设置</h3>
            </div>
            <div style="margin: 10px 15px 5px;">
                <div style="border:1px solid #F0F0F0; background-color: #FAFAFA;">
                    <table>
                        <tr title="会造成主页的上传文件夹功能失效">
                            <td width="150"><label>全局去除云管家</label></td>
                            <td width="320"><input id="removeYunGuanjia" type="checkbox"></input></td>
                        </tr>
                        <tr>
                            <td><label>ARIA2 RPC：</label></td>
                            <td><input id="aria2RPC" type="text"></input></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <li class="b-list-item separator-1"></li>
                                <div style="text-align: center; font-weight: bold; font-size: 13px;">快捷目录设置</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <textarea id="quickLinks" style="width: 500px; height: 160px;"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div>
                <div class="alert-dialog-commands clearfix" style="text-align: center;">
                    <a class="sbtn okay" href="javascript:;"><b>保存</b></a>
                    <a class="dbtn cancel" href="javascript:;"><b>关闭</b></a>
                </div>
            </div>
        </div>
    */
   var preferencesCSS;
   /*
        #bdh-preferences {
            width: 550px;
            left: 338.5px;
            top: 101.5px;
        }
        #bdh-preferences input[type="text"] {
            width: 90%;
        }
        #bdh-preferences table {
            display: table;
            border-spacing: 10px;
            border-collapse: separate;
            border: 0;
            width: 100%;
        }
    */
});


var ARIA2 = (function() {
    var jsonrpc_version = '2.0';

    function get_auth(url) {
        return url.match(/^(?:(?![^:@]+:[^:@\/]*@)[^:\/?#.]+:)?(?:\/\/)?(?:([^:@]*(?::[^:@]*)?)?@)?/)[1];
    }

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
    }

    return function(jsonrpc_path) {
        this.jsonrpc_path = jsonrpc_path;
        this.addUri = function(uri, options) {
            request(this.jsonrpc_path, 'aria2.addUri', [
                [uri, ], options
            ]);
        };
        return this;
    };
})();


function template(tpl, data) {
    return tpl.replace(/\{([\w\.]*)\}/g, function(str, key) {
        var keys = key.split('.'),
            value = data[keys.shift()];
        keys.forEach(function(key) {
            value = value[key];
        });
        return (value === null || value === undefined) ? '' : value;
    });
}

// 从函数中获取多行注释的字符串
function getMStr(fn) {
    var fnSource = fn.toString();
    var ret = {};
    fnSource = fnSource.replace(/^[^{]+/, '');
    // console.log(fnSource);
    var matched;
    var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
    while (matched = reg.exec(fnSource)) {
        // console.log(matched);
        ret[matched[1]] = matched[2];
    }
    
    return ret;
}


App.init();