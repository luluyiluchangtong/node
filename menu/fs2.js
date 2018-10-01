const { URL } = require('url');
const myURL = new URL('https://example.org:81/foo?a=b');
console.log(myURL.hostname);
// 输出 example.org

myURL.hostname = 'example1.com:85';
myURL.port = 4431
console.log(myURL.searchParams)
console.log(myURL.search)
console.log(myURL.href);