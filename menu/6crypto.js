const crypto = require('crypto');
// crypto模块的目的是为了提供通用的 加密和哈希算法
// 包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装

// 
// 哈希算法 MD5 SHA1 Hmac
// 加密算法 AES RSA

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544