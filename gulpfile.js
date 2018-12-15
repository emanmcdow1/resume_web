////////////////////////////////////////////////////////////////////////////////
///Required
////////////////////////////////////////////////////////////////////////////////
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    uglifycss = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat'),
    strip = require('gulp-strip-comments'),
    plumber = require('gulp-plumber'),
    onError = function (err) {
      gutil.beep();
      console.log(err);
    };

////////////////////////////////////////////////////////////////////////////////
///Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('test', function() {
    console.log("it works bro");
});

gulp.task('uglify', function(){
    gulp.src(['js/all.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(rename({suffix:'-min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'));

    gulp.src(['css/*.css', '!css/*.min.css'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(rename({suffix:".min"}))
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('imagemin', function(){
    gulp.src(['assets/*', '!assets/*.min.*'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(rename({suffix:'.min'}))
    .pipe(imagemin())
    .pipe(gulp.dest('assets'))
});

gulp.task('webserver', function() {
  gulp.src('./')
  .pipe(plumber({
    errorHandler: onError
  }))
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('concat', function(){
  gulp.src(['js/*.js', '!js/all.js', '!js/*.min.js'])
  .pipe(plumber({
    errorHandler: onError
  }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('strip', function(){
  gulp.src(['js/all-min.js'])
  .pipe(plumber({
    errorHandler: onError
  }))
    .pipe(strip())
    .pipe(gulp.dest('js/all-min.js'));

  gulp.src(['css/style.min.css'])
  .pipe(plumber({
    errorHandler: onError
  }))
    .pipe(strip())
    .pipe(gulp.dest('css/style.min.css'));
})
////////////////////////////////////////////////////////////////////////////////
///Watch
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function(){
    gulp.watch(['js/*.js', '!js/all.js', '!js/*-min.js'], ['concat']),
    gulp.watch('js/all.js', ['uglify']),
    gulp.watch('css/*.css', ['uglify']);
})
////////////////////////////////////////////////////////////////////////////////
///Default
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['watch', 'webserver']);
