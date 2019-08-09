//创建之前先引入一些包，引入完之后，再一次性安装
import gulp from 'gulp';//整个构建都是基于gulp
import gulpif from 'gulp-if';//gulp语句中做判断的
import concat from 'gulp-concat';//gulp中处理文件拼接的
import webpack from 'webpack'//打包过程是用webpack做的
import gulpWebpack from 'webpack-stream'//gulp是基于stream的事件流，所以用webpack打包也需要一个stream事件流
import named from 'vinyl-name'//文件重命名做标志的
import livereload from 'gulp-livereload'//文件修改之后，自动刷新
import plumber from 'gulp-plumber'//处理文件信息流（管道拼接）
import rename from 'gulp-rename'//对文件重命名
import uglify from 'gulp-uglify'//压缩js、css
import {log,colors} from 'gulp-util'//命令行工具输出的包（命令行输出和色彩）
import args from './util/args'//命令行参数解析的包
/**npm install .......... --save-dev */ 
//--save-dev 表示 要把这些文件安装以外，还要在package.json里创建这些安装包依赖的字段（devDependencies）

//包引入和安装之后，开始创建一个gulp的脚本的编译任务
//task是gulp的一个api是创建一个gulp任务
//任务名称我们定义为scripts
//后面的箭头函数就是这个任务要的什么
gulp.task('scripts', ()=>{//scripts是这个任务的名称
  /**gulp.src(['app/js/index.js']) 表示 打开这个app目录下的index.js文件，打开这个文件我们要做什么呢 */
  /** 首先我们要处理常规错误逻辑，因为按照gulp规定的处理错误逻辑，就是在每个pipe的时候，出现错误都要抛出异常，因为我们处理脚本文件是要经过很长的流程为了避免在某一个环节报错出现异常，我们需要集中出现这个错误，比如说改变它的默认处理错误的机制，在这里呢，我们用plumber去处理*/
  return gulp.src(['app/js/index.js'])//打开文件
      .pipe(plumber({
        errorHandle: function(){
          
        }
      }))
      .pipe(named())//重命名
      .pipe(gulpWebpack({//webpack的重新编译
        module: {
          loaders: [{
            test: /\.js$/,
            loader: 'babel'
          }]
        }
      }), null, (err, stats)=>{log(`Finished '${colors.cyan("scripts")}'`, stats.toString({
        chunks: false
      }))//这里的箭头函数是对错误的一个处理
    })
    .pipe(gulp.dest('server/public/js'))//dest是gulp的api，用于重新定义放置文件的目录，为什么放入server目录下，因为server需要拿到最新的js，编译好的js才能在服务中跑起来
    .pipe(rename({//重命名（这是先复制一份然后重命名）
        basename: 'cp',
        extname: '.min.js'
    }))
    .pipe(uglify({//压缩
      compress: {properties: false}, 
      output: {'quote_keys': true}
    }))
    .pipe(gulp.dest('server/public/js'))//重新放置压缩后的文件
    .pipe(gulpif(args.watch, livereload()))//gulpif判断是否有watch这个选项，有的话就去监听，然后执行自动刷新
})

//gulp.task 任务： 从src的打开，接着named的重命名，然后webpack的重新编译，然后dest将重新编译后的文件放置在一个目录下面，然后重新命名（rename），然后压缩（uglify），最后保存到一个目录。这时会存在两个文件，一个是编译好且压缩的叫cp.min.js，另一个是编译好且未压缩的。
//最后我们要监听这个文件，当这个文件变化了以后我们要自动刷新这个功能(先用gulpif进行判断，在进行livereload)


