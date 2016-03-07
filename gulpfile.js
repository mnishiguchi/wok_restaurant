'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./assets/styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/styles/scss/*.scss', ['sass']);
});

gulp.task( 'default', [
  'sass',
  'sass:watch'
]);
