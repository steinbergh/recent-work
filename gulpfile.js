var gulp = require('gulp');
var browserSync = require("browser-sync").create();
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('css', function ()
{
    gulp.src('./src/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(sourcemaps.write('./dist/css/maps'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream({match: '/**/*.css'}))
        .pipe(cleanCSS({}))
        .pipe(rename(function (path) {
             path.basename += ".min";
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({message: 'SCSS Compiled!'}));
});

gulp.task('watch', function () {
    browserSync.init({
        server: true
    });
    gulp.watch('./src/**/*.scss', ['css']);
});

gulp.task('default', ['watch']);