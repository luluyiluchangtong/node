const {
    StringDecoder
} = require('string_decoder');
// 用于把 Buffer 对象解码成字符串

const decoder = new StringDecoder('utf8');

decoder.write(Buffer.from([0xE2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xAC])));