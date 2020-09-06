const EventEmitter = require('events');
// 所有能触发事件的对象都是 EventEmitter 类的实例, 例如 fs http 里的  **.on('open', listener),  其中 ** 就是触发事件的对象
// 所以大多数时候不会直接使用 EventEmitter, 而是在对象中继承它，
// 实例通过 事件 注册监听器，然后触发事件。每个事件 最多注册 10 个监听器

class MyEmitter extends EventEmitter {} // EventEmitter 类
const myEmitter = new MyEmitter(); // EventEmitter 实例

myEmitter.on('event', (a, b) => {
    // 注册监听器  event是事件名称;   emitter.addListener() 是 emitter.on() 的别名
    // 添加 listener 函数到名为 eventName 的事件的 '监听器数组' 的末尾
    console.log(a, b)
})
myEmitter.prependListener('event', () => {
    // emitter.prependListener() 将事件监听器添加到 监听器数组 的开头
})
myEmitter.emit('event')
// 触发事件  若事件有监听器则 返回 true  否则返回 false

myEmitter.emit('event')
// 触发事件  若是 myEmitter.once() 则此时不再触发 event 事件
// emitter.prependOnceListener() 方法可用于将 事件监听器 添加到 监听器数组 的开头


// 默认是同步调用 监听器， 可使用 setImmediate() 或 process.nextTick() 异步调用监听器
myEmitter.on('event', setImmediate(
    (a, b) => { // 注册监听器
        console.log(a, b)
    }
))

console.log(myEmitter.eventNames()) // ['event']   返回已注册监听器的 '事件名数组'
console.log(myEmitter.listenerCount('event')) //  2  返回正在监听的 event 事件的 监听器 的数量
console.log(myEmitter.listeners('event')) // [ [Function], [Function] ] 返回 '监听器数组' 的副本
console.log(myEmitter.rawListeners('event')) // [ [Function], [Function] ] 返回 '监听器数组' 的拷贝

// 实例通过事件注册监听器，每个事件 最多注册 10 个监听器
// 若监听器超过 设置的数量时，会有 内存泄漏警告

EventEmitter.defaultMaxListeners = 2
// EventEmitter.defaultMaxListeners 属性改变所有 EventEmitter 实例的默认值

myEmitter.setMaxListeners(myEmitter.getMaxListeners() - 7);
// getMaxListeners()  setMaxListeners()  某个实例 当前最大的监听器限制数
myEmitter.on("event", () => {
    console.log("A");
});
myEmitter.on("event", () => {
    console.log("B");
});

myEmitter.emit("event");

// 作为最佳实践，应该始终为 'error' 事件 注册监听器
myEmitter.on('error', (err) => {
    console.error('错误信息');
});
myEmitter.emit('error', new Error('错误信息'));


// 'newListener' 事件
// myEmitter 实例在添加 '新的监听器' 之前会触发自身的 'newListener' 事件
// 如果在 newListener 回调中注册 同名事件 的监听器，则该监听器会被插入到正被添加的 '新的监听器' 前面
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // 在开头插入 同名事件 的监听器
        myEmitter.on('event', () => { // 回调中注册的名为 event 监听器
            console.log('B');
        });
    }
});
myEmitter.on('event', () => { // 添加的 '新的监听器'
    console.log('A');
});
myEmitter.emit('event');
// 打印:
//   B
//   A

// removeListener 事件    
myEmitter.on("removeListener", (event, Listener) => {
    if (event === "event") {
        console.log("B")
    }
});

myEmitter.on("event", () => {
    console.log("A");
});

myEmitter.emit("event");
myEmitter.removeAllListeners("event");
// 打印:
//   A
//   B

myEmitter.removeAllListeners('event')
// 移除 event 事件下所有的监听器

myEmitter.removeListener('event', callbackA)
// 需传入 特定的名称的 回调函数名，即移除 event 事件下指定的 监听器
// emitter.removeListener() 的别名  emitter.off()

// 在事件触发之后、且最后一个监听器执行完成之前，removeListener() 或 removeAllListeners() 不会从 emit() 中移除它们。