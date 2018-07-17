// util 模块主要用于支持 Node.js 内部 API 的需求
// util.inherits()  一个事项对象间原型继承的函数
const util = require('util')

function Box(name, age) {
    this.name = name;
    this.age = age;
    this.sayBox = function () {
        console.log('abc')
    }
}
Box.prototype.showname = function () {
    console.log(this.name)
}

function Box1() {
    this.name = 'lu'
}
util.inherits(Box, Box1);

const box11 = new Box1();
box11.showname();

// util.inspect() 方法返回 object 的字符串表示