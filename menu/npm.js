// npm
// npm 是 Node.js 标准的软件包管理器
// npm install / npm update / npm run
// npm init / npm init -y


// -----------查看包信息--------------
// npm root -g   软件包全局安装时在 电脑中的位置。 
// npm list -g 全局中的软件包 （C:\Users\luzhe\AppData\Roaming\npm\node_modules）
// npm list -g --depth 0  全局中的一级软件包 （即 vue webpack 等自己安装的？）

// npm list 项目中的软件包  （node-modules中的）
// npm list --depth=0   package.json 中的

// npm list mypackage   获取版本及其依赖
// npm view mypackage version 查看 某个软件包 最新版本
// npm view mypackage versions 查看 某个软件包 所有版本
// npm outdate 查看 package.json 中的 所有软件包 最新版本。
// npm info vue 查看包的相关信息

// -------安装/卸载包信息---------
// npm install mypackage@1.2.0  安装某个版本的软件包
// npm uninstall mypackage -S (移除依赖)  npm uninstall mypackage -D (移除生产中的依赖)  npm uninstall  mypackage -g (移除全局依赖)  相应的是安装  install -S / -D / -g
// "chalk": "^2.4.2",  其中的  ^ 表示可以更新到补丁版本和次版本， ~ 表示可更新的补丁版本， <  >  <=  >= 接受高于/低于/高于等于/低于等于 指定版本的任何版本  = 接受指定版本  2.1-2.2 接受一定范围的版本
// 使用 npm 软件包： const http=require("http")  若软件包提供了 命令行程序（例如：npm install cowsay）， 可通过 npx cowsay 执行 

// ---------更新包信息---------


// npm config list / set /get / delete / edit ...  npm 配置信息

// alpha版：内部测试版
// beta版：公开测试版
// rc版：  类似 预览版
// stable版：稳定版

// npx 是执行 npm 软件包的工具
// npm 执行软件包的方式：  cd 到其路径下 或 在 package.json 中的 script 下设置路径。 "my-package":"./node_modules/bin/my-package"  然后 npm  run  mypackage
// npx 则可以自动搜寻项目中的路径并执行， 所以只需 npx mypackage 就行了。 若项目中没有该软件包，则会先安装，再在执行。   也可仅执行不安装 npx my-package --no-install

// package.json
// 唯一的要求是必须遵守 JSON 格式，否则，尝试以编程的方式访问其属性的程序则无法读取它

// package-lock.json
// 哪怕你使用不同版本的 npm，只要有这个文件，
// 最后得到的总是 同样的 node_modules目录（每个软件包的确切版本保持不变，即使软件包的维护者更新包）。可以理解成，这个文件是node_modules目录的一个快照
