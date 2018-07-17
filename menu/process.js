// process 对象是 EventEmitter 的实例。提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程, 无需 require
// 当 Node.js 的 事件循环数组 已经为空，并且没有额外的工作被添加进来，事件 'beforeExit' 会被触发
// 前提是 'beforeExit' 事件 绑定的 监听器的回调函数中，含有一个可以进行异步调用的操作
process.on('beforeExit')
process.on('disconnect')
process.on('exit') // 结束进程


// 如果 Javascript 未捕获的异常, 会触发 'uncaughtException' 事件
process.on('uncaughtException')