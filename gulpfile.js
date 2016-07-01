/**
 * Created by SQ04 Theophilus Omorebgee <theo4u@ymail.com> on 6/30/2016.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var rename= require('gulp-rename');
var gutil = require('gulp-util');//to help log any error found in our .js file
var del = require('del');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});


gulp.task('build', function (callback) {
    runSequence('clean',
      //build in parallel
        ['build-css', 'build-js'],
        callback
    )
});


gulp.task('build-css-files', function() {
    console.log("Build css");
    return gulp.src(['css/product-tour.css'])
        .pipe(cssnano().on('error', gutil.log))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('product-tour.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('build-js-files', function() {
    console.log("Build Our js");
    return gulp.src(['js/product-tour.js'])
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('product-tour.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build-js', function (callbacks) {
    runSequence('build-js-files','clean-js',
        callbacks
    )
});

gulp.task('build-css', function (callbacks) {
    runSequence('build-css-files','clean-css',
        callbacks
    )
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('clean-js', function () {
    return del.sync('dist/js/product-tour.js');
});

gulp.task('clean-css', function () {
    return del.sync('dist/css/product-tour.css');
});


gulp.task('watch',['browserSync'], function(){
    gulp.watch('js/*.js', ['build-js']);
    gulp.watch('css/*.css', ['build-css']);
    gulp.watch('**/*.html', browserSync.reload);
});

gulp.task("serve",['watch']);