var gulp = require('gulp');
var install = require('gulp-install');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

gulp.task('build', ['uglify'], function() {
	console.log('built!');
});

gulp.task('uglify', ['webpack'], function() {
	return gulp.src('./public/javascripts/bundle.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('webpack', ['install'], function() {
	return gulp.src('./client/main.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('install', [], function() {
	return gulp.src('./package.json')
		.pipe(install());
});

module.exports = gulp;
