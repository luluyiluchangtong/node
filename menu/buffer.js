// 二进制 0101 逢 2 进 1
// Buffer 类 被引入处理(读取 或 操作) 二进制数据 (在 TCP流 和 文件系统操作等场景中)
// Buffer 全局变量，创建后无法调整大小，类似于整数数组

Buffer(10)  // 初始化内存后的 Buffer   00 00 00 00 00 00 00 00 00 00
//  各种 new Buffer() 构造函数已被 废弃，并由 Buffer.from()、 Buffer.alloc()、和 Buffer.allocUnsafe() 方法替代。它们生成的是一个 buffer 实例

// 返回一个指定大小，被填满的 Buffer 实例
Buffer.alloc(size, fill, encoding)    // alloc 分配的意思
Buffer.alloc(10)   // 00 00 00 00 00 00 00 00 00 00
Buffer.alloc(10, 1)  //  01 01 01 01 01 01 01 01 01 01
Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');  // 68 65 6c 6c 6f 20 77 6f 72 6c 64

Buffer.allocUnsafe(10)    // 69 e2 a0 84 91 00 00 00 91 2e
Buffer.allocUnsafe(10).fill(21)   // 15 15 15 15 15 15 15 15 15 15
// allocUnsafe() 更快，但未经过初始化，会包含旧的数据；
// 需要使用 fill() 初始化  Buffer.allocUnsafe(10).fill(value,[offset,end,encoding])  offset(跳过的字节数) end(结束填充的位置)  encoding(字符编码)



// Buffer.from(array/string/buffer)  返回一个所传入内容副本的 Buffer
const buffer = Buffer.from([1, 2, 3])   // 01 02 03
Buffer.from(buffer)   // 01 02 03  
Buffer.from("ssss")   // 73 73 73 73
Buffer.from(new String('hello world'))   // Buffer.from(object[, offsetOrEncoding[, length]])

// 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换
// ascii['æski];  十进制;  hex 十六进制
const buffer = Buffer.from('hello world', 'ascii');  //  68 65 6c 6c 6f 20 77 6f 72 6c 64
buffer.toString('hex');  // 输出 68656c6c6f20776f726c64     没有传字符编码，则返回  'hello world'
buffer.toString('base64');  // 输出 aGVsbG8gd29ybGQ=
buffer.toJSON()   // { type: 'Buffer', data: [ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ] }


// Buffer实例 是可以被遍历的
const bf1 = Buffer.from('hello')
for (let a of bf1) {
    console.log(a)
}
// 104
// 101
// 108
// 108
// 111
for (let value of bf1.entries()) {
    console.log(value)
}
// [ 0, 104 ]
// [ 1, 101 ]
// [ 2, 108 ]
// [ 3, 108 ]
// [ 4, 111 ]
// bf1.values()   bf1.keys()   bf1.entries()   bf1.indexOf()  bf1.slice()   bf1.length

// buffer 和 TypedArray 的对比；TypedArray？？？？
// Buffer.from(arrayBuffer[, byteOffset[, length]])  ？？？

Buffer.byteLength('hello');  // 5   返回一个字符串的实际 字节 长度

// Buffer实例 数组的排序  Buffer.compare相当于sort() 里的排序方法
const bf1 = Buffer.from('1234')
const bf2 = Buffer.from('5678')
const arr = [bf1, bf2]
console.log(arr.sort(Buffer.compare))

// 合并 buffer实例
const bf1 = Buffer.alloc(10);
const bf2 = Buffer.alloc(30);
let totalLength = bf1.length + bf2.length;

const bf3 = Buffer.concat([bf1, bf2], totalLength);  // 没有 totalLength 则会从实例中运算，提供明确的长度会运行更快
console.log(bf3.length)    // 40

Buffer.isBuffer(bf1)  // true  判断传入的是否是一个 Buffer
Buffer.isEncoding('utf-8')  // true



// buffer 实例的拷贝
bf1.copy(bf2)
//  参数target targetStart  sourceSart VS End 

// buffer 实例包含哪些字节
const bf1 = Buffer.from('abcdefghijk');
console.log(bf1.includes('cd'));

// buffer.indexOf() / lastIndexOf() / slice()  / toJSON()
// buffer.toString()  根据 encoding 指定的字符编码解码 buf 成一个字符串


// buffer 实例池大小的字节数
Buffer.poolSize = 12345
console.log(Buffer.poolSize)

// 实例的 buffer 属性：
// buffer属性指向创建该 buffer 的底层 ArrayBuffer对象
const arraybuffer = new ArrayBuffer(16);
const bf1 = Buffer.from(arraybuffer);
console.log(bf1.buffer === arraybuffer)


// buffer 实例之间的对比： buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
//                目标     目标开始位置   目标结束位置  buf开始位置   buf结束位置
// 对比是基于各自 Buffer 实际的字节序列
const buf1 = Buffer.from('ABC');   // 41 42 43
const buf2 = Buffer.from('BCD');  // 42 43 44
buf1.compare(buf1);  // 0    buf === target
buf1.compare(buf2)  // -1    target 在后面
buf2.compare(buf1)  // 1     target 在前面
bf1.equals(bf2) // buf.equals() 具有完全相同字节的返回 true；否则返回 false
buf1.copy(buf2, 1, 2, 3)   // buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])   拷贝 buf1 中第 2 至 第 3 个字节到  target 的第 1 个字节

// buf.includes(value[, byteOffset][, encoding])
const buf = Buffer.from('this is a buffer');
buf.includes('is')   // true
buf.includes(97)    // true   97 是 'a'
buf.includes('this', 4)  //  false

buf.swap16()  // 将 buf 解析为一个无符号16位的整数数组
buf.swap32()  // 将 buf 解析为一个无符号32位的整数数组
buf.swap64()  // 将 buf 解析为一个64位的数值数组，并且以字节顺序原地进行交换

