//default.js何时执行？
//当在命令行只输入 gulp 的时候，gulp会自动在tasks里找default.js脚本，执行default脚本中的任务
import gulp from 'gulp'

gulp.task('default', ['build']); //要有default任务，可以将default.js重命名，但任务名必须为default
//现在命令行去执行gulp 就会报错
//原因或有三
//1、缺少安装包（这简单，npm install 安装下就行）
//2、gulpfile.babel.js文件为空，空的话，tasks目录下所有文件都没有进来
//3、没找到default任务
//4、 .babelrc尚未配置
/**注意 */
//命令行 执行 gulp --watch ；如果不加--watch，脚本执行一次就结束了，加了--watch之后，才能持续监听
//express默认端口是3000
//文件修改之后，浏览器不自动刷新，需要修改server目录下app.js文件
//
