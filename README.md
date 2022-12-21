
## 📝项目名称
英文名称：weblog  
中文：个人博客

## 📗项目介绍
weblog是一个博客分享交流平台，支持用户通过Web端进行博客分享和评论，构建一个博客社区。

- 📝项目特点   

  - 采用前后端分离开发，前端采用MVVM框架（Vue），后端采用SpringBoot
  - 无高并发问题，使用websocket搭建实时交流
  - 支持多种文章编辑器：markdown，富文本等
  - 页面定时刷新，实时交互性强
  - 支持博客页面的自定义设计，博客界面设置了大量配置

## 📝背景介绍
- 业务背景  
  
  个人博客基于课程设计II的课程要求：  
  开发个人博客系统，用户注册及登录模块，实现用户的注册、登录等操作，登录成功后进入各自的个人博客，用户能发表、修改和删除文章；管理员的后台管理模块，主要实现管理员对用户的管理、信息的审核、敏感词过滤等；可以拓展游客浏览博客、登录用户对他人博客的文章进行评论等功能。

- 业务场景  
	私有化服务：提供基础的文章编辑，发布，消息通知
	
	
## 📗需求概述
- 产品定位

  一款博客分享的平台。

- 业务需求
      ![image](https://tva3.sinaimg.cn/large/008cs7isly8h8oenk6y8tj30t80iagmx.jpg)

## 技术架构
前端技术架构主要为Vue2项目，具体技术栈如下：

- Vue2（框架）
- Vuex（状态管理）
- Vue-router（路由管理）
- ElementUI（组件库）
- Sass（CSS语法扩展）
- Axios（ajax请求封装库）
- Echarts（图表）

优化技术：

- NProgress（微进度条）
- iconfont(阿里矢量图标库)
- mavon-editor（markdown编辑器）
- vue-markdown（markdown渲染器）
- github-markdown-css（markdown样式依赖）
- highlight.js（代码高亮依赖，提供vue自定义命令的代码高亮依赖）

工具：

- VScode
- [新浪图床](https://pic.gimhoy.com/)

## 项目搭建

- 依赖安装

  ```bash 依赖安装
  npm install
  ```

- 启动服务

  ```bash 启动服务
  npm run serve
  ```

- 项目打包

  ```bash 项目打包
  npm run build
  ```

## 部署
[github部署地址](http://victinzhong.asia/weblog/dist)

## 项目文档
[语雀](https://www.yuque.com/victin/qgouio)

