// 缓冲器: 在数据传输中，用来弥补不同数据 处理速率速度差距 的 存储装置 叫做缓冲器
// 缓存   cache 是为了弥补高速设备和低速设备的鸿沟而引入的中间层，最终起到 **加快访问速度** 的作用。
// 缓冲器 buffer 的主要目的进行流量整形，把 突发的大数量较小规模的 I/O  整理成  平稳的小数量较大规模的 I/O，
// 以 **减少响应次数** （比如从网上下电影，你不能下一点点数据就写一下硬盘，而是积攒一定量的数据以后一整块一起写，
// 不然硬盘都要被你玩坏了）。


// Buffer 类 被引入处理(读取 或 操作) 二进制数据 (在 TCP流 和 文件系统操作等场景中)
// Buffer 全局变量，创建后无法调整大小，类似于整数数组
// Buffer 类以一种更优化、更适合 Node.js 的方式实现了 Uint8Array。

// '二进制数组' 由三个对象组成：ArrayBuffer  TypedArray  DataView 参考 '数组的扩展.html'

// 创建 Buffer 实例
// 1.  Buffer.alloc   Buffer.allocUnsafe  Buffer.allocUnsafeSlow()
const bf = Buffer.alloc(10, 44, 'utf-8')
console.log(bf) // 长度为 10  默认为 0 填充 字符编码为 'utf-8'
console.log(bf[2]) // 返回指定索引处的 字节


// buffer.constants.MAX_LENGTH
// 如果 长度 大于 buffer.constants.MAX_LENGTH 或 小于 0，则抛出 ERR_INVALID_OPT_VALUE
// 在 32 位的架构上，该值是 (2^30)-1（1 GB）。 在 64 位的架构上，该值是 (2^31)-1（2 GB）。

const buf = Buffer.allocUnsafe(10, '12');
console.log(buf);
// 每次都 未初始化内存，因此之后每次输出都包含旧数据，可能包含敏感数据， 不安全！！
// Buffer.allocUnsafeSlow() ?????

// 2. Buffer.from()
// 2.1 字节数组 创建 buffer
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buf)

// 2.2 二进制数组 对象创建 buffer
const ab = new ArrayBuffer(10);
const buf = Buffer.from(ab, 5, 5)
// 从什么索引开始，拷贝多少个字节
console.log(buf.length)
console.log(buf.buffer === ab); // true      buf.buffer 指向 buf 底层的 ArrayBuffer 对象

const arr = new Uint16Array(2);
arr[0] = 1000;
arr[1] = 2000;
const buf = Buffer.from(arr.buffer); // arr.buffer 指向 ArrayBuffer
console.log(buf)

// 2.3 拷贝 buffer 的数据到新建的 Buffer
const buf1 = Buffer.from('buffer');
const buf2 = Buffer.from(buf1);

buf1[0] = 0x61;

console.log(buf1.toString());
// 输出: auffer
console.log(buf2.toString());
// 输出: buffer
// 这里是 拷贝，不是引用，所以 buf2 不变

// 2.4 字符串创建 buffer
const buf1 = Buffer.from('this is a tést');
console.log(buf1.toString());

// 2.5 对象创建 buffer
const buf = Buffer.from(new String('this is a test'));


// Buffer 数组比较
// buf1.compare(buf2)
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare)); // [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
console.log(buf1.compare(buf2)) // 1
// buf2 在 buf1 的前面 返回1； 后面返回 -1； 相同返回 0

const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);
console.log(buf1.compare(buf2, 5, 9, 0, 4))
// 5 9 0 4 参数分别为 targetStart targetEnd sourceStart sourceEnd 
// 即target: buf2 中开始对比的偏移量为  1, 2, 3, 4； 
//   source: buf1 中开始对比的偏移量为  1, 2, 3, 4

// buf1.equals(buf2)
const buf1 = Buffer.from('ABC');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf3));
// 输出: false
// 具有完全相同的字节，则返回 true，否则返回 false


// Buffer 数组的合并
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
const bufA = Buffer.concat([buf1, buf2, buf3], 85);
// 参数为需要合并的 buffer 数组， 及指定数组长度 
console.log(bufA.length)

// 数组的拷贝 / 截取
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');
for (let i = 0; i < 26; i++) {
    // 97 是 'a' 的十进制 ASCII 值。
    buf1[i] = i + 97;
}
console.log(buf1)
buf1.copy(buf2, 8, 16, 20);
// 将source： buf1 索引16 到 20的字节拷贝到  target：buf2 索引 8 开始之后的位置
console.log(buf2)
console.log(buf2.toString('ascii', 0, 25));

// 截取
const buf1 = Buffer.allocUnsafe(26).fill('abc');
const buf2 = buf1.slice(0, 4);
console.log(buf2.toString()) // abca

// 数组的遍历
// buf.entries()   buf.includes()    buf.indexOf()
const buf = Buffer.from('buffer');
for (const pair of buf.entries()) { // buf.key()   buf.values()
    console.log(pair);
}

const buf = Buffer.from('this buffer is a buffer');
console.log(buf.includes('this')); // true
console.log(buf.includes(Buffer.from('a buffer'))); // true
console.log(buf.includes(97)); // true
console.log(buf.includes('this', 4)); // 开始查找的偏移量 输出: false

console.log(buf.indexOf('this')); // 0    开始查找的偏移量 可选
console.log(buf.lastIndexOf('buffer')); // 17   开始查找的偏移量 可选
console.log(buf.length)


// 数组的解析
const buf1 = Buffer.from('abcd'); // <Buffer 61 62 63 71 64 33>    这里六个字节，一个字节占 8位
console.log(buf1);
buf1.swap16();
// 解析成 16 位整数数组
// 传入的字节 必须是 2 的倍数， 因为一个字节分配 8位，最低 16 位表示两个字节
buf1.swap32();
// 解析成 32 位整数数组
// 传入的字节 必须是 4 的倍数， 因为一个字节分配 8位，最低 32 位表示四个字节

// 解析成字符串
buf1.toJSON()
buf1.toString() // 有开始 和 结束偏移量

// 数组的写入
const buf = Buffer.alloc(6);
const len = buf.write('abcdefg', 0, 2);
// 参数，写入的偏移量  写入的字节数

console.log(`${len} 个字节: ${buf.toString()}`); // ab
console.log(buf);

const b = Buffer.alloc(10).fill('hsdasa'); // 还有 参数 填充字节 的起使位置，结束位置，没有则默认整个填充
console.log(b); // <Buffer 68 73 64 61 73 61 68 73 64 61>
console.log(b.toString()); // hsdasahsda

// 返回字符串 字节长度
const str = "abcd"
console.log(Buffer.byteLength(str))
//  参数为 字符串 string，二进制数组对象，TypeArray  dataView ArrayBuffer Buffer

// Buffer.isBuffer(obj)  判断是否是 buffer 实例
// Buffer.isEncoding(encoding)  判断是否是 buffer 支持的字符编码
// Buffer.poolSize  Buffer 容纳的字节数 默认 8192， 可以指定