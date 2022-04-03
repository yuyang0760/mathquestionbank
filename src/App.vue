<template>
  <div id="app">

    <div id="mytitle">
      <div id="nav">
        <router-link class="nodrag" to="/">Home</router-link>
        <router-link class="nodrag" to="/about">About</router-link>
        <router-link class="nodrag" to="/change">整理题目</router-link>
        <router-link class="nodrag" to="/search">查询</router-link>

      </div>
      <div id="titleName">Latex题库({{version}}) </div>
      <TitleButton class="nodrag TitleButtons" />
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
    <!-- <el-collapse-transition> -->
    <!-- </el-collapse-transition> -->

  </div>
</template>
<script>
import TitleButton from './components/TitleButton.vue'
import Vue from 'vue';
import version from "../package.json"
import config from '/extraResources/config.json'
export default {
  name: 'App',
  components: {
    TitleButton
  },
  data() {
    return {
      version: version.version
    }
  },
  mounted() {


    //#region 打开文件后,检查数据库文件是否存在,不存在就copy一份过去
    console.log("APP_mounted");
    var fs = require('fs');
    if (!(fs.existsSync(config.onedrivePath))) {
      fs.mkdirSync(config.onedrivePath);
    }
    if (!(fs.existsSync(config.onedrivePath + '/导出'))) {
      fs.mkdirSync(config.onedrivePath + '/导出');
    }
    if (!fs.existsSync(config.daochurulesPath)) {
      // 复制一份到Resources
      fs.copyFileSync('./extraResources/daochurules.json', config.daochurulesPath);
    }
    if (!fs.existsSync(config.mathdbPath)) {
      // 复制一份到Resources
      fs.copyFileSync('./extraResources/mathdb.db', config.mathdbPath);
    }
    if (!fs.existsSync(config.fenleiPath)) {
      // 复制一份到Resources
      fs.copyFileSync('./extraResources/fenlei.json', config.fenleiPath);
    }
    if (!fs.existsSync(config.biaoqianPath)) {
      // 复制一份到Resources
      fs.copyFileSync('./extraResources/biaoqian.json', config.biaoqianPath);
    }
    //#endregion
  },
}
</script>
<style>
body .el-scrollbar__wrap {
  overflow-x: hidden;
}
#App {
  display: flex;
  flex-direction: column;
  min-height: 100%;
 
}
#content {
  flex: 1;
}
#mytitle {
  display: flex;
  width: 100%;
  height: 30px;
 
  align-items: center; /* 上下居中*/
  justify-content: center; /* 左右居中*/
  background-color: rgb(255, 255, 255);
  -webkit-app-region: drag;
  /* position:fixed;  */
  /* z-index:1000; */
  /* top:0;  */
  /* left:0;  */
}
#nav {
  display: flex;
}
#titleName {
  flex: 1;
  display: flex;
  align-items: center; /* 上下居中*/
  /* justify-content: center; 左右居中 */
  font-family: "微软雅黑";
}
.drag {
  -webkit-app-region: drag;
}
.nodrag {
  -webkit-app-region: no-drag;
}
</style>
