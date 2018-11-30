# 高仿网易新闻APP

> A Vue.js project

## 项目描述

实现像网易新闻APP中的新闻模块的分类及浏览，短视频模块的观看

## 技术描述

1、项目使用vue.js框架，并用vue-cli和webpack命令构建，用vue-router管理路由

2、使用axios完成ajax请求并实现数据的交互，同时使用了vue-axios

3、使用better-scroll实现多处页面的纵向滚动及首页导航栏的横向滚动

4、采用sass预编译语法扩展css

5、使用vue中的过渡类名实现登录页面、新闻详情页、视频详情页、分享页的过渡动画效果

6、使用vue中的Vue.set() 方法实现视频模块和讲讲模块的点赞功能使用字符串中的search方法实现新闻标题模糊查询的功能

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 使用的三方库

``` bash
# npm i sass-loader node-sass -D

# npm i better-scroll -S

# npm i axios -S

# npm i vue-axios -S
```

## 项目效果图

![163news.gif](./static/img/163news.gif)