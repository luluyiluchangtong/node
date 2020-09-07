const stream = require('stream');
// 是什么？ stream  --- 是一个抽象接口，处理 '流式数据', 
// 使用？ stream模块主要用于 '开发' 新的流实例，'使用' 流对象 为主的，极少直接使用 stream模块
// 几乎所有的 Node.js 应用，不管多么简单，都在某种程度上使用了流
// 尽管理解流的工作方式很重要，但是 stream 模块主要用于开发者创建新类型的流实例。 对于以消费流对象为主的开发者，极少需要直接使用 stream 模块

// 流式数据访问，就相当下载10G的电影，用迅雷边下边播的模式。
// 非流式数据访问，就相当于，10G的电影，完全下好了，再播放

// 流对象(又分为: 可读流 可写流): HTTP 服务器的请求; process.stdout 都是流的实例,  所有的流都是 EventEmitter 的实例
// 流对象处理 String  Buffer， 也可以处理其他类型的值

// 流类型: Readable(可写的流)  fs.createWriteStream()
//         Writable(可读的流)  fs.create.ReadStream()
//         Duplex(可读写的流)  net.socket()
//         Transform(可修改的读写流)  zlib.createDeflate()

// 可写流和可读流都会在内部的 缓冲器 中存储数据

// 可写流  实现了 stream.Writable 类定义的接口
var fs = require('fs');
const assert = require('assert').strict;
var readStream = fs.createReadStream('aa.txt'); // 创建可读流
var writeStream = fs.createWriteStream('aa.txt'); // 创建可写流

// 事件 方法
writeStream.write("aaaa22233")
writeStream.end();
writeStream.on('finish', () => {
    console.error('写入已完成');
});

writeStream.on('pipe', (src) => { // src  通过 管道 流入到可写流的 来源流
    console.error('有数据正通过管道流入写入器');
    assert.equal(src, readStream);
});
readStream.pipe(writeStream);


// 可读流  实现了stream.Readable 类定义的接口
// 可读流的 两种读取模式：流动模式（flowing）或暂停模式（paused）, 及如何切换它们
// 三种状态 readable.readableFlowing === null;  readable.readableFlowing === false;  readable.readableFlowing === true
// 其中 模式 是对 状态 的一种简化的抽象
// 建议使用 readable.pipe() 消费数据
readStream.on('data', function (chunk) { // 当有数据流出时，写入数据
    writeStream.write(chunk);
});

readStream.on('end', function () { // 当没有数据时，关闭数据流
    writeStream.end();
});
// readStream.pipe()
readStream.isPaused()
console.log(readStream.isPaused()) // false


// 双工流
// 双工流（Duplex）是同时实现了 Readable 和 Writable 接口的流
// stream.Duplex 类


// 转换流
// 转换流（Transform）是一种 Duplex 流，但它的输出与输入是相关联的


// 实现 可读流 可写流 双工流 的API