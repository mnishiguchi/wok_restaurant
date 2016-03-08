'use strict';

/**
 * Reference:
 * - https://css-tricks.com/gulp-for-beginners/
 * - http://zellwk.com/blog/gulp-tutorial/
 * - https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
 */

var gulp = require('gulp');
// Live-reload.
var browserSync = require('browser-sync').create();
// Use if conditional statements.
var gulpIf = require('gulp-if');
// Replace HTML tags with references.
var useref = require('gulp-useref');
// Detect invalid JS syntax.
var jshint = require('gulp-jshint');
// Minify JS.
var uglify = require('gulp-uglify');
// Convert SCSS to CSS.
var sass = require('gulp-sass');
// Prefix CSS.
var autoprefixer = require('gulp-autoprefixer');
// Minify CSS
var cssnano = require('gulp-cssnano');
// Optimize images.
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// Sourcemaps.
var sourcemaps = require('gulp-sourcemaps');
// Cleaning.
var del = require('del');
// Run the tasks in the specific order.
var runSequence = require('run-sequence');


//==========================================================//
// Development tasks
//==========================================================//


// Initialize Browser Sync for live-reloading.
// Let Browser Sync know where where to find our index.html file.
gulp.task( 'server', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


// Configure the jshint task.
gulp.task('jshint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter( 'jshint-stylish' ) );
})



// Convert SCSS files to CSS.
// Reload the browser.
gulp.task( 'sass', function() {
  return gulp.src( 'app/styles/scss/**/*.scss' )  // Read a file.
    .pipe( sourcemaps.init() )                    // Process the original sources.
    .pipe( sass() )                               // Convert SCSS to CSS.
    .pipe( autoprefixer() )                       // Add vender-prefixes.
    .pipe( sourcemaps.write() )                   // Write sourcemaps.
    .pipe( gulp.dest( 'app/styles/css' ) )        // Save the resulting file.
    .pipe( browserSync.reload({ stream: true }) ) // Reloading the stream.
})


// Keep watch on changes.
gulp.task( 'watch',
  [ 'server', 'sass' ], // Tasks to be run before executing this task.
  function () {
    gulp.watch( 'app/styles/scss/**/*.scss', [ 'sass' ] );
    gulp.watch( 'app/js/**/*.js', [ 'jshint' ] );
})


//==========================================================//
// Production / Optimization tasks
//==========================================================//


// 1. Contatenate JS and CSS files.
// 2. Replace the reference tags as specified in HTML files.
// 3. Minify JS and CSS files.
gulp.task( 'useref', function() {
  return gulp.src( 'app/*.html' )
    .pipe( useref() )                    // Concatenate JS and CSS files.
    .pipe( gulpIf( '*.js', uglify()) )   // Minify if it's a JS file.
    .pipe( gulpIf( '*.css', cssnano()) ) // Minify if it's a CSS file.
    .pipe( gulp.dest( 'dist' ) )
})


// Optimize Images.
// Cache images that ran through imagemin.
gulp.task( 'images', function() {
  return gulp.src( 'app/img/**/*.+(png|jpg|gif|svg)' )
    .pipe( cache( imagemin({
        interlaced: true,
        progressive: true
      })))
    .pipe( gulp.dest( 'dist/img' ) )
})


// Copy the HTML partials to the dist directory.
gulp.task( 'partials', function() {
  return gulp.src( 'app/partials/**/*' )
    .pipe( gulp.dest( 'dist/partials' ) )
})


// Cleaning (deleting) the dist directory.
gulp.task( 'clean:dist', function() {
  return del.sync( 'dist' );
})


// Clear the caches on my local system.
// Use on an as-needed basis.
gulp.task( 'cache:clear', function ( callback ) {
  return cache.clearAll( callback );
})


//==========================================================//
// Build (Production)
// - Usage: $ gulp build
//==========================================================//


gulp.task( 'build', function ( callback ) {
  runSequence(
    'clean:dist',
    [ 'sass', 'useref', 'images', 'partials' ],  // Run there tasks simultaneously.
    callback
  )
})


//==========================================================//
// Default (Development)
// - Usage: $ gulp
//==========================================================//


gulp.task( 'default', function ( callback ) {
  runSequence(
    [ 'sass', 'server', 'watch' ],  // Run there tasks simultaneously.
    callback
  )
})
