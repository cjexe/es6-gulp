//这个构建脚本是处理服务器的
import gulp from 'gulp';//整个构建都是基于gulp
import gulpif from 'gulp-if';//gulp语句中做判断的
import liveserver from 'gulp-live-server'; //引入一个能启动服务器的包，启动一个脚本作为服务的一个功能
import args from './util/args'//命令行参数解析的包
//因为在创建script.js构建脚本的时候，这些包已经安装过了，所以这里不需要再进行安装

gulp.task('server', (cb)=>{//cb作为一个回调函数
  if(!args.watch) return cb()//如果不是监听状态返回回调函数
  var server = liveserver.new(['--harmony', 'server/bin/www']);//--harmony表示要在当前命令行下执行这个脚本（即server下的www这个脚本）
  server.start();//启动服务器

//接下来需要实现的是服务器下面的文件包括js、css、模板，当这些文件发生改变的时候，要让浏览器自动刷新
//所以要监听server下面的js和ejs模板引擎，因为本项目不对css进行处理
  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs' ], function(){
    server.notify.apply(server,[file]);//监听完之后，通知服务器去做处理
  })
//第二步监听服务器的路由和接口的变化
  gulp.watch(['server/routes/**/*.js', 'server/app.js'], function(){//routes目录下是服务器脚本文件（即接口文件），app.js是整个服务启动的入口文件，这两个文件的改变，都需要服务重新启动才能生效
    server.start.bind(server)()//调用server的start API 进行重启
  })
})


