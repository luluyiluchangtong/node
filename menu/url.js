// const url = require('url');  旧 API 需要引入模块
// 该模块有两个 API： 一个是 旧有的，一个是 WHATWG API； 旧有的为了是兼容旧项目。

// WHATWG 中是全局可用的。

const { URL } = require('url');
const myURL =
    new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myURL)
/*
URL {
  href:
   'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.host.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.host.com:8080',
  hostname: 'sub.host.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash' }
*/
// url 对象上的所有属性都不是本身的属性，都是 "url 类" 的原型上实现的。

// new URL(input[, base])  将 input 解析到 base 上创建一个新的URL对象
// new URL('foo', 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// 传入 input 则返回：   href: 'https://user:pass@sub.host.com:8080/p/a/t/foo',

// 获取及设置  
// url.hash  
// url.host   域名+端口
// url.hostname  域名
// url.href  
// url.orgin  
// url.password 
// url.pathname  
// url.port     HTTPS协议默认端口是443， 因此设置 443. port 将返回 空字符串
// url.protocol  
// url.search   
// url.username

// url类 的方法
// url.toString() 和 url.toJSON() 的返回值同 url.href 一样

// URLSearchParams 类 需要从 url 引入
// const { URL, URLSearchParams } = require('url');
// const myURL = new URL('https://example.org/?abc=123');
// console.log(myURL.searchParams.get('abc'));  get / set / delete / append

// new URLSearchParams(string)
// params = new URLSearchParams('user=abc&query=xyz');
// console.log(params.get('user'));
