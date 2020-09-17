
// URL 字符串，解析字符串后返回  URL对象

// 使用传统的 API 解析 URL 字符串：
  const url = require('url');
  const myURL =url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// Url {
  //   href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'
//     protocol: 'https:',
//     host: 'sub.host.com:8080',
//     port: '8080',
//     hostname: 'sub.host.com',
//     pathname: '/p/a/t/h',
//     path: '/p/a/t/h?query=string',
//     hash: '#hash',
//     search: '?query=string',
//     query: 'query=string',
//     slashes: true,
//     auth: 'user:pass',
//   }

  // 使用 WHATWG 的 API 解析 URL 字符串：
  const myURL =
  new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
  // URL {
  //   href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
  //   protocol: 'https:',
  //   host: 'sub.host.com:8080',
  //   port: '8080',
  //   hostname: 'sub.host.com',
  //   pathname: '/p/a/t/h',
  //   search: '?query=string',
  //   searchParams: URLSearchParams { 'query' => 'string' },
  //   hash: '#hash'
  //   origin: 'https://sub.host.com:8080',
  //   username: 'user',
  //   password: 'pass',
  // }

// myURL.searchParams.get / set / delete / append ...    同 MDN 中的 new URLsearchparam()   myURL.searchParams 返回 URLSearchParams 类

// new URLSearchParams(string / obj / iterable) 
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

// url.domainToUnicode(domain) ...  url 模块下的方法
myURL.toString()  //  https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash
myURL.toJSON()


const url = require('url, URLSearchParams'); // 旧 API 需要引入模块
// 该模块有两个 API： 一个是 旧有的，一个是 WHATWG API； 旧有的为了是兼容旧项目。
// 它们的区别是： WHATWG 的 url对象的 origin属性 不包含 username  password; 且 url全局可用，无需全局引入

const myUrl = new URL('foo', 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// 返回：   href: 'https://user:pass@sub.host.com:8080/p/a/t/foo',


//  url 对象的方法  toString()  toJSON()  format()
console.log(`myUrl.toString(); myUrl.toJSON();myUrl.href`) // 返回的结果都是一样的
// url.format(url,option) 可自定义； url.toString() 和 url.href 不可被自定义；
url.format(myUrl, {
  auth: true, // url 是否包含 用户名 密码
  fragment: true, // url 是否包含 片段标识符
  search: true, // url 是否包含 查询键值对
  unicode: false // url 是否使用 unicode 编码
})




