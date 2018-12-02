 // 所有由 Node.js 引起的  'JavaScript错误' 与 '系统错误' 都继承自 js 的 error类

 const filePath = require.resolve('./bb.js')
 console.log(filePath)
 const filePaths = require.resolve.paths('./bb.js')
 console.log(filePaths)
 console.log(fs.abc)

 console.log(module.children)