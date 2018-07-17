console.log(require.main.filename)
// 所以可以通过检查 require.main.filename 来获取当前应用程序的入口点。
// 模块在第一次加载（require）后会被缓存，不会重复加载模块。
// 核心模块定义在 Node.js 源代码的 lib/ 目录下
// 模块的加载路径： 
// require('./foo.js') 相对路径；
// require('/foo.js') 绝对路径； 
// require('foo') 模块路径---来自nodeJS核心模块/node_modules目录
// 程序的入口模块：可以在package.json中设置，吐过没有package.json，则 nodeJS会试图加载目录下的 index.js
// require.cache 被引入的模块将被缓存在这个对象中
// exports 是模块公开的接口。 require用于获取模块的接口
// modules.export=Hello  或  export.hello=hello    不可以直接 export=hello
// npm包的特征：package.json 文件在顶层目录下； 二进制文件应该在 bin目录下； js代码在 lib目录下； 文档在 doc目录下； 单元测试在 test 目录下
// 文件夹也可以作为一个模块来封装一个简单的 包
// npm 调用包的时候首先会检查 package.json里的 mian 字段，如果mian字段不存在，则尝试寻找 目录下的 index.js 文件作为包的接口
// npm install 默认是从 npm官网下载包的。。
// 全局安装的时候  包的 bin（二进制文件，包含 cmd文件） 目录会包含在  PATH 环境变量中，因此可以在命令行中直接调用。。本地安装的包不具备此功能。
// 总之 全局的包是在命令行下使用的（不能通过 require 使用）， 本地的包是为本地工程运行时服务的。
// node-inspect aa.js  调试 js    参见 nodeJS 文档
const a = require.resolve('./router.js')
console.log(a)
// 查询模块的具体位置

const b = require.resolve.paths('array-flatten')
console.log(a)
/**
 * [ 'C:\\Users\\Administrator\\Desktop\\node\\node_modules',
  'C:\\Users\\Administrator\\Desktop\\node_modules',
  'C:\\Users\\Administrator\\node_modules',
  'C:\\Users\\node_modules',
  'C:\\node_modules',
  'C:\\Users\\Administrator\\.node_modules',
  'C:\\Users\\Administrator\\.node_libraries',
  'C:\\Program Files\\nodejs\\lib\\node' ]
  */

newFunction();

function newFunction() {
    console.log(module.paths);
}
// 模块的搜索路径, 同样返回一个搜索路径的 数组

newFunction();

function newFunction() {
    console.log(__dirname); // node
}
// 当前模块 的 文件夹名称 

newFunction_1();

function newFunction_1() {
    console.log(__filename); // \Users\Administrator\Desktop\node\fs1.js
}
// 当前模块的文件名称---解析后的绝对路径
newFunction();

function newFunction() {
    console.log(module.filename);
}
// 当前模块的文件名称---解析后的绝对路径

//  exports  是 modules.exports 更简短的引用
//  module 变量是一个指向表示当前模块对象的引用
//  module.children 被该模块引用的模块对象
// module.loaded 模块是否已经加载完成，或正在加载中
// module.parent 最先引用该模块的模块