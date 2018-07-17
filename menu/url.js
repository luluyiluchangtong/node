const {
    URL
} = require('url');
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// 用于 URL 处理与解析