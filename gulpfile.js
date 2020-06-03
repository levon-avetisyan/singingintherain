const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const babelify = require('babelify');


sass.compiler = require('node-sass');

// Sass compilation
gulp.task('sass', function () {
    return gulp
        .src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// Sass watching, depending on "sass" task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

// Ejs Task
gulp.task('ejs', function () {
    return gulp.src('./views/*.ejs')
        .pipe(ejs({title: 'gulp-ejs'}))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('build/html'))
});
gulp.task('ejs:watch', function () {
    gulp.watch("./views/**/*", gulp.series('ejs'))
})

// ES6
gulp.task('es6', function () {
    browserify('./scripts/scripts.js')
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

gulp.task('es6:watch', function () {
    gulp.watch("./scripts/*", gulp.series('es6'))
})

// Nodemon task:
// Start nodemon once and execute callback (browser-sync)
gulp.task('nodemon', cb => {
    let started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
});

// BrowserSync task:
// calls nodemon tasks and pass itself as callback
gulp.task(
    'browser-sync',
    gulp.series('nodemon', () => {
        browserSync.init(null, {
            proxy: 'http://localhost:3000',
            files: ['build/**/*.*'],
            port: 5000
        });
    })
);

gulp.task('html', function () {
    return gulp.src('./views/*.ejs')
        .pipe(ejs({}, {}, {
            ext: '.html'
        }))
        .pipe(gulp.dest('build'))
});

// Dev Task:
// Parallel execution of browser-sync/nodemon
// and sass watching
gulp.task('default', gulp.parallel('browser-sync', 'sass:watch', 'ejs:watch', 'es6:watch'));