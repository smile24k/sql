完善的blog页面
============

###本项目用于搭建一个blog（express MySQL ejs），仅限于自己学习使用

###项目启动步骤
1. npm install
2. 使用MySQL数据库，创建相应的表和字段
3. 启动项目 npm start 如果没有supervisor使用 npm install -g supervisor

###文件对应的内容
1. config用于配置公用的东西
2. model用于配置数据库相关操作的方法
3. public静态文件存放位置
4. routes用于路由的配置
5. views视图展现
6. app.js项目启动入口

###数据库表


| Post                                                                  |
| ------------- |:-------------------------------:| -------------------:|
| name          | post                            | title    || time    |

| User                                                                  |
| ------------- |:-------------------------------:| --------:|| -------:|
| name          | email                           | password || id      |
    