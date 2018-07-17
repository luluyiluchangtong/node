// 笔记：
// nodeJS 不是一种语言，一种框架，一种库。而是一个让 js 运行在服务端的开发平台。
// nodeJS 是一个 js 运行环境， "基于"  Chrome V8引擎。目的：是实现高性能的Web服务器
// 对于独立的在后台运行的 js  nodeJS就是一个解析器，相当于浏览器是 html页面里js的解析器一样
// 线程必须有事件循环，不断检查有没有未处理的事件， 依次予以处理
// 异步的 I/O 操作 和 多线程的 I/O 操作
// nodeJS 所有的逻辑都是事件的回调函数， nodeJS 始终在事件循环中。。 程序入口就是事件循环第一个事件的回调函数。

// 任何操作系统下安装NodeJS本质上做的事情都是把 NodeJS执行程序 "复制" 到一个目录，以便终端下可以使用node命令
// 所有模块在执行过程中只 初始化一次
// HTTP模块 --- 操作网络 fs模块 --- 操作文件
// nodeJS提供的交互式环境(REPL) 相当于浏览器的控制台
// package --- 多个子模块组成一个大模块，有一个入口模块 main.js(index.js), package.json 可以配置入口模块的名称和存放位置
// 其中的 dependencies选项： 使得可以批量安装依赖包；使用包的时候自动下载包中的依赖包。
// JavaScript引擎是一个专门处理JavaScript脚本的虚拟机，一般会附带在网页浏览器之中。
// POSIX --- 是一套操作系统API规范， 相关的操作系统是：UNIX,  Linux  Mac OS X

// module.exports =function(){
// console.log('abc')
// } 将 导出普通对象 改为 导出一个函数 
// 主模块 --- 通过 命令行参数 传递给NodeJS以启动程序的 模块
// Node.js采用C++语言编写而成
// Node.js采用事件驱动、异步编程， 提供的绝大多数API都是基于事件的、异步的风格
// Node.js采用单进程、单线程模式
// 脚本模式： node index.js   启动 node 解释器 一行行执行
// 交互模式： node console.log('abc')  启动 node 解释器 执行这个文件
// nodeJS的模块加载机制 被称为 CommonJS 规范！每个文件就是一个模块，每个模块下的变量，函数名不冲突。
// 因为 node 加载文件后， 将文件里的代码 分装成了函数，所有的变量都只在函数作用域里了。
// 要在模块中对外输出变量，用：module.exports = variable;
// 一个模块要引用其他模块暴露的变量，用：var ref = require('module_name');
// modules.exports 和 exports  建议使用 前者来输出模块变量
// 浏览器的全局对象是 window;   nodeJS里的全局对象是 global
// process.nextTick(calback) 不立即执行    process.on('exit',callback)退出后执行



// 一个 node 应用的组成部分：
// 1. require  node的模块； 2. 创建服务器； 3. 客户端向服务器发送http请求，服务器接收请求返回响应式数据
const aa = require('./packet');
aa.hello();