//build把所有任务都关联起来，任务之间的先后顺序，任务之间的依赖关系
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'//处理包的顺序问题
//server启动之前先保证文件都已编译完

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'server']));
//clean放在最前面用去清空目录
//css和pages可以不分顺序
//然后是scripts编译
//最后一定是个数组，这个数组说明这个两个任务一定是在最后面的，而browser一定是在server前面的，server一定放在最后面执行

//例如 在命令行 输入 gulp scripts  就是执行scripts.js脚本去执行任务
//如果在命令行 只输入 gulp 那gulp就去找tasks下面的default.js去执行


