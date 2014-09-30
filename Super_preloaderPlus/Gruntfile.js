module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				options: {
					banner: '(function() {\n',
					footer: '\n})();',
					separator: '\n\n',
					process: true
				},
				src: [
					'src/meta.js', 'src/rule.js', 'src/libs.js',
					'src/FloatWindow.js', 'src/prefetcher.js', 'src/autopager.js',
					'src/setting.js', 'src/main.js'
				],
				dest: '<%= pkg.name %>.user.js'
			},
		},
		jshint: {
			beforeconcat: ['gruntfile.js', 'src/*.js'],
			afterconcat: ['<%= pkg.name %>.user.js'],
			options: {
				'browser': true,
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
		watch: {
			files: ['src/**/*.js'],
			tasks: [ 'jshint', 'concat']
		}
	});

	grunt.registerTask('default', ['jshint', 'concat', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

};