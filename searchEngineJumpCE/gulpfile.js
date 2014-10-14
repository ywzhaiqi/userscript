
var gulp = require('gulp');
var template = require('gulp-template');
var concat = require('gulp-concat');
var fs = require('fs');

var FILE = {
    MAIN_CSS: './src/res/main.css',
    RULE: './src/res/rule.js',
    siteData_root: './src/res/siteData_',
    siteDatas: ['my.js', 'simple.js', 'wenke.js', 'ted423.js'],
    ICON_DATA: './src/res/iconData.json',
};

// 根据文件的最后修改时间生成链接
var getResourceURL = function(name) {
    var path = './src/res/' + name;

    return '// @resource ' + name + ' ' +
            'https://raw.githubusercontent.com/ywzhaiqi/userscript/master/searchEngineJumpCE/src/res/' +
            name + '?' +
            fs.statSync(path).mtime.getTime();
};

var getResource = function (path) {
    var str = fs.readFileSync(path, 'utf-8');
    return str;
};

var wrapResource = function(str) {
    return "'" +
            str.trim()
                .replace(/\\/g, '\\\\')
                .replace(/[\n\r]+/g, '\\n')
                .replace(/'/g, "\\'") +
            "'";
};

var config = (function() {
    var pkg = require('./package.json');

    Object.defineProperty(pkg, 'meta_resources', {
        get: function() {
            return ['iconData.json']
                .map(getResourceURL)
                .join('\n');
        }
    });

    Object.defineProperty(pkg, 'includes', {
        get: function() {
            var r = require(FILE.RULE);

            return r.rules.map(function(rule){
                        return '// @include        ' + rule.url.toString().replace(/[igm]*$/, '');
                    }).join('\n');
        }
    });

    pkg.res = {};

    // 动态加载的方式
    FILE.siteDatas.forEach(function(name) {
        Object.defineProperty(pkg.res, name, {
            get: function() {
                return wrapResource(getResource(FILE.siteData_root + name));
            }
        });
    });

    Object.defineProperty(pkg.res, 'mainCss', {
        get: function() {
            return wrapResource(getResource(FILE.MAIN_CSS));
        }
    });

    return pkg;
})();

gulp.task('build', function() {
    gulp.src(['src/meta.js', 'src/data.js', FILE.RULE, 'src/prefs.js', 'src/utils.js', 'src/parse.js', 'src/main.js'])
        .pipe(template(config))
        .pipe(concat(config.name + '.user.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch(['src/*.js', 'src/res/*'], ['build']);
});

gulp.task('default', ['watch', 'build']);


// 获取图标（手动），自动获取的话太慢
gulp.task('geticon', function() {
    var parser = require('./src/parse.js');
    var getIcons = require('./src/node/getIcons.js').run;

    var hostMap = {};

    // 从文件 siteData_my.js 中提取 host，并放入 hostMap
    var getHosts = function(str) {
        if (!str) {
            throw '要解析的 siteData 为空';
        }

        var englineList = parser.parseDataStr(str, {
            commentLine: true,
            iconType: 0
        });

        Object.keys(englineList).forEach(function(category) {
            englineList[category].forEach(function(engine) {
                var host = parser.parseUri(engine.url).host;
                hostMap[host] = true;

                if (engine.favicon && !engine.favicon.match(/^data:/)) {
                    host = parser.parseUri(engine.favicon).host;
                    hostMap[host] = true;
                }
            })
        });
    };

    // 提取多个文件
    FILE.siteDatas.forEach(function(name) {
        getHosts(getResource(FILE.siteData_root + name));
    });

    getIcons(hostMap, FILE.ICON_DATA);
});

// 转换字符串数据为 JSON 数据
// gulp.task('convert', function() {
// 	var parser = require('./src/parse.js');

// 	var englineList = parser.parseDataStr(config.siteDataStr, {
//         commentLine: true,
//     });
// 	fs.writeFileSync('src/res/siteData.json', JSON.stringify(englineList))
// })
