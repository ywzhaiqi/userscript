// ==UserScript==
// @name           Flvxz
// @namespace      https://github.com/ywzhaiqi
// @version        0.1
// @description    flvxz.com 复制到剪贴板或导出 IDM。其中 "用 IDM 下载" 需要注册协议，配合 addToIDM.ahk 实现。
// @include        http://*flvxz.com/?url=*
// @grant          GM_setClipboard
// @require        http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// @noframes
// ==/UserScript==


// 添加导出按钮
var $result = $('#result');
var observer = new MutationObserver(function(){
    $result.find('span[style="color:red"]:contains("[")').each(function() {
        var $sep = $(this)
            ul = $sep.prev().find('ul');

        $('<li>')
            .append($('<a href="javascript:void">复制到剪贴板</a>').click(function() {
                copyLinks($sep[0].textContent);
            }))
            .appendTo(ul);

        $('<li>')
            .append($('<a href="javascript:void">用 IDM 下载</a>').click(function() {
                launchIDM($sep[0].textContent);
            }))
            .appendTo(ul);

        // $('<li>')
        //     .append($('<a href="javascript:void">IDM 格式导出</a>').click(function() {
        //         exportIDM($sep[0].textContent);
        //     }))
        //     .appendTo(ul);
    });

    observer.disconnect();
});
observer.observe($result[0], {childList: true});


function copyLinks(type) {
    var data = getData(type);
    if (data) {
        var str = data.map(function(i) { return i.title + '\r\n' + i.url; }).join('\r\n');
        GM_setClipboard(str);
        alerts('已复制 ' + data.length + ' 个链接到剪贴板', 2000);
    }
}

function launchIDM(type) {
    var data = getData(type);
    if (data) {
        var str = data.map(function(i) { return i.title + '\r\n' + i.url; }).join('\r\n');
        GM_setClipboard(str);
        location.href = 'idm://clipboard';
    }
}

function exportIDM(type) {
    var data = getData(type);
    if (data) {
        var str = '';
        $(data).each(function() {
            str += '<\r\n' + this.url + '\r\n' + this.title + '\r\n>\r\n';
        });

        var title = $('.media-heading').text();
        saveAs(str, title + '.ef2')
    }
}

function getData(type) {
    var linkHash = getLinkHash();
    var arr = linkHash[type];
    if (arr) {
        return arr;
    } else {
        console.error('找不到当前类型的视频', sep);
    }
}

function getLinkHash() {  // 根据类型对所有链接进行分类
    var linkHash = {},
        curArr;
    // 分段和链接
    $('span[style="color:red"]:contains("["), #result > a[rel="noreferrer"], #result > div > a[rel="noreferrer"]').each(function(i, el) {
        var $el = $(this);
        if (el.nodeName == 'SPAN') {
            curArr = linkHash[el.textContent] = [];
        } else {
            curArr.push({
                title: $el.text(),
                url: $el.attr('href')
            });
        }
    });

    return linkHash;
}


function saveAs(data, filename) {
    var blob = new Blob([data], {
        type: 'application/octet-stream'
    });
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


function alerts(msg, closeTime) {
    var div = alerts.div;
    if (!div) {
        div = alerts.div = document.createElement('div');
        div.style.cssText = 'position:fixed;z-index:1001;top:10%;left:40%;background: #F9EDBE;box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);border: 1px solid #FBDA91;padding: 5px;';
        document.body.appendChild(div);
    }

    div.innerHTML = msg;
    div.style.display = 'block';
    setTimeout(function() {
        div.style.display = 'none';
    }, closeTime || 2000);
}
