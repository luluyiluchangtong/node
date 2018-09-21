//  buffer 是一个全局模块
// 二进制 0101 逢 2 进 1
// Buffer 类 被引入处理(读取 或 操作) 二进制数据 (在 TCP流 和 文件系统操作等场景中)
// Buffer 全局变量，创建后无法调整大小，类似于整数数组

//  Buffer.alloc(size, fill, encoding)   
//                     默认 0    utf8
const bf1 = Buffer.alloc(10)
console.log(bf1) // 长度为 10   用 00 填充

const buf2 = Buffer.alloc(10, 1); // 长度为 10   用 01 填充
console.log(buf2)

const buf3 = Buffer.allocUnsafe(10);
console.log(buf3)
// alloc() 会初始化再生成二进制数据  
// allocUnsafe() 更快，但未经过初始化，会包含旧的数据；使用 fill() 初始化
// fill(value,[offset,endding,encoding])

// Buffer.from() 返回一个副本的 Buffer
// Buffer.from(arrayBuffer/array/string/object/buffer)
const bf4 = Buffer.from([1, 2, 3])
console.log(bf4) // 返回 01 02 03

const bf5 = Buffer.from('abc')
console.log(bf5)

// buffer 支持的字符编码转换
const buf = Buffer.from('hello world');

// 输出 68656c6c6f20776f726c64
console.log(buf.toString('hex'));

// 输出 aGVsbG8gd29ybGQ=
console.log(buf.toString('base64'));
// ascii['æski]  十进制；  hex 十六进制

// buffer 和 TypedArray 的对比；TypedArray？？？？

// buffer 内容的遍历
const bf1 = Buffer.from('hello')
for (let a of bf1) {
    console.log(a)
}
for (let value of bf1.values()) {
    console.log(value)
}
// bf1.values()   bf1.keys()   bf1.entries()

const bf1 = Buffer.byteLength('hello');
console.log(bf1);
// 返回 字符串字节的长度

// Buffer 实例数组的排序  Buffer.compare相当于sort() 里的排序方法
const bf1 = Buffer.from('1234')
const bf2 = Buffer.from('5678')
const arr = [bf1, bf2]
console.log(arr.sort(Buffer.compare))
// bf1.compare(bf2)  参数target targetStart VS end  sourceSart VS End

// buf.equals() 具有完全相同字节的返回 true；否则返回 false
bf1.equals(bf2)

// buffer 实例的拷贝
bf1.copy(bf2)
//  参数target targetStart  sourceSart VS End 

// buffer 实例包含哪些字节
const bf1 = Buffer.from('abcdefghijk');
console.log(bf1.includes('cd'));

// buffer.indexOf() / lastIndexOf() / slice()  / toJSON()
// buffer.toString()  根据 encoding 指定的字符编码解码 buf 成一个字符串

// 合并 buffer实例
const bf1 = Buffer.alloc(10);
const bf2 = Buffer.alloc(30);
let totalLength = bf1.length + bf2.length;
const bf3 = Buffer.concat([bf1, bf2], totalLength);
console.log(bf3.length)

// buffer 实例池大小的字节数
Buffer.poolSize = 12345
console.log(Buffer.poolSize)

// 实例的属性：
// buffer属性指向创建该buffer的底层 ArrayBuffer对象
const arraybuffer = new ArrayBuffer(16);
const bf1 = Buffer.from(arraybuffer);
console.log(bf1.buffer === arraybuffer)