'use strict';

/**
 * Reference:
 * Gulp for Beginners
 * https://css-tricks.com/gulp-for-beginners/
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

// To live-reload.
var browserSync = require('browser-sync').create();
// To use if conditional statements.
var gulpIf = require('gulp-if');
// To replace HTML tags with references to minified files.
var useref = require('gulp-useref');
// To minify JS.
var uglify = require('gulp-uglify');
// To minify CSS.
var cssnano = require('gulp-cssnano');
// To minify images.
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// Sanity check.
gulp.task( 'hello', function () {
  console.log("--- Hello test ---");
});


// Initialize Browser Sync for live-reloading.
// Let Browser Sync know where the root of the server should be.
gulp.task( 'browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


// Convert SCSS files to CSS.
gulp.task('sass', function() {
  return
    // Gets all files ending with .scss in app/scss.
    gulp.src( 'app/styles/scss/**/*.scss' )
      .pipe( sass().on( 'error', sass.logError ) )
      .pipe( gulp.dest( './app/styles/css' ) )
      .pipe( browserSync.reload({
        stream: true
      }))
});


// Minify JS and CSS files and
// replace with refs the script/link tags that are specified in HTML files.
gulp.task( 'useref', function() {
  return gulp.src( 'app/*.html' )
    // Set references to minified files in the HTML.
    .pipe( useref() )
    // Minify only if it's a JavaScript file.
    .pipe( gulpIf( '*.js', uglify()) )
    // Minifies only if it's a CSS file.
    .pipe( gulpIf( '*.css', cssnano()) )
    .pipe( gulp.dest( 'dist' ) )
});


// Optimize Images.
gulp.task( 'img', function() {
  return gulp.src( 'app/img/**/*.+(png|jpg|gif|svg)' )
  // Caching images that ran through imagemin
  .pipe( cache( imagemin({
      interlaced: true
    })))
  .pipe( gulp.dest( 'dist/img' ) )
});


// Copy other files to dist directory
gulp.task( 'partials', function() {
  return gulp.src( 'app/partials/**/*' )
    .pipe(gulp.dest( 'dist/partials' ) )
})

// Keep watch on changes.
gulp.task( 'watch',
  [ 'browserSync', 'sass' ], // Tasks to be run before watching.
  function () {
    gulp.watch( 'app/styles/scss/**/*.scss', [ 'sass' ] );
  }
);


// The defalt tasks.
gulp.task( 'default', [
  'hello',
  'watch'
]);
