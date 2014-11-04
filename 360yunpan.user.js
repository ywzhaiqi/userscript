// ==UserScript==
// @name         360 云盘辅助
// @namespace    https://github.com/ywzhaiqi/
// @version      0.1
// @description  批量离线
// @match        http://c13.yunpan.360.cn/my*
// @grant        none
// ==/UserScript==


$('#tbOffline')
    .clone().attr('id', 'tbOffline-my').removeData('cn')
    .find('span').text('批量离线')
    .end()
        .click(batchOfflineDown)
        .insertAfter($('#tbOffline'))


// 批量离线
function batchOfflineDown() {
    var data = prompt('填入要批量离线的网址');
    if (data) {
        var urls = data.split('\n').filter(function(r) { return r; });
        run(urls);
    }

    function run(urls) {
        var url = urls.shift();
        if (!url) {
            console.log('全部离线完成');
            return;
        }

        Ajax.post("/offline/offlineDownload", {url: url}, function(data) {
            var res = JSON.parse(data);
            if (res.errno == 0) {
                console.log('成功离线下载：', url);
                run(urls);
            } else {
                console.log(res.errmsg, url);
            }
        });
    }
}
