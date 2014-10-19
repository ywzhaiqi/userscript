module.exports = function(grunt) {

	var paths = [
	    'src/meta.js', 'src/header.js',
	    'src/prefs.js', 'src/rule.js', 'src/prefs_icons.js', 'src/prefs_share.js',
	    'src/lib.js',
	    'src/GalleryC.js', 'src/MagnifierC.js', 'src/ImgWindowC.js', 'src/LoadingAnimC.js', 'src/FloatBarC.js',
	    'src/third party/xhrLoad.js', 'src/third party/MPIV.js',
	    'src/main.js', 'src/footer.js'
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				options: {
					process: true
				},
				src: paths,
				dest: '<%= pkg.main %>'
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
