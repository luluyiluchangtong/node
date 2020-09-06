const {
    StringDecoder
} = require('string_decoder');
// 用于把 Buffer 对象解码成字符串

// decoder.write()
const decoder = new StringDecoder(); // 默认传入的参数是 'utf8'
const bf1 = Buffer.from([0xE2])
const bf2 = Buffer.from([0x82])
decoder.write(bf1);
decoder.write(bf2);
// 将 Buffer实例 传入 StringDecoder实例， 返回一个解码后的字符串

// decoder.end()
console.log(decoder.end());
// 以字符串的形式返回内部 buffer 中剩余的字节

console.log(decoder.end(Buffer.from([0xAC])));
// 如果提供了 buffer 参数，则在返回剩余字节之前会再执行一次 stringDecoder.write()