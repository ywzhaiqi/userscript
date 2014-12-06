module.exports = function(grunt) {

    function readResource(filename) {
        var str = grunt.file.read('./src/res/' + filename, { encoding: 'utf-8' });
        return  "'" +
                    str.replace(/\\/g, '\\\\')
                       .replace(/[\n\r]+/g, '\\n')
                       .replace(/'/g, "\\'") +
                "'";
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        res: {
            get mainCss() {
                return readResource('main.css');
            },
            get mainHtml() {
                return readResource('main.html');
            },
            get preferencesHTML() {
                return readResource('preferences.html');
            },
            get preferencesCSS() {
                return readResource('preferences.css');
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                'browser': true,
                'node': true,
                'multistr': true,
                'evil': true,
                'globals': {
                    'GM_addStyle': true,
                    'GM_getValue': true,
                    'GM_setValue': true,
                    'GM_xmlhttpRequest': true,
                    'GM_openInTab': true,
                    'GM_setClipboard': true,
                    'GM_registerMenuCommand': true
                }
            }
        },
        concat: {
            dist: {
                options: {
                    separator: '\n',
                    process: true
                },
                src: ['src/meta.js', 'src/header.js', 'src/rule.js', 'src/config.js', 'src/lang.js',
                    'src/lib.js', 'src/UI.js', 'src/parser.js', 'src/main.js'],
                dest: '<%= pkg.name %>.user.js'
            }
        },
        watch: {
            files: ['src/**/*.js'],
            tasks: ['default']
        }
    });

    grunt.registerTask('getincludes', 'Get include sites host from meta', function () {
        var source = grunt.file.read('src/meta.js');

        var lines = source.match(new RegExp("// @include.*://.*?/", 'ig'));
        var hosts = lines.map(function(line) {
            return line.match(/:\/\/(.*?)\//)[1].replace(/\*/g, '');
        });

        var unique = function(a){var o={},r=[],t;for(var i=0,l=a.length;i<l;i++){t=a[i];if(!o[t]){o[t]=true;r.push(t);}}return r;};

        hosts = unique(hosts);

        grunt.file.write('includes.txt', hosts.join('\n'));
    });

    grunt.registerTask('default', [
        //'jshint',
        'concat',
        // 'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
