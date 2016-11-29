var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    plumber = require("gulp-plumber"),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    svgstore = require("gulp-svgstore"),
    svgmin = require("gulp-svgmin"),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('scripts', function () {
    return gulp.src([
            'src/libs/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('src/js/'));
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('src/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        })))
        .pipe(gulp.dest('build/img'));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task('clear-cache', function () {
    return gulp.clearAll();
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clear', function () {
    return del.sync('build');
});

/**
 * WATCH
 */
gulp.task('watch', ['browser-sync', 'css-libs' , 'scripts'], function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

/**
 * BUILD
 */
gulp.task('build', ['clear', 'sass', 'scripts', 'img'], function () {
    // css
    gulp.src([
            'src/css/style.css',
            'src/css/libs.min.css'
        ])
        .pipe(gulp.dest('build/css'));

    // fonts
    gulp.src([
            'src/fonts/**/*'
        ])
        .pipe(gulp.dest('build/fonts'));

    // js
    gulp.src([
            'src/js/**/*'
        ])
        .pipe(gulp.dest('build/js'));

    // html
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'));
});