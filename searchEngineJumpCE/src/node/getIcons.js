var request = require("request");
var fs = require('fs');
var Promise = require('es6-promise').Promise;

var i2b = function (url, callback) {
    "use strict";

    var options = {
        uri: url,
        encoding: "binary"
    };

    return request(options, function(e, resp, body) {
        if (!e && resp.statusCode === 200) {
            var prefix = "data:" + resp.headers["content-type"] + ";base64,";
            var img = new Buffer(body.toString(), "binary").toString("base64");
            return callback(prefix + img);
        }

        return callback();
    });
};

var isBlankIcon = function(base64) {
    var blanks = [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC',
        'data:image/x-icon;base64,R0lGODlhEAAQAPcAAAtDfdfZ157SGiNswn2Qqv///+L77XioqE+ATNX2WV6RuLToY0uFmqXTwyhhln6uTUWEwKDJjFGV6CVkrczMzLPoDHyrd0h6dOr7bChZi6issleNvoq/2G6GoFGR2oO3MTZheit0zH6shLbj3mKVaxRPjp+0yu/9jPf39z1srF16mjZztT2D3W2q6iJZna3hjTdjn+Pl4oulwVmX2JXMRqOko57P+2OVT5zWIVOQy7ftLWaEsF6Wf2Oh31iSqj6G2WWg6PDw8Jyioz54rTNqth1OgbS7xIK7N8vxabDlDBlVm1yVwjl6xLe3t0JzhzJZgjNjooOtrUyEiuD4YzR6zUF1rlGEV/v+n1aLrUqN3tje4XSLqzRnkzFyv0qCzWCKmmCb4Gqia7TsDb3wb2KQZV+V0SVZlmGGspeswPX87BhRkxpXoWOk76fbEqnQzSxhoIKxU16e67Cyr3a08kRqlzt80TBorc/X2OTk5CpsvClfpbPjj0eL2GSbxUZ3ed7f3e/371t6p+L5b7btCjl0qStalTN2zTNmmVmFV22l4TR609LZ32GUsUWEwp3Jl+v7bXKGmxpTjT16uEKH3Y6oxGOMrWOk6i5sviFSnLW1vU52sDB0x2OJth9doQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAQABAAAAj4AAsIFBgEj0E8QVAMXBjkTqAMAAAUOqNFIUM0Rb64MZBmxAYzJoIMRCGjRJQrJyLsaWCDwxpKFhepqeLokaAxGF4kmrNEzaICKDhNODRmypQFSA4AAQKB0BkUQd50iUQjgVURZSz9GODjTZAgSjZ1QqADjgUFM/goCtHIxVcXhvI4OGLlghQGkphQqeM26iYqTIbwCOPnBiIuK5hASRjoEossHnIw+CBGjAASdgKhQGFEzyQJcXpgEVA5iZNCRghuIZKFTYs+ZNpUQJShg0iBfwik8AImEaMHIJ5ACrCwAB4NOzSlgEFHhZA/xQWioNCkRg05FCwKDAgAOw==',
    ];

    return blanks.indexOf(base64) != -1;
};

var getFavicon = function(host, index, hosts) {
    var url = 'http://g.etfv.co/http://' + host;
	// var url = 'http://api.byi.pw/favicon?url=' + host;
    // var url = 'https://www.google.com/s2/favicons?domain=' + host;

    return new Promise(function(resolve, reject) {
        i2b(url, function(base64){
            resolve(base64);
            if (base64) {
                console.log('获取图标成功 %s', url);
            } else {
                console.log('无法获取图标 %s', url);
            }
        });
    })
};

// 筛选或排序
var sortIconData = function (data, hosts) {
    var obj = {};
    Object.keys(data).sort().forEach(function(host) {
        if (hosts.indexOf(host) === -1) return;
        obj[host] = data[host];
    });
    return obj;
}

exports.run = function(oHostMap, ICON_DATA_FILE) {
    var BLANK_ICON_DATA_FILE = './src/res/blankIcon.txt';

    // 读取以前获取的
    try {
        var data = fs.readFileSync(ICON_DATA_FILE, 'utf-8');
        data = JSON.parse(data)
    } catch(ex) {
        var data = {};
    }

    var oHosts = Object.keys(oHostMap);

    // 找出不存在的 host
    var moreHosts = oHosts.filter(function(host){
        return !(host in data);
    });

    // 删除不需要的
    Object.keys(data).forEach(function(host) {
        if (!(host in oHostMap)) {
            delete data[host];
        }
    });

    var finish = function(blankHosts) {
        console.log('全部获取完成，写入文件');
        var str = JSON.stringify(sortIconData(data, oHosts));
        fs.writeFileSync(ICON_DATA_FILE, str);

        console.log('共有 %s 个空白图标，已写入文件 %s', blankHosts.length, BLANK_ICON_DATA_FILE);
        fs.writeFile(BLANK_ICON_DATA_FILE, blankHosts.join('\n'));
    };

    if (moreHosts.length === 0) {
        console.log('没有新增的 host');
        return;
    }

    // 下载并转换
    Promise.all(moreHosts.map(getFavicon)).then(function(base64s) {
        var blankHosts = [];
        base64s.map(function(base64, index) {
            var host = moreHosts[index];
            if (base64) {
                if (isBlankIcon(base64)) {
                    blankHosts.push(host);
                } else {
                    data[host] = base64;
                }
            }
        });

        finish(blankHosts);
    });
};

var createIconCss = function(hosts) {
    // hosts = hosts.slice(0, 3);

    // 方法三：同时获取
    Promise.all(hosts.map(getFavicon)).then(function(base64s) {
        var styles = base64s.map(function(base64, index) {
            var className = hosts[index].replace(/\./g, '_');
            return '.sej-engine-icon.' + className + ' {\n    background: url(' + base64 + ');\n}'
        });

        console.log('全部获取完成，写入文件');
        fs.writeFile('icon.css', styles.join('\n'));
    });

    // // 方法二：一一获取
    // var list = [];
    // hosts.reduce(function(sequence, host, index) {
    //     return sequence.then(function() {
    //         return getFavicon(host);
    //     }).then(function(base64) {
    //         list.push('.sej-engine-icon.' + host + ' {\n    background: url(' + base64 + ');\n}');
    //         console.log('已完成第 ' + (index + 1) + ' 个，共 ' + hosts.length + ' 个');
    //     });
    // }, Promise.resolve()).then(function() {
    //     console.log('全部获取完成，写入文件');
    //     fs.writeFile('icon.css', list.join('\n'), 'utf-8');
    // });


    // 方法一
    // var sequence = Promise.resolve();

    // hosts.forEach(function(host) {
    //     var url = 'http://www.google.com/s2/favicons?domain=' + host;

    //     sequence = sequence.then(function(){
    //         return getFavicon(url);
    //     }).then(function(base64){
    //         list.push('.sej-engine-icon.' + host + ' {\n    background: url(' + base64 + ');\n}')
    //     });

    // });

    // sequence.then(function(){
    //     console.log('全部获取完成，写入文件');
    //     fs.writeFile('icon.css', list.join('\n'), 'utf-8')
    // });
};
