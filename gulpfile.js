var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    jade = require('gulp-jade'),
    cssmin = require('gulp-cssnano'),
    jsmin = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    run = require('run-sequence');
    //rename = require('gulp-rename'),
    //concat = require('gulp-concat'),
    //source = require('vinyl-source-stream'),
    //browserify = require('browserify');
    
     
var path = {
    prod: './prod',
    dev: './dev',
    src: './src',
    scripts: '/scripts',
    styles: '/styles',
    views: '/views',
    //dscript: path.dev + path.scripts,
    //dstyle: path.dev + path.styles,
    //dviews: path.dev + path.views,
    //pscripts: path.prod + path.scripts,
    //pstyles: path.prod + path.styles,
    //pviews: path.prod + path.views,
    sscripts: path.src + path.scripts,
    sstyles: path.src + path.styles,
    sviews: path.src + path.views,
};

/* VIEWS */
var views = 'views';
gulp.task(views, function() {
    var YOUR_LOCALS = {};
    return gulp.src(path.sviews + '/*.jade')
    .pipe(jade({
        locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(path.dev));
});
/* VIEWS END */



/* JAVASCRIPT */
var dscripts = 'dev-scripts',
    pscripts = 'prod-scripts';
gulp.task(dscripts, function() {
    return gulp.src(path.sscripts + '/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest(path.dev));
});

gulp.task(pscripts, function() {
    return gulp.src(path.sscripts + '/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    //concat all javascript files?
    .pipe(jsmin())
    .pipe(gulp.dest(path.prod));
});
/* JAVASCRIPT END */


/* CSS */
var dstyles = 'dev-styles',
    pstyles = 'prod-styles';
gulp.task(dstyles, function() {
    return gulp.src(path.sstyles + '/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.dev));
    
    // return gulp.src(['./node_modules/normalize.css/normalize.css', './DEV/css/*.css'])
    // .pipe(concat('app.min.css'))
    // .pipe(cssmin())
    // //.pipe(rename({suffix:'.min'}))
    // .pipe(gulp.dest('./PROD/'));
});

gulp.task(pstyles, function() {
    return gulp.src(path.sstyles + '/*.scss')
    .pipe(sass().on('error', sass.logError))
    //concat all css files?
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod));
});
/* CSS END */



/* WATCH */

gulp.task('watch', function() {
    gulp.watch(path.sviews + '/**/*', [views]);
    gulp.watch(path.sscripts + '/**/*', [dscripts]);
    gulp.watch(path.sstyles + '/**/*', [dstyles]);
    //process.stdout.write('surge ./PROD/');
});
/* WATCH END */



/* CLEAN */
var dclean = 'dev-clean',
    pclean = 'prod-clean';
gulp.task('clean', function (callback) {
    run(['prod-clean','dev-clean'], callback);
});

gulp.task(dclean, function () {
    gulp.src(path.dev, { read: false })
        .pipe(clean());
});

gulp.task(pclean, function () {
    gulp.src(path.prod, { read: false })
        .pipe(clean());
});
/* CLEAN END */


/* BUILDS */
var dbuild = 'dev-build',
    pbuild = 'prod-build';
gulp.task(dbuild, function(callback) {
    run(dclean, [views, dstyles, dscripts], callback);
});

gulp.task(pbuild, function(callback) {
    run(pclean, [views, pstyles, pscripts], callback);
});
/* BUILDS END */



gulp.task('default', ['watch'], function() {
  // place code for your default task here
});