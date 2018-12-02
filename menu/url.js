const url = require('url, URLSearchParams'); // 旧 API 需要引入模块
// 该模块有两个 API： 一个是 旧有的，一个是 WHATWG API； 旧有的为了是兼容旧项目。
// 它们的区别是： WHATWG 的 url对象的 origin属性 不包含 username  password; 且 url全局可用，无需全局引入

// WHATWG 中
// URL对象 的所有属性都是在 类的原型 上实现为 getter 和 setter，而不是作为对象本身的数据属性。

// new URL(input[, base])
// 将 input 解析到 base 上创建一个新的URL对象
const myUrl = new URL('foo', 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// 返回：   href: 'https://user:pass@sub.host.com:8080/p/a/t/foo',

// url 对象的属性
console.log(myUrl)
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
  searchParams: URLSearchParams { 'query' => 'string' },  获取 URL查询参数的 URLSearchParams对象
  hash: '#hash' }
*/

//  url 对象的方法  toString()  toJSON()  format()
console.log(`myUrl.toString(); myUrl.toJSON();myUrl.href`) // 返回的结果都是一样的
// url.format(url,option) 可自定义； url.toString() 和 url.href 不可被自定义；
url.format(myUrl, {
  auth: true, // url 是否包含 用户名 密码
  fragment: true, // url 是否包含 片段标识符
  search: true, // url 是否包含 查询键值对
  unicode: false // url 是否使用 unicode 编码
})

// URLSearchParams  url 查询字符串 query 部分的专有接口
console.log(myUrl.searchParams) // 返回 URLSearchParams 对象

// new URLSearchParams( String / Object / iterable)
params = new URLSearchParams('user=abc&query=xyz');
console.log(params.toString()); // 输出 'user=abc&query=xyz'

const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second']
});
console.log(params.toString()); // 输出 'user=abc&query=first%2Csecond'

params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second']
]);
console.log(params.toString()); // 输出 'user=abc&query=first&query=second'

// 返回不同编码格式下的 url 对象  url.domainToASCII()   url.domainToUnicode()