const EventEmitter = reqiure('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new Myeemitter()
myEmitter.on('event', () => { // event 是事件名
    console.log('chenggong')
})
myEmitter.emit('event')
// EventEmitter 的核心就是事件触发和事件监听功能的封装