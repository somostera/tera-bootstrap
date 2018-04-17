// Defining base paths
var basePaths = {
    js: './js/',
    node: './node_modules/',
    dev: './src/'
};


// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
    './css/*.css',
    './js/*.js',
    './index.html'
];


// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    proxy: "localhost/tera/styleguide/",
    notify: false
};


// Defining requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');


// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function () {
    var stream = gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
    return stream;
});


gulp.task('minify-css', function() {
  return gulp.src('./css/theme.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
});

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch([basePaths.dev + 'js/**/*.js','js/main.js']);
});

gulp.task('styles', function(callback){ gulpSequence('sass', 'minify-css')(callback) });
 

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});


// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browser-sync', 'watch'], function () { });


