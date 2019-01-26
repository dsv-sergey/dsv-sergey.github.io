var gulp = require("gulp"),
    watch = require("gulp-watch"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglifyjs"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename"),
    del = require("del"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    cache = require("gulp-cache"),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber"),
    babel = require("gulp-babel");

gulp.task("sass", function () {
    return gulp
        .src("app/sass/*.sass")
        .pipe(plumber())
        .pipe(sass())
        .pipe(
            autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
                cascade: true
            })
        )
        .pipe(plumber.stop())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "app"
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src([
        
    ])
})