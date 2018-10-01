const { basename, extname, dirname } = require('path');
const filePath = '/usr/local/bin/exe.js'
console.log(basename(filePath, '.js'))
//path.basename() 方法返回一个 path 的最后一部分，没有第二个参数则返回 fs1.js
console.log(dirname(filePath)) // 返回一个 path的目录名
console.log(extname(filePath)) // 返回一个 path的扩展名


const a = path.isAbsolute('./ajax/html')
console.log(a) // false  判断一个路径是否为绝对路径


const { normalize } = require('path')
console.log(normalize('C:\ajax\\\\//index.html'))  // 返回  C:ajax\index.html
//  规范化给定的  path

const { join } = require('path')
console.log(join('ajax', 'index.html'))  // 返回 ajax\index.html
// 系统特定的分隔符 \ 把 path 片段链接在一起。 也2带上 normalize 功能了

const { resolve } = require('path');
console.log(resolve("./"))
// 返回相对路径的 绝对路径
// C:\Users\luzhe\Desktop\node-note\menu


'foo\\bar\\baz'.split(path.sep); // window 上 path方法只添加 反斜杠 '\\'
// 返回: ['foo', 'bar', 'baz']  // 平台特定的路径片段分隔符 , 

const { sep, delimiter, win32, posix } = require('path');
const filePath = '/usr/local/bin/exe.js'

console.log("sep", sep)  // 平台特定的路径片段分隔符  \
console.log("PATH", process.env.PATH)
console.log("delimiter", delimiter)  // 平台特定的路径分隔符  ;

// path.win32 属性提供了 path 方法针对 Windows 的实现
console.log("win32 delimiter", win32.delimiter)
console.log("win32 sep", win32.sep)