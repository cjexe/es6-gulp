//这个构建脚本用于处理css
import gulp from 'gulp';//整个构建都是基于gulp
import gulpif from 'gulp-if';//gulp语句中做判断的
import livereload from 'gulp-livereload'//文件修改之后，自动刷新
import args from './util/args'//命令行参数解析的包
//因为在创建script.js构建脚本的时候，这些包已经安装过了，所以这里不需要再进行安装

gulp.task('css', ()=>{
  return gulp.src('app/**/*.css')
      .pipe(gulp.dest('server/public'))
    .pipe(gulpif(args.watch, livereload()))//监听是否需要热更新
})





