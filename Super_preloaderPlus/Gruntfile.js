module.exports = function(grunt) {

	var res = {
		get: function(path) {
			return res.wrap(res.read('./src/res/' + path));
		},
		read: function (path) {
		    var str = grunt.file.read(path, { encoding: 'utf-8' });
		    return str;
		},
		wrap: function(str) {
		    return "'" +
		            str.trim()
		                .replace(/\\/g, '\\\\')
		                .replace(/\r?\n/g, '\\n')
		                .replace(/'/g, "\\'") +
		            "'";
		},
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		res: {
			get FloatWindowCSS() {
				return res.get('FloatWindow.css');
			},
			get FloatWindowHTML() {
				return res.get('FloatWindow.html');
			},
			get manualDivCSS() {
				return res.get('manualDiv.css');
			},
			get separatorCSS() {
				return res.get('separator.css');
			}
		},
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
			tasks: [
				// 'jshint',
				'concat'
			]
		}
	});

	grunt.registerTask('default', [
		// 'jshint',
		'concat',
		'watch'
	]);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

};
