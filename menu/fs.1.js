'use strict';
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }  // EventEmitter 类
const myEmitter = new MyEmitter();     // EventEmitter 实例
myEmitter.on('event', () => {
    // 事件监听器：添加一个 listener 函数到名为 eventName 的事件
    console.log('触发了一个事件！');
});
myEmitter.emit('event'); 