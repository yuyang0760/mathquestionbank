<template>
  <div id="app">
    <div id="nav">
      版本:{{version}}
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/change">Change</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
import version from "../package.json"
import config from '/extraResources/config.json'
export default {
  name: 'App',
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
</style>
