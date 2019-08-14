# NodeJS API项目模板

##  依赖
Node.js v10.15.2+

##  模板内容
本例使用mongodb作为数据库，实现了Animal对象的查找和创建功能。

## Sample的使用
``` SHELL
docker run --name mongodb -p 27017:27017 -d mongo
npm install
npm start
```

### 目录结构
```
|-- Workspace
    |-- .eslintignore     eslint忽略配置文件，配置不需要做eslint检查的文件
    |-- .eslintrc.js      eslint配置
    |-- .eslintrc.json    eslint配置
    |-- .gitignore        git忽略文件
    |-- Dockerfile        标准node服务Dockerfile
    |-- README.md         
    |-- app.js            API主入口
    |-- package.json      依赖配置
    |-- server.js
    |-- swagger.json      API定义
    |-- model               业务模型
    |   |-- Model.js        业务模型
    |   |-- animalProcess.js  业务模型(animal)的业务处理逻辑
    |   |-- animalRoute.js    业务模型(animal)的路由
    |-- util
        |-- commonUtil.js   共通方法
        |-- db.js           数据库接口的实现

```
### 开发
建议使用vscode，安装Todo Tree插件后查找TODO

### 代码静态检查
*   eslint配置例
### UT
*   路由模块测试程序例
*   业务逻辑测试程序例
*   业务模型测试程序例
*   单个测试程序测试执行方法
*   整个工程程序测试执行方法
### IT
*   测试用例模板
*   测试执行shell套件模板
### 部署
*   Docker部署
*   pm2部署
### 最佳实践
*   [参考](https://github.com/i0natan/nodebestpractices)
### 使用到的一些包
*   [输入验证](https://github.com/hapijs/joi)
*   session外挂设置
*   [HTTP异常](https://github.com/hapijs/boom)
*   [RequestID](https://github.com/floatdrop/express-request-id)
*   NODE_ENV的配置
*   [限流](https://github.com/nfriedly/express-rate-limit)
