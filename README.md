Delights - 轻量 webapp 开发构建工作流解决方案
@Author SeasonLi | season.chopsticks@gmail.com

### 现在开始

安装 nodeJS 环境

安装 grunt
```
npm install -g grunt-cli
```

安装 grunt 包依赖，cd 项目根目录下
```
npm install
```

安装 spm
```
npm install -g spm
```
安装 spm 包依赖，cd 项目根目录下
```
spm install
```


### 如何开发
cd 项目根目录下
```
grunt dev // --watch 开启实时编译（推荐）
```
开启本地测试环境
```
spm server
```

### 如何打包上线
cd 项目根目录下
```
sh build.sh
```