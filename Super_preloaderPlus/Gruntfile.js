module.exports = function(grunt) {

    var concatOptions = {
        banner: '(function() {\n',
        footer: '\n})();',
        separator: '\n\n//----------------------------------\n',
        process: true
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                options: concatOptions,
                src: ['src/meta.js', 'src/rule.js', 'src/setting.js', 'src/main.js'],
                dest: '<%= pkg.name %>.user.js'
            },
        },
        watch: {
            files: ['src/**/*.js'],
            tasks: ['default']
        }
    })


    grunt.registerTask('split', 'split file', function () {
        grunt.file.expand('src/*').forEach(function(path){
            grunt.file.delete(path);
        });

        var source = grunt.file.read('super_preloaderplus_one.user.js');

        // 去除首行和尾行
        source = source.replace(/^\(function\(\).*/, '')
            .replace(/\}\)\(\);$/, '');

        var arr = source.split(/\n\/\/\-+/);

        arr.forEach(function (text, index) {
            if (index === 0) {
                grunt.file.write('src/meta.js', text);
            } else {
                var match = text.match(/\n\/\/\s*(.*)/);
                var name = match ? match[1] : ('split' + index + '.js' );
                grunt.file.write('src/' + name, text);
            }
        });

        // grunt.log.writeln();
    });


    grunt.registerTask('default', [
        //'jshint',
        'concat',
    ])

    grunt.registerTask('watch', ['watch'])

    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-watch')

}
