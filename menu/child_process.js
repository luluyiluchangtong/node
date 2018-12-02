const {
    spawn
} = require('child_process');
// child_process 模块提供了衍生子进程的功能
// 父进程 -- stdin stdout stderr -- 子进程 
// 即: 父进程 与 衍生的子进程 之间会建立 stdin、stdout 和 stderr 的管道
// child_process.spawn() 会异步地衍生子进程, 以下方法是基于该方法实现的 
// child_process.exec()   child_process.execFile()   child_process.fork()
// 每个方法都返回 ChildProcess 实例, 实现了 EventEmitter 接口, 子进程的 事件 调用了父进程的 监听器
// 
//