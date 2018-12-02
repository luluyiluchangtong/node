// 模块的缓存
// 模块在第一次加载（require）后会被缓存(基于 文件名 进行缓存)，之后的调用不会重复加载模块。
// 如果想要多次执行一个模块，可以导出一个函数，然后调用该函数

// 访问主模块
console.log(__filename);
console.log(require.main.filename) // 获取当前应用程序的入口点
console.log(require.main === module) // 判断一个文件是否被直接运行

// 避免 循环调用 模块

// 模块的加载路径： 
require('./foo.js') // 相对路径；
require('/foo.js') // 绝对路径； 
require('foo') // 模块路径---来自nodeJS核心模块/node_modules目录
// 程序的入口模块：可以在package.json中设置，如果没有package.json，则 nodeJS会试图加载目录下的 index.js

// 模块包装器
(function (exports, require, module, __filename, __dirname) {
    // 模块的代码实际上在这里
});
console.log(__dirname); //  menu  当前模块 的 文件夹名称
console.log(__filename); // 当前模块的 文件名称

//  module 变量 表示对 模块对象 的引用 
//  module.exports 指定 模块所导出的 内容
//  exports  是 modules.exports 更简短的引用,可以修改 module.exports 的指向，但是不能修改 exports 的指向。
//  require()  引入模块
//  module.children 当前模块引用的模块对象

// require.resolve() 查询模块的具体位置 
const filePath = require.resolve('./bb.js')
console.log(filePath)

// 返回一个数组
const filePaths = require.resolve.paths('./bb.js')
console.log(filePaths)


const abc = 90
exports.abc = abc