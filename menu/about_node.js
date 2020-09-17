// 笔记：
// nodeJS 不是一种语言，一种框架，一种库。而是一个让 js 运行在 '服务端的开发平台'（是后台运行的 js 的解释器）。它是 "基于"  Chrome V8引擎开发出来的。由 C++ 语言编写的
// 阻塞 I/O 和 非阻塞 I/O 的区别是： 主进程是否等待底层返回结果，前者需要等待结果返回才执行，后者不需要等待，而是在需要的时候通过 '事件驱动' 取回结果
// nodeJS "!! 所有的逻辑 !!" 都是 事件的回调函数， nodeJS 始终在事件循环中。。 程序入口就是事件循环第一个事件的回调函数。
// node 中的 fs, http, net, Events ....等都是 node 的标准库
// js 通过 回调 处理异步， 回调即在 事件 触发时调用的一个函数（事件处理程序）
// e而后 引入的 promise async 解决了 回调嵌套的问题

// node 作为中间层的作用是：
// 后端出于 性能 和别的原因，提供的接口所返回的 数据格式也许不太适合前端 直接使用。
// 前端所需的 排序功能、 筛选功能 ，以及到了视图层的 页面展现 ，也许都需要 对接口 所提供的 数据进行二次处理 。
// 这些处理虽可以放在前端来进行，但也许数据量一大便会浪费浏览器性能。因而现今，增加node端便是一种良好的解决方案

// web 应用的特点：
// 1. web 是一个典型的 I/O 密集场景（不同于cpu密集）！  静态资源读取， 数据库操作， 渲染页面等。。
// 2. 高并发

// Node.js采用 '单进程' 、 '单线程模式' ， '事件驱动' ， 异步编程：
// 进程：即一个程序的执行就是一个进程，计算机高频切换进程，来执行多个进程,是操作系统分配资源的最小单位
// 线程：进程内一个相对独立的，是程序执行的最小单位
// 一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线
// 线程上下文切换比进程上下文切换要快得多
// nodeJS 是单线程操作，可根据 cpu 的核数开启多个进程。 然后底层多线程调用！
// Node.js是单线程的，除了系统IO之外，在它的 事件轮询 过程中，同一时间只会处理一个事件

// 计算机在设计上是异步的
// 通常，编程语言是同步的，有些会在语言或库中提供管理异步性的方法

// 传统的做法: 一个请求，服务器开启一个进程，传统的做法 应对高并发请求，会开启很多进程， cpu 的处理远快于 I/O，， 这样做会使得 cpu 经常处于空闲状态！！
// nodeJS 的操作是只 开启一个进程： 接受多个客户端请求，形成 '事件队列' ，然后交给 cpu 处理。cpu处理完后通知 '事件队列' ，由 '事件队列' 响应客户端请求。这样做的好处是 cpu 不会处于空闲状态

// nodeJS 使用场景： webserve  本地代码构建  实用工具开发

// 任何操作系统下安装NodeJS本质上做的事情都是把 NodeJS执行程序 "复制" 到一个目录，以便终端下可以使用node命令
// 所有模块在执行过程中只 初始化一次 ！！！
// package --- 多个子模块组成一个大模块，有一个入口模块 main.js(index.js), package.json 可以配置入口模块的名称和存放位置
// 其中的 dependencies选项： 使得可以批量安装依赖包；使用包的时候自动下载包中的依赖包。
// JavaScript引擎是一个专门处理JavaScript脚本的虚拟机，一般会附带在网页浏览器之中。
// POSIX --- 是一套操作系统API规范， 相关的操作系统是：UNIX,  Linux  Mac OS X
// 主模块 --- 通过 命令行参数 传递给NodeJS以启动程序的 模块

// 如何使用 nodeJS
// 1.脚本模式：  输入 'node index.js'   启动 node 解释器 一行行执行
// 2.交互模式： 先输入node  后输入 console.log('abc') / 自动补全 / 输入 Number. + Tab键 自动补全属性，方法 / .help 显示所有 '点命令'  则在 REPL 模式中使用它
// nodeJS 命令行中 '传递参数'  node app.js lu  或 node app.js name=lu   '获取参数' 则通过 process 对象

// 因为 node 加载文件后， 将文件里的代码 分装成了函数，所有的变量都只在函数作用域里了。
// modules.exports 和 exports  建议使用 前者来输出模块变量
// process.nextTick(calback) 不立即执行    process.on('exit',callback)退出后执行

// npm
// npm 是 Node.js 标准的软件包管理器
// npm install / npm update / npm run
// npm init / npm init -y

// npm root -g   软件包全局安装时在 电脑中的位置。 
// npm list -g 全局中的软件包 （C:\Users\luzhe\AppData\Roaming\npm\node_modules）
// npm list -g --depth 0  全局中的一级软件包 （即 vue webpack 等自己安装的？）

// npm list 项目中的软件包  （node-modules中的）
// npm list --depth=0   package.json 中的

// npm list mypackage   获取版本及其依赖
// npm view mypackage version 查看 某个软件包 最新版本
// npm view mypackage versions 查看 某个软件包 所有版本
// npm outdate 查看 package.json 中的 所有软件包 最新版本。
// npm info vue 查看包的相关信息

// npm install mypackage@1.2.0  安装某个版本的软件包
// npm uninstall mypackage -S (移除依赖)  npm uninstall mypackage -D (移除生产中的依赖)  npm uninstall  mypackage -g (移除全局依赖)  相应的是安装  install -S / -D / -g
// "chalk": "^2.4.2",  其中的  ^ 表示可以更新到补丁版本和次版本， ~ 表示可更新的补丁版本， <  >  <=  >= 接受高于/低于/高于等于/低于等于 指定版本的任何版本  = 接受指定版本  2.1-2.2 接受一定范围的版本
// 使用 npm 软件包： const http=require("http")  若软件包提供了 命令行程序（例如：npm install cowsay）， 可通过 npx cowsay 执行 

// npm config list / set /get / delete / edit ...  npm 配置信息

// alpha版：内部测试版
// beta版：公开测试版
// rc版：  类似 预览版
// stable版：稳定版

// npx 是执行 npm 软件包的工具
// npm 执行软件包的方式：  cd 到其路径下 或 在 package.json 中的 script 下设置路径。 "my-package":"./node_modules/bin/my-package"  然后 npm  run  mypackage
// npx 则可以自动搜寻项目中的路径并执行， 所以只需 npx mypackage 就行了。 若项目中没有该软件包，则会先安装，再在执行。   也可仅执行不安装 npx my-package --no-install

// package.json
// 唯一的要求是必须遵守 JSON 格式，否则，尝试以编程的方式访问其属性的程序则无法读取它

// package-lock.json
// 哪怕你使用不同版本的 npm，只要有这个文件，
// 最后得到的总是 同样的 node_modules目录（每个软件包的确切版本保持不变，即使软件包的维护者更新包）。可以理解成，这个文件是node_modules目录的一个快照



// 一个 node 应用的组成部分：
// 1. require  node的模块； 2. 创建服务器； 3. 客户端向服务器发送http请求，服务器接收请求返回响应式数据
const aa = require('./packet');
aa.hello();