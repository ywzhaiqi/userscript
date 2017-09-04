var request = require("request");
var fs = require('fs');
var Sync = require('sync');


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

function asyncFunction(url, callback) {
    i2b(url, function(base64){
        callback(null, base64);
    });
}

exports.run = function(hosts) {

    Sync(function(){
        var list = []
        hosts.forEach(function(host, index){
            var url = 'http://www.google.com/s2/favicons?domain=' + host;

            var base64 = asyncFunction.sync(null, url);

            list.push('.sej-engine-icon.' + host + ' {\n    background: url(' + base64 + ');\n}')

            console.log('已完成第 ' + (index + 1) + ' 个，共 ' + hosts.length + ' 个');
        })

        fs.writeFile.sync(null, 'icon.css', list.join('\n'), 'utf-8')
        console.log('全部完成');
    })
};