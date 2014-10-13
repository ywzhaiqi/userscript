
var gulp = require('gulp');
var template = require('gulp-template');
var concat = require('gulp-concat');
var fs = require('fs');

var FILE = {
    MAIN_CSS: './src/res/main.css',
    RULE: './src/res/rule.js',
    SITE_DATA: {
        my: './src/res/siteData_my.js',
        simple: './src/res/siteData_simple.js',
        wenke: './src/res/siteData_wenke.js',
    },
    ICON_DATA: './src/res/iconData.json',
};

var config = (function() {
    var pkg = require('./package.json');

    Object.defineProperty(pkg, 'mainCss', {
        get: function() {
            return fs.readFileSync(FILE.MAIN_CSS, 'utf-8');
        }
    });

    Object.defineProperty(pkg, 'siteDataStr_my', {
        get: function() {
            return fs.readFileSync(FILE.SITE_DATA.my, 'utf-8');
        }
    });

    Object.defineProperty(pkg, 'siteDataStr_simple', {
        get: function() {
            return fs.readFileSync(FILE.SITE_DATA.simple, 'utf-8');
        }
    });

    Object.defineProperty(pkg, 'siteDataStr_wenke', {
        get: function() {
            return fs.readFileSync(FILE.SITE_DATA.wenke, 'utf-8');
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

    var getHosts = function(str) {
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

    Object.keys(FILE.SITE_DATA).forEach(function(key) {
        getHosts(config['siteDataStr_' + key]);
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
