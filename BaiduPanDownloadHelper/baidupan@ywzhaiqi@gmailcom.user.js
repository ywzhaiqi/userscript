// ==UserScript==
// @id             baidupan@ywzhaiqi@gmail.com
// @name           BaiduPanDownloadHelper
// @version        2.0
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi@gmail.com
// @description    批量导出百度盘的下载链接（百度盘的打包不能断点续传且速度慢）
// @grant          GM_setClipboard
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          unsafeWindow
// @homepageURL    http://userscripts.org/scripts/show/162138
// @updateURL      http://userscripts.org/scripts/source/162138.meta.js
// @downloadURL    https://userscripts.org/scripts/source/162138.user.js
// @include        http://pan.baidu.com/share/link*
// @include        https://pan.baidu.com/share/link*
// @run-at         document-end
// ==/UserScript==

// 参考 BaiduPanMD5Button http://userscripts.org/scripts/show/156906
/**
 * 百度盘代码解析，2013/07/22
 *   文件：yun_home_speed_all.js
 *   函数：performSelectionDownload
 */

(function(){

var debug = 0 ? console.debug : function(){};

var $ = unsafeWindow.jQuery;

if(typeof $ == "undefined"){
    return;
}

var FileUtils = unsafeWindow.FileUtils,
    Utilities = unsafeWindow.Utilities,
    disk = unsafeWindow.disk,
    Page = unsafeWindow.Page;

var getListURL = "http://pan.baidu.com/share/list?channel=chunlei&clienttype=0&web=1&page=1&shareid=" +
                  url_query('shareid') + "&uk=" + url_query("uk") + "&dir=";

var ns = {
    checkedItems: [],  // 勾选的条目
    init: function(){
        var ins = $('#file_action_buttons');
        if(ins.length == 0) return;

        var button = $('<a class="bbtn" style="padding-left:10px"><b>批量下载</b></a>');
        button[0].addEventListener("click", ns.buttonClicked, false);
        ins.append(button);

        ns.addStyle();
    },
    addStyle: function(){
        GM_addStyle('\
            #mDownload-container{\
                position: fixed;\
                z-index: 1000;\
                left: 314px;\
                top: 120px;\
                width: 400px;\
                background: white;\
                padding: 10px;\
                border: 1px solid rgb(153, 153, 153);\
                box-shadow: 0px 0px 9px rgb(153, 153, 153);\
            }\
            #mDownload-links{\
                margin-top: 10px;\
                color: red;\
            }\
            #mDownload-close-button{\
                margin-right: 10px;\
            }\
            #mDownload-export-button{\
                margin-right: 10px;\
            }\
        ');
    },
    buttonClicked: function(){
        ns.notice = Utilities.useToast({
            toastMode: disk.ui.Toast.MODE_CAUTION,
            msg: "正在获取中，请稍后...",
            sticky: true
        });

        var fetchURL;
        ns.checkedItems = FileUtils.getListViewCheckedItems();
        ns.fetchCount = 0;
        ns.checkedItems.forEach(function(item){
            if(item.isdir){
                ns.fetchCount += 1;
                fetchURL = getListURL + encodeURIComponent(item.path);
                console.log("GM_xmlhttpRequest: " + fetchURL);

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: fetchURL,
                    onload: function(response){
                        var JSONObj = JSON.parse(response.responseText);
                        ns.fetchCount -= 1;
                        if(JSONObj.errno == 0){
                            item.children = JSONObj.list;
                            ns.handleResult();
                        }else{
                            console.log("获取json数据错误: " + item.path);
                        }
                    }
                });
            }
        });

        // 没有文件夹的情况
        ns.handleResult();
    },
    handleResult: function(){
        // 全部获取完成
        if(ns.fetchCount == 0){
            debug("全部获取完成", ns.checkedItems);
            ns.showPanel();
            ns.notice.setVisible(false);
        }
    },
    showPanel: function(){
        if(!ns.panel){
            ns.panel = ns.createPanel();
        }else{
            var linksHTML = ns.createDLinksHtml();
            $("#mDownload-links").html(linksHTML);
            ns.panel.style.display = "block";
        }
    },
    createPanel: function(){
        var container = document.createElement("div");
        container.id = "mDownload-container";

        var links_div = document.createElement("div");
        links_div.id = "mDownload-links";
        links_div.innerHTML = ns.createDLinksHtml();

        var closeButton = document.createElement("button");
        closeButton.id = "mDownload-close-button";
        closeButton.innerHTML = "关闭";
        closeButton.onclick = function(){
            container.style.display = "none";
        };

        var exportButton = document.createElement("button");
        exportButton.id = "mDownload-export-button";
        exportButton.innerHTML = "导出";
        exportButton.onclick = function(){
            GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(links_div.innerHTML));
        };

        var copyButton = document.createElement("button");
        copyButton.id = "mDownload-copy-button";
        copyButton.innerHTML = "复制到剪贴板";
        copyButton.onclick = ns.copyDlinks;

        container.appendChild(closeButton);
        container.appendChild(exportButton);
        container.appendChild(copyButton);
        container.appendChild(links_div);
        document.body.appendChild(container);

        return container;
    },
    dlinksTemplate: "<a class='dlinks' href={dlink}>{server_filename}</a>",
    createDLinksHtml: function(){
        var htmls = [];
        var isAdded = false;
        ns.checkedItems.forEach(function(item){
            if(item.isdir){
                htmls.push("<b>" + item.server_filename + "</b>");
                if(item.children){
                    item.children.forEach(function(i){
                        if(!i.dlink) return;
                        htmls.push(template(ns.dlinksTemplate, i));
                    });
                }
            }else if(item.dlink){
                if(!isAdded){
                    htmls.push("<b>---------------</b>");
                    isAdded = true;
                }
                htmls.push(template(ns.dlinksTemplate, item));
            }
        });
        return htmls.join("<br>");
    },
    copyDlinks: function(){
        var dlinks = [];
        ns.checkedItems.forEach(function(item){
            if(item.isdir && item.children){
                item.children.forEach(function(i){
                    dlinks.push(i.dlink);
                });
            }else{
                dlinks.push(item.dlink);
            }
        });

        GM_setClipboard(dlinks.join('\n'), 'text');

        Utilities.useToast({
            toastMode: disk.ui.Toast.MODE_CAUTION,
            msg: '已经复制 ' + dlinks.length + '条下载链接到剪贴板',
            sticky: false
        });
    },

};

ns.init();

function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}

var nano_regex = /\{([\w\.]*)\}/g;
function template(template, data) {
    return template.replace(nano_regex, function(str, key) {
        var keys = key.split('.'),
            value = data[keys.shift()];
        keys.forEach(function(key) {
            value = value[key];
        });
        return (value === null || value === undefined) ? '' : value;
    });
}

})();
