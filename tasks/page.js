//这个构建脚本用于处理模版
import gulp from 'gulp';//整个构建都是基于gulp
import gulpif from 'gulp-if';//gulp语句中做判断的
import livereload from 'gulp-livereload'//文件修改之后，自动刷新
import args from './util/args'//命令行参数解析的包
//因为在创建script.js构建脚本的时候，这些包已经安装过了，所以这里不需要再进行安装


gulp.task('pages', ()=>{ //创建一个任务
  //创建一个任务之前第一步都是先开启一个文件
  return gulp.src('app/**/*.ejs')// **/* 表示 app目录下的所有.ejs文件而不局限于app下面紧接着的ejs文件，各个嵌套目录都可以
      .pipe(gulp.dest('server'))//把这些ejs文件原封不动的拷贝到server目录下
      .pipe(gulpif(args.watch, livereload()))//监听是否需要热更新
})


