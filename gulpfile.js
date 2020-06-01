// Gulp
const gulp = require('gulp');
const yarn = require('gulp-yarn');


const babel = require('gulp-babel');
const babellify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


//Task manager
gulp.task('yarn', function() {
    return gulp.src(['./package.json', './yarn.lock'])
        .pipe(gulp.dest('./dist'))
        .pipe(yarn({
            production: true
        }));
});

// Templates
const ejs = require('gulp-ejs');

// Stylesheet
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Notify
const notify = require('gulp-notify');

// JS
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Server
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const reload = browserSync.reload;


gulp.task('default', ['styles', 'watch', 'es6']);

gulp.task('build', ['html', 'styles', 'es6']);

gulp.task('watch', ['browserSync'], function() {
    gulp.watch(["./js/scripts.js"], ['es6'], reload);
    gulp.watch(["./sass/**/*"], ['styles'], reload);
    gulp.watch(["./views/**/*"], reload);
});

gulp.task('browserSync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3200"
    });
});

gulp.task('nodemon', function(cb) {
    let callbackCalled = false;
    return nodemon({
        script: './server.js'
    }).on('start', function() {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

gulp.task('styles', function() {
    gulp.src('./sass/main.scss')
        .pipe(sass({ errLogToConsole: true }))
        .on('error', function(err) {
            return notify().write(err)
        })
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function() {
    return gulp.src('./views/*.ejs')
        .pipe(ejs({}, {}, {
            ext: '.html'
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('es6', () => {
    browserify('./js/scripts.js')
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});