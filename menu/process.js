// process 是一个全局的模块， 无需引入，直接用
// process 对象是 EventEmitter 的实例。提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程, 无需 require
// 当 Node.js 的 事件循环数组 已经为空，并且没有额外的工作被添加进来，事件 'beforeExit' 会被触发
// 前提是 'beforeExit' 事件 绑定的 监听器的回调函数中，含有一个可以进行异步调用的操作
process.on('beforeExit')
process.on('disconnect')
process.on('exit') // 结束进程


// 如果 Javascript 未捕获的异常, 会触发 'uncaughtException' 事件
process.on('uncaughtException')



// process 参数：
const { argv, argv0, execArgv, execPath } = process
// argv  是一个数组，里面是 process 参数
argv.forEach((item) => {   // 大多数用到的是  argv 对象
    console.log(item)
})
// 返回的参数:
// C:\Program Files\nodejs\node.exe    
// C:\Users\luzhe\Desktop\node-note\menu\test.js
// 除此还可以传入参数  a=1 b=2 ...    例如： node test.js a=1 b=2

// argv0  保存了 argv对象第一个值的引用
console.log(argv0)
// 返回的参数
// C:\Program Files\nodejs\node.exe  


console.log(execArgv)
// 返回在 node 命令前传入的参数  例如： node --inspect  test.js

console.log(execPath)
// 返回 node 命令调用的路径

// process 环境
const { env } = process
console.log(env)


console.log(process.cwd())
// 返回 命令执行的路径 C:\Users\luzhe\Desktop\node-note\menu

setImmediate(() => {   // 将事件插入 下一个队列中位置，是 nextTick 的优化
    console.log('setImmediate')
})

setTimeout(() => {
    console.log('setTimeOut')
})

process.nextTick(() => {    // 将事件插入 当前队列的最后一个
    console.log('nextTick')
})
// nextTick
// setTimeOut
// setImmediate