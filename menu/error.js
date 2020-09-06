 // 所有由 Node.js 引起的  'JavaScript错误' 与 '系统错误' 都继承自 js 的 error类
 // 任何回调函数中的第一个参数为错误对象（即错误优先的回调）

const Fs=require("fs")

Fs.readFile("./fs.js", (err,data)=>{
    if(err!==null){
       console.log(err)
       return
    }else{
        console.log(data)
    }
})