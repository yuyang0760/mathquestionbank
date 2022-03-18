<template>
  <div id="app">

    <div id="mytitle">
      <div id="nav">
        <router-link class="nodrag" to="/">Home</router-link>
        <router-link class="nodrag" to="/about">About</router-link>
        <router-link class="nodrag" to="/change">Change</router-link>
      
        版本:{{version}}
        <iframe width="300" height="30" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=34&py=dongfeng&icon=1"></iframe>
      </div> 

      <TitleButton type="min" />
      <TitleButton type="max" />
      <TitleButton type="close" />

    </div>
  <router-view ></router-view>

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
html,
body {
  padding: 0px;
  margin: 0px;
  border: 0px;
  width: 100%;
  height: 100%;
}
#mytitle {
  width: 100%;
  height: 32px;
  background-color: rgb(255, 255, 255);
  -webkit-app-region: drag;
  margin-bottom: 5px;
}

.drag {
  -webkit-app-region: drag;
}
.nodrag {
  -webkit-app-region: no-drag;
}
</style>
