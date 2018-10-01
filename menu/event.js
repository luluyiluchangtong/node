// 大多数时候不会直接使用 EventEmitter, 而是在对象中继承它，
// 所有能 触发事件 的 对象 都是 EventEmitter 类的实例
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }  // EventEmitter 类
const myEmitter = new MyEmitter();     // EventEmitter 实例
// 使用 eventEmitter.on() 方法注册监听器
myEmitter.on('event', () => { // 事件监听器：
    console.log('触发了一个事件！');
    setImmediate(() => {
        console.log('这个是异步发生的');
    });
});

// 监听器 会在每次触发 命名事件 时被调用， 按照顺序同步触发！
myEmitter.emit('event');
myEmitter.emit('event');
// 触发了一个事件！ 
// 触发了一个事件！ 
// 这个是异步发生的
// 这个是异步发生的

// 监听器函数可以使用 setImmediate() 或 process.nextTick() 方法切换到异步操作模式
// 若是只处理事件一次，请用：
myEmitter.once()  // 则触发两次依然只返回："触发了一个事件！ 这个是异步发生的" 第二次触发时 监听器 被移除

// 在'newListener' 回调函数中, 一个监听器 的名字如果和 已有监听器 名称相同, 
// 则在 被插入 到EventEmitter实例的内部监听器数组时, 该监听器会被添加到其它同名监听器的前面。
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在开头插入一个新的监听器
        myEmitter.on('event', () => {
            console.log('B');
        });
    }
});
myEmitter.on('event', () => {
    console.log('A');
});
myEmitter.emit('event');
// 打印:
//   B
//   A

// 返回一个列出 已注册 监听器 的事件的数组。 数组中的值为字符串或符号
myEmitter.on('foo', () => { });
myEmitter.on('bar', () => { });
console.log(myEmitter.eventNames());  // [ 'foo', 'bar' ]
console.log(myEmitter.listenerCount("foo"));  // 返回正在监听名为 eventName 的事件的监听器的数量

// 每个事件默认可以注册最多 10 个监听器。 
// 单个 EventEmitter 实例的限制可以使用 emitter.setMaxListeners(n) 方法改变
myEmitter.on('event', () => { });
myEmitter.on('event', () => { });
console.log(myEmitter.listenerCount('event'));  // Prints: 2   检测监听器的数目

myEmitter.setMaxListeners(3)  // 单个 Emitter实例监听器 数目的限制
myEmitter.getMaxListeners()   // 3

myEmitter.defaultMaxListeners = 10
// 所有 EventEmitter 实例的默认值: 改变会影响所有实例，所以使用 setMaxListeners 优于 defaultMaxListeners


myEmitter.on('foo', () => {
    console.log('a')
});
myEmitter.prependListener('foo', () => {     // prependOnceListener()
    console.log('b')
});
myEmitter.emit('foo');   // b a
// emitter.prependListener() 方法可用于将 事件监听器 添加到 监听器数组 的开头


// 移除事件监听器
// removeListener()  removeAllListeners()  只有在绑定的相应事件的 触发器 依次触发后，移除事件
myEmitter.removeListener("foo", () => { console.log('ddd') })

// 别名是  emitter.off(eventName, listener) 


myEmitter.emit('error', new Error('whoops!'));    // 有错误
// 如果 EventEmitter 没有为 'error' 事件注册至少一个监听器，则当 'error' 事件触发时，
//  会抛出错误、打印堆栈跟踪、且退出 Node.js 进程;
// 为了防止 Node.js 进程崩溃，可以在 process 对象的 uncaughtException 事件上注册监听器
// !!! 作为最佳实践，应该始终为 'error' 事件注册监听器。!!!

process.on('uncaughtException', (err) => {
    console.error('有错误');
});
