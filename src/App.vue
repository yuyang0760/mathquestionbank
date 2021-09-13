<template>
  <div id="app">
    <div id="nav">
      版本:{{version}}
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
import version from "../package.json"
export default {
  name: 'About',
  data() {
    return {
      version: version.version
    }
  },
  mounted() {

    //#region 打开文件后,检查数据库文件是否存在,不存在就copy一份过去
    console.log("APP_mounted");
    var fs = require('fs');
    if (!(fs.existsSync('./Resources'))) {
      fs.mkdirSync('./Resources');
    }
    if (fs.existsSync('./Resources/mathdb.db')) {
    } else {
      // 复制一份到Resources
      fs.copyFileSync('./extraResources/mathdb.db', './Resources/mathdb.db');
    }
    //#endregion
  },
}
</script>
<style>
</style>
