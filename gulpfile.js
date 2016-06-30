/**
 * Created by SQ04 Theophilus Omorebgee <theo4u@ymail.com> on 6/30/2016.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var rename= require('gulp-rename');
var gutil = require('gulp-util');//to help log any error found in our .js file


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('build',['build-css','build-js']);

gulp.task('build-css', function() {
    console.log("Build css");
    browserSync.reload();
});


gulp.task('build-js', function() {
    console.log("Build Our js");
    return gulp.src(['js/product-tour.js'])
        //.pipe(uglify())
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('product-tour.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch',['browserSync'], function(){
    gulp.watch('js/*.js', ['build-js']);
    gulp.watch('css/*.css', ['build-css']);
    gulp.watch('**/*.html', browserSync.reload);
});