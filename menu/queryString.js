const querystring = require('querystring');
// 用于解析与格式化 URL 查询字符串

// querystring.parse() 把一个 URL 查询字符串 str 解析成一个键值对的集合
const urlParse = 'foo=bar&abc=xyz&abc=123'
console.log(querystring.parse(urlParse, ['&', '=', { // sep(键值对间符号)  eq(键值对符号) 
    decodeURIComponent: querystring.unescape(), // 解码函数
    maxKeys: 1000 // 要解析 键值对 的最大数量
}]))
// 返回键值对的集合 [Object: null prototype] { foo: 'bar', abc: [ 'xyz', '123' ] }

// URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号，
// 所以需要使用对应的 编码函数 encodeURI() encodeURIComponent()， 解码函数 decodeURI()  decodeURIComponent() 
// encodeURI()是 Javascript 中真正用来对 URL编码的函数。 编码整个url地址，但对特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。对应的 '解码函数' 是：decodeURI()。
// encodeURIComponent() 能编码"; / ? : @ & = + $ , #"这些特殊字符。对应的 '解码函数' 是 decodeURIComponent()。
// escape()  unescape() 不提倡使用了


// querystring.stringify();   生成 URL 查询字符串
querystring.stringify({
    foo: 'bar',
    baz: 'qux'
}, '&', '=', {
    decodeURIComponent: querystring.escape() // 编码函数
});