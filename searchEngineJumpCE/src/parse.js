
// 转换文本数据为 englineList 对象
function parseDataStr(str, skipCommentLine) {
    if (typeof skipCommentLine == 'undefined') {
        skipCommentLine = true;
    }

    // 提前处理下特殊的 post 方式
    str = str.replace(/[\n\r]+[\s\/]*-/g, '_POST_');

    var parseArgs = function(str) {
        var arr = str.replace(/，/g, ', ').split(/\s*, \s*/);
        var args = {};
        arr.forEach(function(s){
            var argArr = s.split(/\s*: \s*/);
            args[argArr[0]] = argArr[1];
        });
        return args;
    };

    var isEncoding = function(str) {
        return ['utf-8', 'gbk'].indexOf(str.toLowerCase()) != -1;
    };

    var parseLine = function (line) {
        line = line.trim();

        if (!line) {
            return;
        }

        if (line.indexOf('//') == 0) {  // 注释行
            if (skipCommentLine) {
                return;
            } else {
                line = line.replace(/^\/\/\s*/);
            }
        }

        var engline = {};

        if (line.indexOf('_POST_') != -1) {
            engline.method = 'POST';
            var two = line.split(/\s*_POST_\s*/);
            line = two[0];
            engline.args = parseArgs(two[1]);
        }

        var arr = line.replace(/，/g, ', ').split(/\s*, \s*/);
        if (arr.length === 1) {  // 分类
            return line;
        }

        engline.name = arr[0];
        engline.url = arr[1];
        engline.host = parseUri(engline.url).host;

        // 处理编码和图标
        if (arr[2] && isEncoding(arr[2])) {
            engline.encoding = arr[2];
            engline.favicon = arr[3];
        } else {
            engline.favicon = arr[2];
        }

        if (typeof ICON_DATA != 'undefined') {
            // engline.favicon 可能为几种情况：base64 图标、在线图标、域名
            engline.favicon = ICON_DATA[engline.favicon] || engline.favicon || ICON_DATA[engline.host] || getFaviconUrl(engline.url);
        }

        return engline;
    };

    var list = {},
        type;

    str.split(/[\n\r]+/).forEach(function(line){
        var engline = parseLine(line);
        if (!engline) {
            return;
        }

        if (typeof engline === 'string') {
            type = line.trim();
            list[type] = [];
        } else {
            // engline.type = type;
            list[type].push(engline);
        }
    });

    return list;
}


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
var parseUri = function(str) {
    var o = parseUri.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.ds.name] = {};
    uri[o.ds.name][0] = {};
    uri[o.ds.name][0]['key'] = (uri.protocol ? uri.protocol : 'http') + '://' + uri.host + (uri.port ? ':' + uri.port : '') + '/';
    uri[o.ds.name][0]['val'] = '/';
    var i = 0,
        tempsub = '/',
        subs = uri[o.key[10]].substr(1).split('/');
    for (var j = 1; j < (subs.length + 1); j++, i++) {
        tempsub += tempsub === '/' ? subs[i] : '/' + subs[i];
        if (subs[i]) {
            uri[o.ds.name][j] = {};
            uri[o.ds.name][j]['key'] = subs[i];
            uri[o.ds.name][j]['val'] = tempsub;
        }
    }

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });
    uri[o.aq.name] = {};
    uri[o.key[13]].replace(o.aq.parser, function($0, $1, $2) {
        if ($1) uri[o.aq.name][$1] = $2;
    });

    return uri;
};
parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    aq: {
        name: "anchorqueryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    ds: {
        name: "directorySub"
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};


if (typeof exports !== 'undefined') {
    exports.parseDataStr = parseDataStr;
    exports.parseUri = parseUri;
}
