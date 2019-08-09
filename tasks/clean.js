import gulp from 'gulp'
import del from 'del'//用于删除的包
import args from './util/args'

gulp.task('clean', ()=>{
  return del(['server/public', 'server/views']) //清空这两个目录
})
//gulp执行的时候，又一个默认的动作：会去找一个default.js，为了把所有任务都串起来，不妨新建一个default脚本把所有任务都串起来，任务的先后顺序，任务之间的依赖关系

