//首先引入一个包，用来处理命令行参数的
//在程序里识别命令行
//让命令行识别命令，需要引入一个包，帮我们做处理（yargs）
import yargs from 'yargs';//yargs用来处理命令行参数的，让命令行识别命令
//区分开发环境和线上环境
const args = yargs

//.option就是命令行选项部分
//比如 命令行输入  gulp -production   这里的 -production 就是.option选项部分
.option('production',{//这个是用来区分是否有 production这个参数的，近而来区分线上环境还是开发环境
  boolean: true, //这个选项是boolean类型
  default: false, //默认值是false，也就是说你这个命令行没有输入这个选项，命令行默认false（即开发环境）
  describe: 'min all scripts' // 这是描述，给人看的
})

.option('watch',{//用来控制要不要监听文件，比如改了js、css之类要不要编译
  boolean: true,
  default: false,
  describe: 'watch all files'
})

  .option('verbose', {//要不要详细的输入命令行日志
    boolean: true,
    default: false,
    describe: 'log'
  })

  .option('sourcemaps', {//处理js压缩后的参数的，这是用来强制生成一个sourcemaps的东西
    describe: 'force the creation of sourcemaps'
  })

  .option('port', {//启动服务器，需要一个服务器的端口
    string: true,
    default: 8080,
    describe: 'server port'
  })

//以上是.option选项部分

.argv //表示对输入的命令行内容以字符串进行解析

//创建完对命令行参数处理之后呢，接下来创建一个构建脚本是对js处理的，在tasks目录下创建scripts.js，所有构建脚本都是在tasks目录创建的
