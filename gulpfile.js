var gulp = require('gulp'),
    dotenv = require('dotenv'),
    gulpif = require('gulp-if'),
    merge = require('merge-stream'),
    path = require('./gulp-conf.json');

$ = require('gulp-load-plugins')({ lazy: true });

dotenv.load();

var env = process.env.NODE_ENV || "development";

gulp.task('build', ['js', 'sass'], function() {
    var server = $.livereload.listen();
    gulp.watch(path.js, ['js']);
    gulp.watch(path.sass, ['sass']);
});


gulp.task('js', ['analyze'], function() {
    log('Compiling Scripts');
    return gulp.src(path.js)
        .pipe($.sourcemaps.init())
        .pipe($.concat('main.min.js'))
        .pipe(gulpif(env === 'production', $.uglify({
            mangle: true
        })))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('vendorjs', function() {
    log('Compiling Scripts');
    return gulp.src(path.vendorJs)
        .pipe($.sourcemaps.init())
        .pipe($.concat('vendor.min.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('vendorcss', function() {
    log('Compiling Vendor Scripts');
    return gulp.src(path.vendorCss)
        .pipe($.sourcemaps.init())
        .pipe($.concat('vendor.min.css'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});


gulp.task('sass', function() {
    log('Compiling Sass');

    return gulp.src(path.sass)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'compressed'
        }).on('error', $.sass.logError))
        .pipe($.concat('style.css'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe($.livereload());
});


/**
 * Code Inspector / Analyzer using JSHint and JSCS
 * 
 */

gulp.task('analyze', function() {
    log('Analyzing source with JSHint and JSCS');
    var jshint = analyzejshint([].concat(path.js));
    var jscs = analyzejscs([].concat(path.js));

    return merge(jshint, jscs);
});

function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');
    return gulp
        .src(sources)
        .pipe($.jshint(jshintrcFile))
        .pipe($.jshint.reporter('jshint-stylish'));
}


function analyzejscs(sources) {
    log('Running JSCS');
    return gulp
        .src(sources)
        .pipe($.jscs('./.jscsrc'));
}


/**
 * Logger function
 * 
 */


function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}