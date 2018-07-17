// 大多数时候不会直接使用 EventEmitter, 而是在对象中继承它，
// 只要支持 事件响应 的 核心模块 都是EventEmitter的子类
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => { // 所有能触发事件的对象 myEmitter都是 EventEmitter 类的实例
    // 事件监听器：添加一个 listener 函数到名为 eventName 的事件
    console.log('触发了一个事件！');
});
myEmitter.emit('event'); // 触发 event事件 调用监听器函数


myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('这个是异步发生的');
    });

})
myEmitter.emit('event', 'a', 'b');
// 监听器函数可以使用 setImmediate() 或 process.nextTick() 方法切换到异步操作模式

process.on('uncaughtException', (err) => {
    console.error('有错误');
});

myEmitter.emit('error', new Error('whoops!'));
// 如果 EventEmitter 没有为 'error' 事件注册至少一个监听器，则当 'error' 事件触发时，
//  会抛出错误、打印堆栈跟踪、且退出 Node.js 进程;
// 为了防止 Node.js 进程崩溃，可以在 process 对象的 uncaughtException 事件上注册监听器
// 作为最佳实践，应该始终为 'error' 事件注册监听器。

myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在开头插入一个新的监听器
        myEmitter.on('event', () => {
            console.log('B');
        });
    }
});
myEmitter.on('event', () => { // 参数  eventName  listener
    console.log('A');
});
myEmitter.emit('event');
// 打印:
//   B
//   A
// EventEmitter 实例会在 一个监听器 被添加到其内部 监听器数组 之前触发自身的 'newListener' 事件
// 当移除已存在的监听器时，则触发 'removeListener'

myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(myEmitter.listenerCount('event'));
// Prints: 2   检测监听器的数目

myEmitter.setMaxListeners(3) // 单个 Emitter实例监听器 数目的限制
myEmitter.getMaxListeners()
myEmitter.defaultMaxListeners = 10 // 所有 Emitter实例监听器 数目的限制


myEmitter.on('foo', () => {});
myEmitter.on('bar', () => {});

const sym = Symbol('symbol');
myEmitter.on(sym, () => {});

console.log(myEmitter.eventNames());
// 返回监听器的具体名称（字符串） ['foo','bar']

myEmitter.on('foo', () => {
    console.log('a')
});
myEmitter.prependListener('foo', () => {
    console.log('b')
});
myEmitter.emit('foo');
// emitter.prependListener() 方法可用于将事件监听器添加到监听器数组的开头
// 不会检查 listener 是否已被添加。 
// 多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加与调用多次

myEmitter.removeAllListeners([eventName]) // 移除所有事件的所有监听器
myEmitter.removeListener() // 移除指定事件的某个监听器