var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var staticsGlob = 'src/**/*.@(jpg|png|eot|svg|ttf|woff|woff2|html)';
gulp.task('statics', function () {
  return gulp.src(staticsGlob)
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  return gulp.src('src/**/*.js?(x)')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(changed('dist', { extension: '.js' }))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts', 'statics'], function () {
  gulp.watch(staticsGlob, ['statics']);
  gulp.watch('src/**/*.js?(x)', ['scripts']);
});

gulp.task('dist', ['scripts', 'statics'], function () {});
