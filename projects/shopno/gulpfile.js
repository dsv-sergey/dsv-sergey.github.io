var gulp = require("gulp"),
    browserify = require('browserify'),
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
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "app"
        },
        notify: false
    });
});

// gulp.task('jslibs', function () {
//     return gulp.src('app/js/libs/*.*')
//     .pipe(babel({
//         presets: ['env']
//     }))
//     .pipe(uglify())
//     .pipe(concat('jslib.js'))
//     .pipe(gulp.dest('dist/js'))
// })

gulp.task('jslibs', function() {
    return gulp.src(['./bower_components/jquery/dist/jquery.min.js', './bower_components/owl.carousel/dist/owl.carousel.min.js', './bower_components/wow/dist/wow.min.js'])
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/js'));
  });

gulp.task('appjs', function () {
    return gulp.src('app/js/*.*')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('buildHtml', function () {
    return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('img', function() {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            interlased: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('scripts', gulp.series('jslibs', 'appjs'));

gulp.task('build', gulp.series('clean', 'img','fonts' , 'sass', 'scripts', 'buildHtml'));

// var gulp         = require('gulp'),
//     browserSync  = require('browser-sync'),
//     sass         = require('gulp-sass'),
//     cleanCSS     = require('gulp-clean-css'),
//     autoprefixer = require('gulp-autoprefixer'),
//     concat       = require('gulp-concat'),
//     uglify       = require('gulp-uglifyjs'),
//     rename       = require('gulp-rename'),
//     del          = require('del'),
//     htmlmin      = require('gulp-htmlmin'),
//     imagemin     = require('gulp-imagemin'),
//     pngquant     = require('imagemin-pngquant'),
//     cache        = require('gulp-cache');
 
// // Browser synchronization
// gulp.task('browser-sync', function() {
//   browserSync({
//     server: {
//       baseDir: 'app'
//     },
//     notify: false
//   });
// });
 
// // Compile .sass to .css
// gulp.task('sass', function() {
//   return gulp.src('app/sass/**/*.sass')
//   .pipe(sass({outputStyle: 'compressed'}))
//   .pipe(rename({suffix: '.min', prefix : ''}))
//   .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
//   .pipe(gulp.dest('app/css'))
//   .pipe(browserSync.reload({stream:true}));
// });
 
// // Concatenate all .css from /libs/ to libs.min.css
// gulp.task('styles', function() {
//   return gulp.src([
//     'app/libs/animate.css/3.7.0/animate.min.css',
//     'app/libs/jquery-form-styler/jquery.formstyler.theme.css',
//     'app/libs/jquery-form-styler/jquery.formstyler.css',
//     'app/libs/perfect-scrollbar/perfect-scrollbar.css'
//     ])
//     .pipe(cleanCSS())
//     .pipe(concat('libs.min.css'))
//     .pipe(gulp.dest('app/css'));
// });
 
// // Concatenate all .js from /libs/ to libs.min.js
// gulp.task('scripts', function() {
//   return gulp.src([
//     'app/libs/jquery/dist/jquery.min.js',
//     'app/libs/waypoints/waypoints.min.js',
//     'app/libs/animate/animate-css.js',
//     'app/libs/lottie/lottie.min.js',
//     'app/libs/jquery-form-styler/jquery.formstyler.min.js',
//     'app/libs/perfect-scrollbar/perfect-scrollbar.min.js'
//     ])
//   .pipe(concat('libs.min.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('app/js'));
// });
 
// // Optimize HTML
// gulp.task('minify-html', function() {
//   return gulp.src('app/**/*.html')
//   .pipe(htmlmin({collapseWhitespace: true}))
//   .pipe(gulp.dest('dist'));
// });
 
// // Optimize images
// gulp.task('img', function() {
//   return gulp.src('app/images/**/*')
//   .pipe(cache(imagemin({
//     interlaced: true,
//     progressive: true,
//     svgoPlugins: [{removeViewBox: false}],
//     use: [pngquant()]
//   })))
//   .pipe(gulp.dest('dist/images'));
// });
 
// // Cleaning Production distributive
// gulp.task('clean', function(done) {
//   del.sync('dist');
//   done();
// });
 
// // Clear Cache
// gulp.task('clear', function() {
//   return cache.clearAll();
// });
 
// // Build Production Site
// gulp.task('build-dist', function(done) {
//   var buildCss = gulp.src('app/css/**/*.css')
//   .pipe(gulp.dest('dist/css'));
 
//   var buildJs = gulp.src('app/js/**/*.js')
//   .pipe(gulp.dest('dist/js'));
 
//   var buildData = gulp.src('app/data/**/*')
//   .pipe(gulp.dest('dist/data'));
 
//   var buildImages = gulp.src('app/images/**/*')
//   .pipe(gulp.dest('dist/images'));
 
//   done();
// });
 
// // Watch for all file changes
// gulp.task('watch', function () {
//   gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
//   gulp.watch('app/libs/**/*.js', gulp.parallel('scripts'));
//   gulp.watch('app/js/*.js').on("change", browserSync.reload);
//   gulp.watch('app/*.html').on('change', browserSync.reload);
// });
 
// // Build Production Site with all updates
// gulp.task('build', gulp.series('clean', 'img', 'sass', 'styles', 'scripts', 'minify-html', 'build-dist'));
 
// // Watch for all file changes during work
// gulp.task('default', gulp.parallel('sass', 'styles', 'scripts', 'browser-sync', 'watch'));