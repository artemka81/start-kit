var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var pug          = require('gulp-pug');
var sass         = require('gulp-sass');
var sassGlob     = require('gulp-sass-glob');
var rev          = require('gulp-rev-append');
var autoprefixer = require("gulp-autoprefixer");

/*---- SERVER ---- */
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ---- PUG ---- */
gulp.task('template', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(rev())
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
});

/* ---- SCSS ---- */
gulp.task('sass', function () {
  return gulp.src('source/scss/main.scss')
  	.pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 4 versions'] }))
    .pipe(gulp.dest('build/css'));
});

/* ---- Copy fonts ---- */
gulp.task('copy:fonts', function(){
	return gulp.src('./source/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts'));
});

/* ---- Copy images ---- */
gulp.task('copy:img', function(){
	return gulp.src('./source/img/**/*.*')
		.pipe(gulp.dest('build/img'));
});

/* ---- Copy images ---- */
gulp.task('copy:js', function(){
	return gulp.src('./source/js/main.js')
		.pipe(gulp.dest('build/js'));
});

/* ---- Copy fonts + images ---- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:img', 'copy:js'));


/* ---- WATCH ---- */
gulp.task('watch', function(){
	gulp.watch('source/template/**/*.pug', gulp.series('template'));
	gulp.watch('source/scss/**/*.scss', gulp.series('sass'));
});

/* ---- DEFAULT ---- */
gulp.task('default', gulp.series(
	gulp.parallel('template', 'sass', 'copy'),
	gulp.parallel('watch', 'server')
	));