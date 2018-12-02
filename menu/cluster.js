const cluster = require('cluster');
const {
    spawn
} = require('child_process');

// cluster 创建 共享服务器端口的 子进程

cluster.fork() // 返回一个  worker对象  衍生出一个新的工作进程(子进程)
cluster.worker // 当前 子进程对象 的引用