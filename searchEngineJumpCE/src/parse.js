// 转换文本数据为 engineList 对象
function parseDataStr(str, opt) {
    if (typeof opt == 'undefined') {
        opt = {};
    }

    // 提前处理下特殊的 post 方式
    str = str.replace(/[\n\r]+[\s\/]*-\s*(\S+):/g, '_POST_ $1:');

    var parseArgs = function(str) {
        var arr = str.replace(/，/g, ', ').split(/\s*, \s*/);
        var args = {};
        arr.forEach(function(s){
            var argArr = s.split(/\s*:\s*/);
            args[argArr[0]] = argArr[1];
        });
        return args;
    };

    var isEncoding = function(str) {
        str = str.trim().toLowerCase();
        return ['utf-8', 'gb', 'ascii'].some(function(e) {
            return str.indexOf(e) == 0;
        });
    };

    var parseLine = function (line) {
        line = line.trim();

        if (!line) return;

        if (line.indexOf('//') == 0) {
            if (opt.commentLine) {  // 包含注释行
                line = line.replace(/^\/\/\s*/, '');
            } else {
                return;
            }
        }

        var engine = {};

        if (line.indexOf('_POST_') != -1) {
            engine.method = 'POST';
            var two = line.split(/\s*_POST_\s*/);
            line = two[0];
            engine.args = parseArgs(two[1]);
        }

        var arr = line.replace(/，/g, ', ').split(/\s*, \s*/);
        if (arr.length === 1) {  // 分类
            return line;
        }

        engine.name = arr[0];
        engine.url = arr[1];
        engine.host = parseUri(engine.url).host;

        // 处理编码和图标
        if (arr[2] && isEncoding(arr[2])) {
            engine.encoding = arr[2];
            engine.favicon = arr[3];
        } else {
            engine.favicon = arr[2];
        }

        if (typeof ICON_DATA != 'undefined') {
            if (!engine.favicon) {  // 不存在尝试通过链接的域名获取
                engine.favicon = ICON_DATA[engine.host];
            } else if (engine.favicon.startsWith('data:image')) {  // base64 图标
            } else if (engine.favicon.startsWith('http')) {  // 在线图标
                engine.favicon = ICON_DATA[parseUri(engine.favicon).host] || engine.favicon;
            } else {  // 域名
                engine.favicon = ICON_DATA[engine.favicon] || getFaviconUrl(engine.favicon, opt.iconType);
            }
        }

        if (!engine.favicon) {
            engine.favicon = getFaviconUrl(engine.url, opt.iconType);
        }

        return engine;
    };

    var list = {},
        type;

    str.split(/[\n\r]+/).forEach(function(line){
        var engine = parseLine(line);
        if (!engine) {
            return;
        }

        if (typeof engine === 'string') {
            type = line.trim();
            list[type] = [];
        } else {
            // engine.type = type;
            list[type].push(engine);
        }
    });

    return list;
}

function getFaviconUrl(url, type) {
    var uri = parseUri(url);

    switch(type) {
        case 0:
            return url;
        case 1:
            return 'http://g.etfv.co/' + url;
        case 2:
            return 'http://api.byi.pw/favicon?url=' + url;
        case 3:
            return uri.protocol + '://' + uri.host + '/favicons.ico';
        default:
            return 'http://www.google.com/s2/favicons?domain=' + uri.host;
    }
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
