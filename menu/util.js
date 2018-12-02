const util = require('util');
// util 模块主要用于支持 Node.js 内部 API 的需求，提供一些 工具函数

// util.callbackify()  将 异步函数 转换成 回调风格的函数
async function fn() {
    return 'hello world';
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(ret);
});

// util.promisify()  将 回调风格的函数 转换成 异步函数
const stat = util.promisify(fs.stat);
async function callStat() {
    const stats = await stat('.');
    console.log(`This directory is owned by ${stats.uid}`);
}

// util.debuglog() 方法用于创建一个函数，类似于 console.error()
// process.env.NODE_DEBUG = "foo"
const debuglog = util.debuglog('foo');
debuglog('hello from foo [%d]', 123);

// NODE_DEBUG=foo node test.js 返回 'NODE_DEBUG' 不是内部或外部命令，也不是可运行的程序
// ？？？？

// util.format()  格式化字符串
// 第一个参数是 占位符，将被对应的 参数 转换后 的值所替换
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
util.format(1, 2, 3); // '1 2 3'
util.format('%s:%s', 'foo'); // 返回: 'foo:%s'


// util.inherit()  从 一个构造函数 中继承原型方法到 另一个构造函数
// 请使用 使用 ES6 的 class 和 extends 代替
class MyStream extends EventEmitter {
    write(data) {
        this.emit('data', data);
    }
}

const stream = new MyStream();

stream.on('data', (data) => {
    console.log(`接收的数据："${data}"`);
});
stream.write('使用 ES6');


// util.inspect()  返回 object 的字符串表示
const foo = {
    a: 23
}
console.log(util.inspect(foo, {
    showHidden: true,
    colors: true,
    // ...
}))
util.inspect.styles.number = 'red' //自定义终端输出数字的颜色为红色
console.log(23) // 23 是红色的