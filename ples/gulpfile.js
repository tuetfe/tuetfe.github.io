"use strict";

var gulp = require("gulp"); 
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var precss = require("precss");
var minify = require("gulp-csso");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync");
var run = require("run-sequence");
var del = require("del");
var jade = require("gulp-jade");

// чтобы запустить эту задачу, наберите в командной строке gulp jade
gulp.task("jade", function() {
    return gulp.src("src/templates/**/*.jade")
        .pipe(jade()) 
        .pipe(gulp.dest("build"));
});

gulp.task("style", function() { 
  gulp.src("src/postcss/style.css")
    .pipe(plumber())
    .pipe(postcss([
      precss(),
      autoprefixer({browsers: [
        "last 3 version"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css")) 
    .pipe(minify()) 
    .pipe(rename("src/style.min.css")) 
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
  .pipe(gulp.dest("build/img"));
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

gulp.task("serve", function() {
  server.init({
    server: "build",
  });
  
  gulp.watch("src/postcss/**/*.css", ["style"]);
  gulp.watch("src/**/*.html").on("change", server.reload);
});

gulp.task("build", function(fn) {
  run(
    "clean", 
    "copy",
    "jade",
    "style", 
    "images", 
    "symbols", 
    fn 
  );
});

gulp.task("copy", function() { 
  return gulp.src([ 
    "src/fonts/**/*.{woff,woff2}", 
    "src/img/**", 
    "src/js/**", 
    "src/**/*.html" 
  ], {
    base: "."
  }) 
    .pipe(gulp.dest("build")); 
});

gulp.task("clean", function() { 
  return del("build"); 
});






