const EventEmitter = require('events');

class MyEmitter extends EventEmitter {} // myEmitter 类
const myEmitter = new MyEmitter(); // myEmitter 实例

// 实例通过事件注册监听器，每个事件 最多注册 10 个监听器

// 若监听器超过 设置的数量时，会有 内存泄漏警告
myEmitter.on("event", () => {
    console.log("A");
});
myEmitter.on("event", () => {
    console.log("B");
});

myEmitter.emit("event");
console.log(myEmitter.eventNames())
console.log(myEmitter.eventNames())
console.log(myEmitter.rawListeners('event'))