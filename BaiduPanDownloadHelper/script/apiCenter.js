
var restApi = (function() {
    var api = function() {};
    api.VENDOR_INFO = 'channel=chunlei&clienttype=0&web=1';
    api.YUN = 'http://yun.baidu.com';
    api.PAN = 'http://pan.baidu.com';
    api.LIST = '/api/list?' + api.VENDOR_INFO;
    api.SHARE_LIST = '/share/list';

    api.SEARCH = '/api/search?' + api.VENDOR_INFO;
    api.UPLOAD = 'http://c.pcs.baidu.com/rest/2.0/pcs/file?method=upload&type=tmpfile&app_id=250528';
    api.UPLOAD_ROUTE = 'https://c.pcs.baidu.com/rest/2.0/pcs/file?method=upload&app_id=250528&ondup=newcopy&dir=%s&filename=%s';
    api.MULTI_DOWNLOAD = 'https://pcs.baidu.com/rest/2.0/pcs/file?method=batchdownload&app_id=250528';
    api.SINGLE_DOWNLOAD = 'http://pcs.baidu.com/rest/2.0/pcs/file?method=download&app_id=250528';

    return api;
})();

var apiCenter = {
    // data: {uk: "3122760592", shareid: "1098583981", page: 1, num: 100, desc: 1, order: "time", dir: "/测试",}
    getShareFileListAsyc: function(data, callback) {
        $.ajax({
            url: restApi.SHARE_LIST,
            data: data,
            success: function(ret) {
                callback.call(void 0, ret);
            },
            error: function(ret) {
                callback.call(void 0,  {list: []});
            }
        });
    }
};
