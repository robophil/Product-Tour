/**
 * Created by SQ04 Theophilus Omorebgee <theo4u@ymail.com> on 6/30/2016.
 */
var gulp = require('gulp');

gulp.task('build', function() {
    console.log("Theohilus");
});
gulp.task('build-css', function() {
    console.log("Theohilus css");
});
gulp.task('build-js', function() {
    console.log("Theohilus js");
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['build-js']);
    gulp.watch('css/*.css', ['build-css']);
})