'use strict';

var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('watch', function() {

});

gulp.task('sass', function() {
    return gulp.src('app/sass/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
});