var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var path = {
    css:  './src/*.scss',
    html: {
        pages: './src/pages/**/*.hbs',
        partials: './src/partials/'
    },
    templates: 'src/partials/includes/*.hbs',
    favicons: 'src/favicons/*',
    images: 'src/**/images/*',
    fonts: 'src/fonts/*',
    mock: 'src/mockapi/*.json',
    scripts: 'src/scripts/*.js',
    dist: {
      css:  './dist/',
      fonts: 'dist/fonts/',
      images: './dist/',
      html: './dist/',
      templates: './dist/partials/includes',
      mock: './dist/mockapi',
      scripts: './dist/scripts'
    },
    watch: {
        css: './src/**/*.scss',
        html: './src/**/*.hbs'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('fonts', function () {
  return gulp.src(path.fonts)
  .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('images', function () {
  return gulp.src([path.images, path.favicons])
  .pipe(gulp.dest(path.dist.images));
});

gulp.task('html', function () {
    return gulp.src(path.html.pages)
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: [path.html.partials]
        }))
        .pipe(rename({
            dirname: '.',
            extname: '.html'
        }))
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('templates', function () {
  return gulp.src(path.templates)
  .pipe(gulp.dest(path.dist.templates));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.dist.mock));
});

gulp.task('scripts', function () {
  return gulp.src(path.scripts)
    .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('build', ['html', 'css', 'images', 'fonts', 'templates', 'mock', 'scripts']);

gulp.task('watch', function () {
  gulp.watch(path.watch.css, ['css']);
  gulp.watch(path.fonts, ['fonts']);
  gulp.watch(path.images, ['images']);
  gulp.watch(path.scripts, ['scripts']);
  gulp.watch(path.mock, ['mock']);
  gulp.watch(path.templates, ['templates']);
  gulp.watch(path.watch.html, ['html']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
