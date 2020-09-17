const path = require('path');
//  ./ 当前目录   ../ 上一层目录   以 / 开头代表根目录
//  window 系统：文件路径可以使用 反斜杠 \, 但是为避免歧义(例如 \n)，需使用 \\ 转义；也可以使用 顺斜杠 /
//  linux, unix 中使用 /
//  为了不同操作系统的统一，最好使用  /


const filePath = 'C:\\temp\\myfile.html' // windows 系统上的 path 方法只是用反斜杠方式。

// path.dirname()   目录名
console.log(`目录名:path.dirname(filePath)`) //  \temp   返回 path 目录名

// path.basename()   文件名
console.log(`文件名: path.basename(filePath, '.html')`)
// 返回 myfile ，没有第二个参数则返回 myfile.html

// path.extname()    文件扩展名
console.log(`文件扩展名:path.extname(filePath)`) //  .html   返回 path 的扩展名, 没有 . 或 path 的文件名, 则返回一个空字符串

// path.delimiter     环境路径分隔符
console.log(`环境路径分隔符: path.delimiter`)
// 返回 nodeJS 进程，环境路径 process.env.PATH 的分隔符  ; 
// POSIX 上分隔符是 :

// path.sep()   路径片段分隔符
console.log(`路径片段分隔符: path.sep`) //  返回 \

// path.format() 字符串化 路径对象
const pathFormat = path.format({
    root: '',
    dir: 'C:\\path\\dir',
    base: 'file.txt',
    name: '',
    ext: ''
})
console.log(pathFormat) // C:\path\dir\file.txt
// POSIX 下会有优先级  dir > root   base > ext name  即指定了 dir，则忽略 root，指定base，则忽略 ext name

// path.parse() 返回路径对象
console.log(path.parse('/home/user/dir/file.txt'))

// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// path.isAbsolute()   path 是否是绝对路径
// 即以 / 开头的路径才返回 true
console.log(path.isAbsolute('/foo/bar') + 'aaa') // false

// path.resolve()  将 路径 或 路径片段 的序列处理成 绝对路径
// 从右往左处理，直到构造完绝对路径；未生成绝对路径，则使用当前工作目录
console.log(path.resolve('/foo/bar/gar', './aa/bb/cc')) // C:\foo\bar\gar\aa\bb\cc
console.log(path.resolve('/foo/bar', './baz')) // C:\foo\bar\baz

// path.join() 使用 \ 将 path 片段链接起来, 并自动规范化
console.log(path.join('../foo', 'bar', 'zara'))  // ..\foo\bar\zara
console.log(filePath.split(path.sep))
console.log(process.env.PATH.split(path.delimiter))


// path.normalize()  规范化路径
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\')) // C:\temp\foo\

// path.posix   path.win32
console.log(path.posix) // posix 上实现的 path 方法
console.log(path.win32) // windows 上实现的 path 方法

// path.relative()   该方法返回第二个路径相对于第一个路径的那个相对路径, 即返回在 aaa 文件中引用 bbb 文件的路径
const pathRelative = path.relative('../data/orandea/test/aaa', '../data/orandea/impl/bbb');
console.log(pathRelative)
//  '../../impl/bbb'