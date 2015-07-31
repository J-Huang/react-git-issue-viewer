var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  connect = require('gulp-connect-multi')(),
  reactify = require('reactify'),
  watchify = require('watchify'),
  watch = require('gulp-watch');

gulp.task('build', function(){
  var br = browserify({
    entries: ['./src/js/detail.js'],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  br = watchify(br);
  br.on('update', function(){
    console.log('update');
    build(br);
  });
  build(br);
});

gulp.task('connect', connect.server({
    root: ['build'],
    port: 9003,
    livereload: true,
    open:{
    browser:  'Google Chrome' //'chrome'
  }
}));

gulp.task('default', ['build', 'connect'], function(){
  watch('./build/css/*.css', function(){
    console.log('css updates...');
  }).pipe(connect.reload());
});


function build(br){
  console.log('build');
  br.bundle()
    .pipe(source('detail.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
}