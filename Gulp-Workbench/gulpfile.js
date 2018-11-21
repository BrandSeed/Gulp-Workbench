const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

/*
  @Traversy Media

  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Reference file to use
  gulp.dest - Destination folder
  gulp.watch - Watch files and folders for changes
*/

// Pug to HTML
gulp.task('pug', function(){
  // GitEasy
  gulp.src('pug/mainPug/indexGit.pug')
    .pipe(pug('index.html'))
    .pipe(gulp.dest('GitEasy'));

  // Final Project
  gulp.src('pug/mainPug/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('live'))

  // Activate BrowserSync
  .pipe(browserSync.stream());
});

// Compile Sass & Minify CSS
gulp.task('sass', function() {
  gulp.src('sass/style.sass')
    // Compile SASS
    .pipe(sass().on('error', sass.logError))

    // Auto Prefixer
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))

    // Store to GitEasy
    .pipe(gulp.dest('GitEasy'))

    // Minify
    .pipe(cleanCSS())

    // Store to Ugly Folder
    .pipe(gulp.dest('ugly/css'))

    // Activate BrowserSync
    .pipe(browserSync.stream());
});


// Concat and Minify JS
gulp.task('concat', function() {
  gulp.src('js/*.js')
    // Concat
    .pipe(concat('app.js'))

    // Store to GitEasy
    .pipe(gulp.dest('GitEasy'))

    // Babel
    .pipe(babel())

    // Minify
    .pipe(uglify())

    // Store to Ugly Folder
    .pipe(gulp.dest('ugly/js'))

    // Activate BrowserSync
    .pipe(browserSync.stream());
});

// Local Host Server
gulp.task('serve', ['pug', 'sass', 'concat'], function() {
  // Set Server
  browserSync.init({
    server: './live'
  });

  // Watch Files
  gulp.watch('pug/*', ['pug']);
  gulp.watch('pug/mainPug/*', ['pug']);
  gulp.watch('sass/*', ['sass','pug']);
  gulp.watch('js/*', ['concat','pug']);

  // Fire it UP!
  gulp.watch('live/*').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
