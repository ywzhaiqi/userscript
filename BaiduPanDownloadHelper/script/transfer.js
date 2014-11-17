
/**
 * 批量转存，运行在主页的文档类型
 * http://yun.baidu.com/#view/type=dynamic&category=4
 */
function batchSave() {
    // $('.feed-dynamic-item').each(function(i) {
    // });
}

function transferIndex(index, savePath) {
    var _ = disk.feedUtil;
    var info = _._mData[index];
    if (info) {
        transfer(info, savePath);
    }
}

// 运行在 http://yun.baidu.com/s/1eQrKxqy
function transfer(info, savePath, callback) {
    var bdstoken = info.bdstoken || FileUtils.bdstoken;
    var url = 'http://yun.baidu.com/share/transfer?shareid=' + info.shareid + '&from=' + info.uk
            + '&ondup=newcopy&async=1&bdstoken=' + bdstoken + '&channel=chunlei&clienttype=0&web=1&app_id=250528';

    var filelist = info.filelist.map(function(i) { return decodeURIComponent(i.path); });

    var data = {
        path: savePath || '/我的资源',
        filelist: $.stringify(filelist)
    };

    $.post(url, data, function(ret) {
        if (ret.errno == 0) {
            console.log('保存成功', ret);
            if (typeof callback == 'function') {
                callback();
            }
        } else {
            console.error("保存失败，" + (disk.util.shareErrorMessage[ret.errno] || "请稍候重试"), ret, info);
        }
    });
}




function matchesSelector(el, selector) {
    return ( document.documentElement["matchesSelector"] ||
        document.documentElement["mozMatchesSelector"] ||
        document.documentElement["webkitMatchesSelector"] ||
        document.documentElement["oMatchesSelector"] ||
        document.documentElement["msMatchesSelector"] ).call(el, selector);
}
