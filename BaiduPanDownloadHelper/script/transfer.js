
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

var SAVE_TIMEOUT = 3000;

// 测试网址  Books(Verycd Share): http://yun.baidu.com/share/home?uk=2214641459&view=share#category/type=0
// 2014年11月12日
var shareHome = {
    manualSave: function() {  // 手动保存当前页的数据
        copy(JSON.stringify(FileUtils.SHARE_DATAS.currentChacheData))
    },

    getAllShareData: function() {
        var total = $('.page-all').text();  // 共几页

        var allData = [];
        var page = 1;
        var finish = function() {
            var filename = $('.homepagelink').text() + ' 分享的数据.json';
            saveAs(allData, filename);
        };

        shareHome.getData(page, function next(records) {
            if (records) {
                allData = allData.concat(records);
                console.log('已成功获取第 %s 页数据', page);

                page += 1;
                if (page > total) {
                    finish();
                } else {
                    shareHome.getData(page, next);
                }
            } else {
                finish();
            }
        });
    },
    getData: function(currentPage, callback) {
        var url = "http://yun.baidu.com/pcloud/feed/getsharelist",
            pageSize = 60;

        currentPage -= 1;

        var data = {
            category: 0,
            auth_type: 1,
            request_location: 'share_home',
            start: currentPage * 60,
            limit: 60,
            query_uk: FileUtils.SHARE_DATAS.currentUK
        };

        $.get(url, data, function(ret) {
            if (ret.errno == 0) {
                callback(ret.records, ret.total_count);
            } else {
                console.error('获取第 %s 页错误，错误信息：', currentPage, ret);
                callback();
            }
        });
    }
};

var diskHome = {
    getAllList: function(startDir) {
        startDir = '/Books/Dev/Books ( Verycd Share )';

        var allData = [];
        var finish = function() {
            clearTimeout(finish.timeoutId);
            finish.timeoutId = setTimeout(function() {
                var filename = '我的 Books(Verycd Share) 数据.json';
                saveAs(allData, filename);
            }, SAVE_TIMEOUT);
        };

        diskHome.getList(startDir, function next(list) {
            if (list) {
                allData = allData.concat(list);
                // 获取文件夹里面的数据
                list.forEach(function(item) {
                    if (item.isdir == 1) {
                        diskHome.getList(item.path, next);
                    }
                });

                finish();
            } else {
                finish();
            }
        });
    },
    getList: function (path, callback) {  // Search:  disk-home.js
        if (!path) {
            path = getParam('dir/path') || getParam('path');
        }

        var API_URL = '/api/list?channel=chunlei&clienttype=0&web=1&num=100&order=time&desc=1',
            restUrl = API_URL + '&dir=' + path;

        $.get(restUrl, function(result) {
            if (result && result.errno == 0 && result.list) {
                console.log('已成功获取 %s 路径的列表', path);
                callback(result.list);
            } else {
                console.error("获取 %s 路径数据出错", path , restUrl);
                callback();
            }
        });
    },
};

var moveDialog = {
    init: function() {
        // 监视移动对话框的插入
        var selector = '.move-dialog';
        if ($(selector).length == 0) {
            var observer = new MutationObserver(function(mutations) {
                var node = mutations[0].addedNodes[0];
                if (node && node.matches(selector)) {
                    observer.disconnect();
                    moveDialog.initUI();
                }
            });
            observer.observe(document.body, { childList: true });
        }
    },
    initUI: function() {  // 移动对话框添加多个路径，可快速选择
        $('<span>')
            .css('margin-left', '20px')
            .text('quick')
            .appendTo('.move-dialog h3');
    },
    test: function() {
        var fileTreeView = require("common:widget/fileTreeView/fileTreeView.js");

        fileTreeView.obtain.getSelectPath = function() { return '/Books/Dev/Books ( Verycd Share )/O\'Reilly' };

        // delete fileTreeView.obtain.getSelectPath;
    },

};


function getParam(name, url) {
    var regexp = new RegExp("(?:^|\\?|#|&)" + name + "=([^&#]*)(?:$|&|#)", "i"),
        matches = regexp.exec(url || location.href);
    return matches ? decodeURIComponent(matches[1]) : ""
}

function saveAs(data, filename) {
    if(!filename) filename = 'console.json'

    if (typeof data == 'object') {
        data = JSON.stringify(data, undefined, 4);
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


function matchesSelector(el, selector) {
    return ( document.documentElement["matchesSelector"] ||
        document.documentElement["mozMatchesSelector"] ||
        document.documentElement["webkitMatchesSelector"] ||
        document.documentElement["oMatchesSelector"] ||
        document.documentElement["msMatchesSelector"] ).call(el, selector);
}
