# Delights - 轻量 webapp 开发构建工作流解决方案

delights 是基于 grunt 所构建的一个前端工作流的实际解决方案，4 条命令可以使你快速地搭建小型 webapp 的开发环境。

你几乎不用需要会使用任何构建工具，但 delights 就可以把 webpack，cmd，less 等等这些你想使用的工具有机的组合在一起。

这就是 delights 想做的。

## 现在开始
### 安装 nodeJS 环境
### 安装 grunt-cli 及 delights
```
npm install -g grunt-cli delights
```
### 安装项目依赖，项目根目录下执行
```
npm install
```
### 四条命令，项目根目录下执行
```
delights init // Init delights directory environment
delights server // Run a local server 在项目目录下启动本地 server
delights dev // Compile source code for develop 监听文件变动实时编译
delights release // Compile source code for release 编译上线代码
```
