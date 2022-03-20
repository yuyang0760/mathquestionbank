# mathquestionbank

## todo
* 查询页面是否有编辑按钮,编辑功能是否可以整理出模块

## 工具,没有用到,很可惜,以后修改代码可能会用到
* https://www.sequelize.com.cn/other-topics/resources Sequelize的一些资源
* Sequelize的自动加载,导出模型,感觉很好,但是我的自己弄的,没有用到 https://github.com/Xancy/sequelize-autoload 
* sequelizer - 用于生成 Sequelize 模型的 GUI 桌面应用程序。支持Mysql，Mariadb，Postgres，Sqlite，Mssql。

## 注意
如果不能运行就删除yarn.lock重新安装,因为有些文字可能被意外替换了

配置文件config.json在extraResources文件夹下. 第一次打开需要自己配置下地址.

## 命令
yarn run electron:serve 

yarn run electron:build 打包

yarn run publish 打包并推送到github的release,但是好像过久了key失效,传不上.

## 其他
如果外面没有,程序会把extraResources文件夹下的biaoqian.json,fenlei.json,mathdb.db复制一份过去.如果有就不复制.

