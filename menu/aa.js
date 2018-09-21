console.log('a')
//  相当于 (function (exports, reqiure, module, __filename, __dirname) { })
var testVar = 100
global.text = 200
function test() {
    console.log(testVar)
}
function test1() {
    console.log(testVar + 1)
}
module.exports = {
    testVar: testVar,
    test1: test1,
}
module.exports.testFn = test
// exports.test1 = test1  这里就改变了指向了。。 除非只用 exports
// exports 是 module.exports 的快捷方式，可以修改 module.exports 的指向，但是不能修改 exports 的指向。
// exports = {
//     a: 1,   // 这里就是修改了指向，指向了不同的对象了
//     testVar: testVar
// }

    // (function (exports, require, module, __filename, __dirname) { console.log('a')
    // });   这是 node 后台所做的工作！
    // __filename 文件路径   __dirname 文件夹路径

    // CommoneJS:
    // 一个文件就是模块，有自己的作用域；
    // 模块内部的 module 变量代表 模块本身！
    // module.exports 是模块对外的 接口

    // module 被加载的时候就执行了，加载之后缓存。

    // 模块下相互的 引用时：输出已经执行的部分，未执行的部分不会输出！！ 需要避免这种现象！！