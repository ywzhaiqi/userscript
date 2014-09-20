
var gulp = require('gulp');
var concat = require('gulp-concat');

var paths = [
    'src/meta.js', 'src/initHeader.js', 'src/prefs.js', 'src/lib.js', 
    'src/GalleryC.js', 'src/MagnifierC.js', 'src/ImgWindowC.js', 'src/LoadingAnimC.js', 'src/FloatBarC.js',
    'src/main.js', 'src/initFooter.js'
];

gulp.task('build', function() {
    gulp.src(paths)
        .pipe(concat('picviewerCE.user.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch(paths, ['build']);
});

gulp.task('default', ['watch', 'build']);