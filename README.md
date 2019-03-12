#NodeJS API项目模板

##  依赖
Node.js v10.15.2+

##  模板内容
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
    |-- Test              测试目录
    |   |-- UnitTest      UT目录
    |       |-- Data      UT数据目录
    |       |   |-- testprogram.data.js   testprogram的测试数据
    |       |-- TestScript
    |           |-- testprogram.test.js   testprogram的ut程序
    |-- biz                 业务逻辑目录
    |   |-- bizProcess.js   业务逻辑代码
    |   |-- bizRoute        业务逻辑路由
    |-- model               业务模型
    |   |-- sampleModel.js  业务模型(sample)的接口实现
    |   |-- sampleRoute.js  业务模型(sample)的路由
    |-- util
        |-- commonUtil.js   共通方法
        |-- constdata.js    全局常量
        |-- database.js     数据库接口的实现
        |-- httprequest.js  后端HTTP请求实现

```
### 开发
####  API主入口模板
####  业务逻辑代码模板
####  业务逻辑路由模板
####  业务模型(sample)的接口实现模板
####  业务模型(sample)的路由
####  共通方法模板
####  全局常量模板
####  数据库接口的实现模板
####  后端HTTP请求模板
### 代码静态检查
####  eslint配置例
### UT
####  路由模块测试程序例
####  业务逻辑测试程序例
####  业务模型测试程序例
####  单个测试程序测试执行方法
####  整个工程程序测试执行方法
### IT
####  测试用例模板
####  测试执行shell套件模板
### 部署
####  Docker部署
####  pm2部署
### 最佳实践
####  参考
[参考](https://github.com/i0natan/nodebestpractices)
####  跨域配置
####  session外挂设置
####  标准异常处理
####  请求的uuid的配置
####  NODE_ENV的配置

### 工具