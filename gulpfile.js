var CNAME = '~.surge.sh';
var path = {
    prod: './prod',
    dev: './dev',
    src: './src',
    scripts: '/scripts',
    styles: '/styles',
    views: '/views',
    images: '/media',
    
    jquery: './node_modules/jquery/dist/jquery.min.js',
    normalizecss: './node_modules/normalize.css/normalize.css',
};
path.sscripts = path.src +  path.scripts;
path.sstyles = path.src + path.styles;
path.sviews = path.src + path.views;
path.simages = path.src + path.images;

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    jade = require('gulp-jade'),
    cssmin = require('gulp-cssnano'),
    jsmin = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-rimraf'),
    run = require('run-sequence'),
    surge = require('gulp-surge'),
    concat = require('gulp-concat'),
    pngquant = require('imagemin-pngquant');
    


/* VIEWS */
var dviews = 'dev-views',
    pviews = 'prod-views';
gulp.task(dviews, function() {
    var YOUR_LOCALS = {};
    return gulp.src(path.sviews + '/*.jade')
    .pipe(jade({
        locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(path.dev));
});

gulp.task(pviews, function() {
    var YOUR_LOCALS = {};
    return gulp.src(path.sviews + '/*.jade')
    .pipe(jade({
        locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(path.prod));
});
/* VIEWS END */


/* CSS */
var dstyles = 'dev-styles',
    pstyles = 'prod-styles';
gulp.task(dstyles, function() {
    return gulp.src([path.normalizecss, path.sstyles + '/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(path.dev));
});

gulp.task(pstyles, function() {
    return gulp.src(path.sstyles + '/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod));
});
/* CSS END */



/* JAVASCRIPT */
var dscripts = 'dev-scripts',
    pscripts = 'prod-scripts';
gulp.task(dscripts, function() {
    return gulp.src([path.jquery, path.sscripts + '/main.js', path.sscripts + '/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.dev));
});

gulp.task(pscripts, function() {
    return gulp.src([path.jquery, path.sscripts + '/main.js', path.sscripts + '/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(jsmin())
    .pipe(gulp.dest(path.prod));
});
/* JAVASCRIPT END */



/* IMAGES */
var dimages = 'dev-images',
    pimages = 'prod-images';
gulp.task(dimages, function() {
    return gulp.src(path.simages + '/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.dev));
});

gulp.task(pimages, function() {
    return gulp.src(path.simages + '/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.prod));
});
/* IMAGE END */



/* WATCH */

gulp.task('watch', function() {
    gulp.watch(path.sviews + '/**/*', [dviews]);
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
    return gulp.src(path.dev, { read: false })
        .pipe(clean());
});

gulp.task(pclean, function () {
    return gulp.src(path.prod, { read: false })
        .pipe(clean());
});
/* CLEAN END */



/* DEPLOY */
var ddeploy = 'dev-deploy',
    pdeploy = 'prod-deploy';
gulp.task(ddeploy, function() {
    return surge({
        project: path.dev,
        domain: CNAME,
    });
});

gulp.task(pdeploy, function() {
    return surge({
        project: path.prod,
        domain: CNAME,
    });
});
/* DEPLOY END */



/* BUILDS */
var dbuild = 'dev-build',
    pbuild = 'prod-build';
gulp.task(dbuild, function(callback) {
    run(dclean, [dviews, dimages, dstyles, dscripts], ddeploy, callback);
});

gulp.task(pbuild, function(callback) {
    run(pclean, [pviews, pimages, pstyles, pscripts], pdeploy, callback);
});
/* BUILDS END */



gulp.task('default', [dbuild], function() {
  // place code for your default task here
});
