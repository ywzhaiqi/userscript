module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['tmp'],
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        copy: {
            dist: {
                cwd: 'src',
                src: ['*.js', '!meta.js'],
                dest: 'tmp/',
                expand: true
            }
        },
        concat: {
            meta: {
                src: ['src/meta.js'],
                dest: 'tmp/meta.js',
                options: { process: true }
            },
            dist: {
                src: ['tmp/meta.js', 'tmp/header.js', 'tmp/rule.js', 'tmp/config.js', 'tmp/lang.js',
                    'tmp/lib.js', 'tmp/UI.js', 'tmp/parser.js', 'tmp/main.js'],
                dest: '<%= pkg.name %>.user.js'
            }
        },
        // concat_sourcemap: {
        //     options: {
        //         sourcesContent: true
        //     },
        //     target: {
        //         files: {
        //             '<%= pkg.name %>.user.js': ['tmp/meta.js', 'tmp/header.js', 'tmp/rule.js', 'tmp/config.js', 'tmp/lang.js',
        //             'tmp/lib.js', 'tmp/parser.js', 'tmp/UI.js', 'tmp/main.js'],
        //         }
        //     }
        // },
        watch: {
            files: ['src/**/*.js'],
            tasks: ['default']
        }
    })

    grunt.registerTask('getincludes', 'Get include sites host from meta', function (arg1, arg2) {
        var source = grunt.file.read('src/meta.js');

        var lines = source.match(new RegExp("// @include.*://.*?/", 'ig'));
        var hosts = lines.map(function(line) { return line.match(/:\/\/(.*?)\//)[1].replace(/\*/g, ''); })

        var unique = function(a){var o={},r=[],t;for(var i=0,l=a.length;i<l;i++){t=a[i];if(!o[t]){o[t]=true;r.push(t)}}return r};

        hosts = unique(hosts);

        grunt.file.write('includes.txt', hosts.join('\n'));
    })

    grunt.registerTask('default', [
        //'jshint',
        'concat:meta',
        'copy',
        'concat:dist',
        // 'concat_sourcemap',
        'clean'
    ])

    grunt.registerTask('watch', ['watch'])

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    // grunt.loadNpmTasks('grunt-concat-sourcemap')

}