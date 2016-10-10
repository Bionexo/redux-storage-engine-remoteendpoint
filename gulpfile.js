const gulp = require('gulp');
const eslint = require('gulp-eslint');
const watch = require('gulp-watch');
const print = require('gulp-print');
const gutil = require('gulp-util');
const chalk = require('chalk');

const lintFiles = ['src/**/*.js', '!node_modules/**'];

gulp.task('lint', () => {
  return gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:watch', () => {
  var watcher = gulp.watch(lintFiles, (file) => {
    gulp.src(file.path)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.result(result => {
        if (result.warningCount == 0 && result.errorCount == 0) {
          gutil.log(chalk.green("ESLint: Everything ok!"));
        }
      }));
  });
});

gulp.task('default', ['lint'], function () {});
