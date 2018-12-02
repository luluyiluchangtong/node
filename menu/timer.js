// 全局对象，无需 require
// 预定定时器  取消定时器
setImmediate();
clearImmediate();

setInterval();
clearInterval();

setTimeout();
clearTimeout();


// Process.nextTick() 和  setImmediate()  的区别：
// Process.nextTick 是 micro task，setImmediate 从来没有标准化但曾经有过的实现都是 task，
// 所以本质上是 micro task 和 task 的区别
// one note  node笔记部分有图解释