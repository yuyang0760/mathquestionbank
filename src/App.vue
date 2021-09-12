<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  name: 'About',
  mounted() {
    console.log("APP_mounted")

    // 连接数据库
    // const Sequelize = require("sequelize");
    // const initModels = require("./tools/init-models").initModels;
    // const sequelize = new Sequelize({
    //   host: 'localhost',
    //   username: 'root',
    //   password: '123456',
    //   database: 'electron_math_db',
    //   dialect: 'mysql',
    //   dialectModule: require('mysql2'), // 重要,不然会出错
    //   benchmark: true
    // })
    // const sequelize = new Sequelize({
    //   dialect: 'sqlite',
    //   storage: 'public/mathdb.db',
    //   dialectModule: require("sqlite3")
    // });
    // console.log("数据库已连接")
    // this.connect = sequelize;
    // Vue.prototype.$titles = initModels(sequelize).titles;
  },

}
</script>
<style>
</style>
