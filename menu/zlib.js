const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('input.txt');
const out = fs.createWriteStream('input.txt.gz');

inp.pipe(gzip).pipe(out); // 读文件流，压缩，写文件流

// zlib模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能
// Gzip  一种压缩程序；  Deflate 一种压缩算发