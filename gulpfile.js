var gulp = require('gulp');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var clean = require ('gulp-clean');
var concat = require ('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var replace = require('gulp-replace');

// DeleteDist
gulp.task('cleanDist', function() {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('buildTemplates', function() {
    gulp.src('./htmls/*.html')
        .pipe(htmlreplace({
            'styles': 'styles.min.css',
            'scripts': 'scripts.min.js'
        }))
        .pipe(gulp.dest('dist/app/'));
});


gulp.task('minifyCss', function() {
    gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
        'css/main.css'
    ])
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/app/'))
});

gulp.task('minifyJs', function() {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/owl.carousel/dist/owl.carousel.min.js',
        'js/common.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename("scripts.min.js"))
        .pipe(gulp.dest('dist/app/'));
});


gulp.task('moveAssets', function() {
    gulp.src('img/**/*.*')
        .pipe(gulp.dest('dist/img/'));
    gulp.src([
        'fonts/**/*.*'])
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('build', ['cleanDist'], function() {
    runSequence(
        'moveAssets',
        'minifyCss',
        'minifyJs',
        'buildTemplates'
    )
});
