const path = require('path');
// path 模块提供了一些工具函数，用于处理文件与目录的路径
const a = path.basename('./fs1.js', '.js')
console.log(a)
//path.basename() 方法返回一个 path 的最后一部分，没有第二个参数则返回 fs1.js

const a = path.dirname('/ajax/html/index.html')
console.log(a) // 返回一个 path的目录名

const a = path.extname('/ajax/html/index.html')
console.log(a) // 返回一个 path的扩展名

const a = path.format({
    dir: '\\ajax\\html',
    base: 'index.html' // 或者使用 root  name  ext
})
console.log(a)
// path.format({}) 从一个对象返回一个路径字符串

const a = path.parse('/home/user/dir/file.txt');
console.log(a) //  返回一个对象
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

const a = path.isAbsolute('./ajax/html')
console.log(a) // false  判断一个路径是否为绝对路径

const a = path.join('ajax', 'index.html')
console.log(a) // 系统特定的分隔符把 path 片段链接在一起。。

'foo\\bar\\baz'.split(path.sep); // window 上 path方法只添加 反斜杠 '\\'
// 返回: ['foo', 'bar', 'baz']  // 平台特定的路径片段分隔符 , 

const a = path.normalize('C:\ajax\\\\//index.html')
console.log(a) //  规范化给定的  path