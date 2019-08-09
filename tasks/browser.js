//app 目录下作为前端原始文件
//接下来最后一个前端自动化需求是，想让所有的任务自动完成
//browser.js是关于浏览器监听相关的文件


import gulp from 'gulp'
import gulpif from 'gulp-if'
import gutil from 'gulp-util' //gulp-util是gulp常用工具（即函数集合）
import args from './util/args'//这是命令行参数的包

gulp.task('browser', (cb)=>{
  if(!args.watch) return cb(); //如果没有事件监听，就执行cb回调函数
  gulp.watch('app/**/*.js', ['scripts']);//监听app目录下变化，watch第一个参数：指定监听目录，第二个参数：指定执行的任务
  //只要执行browser这个任务，就会自动监听app下面的js，如果js发生了改变，就会自动调用这个scripts构建脚本（调用scripts构建脚本，就会帮你把app下js文件转成es5或者es3，并把它写入server目录下的文件）
  gulp.watch('app/**/*.ejs', ['pages']);
  gulp.watch('app/**/*.css', ['css']);//虽然本项目不用编译css，但需要监听修改，还是要同步到server中去
})
//以上单个任务做完
//现在需求是，如何让各个任务自动跑起来，任务之间的关联又是怎样的
//browser.js脚本已经完成了js、ejs、css分别与 scripts、pages、css之间的关联
//browser只完成了事件监听
//启动服务，只启动一个命令怎么将每个脚本串起来？
//任务在自动创建的时候，需要清空
//拷贝文件需要覆盖之前文件，所以需要清空，创建一个clean脚本

